// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false
Vue.use(iView);
Storage.prototype.setExpire =(key,value,expire)=>{
  let obj={
    data:value,
    time:Date.now(),
    expire:expire
  };
  localStorage.setItem(key,JSON.stringify(obj))
}
Storage.prototype.getExpire=(key)=>{
  let val =localStorage.getItem(key);
  if(!val){
    return val;
  }
  val =JSON.parse(val);
  if(Date.now()-val.time>val.expire){
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },

  template: '<App/>'
})
