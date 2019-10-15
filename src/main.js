import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;

let globalLoad;

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    globalLoad = Vue.prototype.$loading({ target: "#home-main" });
    return config;
}, function(error) {
    globalLoad && globalLoad.close();
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    globalLoad.close();
    return response;
}, function(error) {
    globalLoad && globalLoad.close();
    return Promise.reject(error);
});
Vue.prototype.$ajax = axios;
//Vue.prototype.$baseUrl = process.env.NODE_ENV == 'production' ? "" : "http://localhost:5566";
Vue.prototype.$baseUrl = "http://localhost:5566";
new Vue({
    render: h => h(App),
}).$mount('#app')