// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from "axios"
import store from "./vuex/store.js"
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
        if (to.path != '/') {
            if (!window.sessionStorage.getItem("username")) {
                next({
                    path: '/'
                })
            } else {
                next()
            }
        } else {
            next()
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})