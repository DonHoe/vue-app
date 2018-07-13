import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'
import setting from '../page/setting.vue'
import zhihu from '../page/zhihu.vue'
import chart from '../page/chart.vue'
import login from '../page/login.vue'

Vue.use(Router)
var routerList = [{
  path: '/login',
  component: login,
  name: ''
}, {
  path: '/',
  component: home,
  name: '',
  children: [{
      path: '/setting',
      component: setting,
      name: ''
    },
    {
      path: '/zhihu',
      component: zhihu,
      name: ''
    },
    {
      path: '/chart',
      component: chart,
      name: ''
    }
  ]
}];

export default new Router({
  routes: routerList
})
