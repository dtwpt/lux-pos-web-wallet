<template>
    <div class="">
        <link rel="stylesheet" type="text/css" href="../css/bootstrap-datetimepicker.css" />
        <div class="container">

            <form class="well form-horizontal" action=" " method="post"  id="contact_form">
                <fieldset>

                    <!-- Form Name -->
                    <center><h2><b>{{ $t("headingAccount") }}</b></h2></center><br>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("commercial") }}</label>
                        <center>
                            <div class="col-md-2 inputGroupContainer">
                                <div class="input-group">
                                    <input type="radio" id="commercial" name="commercial" :value="true" v-model="accountData.commercial" v-bind="{disabled: !editable}"> {{ $t("yes") }}
                                </div>
                            </div>
                            <div class="col-md-2 inputGroupContainer">
                                <div class="input-group">
                                    <input type="radio" id="commercial" name="commercial" :value="false" v-model="accountData.commercial" v-bind="{disabled: !editable}"> {{ $t("no") }}

                                </div>
                            </div>
                        </center>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("title") }} / {{ $t("name") }}</label>
                        <div class="col-md-1 inputGroupContainer">
                            <div class="input-group">
                                <input id="title" :placeholder='$t("title")' class="form-control"  type="text" v-model="accountData.title" v-bind="{readonly: !editable}">
                            </div>
                        </div>
                        <div class="col-md-3 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input name="name" v-validate="'required|alpha'" :class="{'input': true,'is-danger': errors.has('name'),'is-success': !errors.has('name')&&accountData.name&&editable }" :placeholder='$t("name")' class="form-control"  type="text" v-model="accountData.name" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>

                        </div>
                    </div>

                    <!-- Text input-->

                    <div class="form-group">
                        <label class="col-md-4 control-label" >{{ $t("surname") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input name="surname" v-validate="'required|alpha'" :class="{'input': true,'is-danger': errors.has('surname'),'is-success': !errors.has('surname')&&accountData.surname&&editable }" :placeholder='$t("surname")' class="form-control"  type="text" v-model="accountData.surname" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('surname')" class="help is-danger">{{ errors.first('surname') }}</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("gender") }}</label>
                        <center>
                            <div class="col-md-2 inputGroupContainer">
                                <div class="input-group">
                                    <input type="radio" id="gender" name="gender" v-validate="'required'" value="male" v-model="accountData.gender" v-bind="{disabled: !editable}"> {{ $t("male") }}
                                </div>
                            </div>
                            <div class="col-md-2 inputGroupContainer">
                                <div class="input-group">
                                    <input type="radio" id="gender" name="gender" value="female" v-model="accountData.gender" v-bind="{disabled: !editable}"> {{ $t("female") }}

                                </div>
                                <span v-show="errors.has('gender')" class="help is-danger">{{ errors.first('gender') }}</span>
                            </div>
                        </center>
                    </div>
                    <!-- Text input-->

                    <!-- Text input-->

                    <div class="form-group">
                        <label class="col-md-4 control-label" >{{ $t("dateOfBirth") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group date" data-provide="datepicker">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                                <datepicker @input="formatDateTime()" placeholder="Select Date" v-validate="'required'" language="de" v-model="accountData.dateOfBirth" :disabled-picker="!editable" :placeholder='$t("dateOfBirth")' input-class="form-control"></datepicker>
                                <!--date-picker name="dateOfBirth" v-model="accountData.dateOfBirth" v-validate="'required'" :class="{'input': true,'is-danger': errors.has('dateOfBirth'),'is-success': !errors.has('dateOfBirth')&&accountData.dateOfBirth&&editable }" :config="{format: 'DD/MM/YYYY'}" :read-only="!editable" :placeholder='$t("dateOfBirth")'></date-picker-->
                            </div>
                            <span v-show="errors.has('dateOfBirth')" class="help is-danger">{{ errors.first('dateOfBirth') }}</span>
                        </div>
                    </div>
                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("email") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                <input name="email" v-validate="'required|email'" :class="{'input': true,'is-danger': errors.has('email'),'is-success': !errors.has('email')&&accountData.email&&editable }" :placeholder='$t("email")' class="form-control" type="text" v-model="accountData.email" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                        </div>
                    </div>


                    <!-- Text input-->

                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("telephoneNo") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                <input name="telephoneNo" v-validate="{ rules: { regex: /([+]|[0])\d{6,}/} }" :class="{'input': true,'is-danger': errors.has('telephoneNo'),'is-success': !errors.has('telephoneNo')&&accountData.telephoneNo&&editable }" :placeholder='$t("telephoneNo")' class="form-control" type="text" v-model="accountData.telephoneNo" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('telephoneNo')" class="help is-danger">{{ errors.first('telephoneNo') }}</span>
                        </div>
                    </div>
                    <!-- Text input-->

                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("address") }} / {{ $t("postalCode") }}</label>
                        <div class="col-md-3 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                <input name="address" v-validate="'required'" :class="{'input': true,'is-danger': errors.has('address'),'is-success': !errors.has('address')&&accountData.address&&editable }" :placeholder='$t("address")' class="form-control"  type="text" v-model="accountData.address" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                        </div>
                        <div class="col-md-1 inputGroupContainer">
                            <div class="input-group">
                                <input name="postalCode" v-validate="'required'" :class="{'input': true,'is-danger': errors.has('postalCode'),'is-success': !errors.has('postalCode')&&accountData.postalCode&&editable }" :placeholder='$t("postalCode")' class="form-control"  type="text" v-model="accountData.postalCode" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('postalCode')" class="help is-danger">{{ errors.first('postalCode') }}</span>
                        </div>
                    </div>

                    <!-- Text input-->

                    <div class="form-group">
                        <label class="col-md-4 control-label" >{{ $t("country") }} / {{ $t("location") }}</label>
                        <div class="col-md-2 inputGroupContainer">
                            <div class="input-group">
                                <multiselect name="country" v-validate="'required'" :class="{'input': true,'is-danger': errors.has('country'),'is-success': !errors.has('country')&&accountData.country&&editable }" v-model="accountData.country" :options="countries" :searchable="true" :show-labels="false" :placeholder='$t("pickCountry")' v-bind="{disabled: !editable}"></multiselect>
                            </div>
                            <span v-show="errors.has('country')" class="help is-danger">{{ errors.first('country') }}</span>
                        </div>
                        <div class="col-md-2 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                <input name="location" v-validate="'required|alpha'" :class="{'input': true,'is-danger': errors.has('location'),'is-success': !errors.has('location')&&accountData.location&&editable }" :placeholder='$t("location")' class="form-control"  type="text" v-model="accountData.location" v-bind="{readonly: !editable}">
                            </div>
                            <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                        </div>
                    </div>
                    <!-- Text input-->



                    <br>

                    <center><h4><b>{{ $t("settings") }}</b></h4></center>
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("language") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i></span>
                                <multiselect id="language" v-model="accountData.language" :options='$t("languages")' :searchable="true" :show-labels="false" :placeholder='$t("language")' v-bind="{disabled: !editable}" @input="setLanguage()"></multiselect>

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("avatar") }}</label>
                        <center>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <dropzone v-on:vdropzone-file-added="removeOldAvatar();" v-on:vdropzone-success="showNewAvatar()" ref="avatarUploader" id="avatarUploader" url="/user/setAvatar" accepted-file-types="image/*" :max-number-of-files=1 :max-file-size-in-m-b=5 :use-font-awesome="true" :resize-width="200" :resize-height="200" :resize-quality="1" resize-mime-type="image/jpeg">
                                    </dropzone>
                                </div>
                            </div>
                        </center>
                    </div>
                    <br>
                    <div id="insuranceInfo">
                        <center><h4><b>{{ $t("insuranceInfo") }}</b></h4></center>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("insurance") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <multiselect v-if="insurances[0]" v-model="selected" :options="insurances" label="_id" :searchable="true" :show-labels="false" :placeholder='$t("pickInsurance")' :custom-label="customLabel" @select="setInsuranceId" v-bind="{disabled: !editable}"></multiselect>                                    </div>
                            </div>
                        </div>
                    </div>
                    <br>

                    <center><h4><b>{{ $t("paymentInfo") }}</b></h4></center>
                    <div class="form-group">
                        <label class="col-md-4 control-label">{{ $t("paymentMethod") }}</label>
                        <div class="col-md-4 selectContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                                <select class="form-control" v-model="accountData.paymentMethod" v-bind="{disabled: !editable}">
                                    <option value="debit">{{ $t("paymentDirectDebit") }}</option>
                                    <option value="credit">{{ $t("paymentCreditCard") }}</option>
                                    <option value="paypal">{{ $t("paymentPaypal") }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-if="accountData.paymentMethod==='credit'">
                        <label class="col-md-4 control-label">{{ $t("cardNumber") }} / {{ $t("CVV") }}</label>
                        <div class="col-md-3 inputGroupContainer">
                            <div class="input-group">
                                <input  id="cardNumber" :placeholder='$t("cardNumber")' class="form-control"  type="text" v-model="accountData.cardNumber" v-bind="{readonly: !editable}">
                            </div>
                        </div>
                        <div class="col-md-1 inputGroupContainer">
                            <div class="input-group">
                                <input  id="CVV" :placeholder='$t("CVV")' class="form-control"  type="text" v-model="accountData.CVV" v-bind="{readonly: !editable}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-if="accountData.paymentMethod==='credit'">
                        <label class="col-md-4 control-label">{{ $t("expireDate")}}</label>
                        <div class="col-md-2 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                                <input  id="expireDate" placeholder="MM/YYYY" class="form-control"  type="text" v-model="accountData.cardNumber" v-bind="{readonly: !editable}">

                            </div>
                        </div>

                    </div>
                    <div class="form-group" v-show="accountData.paymentMethod==='debit'">
                        <label class="col-md-4 control-label">{{ $t("IBAN") }}</label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-transfer"></i></span>
                                <input id="IBAN" :placeholder='$t("IBAN")' class="form-control" type="text" v-model="accountData.IBAN" v-bind="{readonly: !editable}">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div id="companyInfo" v-if="accountData.commercial">
                        <center><h4><b>{{ $t("companyInfo") }}</b></h4></center>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("companyName") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input name="companyName" v-validate="'alpha_spaces'" :class="{'input': true,'is-danger': errors.has('companyName'),'is-success': !errors.has('companyName')&&accountData.companyName&&editable }" :placeholder='$t("companyName")' class="form-control" type="text" v-model="accountData.companyName" v-bind="{readonly: !editable}">
                                </div>
                                <span v-show="errors.has('companyName')" class="help is-danger">{{ errors.first('companyName') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("companyURL") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input name="companyURL" v-validate="'url'" :class="{'input': true,'is-danger': errors.has('companyURL'),'is-success': !errors.has('companyURL')&&accountData.companyURL&&editable }" :placeholder='$t("companyURL")' class="form-control" type="text" v-model="accountData.companyURL" v-bind="{readonly: !editable}">
                                </div>
                                <span v-show="errors.has('companyURL')" class="help is-danger">{{ errors.first('companyURL') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("companyEmail") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input name="companyEmail" v-validate="'email'" :class="{'input': true,'is-danger': errors.has('companyEmail'),'is-success': !errors.has('companyEmail')&&accountData.companyEmail&&editable }" :placeholder='$t("companyEmail")' class="form-control" type="text" v-model="accountData.companyEmail" v-bind="{readonly: !editable}">
                                </div>
                                <span v-show="errors.has('companyEmail')" class="help is-danger">{{ errors.first('companyEmail') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("companyTelephone") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input name="companyTelephone" v-validate="{ rules: { regex: /([+]|[0])\d{6,}/} }" :class="{'input': true,'is-danger': errors.has('companyTelephone'),'is-success': !errors.has('companyTelephone')&&accountData.companyTelephone&&editable }" :placeholder='$t("companyTelephone")' class="form-control" type="text" v-model="accountData.companyTelephone" v-bind="{readonly: !editable}">
                                </div>
                                <span v-show="errors.has('companyTelephone')" class="help is-danger">{{ errors.first('companyTelephone') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("VAT") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input id="VAT" :placeholder='$t("VAT")' class="form-control" type="text" v-model="accountData.VAT" v-bind="{readonly: !editable}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">{{ $t("CRN") }}</label>
                            <div class="col-md-4 inputGroupContainer">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                                    <input id="CRN" :placeholder='$t("CRN")' class="form-control" type="text" v-model="accountData.CRN" v-bind="{readonly: !editable}">
                                </div>
                            </div>
                        </div>

                    </div>
                    <center>
                        <button class="btn btn-primary" type="button" onclick="location.href = document.referrer; return false;">{{ $t("back") }}</button>
                        <button class="btn btn-success" type="button" @click="editable=true; toggleDatePickerVisibility()" v-if="!editable">{{ $t("edit") }}</button>
                        <button class="btn btn-success" type="button" @click="validateBeforeSubmit(updateAccount)" v-if="editable">{{ $t("save") }}</button>
                    </center>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                accountData: {
                    title:'',
                    gender:'',
                    dateOfBirth: '',
                    name: '',
                    surname: '',
                    commercial: false,
                    companyName: '',
                    companyTelephone: '',
                    companyEmail: '',
                    companyURL: '',
                    telephoneNo: '',
                    email: '',
                    address: '',
                    postalCode: '',
                    location: '',
                    country: '',
                    VAT: '',
                    CRN: '',
                    language: '',
                    paymentMethod: '',
                    cardNumber: '',
                    CVV: '',
                    expireDate: '',
                    IBAN: '',
                    insurance_id: ''
                },
                selected:'',
                insurances:'',
                editable: false,
                languages: ['de','en']
            }
        },
        methods:{
            /**
             * This method sends a HTTP GET request to retrieve information about an equipment.
             * @function getInsurances
             */
            getInsurances: function(){
                var account=this;
                this.$http.get('/data/getInsurances?query=&limit=1000&orderBy=name&ascending=1&page=1&byColumn=0').then(response => {
                    this.insurances= response.body.data;
                if(this.accountData.insurance_id){
                    response.body.data.forEach(function(element, index, array){
                        if(element._id==account.accountData.insurance_id) {
                            account.selected=element;
                        }
                    });
                }
            }, response => {
                    // error callback
                });
            },
            showNewAvatar:function(){
                this.$parent.getAvatarURL();
                this.$parent.$children[0].$forceUpdate();
                $('img')[0].src+="?" + new Date().getTime();
            },
            removeOldAvatar: function(){
                if(this.$refs.avatarUploader.dropzone.files.length>1){
                    this.$refs.avatarUploader.removeFile(this.$refs.avatarUploader.dropzone.files[0]);
                }

            },
            setLanguage: function(){
                var account=this;
                var index= this.$i18n.t('languages').findIndex(function(element){
                    return element==account.accountData.language;
                });
                this.accountData.language=this.languages[index];
                this.$parent.setCookie('locale',this.languages[index],365);
                this.$i18n.locale=this.languages[index];

            },
            getAccount: function(){
                this.$http.get('/user/getAccount').then(response => {
                    this.accountData= response.body;
            }, response => {
                    location.reload();
                });
            },

            updateAccount: function(){
                this.$http.put('/user/updateAccount', JSON.stringify(this.accountData)).then(response => {
                    this.$notify({
                    message: this.$i18n.t('successAccountUpdate'),
                    type: 'success',
                })
            }, response => {
                    this.$notify({
                        message: this.$i18n.t('errorAccountUpdate'),
                        type: 'error',
                    })
                });


            },
            customLabel ({ name, policy }) {
                return `${name} – ${policy}`
            },
            setInsuranceId: function(selectedOption, id){
                this.accountData.insurance_id=selectedOption._id;
            },
            /**
             * this is MyClass description.
             * @example
             * let myClass = new MyClass();
             */
            validateBeforeSubmit: function(fn) {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // eslint-disable-next-line
                        this.editable=false;
                        fn();

                    }else{
                        this.$notify({
                        message: this.$i18n.t('errorRequiredFields'),
                        type: 'danger',
                    })
                }
            });
            },
            formatDateTime: function() {
                //modifies the date format to local time
                this.accountData.dateOfBirth = moment(this.accountData.dateOfBirth).format('YYYY/MM/DD');
            },
            toggleDatePickerVisibility: function() {
                $('.vdp-datepicker').children().children().prop('readonly',!this.editable);
            }
        },
        mounted: function(){
            this.getAccount();
            this.getInsurances();

            if(this.$parent.avatarURL){
                var mockFile = { name: "avatar.jpg", size: 50000, dataURL: this.$parent.avatarURL };
                this.$refs.avatarUploader.manuallyAddFile(mockFile,this.$parent.avatarURL,null,null,{dontSubstractMaxFiles:true});
                this.$refs.avatarUploader.dropzone.files.push(mockFile);
            }
            document.title=this.$i18n.t('titleAccount');
        },
        watch:{
            '$parent.account_id' () {

                var mockFile = { name: "avatar.jpg", size: 50000, dataURL: this.$parent.avatarURL };
                this.$refs.avatarUploader.manuallyAddFile(mockFile,this.$parent.avatarURL,null,null,{dontSubstractMaxFiles:true});
                this.$refs.avatarUploader.dropzone.files.push(mockFile);

            }
        }
    }
</script>