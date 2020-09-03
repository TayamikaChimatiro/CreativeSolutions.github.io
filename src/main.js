import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebase } from '@firebase/app'
import VueResource from 'vue-resource'
import { SidebarPlugin } from 'bootstrap-vue'
import { NavPlugin } from 'bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {fb}   from './firebase'
import VueFirestore from 'vue-firestore';
import { TablePlugin } from 'bootstrap-vue'
import Swal from 'sweetalert2'
import VueCarousel from 'vue-carousel';


window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;

require('firebase/firestore')

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueCarousel);
Vue.use(VueFirestore);
Vue.use(TablePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(NavPlugin)
Vue.use(SidebarPlugin)
Vue.use(VueResource)
Vue.prototype.$firebaseDatabase = firebase.default.firestore()
Vue.config.productionTip = false

//Filters
Vue.filter('snippet', function(value){
  return value.slice(0,100) + '...';
});

let app = '';

fb.auth().onAuthStateChanged( (user) => {
  console.log(user);
  if(!app) {
   app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
   
  }
})