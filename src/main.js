import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './vuex/store';
// 引入element ui
import ElementUi from 'element-ui';
Vue.use(ElementUi);
import 'element-ui/lib/theme-chalk/index.css';
// 引入fa font
import 'font-awesome/scss/font-awesome.scss';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
