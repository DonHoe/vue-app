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
Vue.prototype.$baseUrl = process.env.baseUrl;
Vue.use(Vuex)
Vue.use(ElementUI)

new Vue({
    render: h => h(App),
}).$mount('#app')