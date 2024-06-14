// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import './assets/css/bootstrap.min.css'
//  引入Echarts
import * as echarts from 'echarts'
import '../static/echarts/world.js'
Vue.prototype.$echarts = echarts

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);

Vue.prototype.axios = axios;

Vue.config.productionTip = false

axios.defaults.baseURL = "/api";
Vue.prototype.$http = axios

// 路由跳转之前
router.beforeEach((to, from, next) => {
    let isLogin = sessionStorage.getItem('isLogin');
    if (to.path == '/logout') {
        // 清空
        sessionStorage.clear();
        next({ path: '/login' });
    } else if (to.path == "/login") {
        if (isLogin != null) {
            next({ path: '/main' });
        }
    } else if (isLogin == null) {
        //除非islogin为true，否则均跳转到登陆界面
        next({ path: '/login' })
    }
    next();
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})