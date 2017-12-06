<template>
    <div class="container">
        <div class="col-lg-12 text-center" v-if="balance||balance==0">
            <h3>send transaction</h3>
            Balance: <b @click="transaction.amount=balance-0.0001" style="cursor: pointer">{{balance}} LUX </b>
            <br><br>
            <form v-if="balance!=0">
                <div class="form-group row">
                    <label for="inputAdd" class="w-25 col-form-label">To</label>
                    <div class="w-50">
                        <input type="text" class="form-control" id="inputAdd" placeholder="LUX Address" v-model="transaction.sendTo">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputAmount" class="w-25 col-form-label">Amount</label>
                    <div class="w-25">
                        <input type="text" class="form-control" id="inputAmount" :placeholder="'Max-amount: '+(balance-0.0001).toString()" v-model="transaction.amount">
                    </div>
                </div>


                <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalTra">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Transaction</h5>


                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-if="txid||error">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <div class="modal-body">
                                <i class="fa fa-spinner fa-spin" style="font-size:100px" v-if="!txid&&!error"></i>
                                <div v-if="txid">
                                    <h4>Transaction was sent successfully!</h4>
                                    Txid: <a :href="'https://explorer.luxcoin.xyz/tx/'+txid">{{txid}}</a>

                                </div>
                                <div v-if="error">
                                    <h4>An error occured while sending the transaction</h4>>
                                    Error: <b>{{error}}</b><br>
                                    <div v-if="error=='Insufficient funds'">Tipp: try to reduce the amount around 0.0001 and try again!</div>

                                </div>
                            </div>
                            <div class="modal-footer" v-if="txid||error">

                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="goToDashboard()">Back to Dashboard</button>

                            </div>
                        </div>
                    </div>
                </div>

                        <button type="submit" class="btn btn-primary" v-if="transaction.sendTo&&transaction.amount" @click="sendTransaction()">Send</button>


            </form>
            <div v-else>
                You do not have sufficient funds to make a transaction!
            </div>

        </div>

        <div v-else class="text-center" style="display:flex;  flex-direction: column;justify-content: center; height:100%">
            <i class="fa fa-spinner fa-spin" style="font-size:100px"></i>

        </div>


    </div>
</template>

<script>
    export default {

        data () {
            return {
                balance: '',
                transaction: {
                    sendTo: '',
                    amount: ''
                },
                txid:'',
                error:''
            }
        },
        methods:{
            goToDashboard:function(){
                $('#modalTra').modal('hide');
                this.$router.push({path:'/'});
            },
            getBalance: function(){
                this.$http.get('/getBalance').then(response => {
                this.balance=response.body;
            }, response => {
//error
                });
            },
            sendTransaction:function(){
                if(this.transaction.amount>this.balance-0.0001){
                    alert('Insufficient funds! Please reduce the amount')
                    this.transaction.amount=this.balance-0.0001;
                }else if(this.transaction.sendTo.length!=34||this.transaction.sendTo.charAt(0)!='L'){
                    alert('Invalid LUX address!')
                }else{
                    var userconfirm= confirm('You are about so send '+this.transaction.amount+' LUX to '+this.transaction.sendTo+'.\nAre you sure?');
                    if(userconfirm==true) {
                        $('#modalTra').modal({backdrop: 'static', keyboard: false})
                        this.$http.post('/sendTransaction',JSON.stringify(this.$data.transaction)).then(response => {
                            if(response.body.error){
                                this.error=response.body.error;
                            }else{
                            this.txid=response.body.txid;
                            this.transaction.amount='';
                            this.transaction.sendTo='';
                            this.getBalance();
                            }
                    }, response => {
//error
                        });
                    }


                    }
                /*

                */

            }

        },
        mounted: function(){
            this.getBalance();
            this.$nextTick(function () {
                $('.nav-item.active').removeClass('active');
                $('.router-link-exact-active').parent().addClass('active');
            })
        }
    }

</script>