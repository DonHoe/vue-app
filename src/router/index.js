import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import setting from '@/page/setting'
import zhihu from '@/page/zhihu'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/setting',
    name: 'setting',
    component: setting
  }, {
    path: '/zhihu',
    name: 'zhihu',
    component: zhihu
  }]
})
