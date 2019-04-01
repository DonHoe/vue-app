import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'
import setting from '../page/setting.vue'
import zhihu from '../page/zhihu.vue'
import chart from '../page/chart.vue'
import login from '../page/login.vue'
import log from '../page/log.vue'
import main from '../page/main.vue'
import spider from '../page/spider.vue'

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
      path: '/main',
      component: main,
      name: ''
    }, {
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
      path: '/log',
      component: log,
      name: ''
    },
    {
      path: '/chart',
      component: chart,
      name: ''
    },
    {
      path: '/spider',
      component: spider,
      name: ''
    }

  ]
}];

export default new Router({
  routes: routerList
})
