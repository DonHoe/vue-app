import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import home1 from '@/page/home1'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/home1',
    name: 'home1',
    component: home1
  }]
})
