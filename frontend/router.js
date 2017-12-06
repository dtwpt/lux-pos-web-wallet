import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


Vue.use(VueRouter);
Vue.use(VueResource);
const dashboard = require('./dashboard.vue').default;
const addresses = require('./addresses.vue').default;
const send = require('./send.vue').default;




// 2. Definiere ein paar Routes
// Jede Route sollte mit einer Komponenente verbunden sein.
// Die Komponenente kann entweder eine tatsächliche Komponente sein, die via Vue.extend() erstellt wird,
// ein Komponenten-ID-String der via Vue.component() registriert wurde,
// oder lediglich ein Optionsobjekt der Komponenente.
// Hinweis: Verschachtelte (engl: "nested") Routes werden später in dieser Anleitung behandelt.

const routes = [
    { path: '/', component: dashboard },
    { path: '/addresses', component: addresses },
    { path: '/send', component: send }
]

// 3. Erstelle die Router-Instanz und füge ihr die `routes`-Option hinzu.
// Es gibt ntürlich noch mehr Optionen, aber hier halten wir es erstmal einfach.

const router = new VueRouter({
    routes // kurz für 'routes: routes'
})

// 4. Ertelle und mounte die Root-Instanz.
// Stelle sicher, dass der Router mit der `router` option an die Root Instanz übergeben wird, damit er später überall in deiner App zur Verfügung steht.

const app = new Vue({
    router,
    data: {
        username:''
    },
    methods: {
        getUser: function(){
            this.$http.get('/getUser').then(response => {
            this.username=response.body.username;

        }, response => {
                // error callback
            });
        },        getAvatarURL: function(){
            this.$http.get('/user/getAvatarURL').then(response => {
                this.avatarURL= response.body.avatarURL;
        }, response => {
                // error callback
            });
        },
        getCookie: function(cname) {var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        setCookie: function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        setContentHeight: function(){
            $('.right_col').css('min-height','');
            $('.right_col').css('min-height', $(window).outerHeight()-$('footer').outerHeight()-$('.right_col').offset().top);
        },
        centerTable: function(){
            $('table.VueTables__table.table.table-striped.table-bordered.table-hover').parent().parent().parent().css('width',$('table.VueTables__table.table.table-striped.table-bordered.table-hover').outerWidth());
            $('.col-md-6').css('width','100%');
            $('table.VueTables__table.table.table-striped.table-bordered.table-hover').parent().parent().parent().css('margin','0 auto');
            $('table.VueTables__table.table.table-striped.table-bordered.table-hover').parent().parent().children().css('display','block')
        }
    },
    mounted: function(){
        this.getUser();

    },

    watch: {
        '$route' (to, from) {

        }
    }

}).$mount('.mainContainer')
