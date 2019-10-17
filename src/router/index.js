import Vue from 'vue'
import Router from 'vue-router'

const getComponent = (component) => () =>
    import (`../page/${component}.vue`);
let routerMap = [
    ["/main", "main"],
    ["/setting", "setting"],
    ["/zhihu", "zhihu"],
    ["/log", "log"],
    ["/chart", "chart"],
    ["/spider", "spider"],
    ["/menu", "menu"],
    ["/role", "role"]
];
Vue.use(Router)
var routerList = [{
    path: '/login',
    component: getComponent("login"),
    name: ''
}, {
    path: '/',
    component: getComponent("home"),
    name: '',
    children: []
}];

routerMap.forEach(function(v) {
    routerList[1].children.push({
        path: v[0],
        component: getComponent(v[1])
    });
});

export default new Router({
    routes: routerList
})