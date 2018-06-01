import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import setting from '@/page/setting'
import zhihu from '@/page/zhihu'
import chart from '@/page/chart'

Vue.use(Router)
var routerList = [];
var routerConfigList = [
  "home",
  "setting",
  "zhihu",
  "chart"
];

for (var i in routerConfigList) {
  routerList.push({
    path: "/" + routerConfigList[i],
    name: routerConfigList[i],
    component:Vue.extend(require('@/page/' + routerConfigList[i] + ".vue").default)
  });
}
console.log(routerList);
export default new Router({
  routes: routerList
})

// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'home',
//     component: home
//   }, {
//     path: '/setting',
//     name: 'setting',
//     component: setting
//   }, {
//     path: '/zhihu',
//     name: 'zhihu',
//     component: zhihu
//   }, {
//     path: '/chart',
//     name: 'chart',
//     component: chart
//   }]
// })
