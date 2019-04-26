import Vue from 'vue';
import Router from 'vue-router';

//页面导入
import index from "../views/index";
import home from '../views/home';
import admin from "../views/admin";
// admin
import user from '../components/admin/user/user-index';
import adminNews from '../components/admin/news/news-index';
import adminAudio from '../components/admin/audio/audio-index';
// home
import homeNews from '../components/news/index';
import homeAudio from '../components/home/audio/audio-index';

Vue.use(Router);


export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: home,
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: admin,
                    redirect: '/admin/user',
                    children: [
                        {
                            path: 'user',
                            name: 'user',
                            component: user
                        },
                        {
                            path: 'news ',
                            name: 'news',
                            component: adminNews
                        },
                        {
                            path: 'audio',
                            name: 'audio',
                            component: adminAudio
                        }
                    ]
                },
                {
                    path: 'news',
                    name: 'news',
                    component: homeNews
                },
                {
                    path: 'audio',
                    name: 'audio',
                    component: homeAudio
                }
            ]
        },

    ]
})
