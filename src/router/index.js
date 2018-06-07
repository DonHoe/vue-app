import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
  routes: routerList
})
