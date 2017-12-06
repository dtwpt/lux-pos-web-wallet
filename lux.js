var request = require('request');
var config = require('./config.js');
var path=require('path');


exports.checkAccount=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;
    request({url:config.rpcurl,json: {'method':'getaddressesbyaccount', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, body) {
       if(body.result.length==0){
           request({url:config.rpcurl,json: {'method':'getnewaddress', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, body) {
            if(body.result){
                res.sendFile( path.join(__dirname, './frontend/router.html'))
            }
           });
           }else{
           res.sendFile( path.join(__dirname, './frontend/router.html'))
       }
    })
}


exports.getDashboard=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;
    new Promise(function(resolve,reject){
        request({url:config.rpcurl,json: {'method':'getaddressesbyaccount', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyAddresses) {
            resolve(bodyAddresses);
        });
    }).then(function(value){addToDashboard({addresses:value.result.length})});

    new Promise(function(resolve,reject){
        request({url:config.rpcurl,json: {'method':'getbalance', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyBalance) {
            resolve(bodyBalance);
        });
    }).then(function(value){addToDashboard({balance:value.result})});
    new Promise(function(resolve,reject){
        request({url:config.rpcurl,json: {'method':'listtransactions', 'params':[userid, 100]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyTransactions) {
            resolve(bodyTransactions);
        });
    }).then(function(value){
        let reducedTransactions=[];
        value.result.forEach(function(curr,index,array){
            reducedTransactions.push({
                address:curr.address,
                amount:curr.amount,
                fee:curr.fee,
                confirmations:curr.confirmations,
                txid:curr.txid,
                time:curr.time,
                category:curr.category
            })
        })

        addToDashboard({transactions:reducedTransactions.sort(function(a,b){return b.time-a.time})})});

    new Promise(function(resolve,reject){
        request({url:config.rpcurl,json: {'method':'getinfo'}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyInfo) {
            resolve(bodyInfo);
        });
    }).then(function(value){addToDashboard({difficulty:{PoW: value.result.difficulty['proof-of-work'],PoS: value.result.difficulty['proof-of-stake']}})});


    let dashboard={};

    function addToDashboard(value){
    dashboard[Object.keys(value)[0]]=value[Object.keys(value)[0]];
    if(Object.keys(dashboard).length==4){
        res.json(dashboard);
    }

    }

}

exports.getBTCValue=function(req,res){
    request({url:'https://www.cryptopia.co.nz/api/GetMarket/LUX_BTC', method: 'GET'}, function(err, httpResponse, bodyCryptopia) {
        res.json({btcvalue:JSON.parse(bodyCryptopia).Data.LastPrice})

    })
    }

exports.getAddresses=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;

    var addressesObj={};
    new Promise(function(resolve,reject){
    request({url:config.rpcurl,json: {'method':'getaddressesbyaccount', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyAddresses) {
        resolve({addresses:bodyAddresses.result});
    });

    }).then(function(addresses){

            addAddressesObj(addresses);
    })

    new Promise(function(resolve,reject){
        request({url:config.rpcurl,json: {'method':'listunspent', 'params':[1,9999999]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyUn) {
            resolve({unspent:bodyUn.result});
        });

    }).then(function(unspent){
        addAddressesObj(unspent);
    })



    function addAddressesObj(value) {
        addressesObj[Object.keys(value)[0]] = value[Object.keys(value)[0]];
        if (Object.keys(addressesObj).length == 2) {
            calcBalance();
        }
    }
    function calcBalance(){
        //console.log(addressesObj.transactions)+
        var balances=[];
        addressesObj.addresses.forEach(function(currAdd,indexAdd,arrayAdd){
            var sum=0.0;
            addressesObj.unspent.forEach(function(currTra,indexTra,arrayTra){
                if(currTra.address==currAdd){
                    sum+=currTra.amount;
                }
                if(indexTra==addressesObj.unspent.length-1){
                    balances.push({address:currAdd,balance:sum});
                }
            })
            if(indexAdd==addressesObj.addresses.length-1){
                res.json(balances)
            }


        })

    }
    }

    exports.getNewAddress=function(req,res){
        var userid=req.kauth.grant.access_token.content.sub;
        request({url:config.rpcurl,json: {'method':'getnewaddress', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyNewAdd) {
            res.json(bodyNewAdd.result);
        });

    }

exports.getBalance=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;
    request({url:config.rpcurl,json: {'method':'getbalance', 'params':[userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyBalance) {
        res.json(bodyBalance.result);
    });

}


exports.sendTransaction=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;
    request({url:config.rpcurl,json: {'method':'sendfrom', 'params':[userid, req.body.sendTo,parseFloat(req.body.amount)]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodySend) {
        if(bodySend.error){
            res.json({error:bodySend.error.message})
        }else{
            request({url:config.rpcurl,json: {'method':'gettransaction', 'params':[bodySend.result]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyTransaction) {
            bodyTransaction.result.details.forEach(function(curr,index,array){
                if(!curr.account){
                    request({url:config.rpcurl,json: {'method':'validateaddress', 'params':[curr.address]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyVerAdd) {
                    if(bodyVerAdd.result.ismine){
                        request({url:config.rpcurl,json: {'method':'setaccount', 'params':[curr.address, userid]}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, bodyVerAdd) {
                        res.json({txid:bodySend.result})
                        });
                        }
                    });
                    }

            })



            });

            }
    });


}


exports.getInfo=function(req,res){
    var userid=req.kauth.grant.access_token.content.sub;
request({url:config.rpcurl,json: {'method':'getinfo'}, method: 'POST', auth:{user:config.rpcuser,pass:config.rpcpass}}, function(err, httpResponse, body) {
    res.send(body);
})

}

exports.getUser=function(req,res){

    res.json({username:req.kauth.grant.access_token.content.preferred_username})

}