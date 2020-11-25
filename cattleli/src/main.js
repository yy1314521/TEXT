import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import qs from 'qs'
Vue.use(MintUI)        		

Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://localhost:8080'		// 默认服务端请求地址
// Vue.prototype.imgUrl = "http://localhost:8080" 	// 定义站点图片地址
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})