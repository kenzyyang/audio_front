import Vue from 'vue';
import Router from 'vue-router';

//页面导入
import home from '../views/home';
import admin from "../views/admin";

Vue.use(Router);


export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin
        }
    ]
})
