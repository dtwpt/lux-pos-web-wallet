<template>
    <div class="container">
        <div class="col-lg-12 text-center" v-if="addresses.length>0">
            <h3>Addresses</h3>
            <br>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col" class="w-75">Address</th>
                    <th scope="col" id="w-25">Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="address in addresses">
                    <td><a :href="'https://explorer.luxcoin.xyz/address/'+address.address">{{address.address}}</a></td>
                    <td>{{address.balance}} LUX</td>
                </tr>
                </tbody>
            </table>
            <br>
            <button type="button" class="btn btn-success" @click="getNewAddress()" id="createAddBut">Create new</button>

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
                addresses:[]
            }
        },

        methods:{
            getAddresses: function(){
                this.$http.get('/getAddresses').then(response => {
                this.addresses=response.body;
            }, response => {
//error
                });
            },
            getNewAddress:function(){
                $('#createAddBut').css('display','none');
                this.$http.get('/getNewAddress').then(response => {
                    this.addresses.push({address:response.body,balance:0.0});
                $('#createAddBut').css('display','inline-block');
            }, response => {
//error
                });

            }

        },
        mounted: function(){
            this.getAddresses();
            this.$nextTick(function () {
                $('.nav-item.active').removeClass('active');
                $('.router-link-exact-active').parent().addClass('active');
            })
        }
    }

</script>