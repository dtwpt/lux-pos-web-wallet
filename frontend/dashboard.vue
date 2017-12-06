<template>
    <div class="container">
            <div class="col-lg-12 text-center" v-if="dashboard.difficulty">
                <div class="row">
                <div class="card w-25 bg-light mb-3">
                    <div class="card-header">Balance</div>
                    <div class="card-body d-flex flex-column justify-content-center">
                        <b>{{dashboard.balance}} LUX</b>
                    </div>
                </div>
                <div class="card w-25 bg-light mb-3">
                    <div class="card-header">Addresses</div>
                    <div class="card-body d-flex flex-column justify-content-center">
                        <b>{{dashboard.addresses}}</b>
                    </div>
                </div>
                <div class="card w-25 bg-light mb-3">
                    <div class="card-header">Difficulty</div>
                    <div class="card-body d-flex flex-column justify-content-center">
                        <b>PoW: {{dashboard.difficulty.PoW}}</b><br>
                        <b>PoS: {{dashboard.difficulty.PoS}}</b>
                    </div>
                </div>
                <div class="card w-25 bg-light mb-3">
                    <div class="card-header">LUX Value</div>
                    <div class="card-body d-flex flex-column justify-content-center">
                        <b>{{btcvalue}} BTC</b>
                    </div>
                </div>
                </div>
                <h4>Recent transactions</h4>
                <br>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col" id="col1">Time</th>
                        <th scope="col" id="col2">Category</th>
                        <th scope="col" id="col3">Amount</th>
                        <th scope="col" id="col4">Txid</th>
                        <th scope="col" id="col5">To</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(transaction,index) in dashboard.transactions" :key="transaction.time" v-if="((page-1)*10-1)<index&&index<(page*10-1)">
                        <td>{{new Date(transaction.time*1000).toLocaleString().replace(',','')}}</td>
                        <td :class="{'table-success': transaction.category=='receive','table-danger':transaction.category=='send'}">{{transaction.category}}</td>
                        <td>{{transaction.amount}} LUX</td>
                        <td><a :href="'https://explorer.luxcoin.xyz/tx/'+transaction.txid">{{transaction.txid}}</a></td>
                        <td>{{transaction.address}}</td>
                    </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">

                        <li class="page-item" :class="{'disabled': page==1}" @click="page==1?0:page--">
                            <a class="page-link" href="javascript:;">Previous</a>
                        </li>
                        <div v-for="n in Math.ceil(dashboard.transactions.length/10)">
                            <li class="page-item"><a class="page-link" href="javascript:;" @click="page=n">{{n}}</a></li>
                        </div>
                        <li class="page-item">
                            <a class="page-link" href="javascript:;" :class="{'disabled': page==Math.ceil(dashboard.transactions.length/10)}" @click="page==Math.ceil(dashboard.transactions.length/10)?0:page++">Next</a>
                        </li>
                    </ul>
                </nav>
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
                dashboard:{},
                btcvalue:'',
                page:1
            }
        },
        methods:{
            getDashboard: function(){
                this.$http.get('/getDashboard').then(response => {
                this.dashboard=response.body;
            }, response => {
//error
                });
            },
            getBTCValue: function(){
                this.$http.get('/getBTCValue').then(response => {
                    this.btcvalue=response.body.btcvalue;
            }, response => {
//error
                });
            }

        },
        mounted: function(){
            this.getDashboard();
            this.getBTCValue();
            var self=this;
            setInterval(function(){
                self.getDashboard();
                self.getBTCValue();
            },30000)
            this.$nextTick(function () {
                $('.nav-item.active').removeClass('active');
                $('.router-link-exact-active').parent().addClass('active');
            })

        }
    }

</script>