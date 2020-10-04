import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import VueSimpleAlert from 'vue-simple-alert';
//comment
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/daterangepicker.css'
import '../node_modules/daterangepicker/daterangepicker'
import './assets/css/commentList.css'
import './assets/js/jquery-3.4.1.min.js'
import './assets/js/basic.js'
import 'element-ui/lib/theme-chalk/reset.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye ,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  Select,
  Button,
  Option,
  Checkbox,
  CheckboxGroup,
  
} from 'element-ui'
Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
Vue.component(Option.name, Option)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // comment
  components: { App },
  template: '<App/>'
})
Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */
Vue.use(ElementUI)
//axios.defaults.baseURL = '/api'
//Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false
// library.add(fab);
library.add(faEye,faEyeSlash);
Vue.component('font-awesome-icon', FontAwesomeIcon) 





//檢查是否為登入狀態
router.beforeEach((to, from, next)=>{
  // console.log(to);
  // console.log("fullPath:"+to.fullPath);
  // console.log("name:"+to.name);  //路徑名稱
   
  //const isLogin = localStorage.getItem('token') == 'logining' ;
  // 判斷token是否存在
  if( localStorage.getItem('token') ){
    var logining = localStorage.getItem('token');
    var loginData = JSON.parse(logining);
    //判斷當前時間與登入時間差異
    var currentTime = new Date().getTime();
    if( (currentTime - loginData.time) > 7200000){
      localStorage.removeItem('token');
      alert('連線愈時，請重新登入');
      next('/login');
    }else{
      next();
    }   
  } else {
    //未登入且路徑不再/login時導到login
    // if( to.path !== '/login'){
    //   next('/login');
    // }else{   //在登入頁不需要有token
    //   next();
    // }   
    if( to.path == '/login' || to.path == '/forgetPassword' || to.name =='verification'){
      next();
    }else{   
      next('/login');
    }     
  }
});
