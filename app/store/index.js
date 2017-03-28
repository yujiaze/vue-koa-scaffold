import Vuex from 'vuex'
import todosState from './modules/todos'
import Vue from 'vue'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        todosState
    }
})
