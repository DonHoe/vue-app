import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MockData from './mock/index.js'
import axios from 'axios'
import Vuex from 'vuex'
MockData.bootstrap();

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$baseUrl = process.env.NODE_ENV == 'production' ? "" : "http://localhost:8090";
Vue.use(Vuex)
Vue.use(ElementUI)
window.console.log(process.env);
window.console.log(Vue.prototype.$baseUrl);
new Vue({
    render: h => h(App),
}).$mount('#app')