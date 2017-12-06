var session = require('express-session');
var Keycloak = require('keycloak-connect');
var express= require('express');
var app = express();
var path=require('path')
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

var lux=require('./lux.js');
const fs = require('fs');
const https = require('https');

app.use(express.static(path.join(__dirname, 'public')));

//Body-Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(session({
    secret: '######',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

app.use( keycloak.middleware() );
app.all('*', ensureSecure);
app.get( '/', keycloak.protect(), function(req,res){
    lux.checkAccount(req,res);

});

app.get( '/getUser', keycloak.protect(), function(req,res){
    lux.getUser(req,res);
});
app.get( '/getInfo', keycloak.protect(), function(req,res){
    lux.getInfo(req,res);
});

app.get( '/getDashboard', keycloak.protect(), function(req,res){
    lux.getDashboard(req,res);
});

app.get( '/getAddresses', keycloak.protect(), function(req,res){
    lux.getAddresses(req,res);
});
app.get( '/getBTCValue', keycloak.protect(), function(req,res){
    lux.getBTCValue(req,res);
});

app.get( '/getNewAddress', keycloak.protect(), function(req,res){
    lux.getNewAddress(req,res);
});

app.get( '/getBalance', keycloak.protect(), function(req,res){
    lux.getBalance(req,res);
});

app.post( '/sendTransaction', keycloak.protect(), function(req,res){
    lux.sendTransaction(req,res);
});




app.listen(80, function () {
    console.log('Lux Web Wallet listening on port 80');
});



function ensureSecure(req, res, next){
    if(req.secure){
        // OK, continue
        return next();
    };

    res.redirect('https://' + req.hostname + req.url); // express 4.x
}
const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};
https.createServer(options, app).listen(443);
