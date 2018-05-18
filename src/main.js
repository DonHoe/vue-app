// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MockData from './mock/index.js'
import axios from 'axios'

MockData.bootstrap();

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

Vue.use(ElementUI)


Vue.component("v-search",{
    template:'<div style="padding: 10px 0 0 10px;"><slot></slot></div>',
    props:["title"],
    methods: {
        search: function () {
            this.$emit('search');
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

