import Vue from 'vue'
import Router from 'vue-router'

const getComponent = (component) => () =>
    import (`../page/${component}.vue`);

Vue.use(Router)
var routerList = [{
    path: '/login',
    component: getComponent("login"),
    name: ''
}, {
    path: '/',
    component: getComponent("home"),
    name: '',
    children: [{
            path: '/main',
            component: getComponent("main"),
            name: ''
        }, {
            path: '/setting',
            component: getComponent("setting"),
            name: ''
        },
        {
            path: '/zhihu',
            component: getComponent("zhihu"),
            name: ''
        },
        {
            path: '/log',
            component: getComponent("log"),
            name: ''
        },
        {
            path: '/chart',
            component: getComponent("chart"),
            name: ''
        },
        {
            path: '/spider',
            component: getComponent("spider"),
            name: ''
        }

    ]
}];

export default new Router({
    routes: routerList
})