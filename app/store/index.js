import Vuex from 'vuex'
import UserState from './modules/user'
import Vue from 'vue'


Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        UserState
    }
})
