import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

new Vue({
    store,
    el: '#app',
    render: h => h(App)
})