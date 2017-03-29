import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)

new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})