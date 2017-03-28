let _uuid = 0

console.log(TYPES)

export default {
    state: {
        todos: []
    },
    mutations: {
        [TYPES.TODO.ADD](state, { content }) {
            return state.todos.push({
                uuid: _uuid++,
                content: content,
                completed: false
            })
        },
        [TYPES.TODO.DELETE](state, { todo }) {
            state.todos.splice(state.todos.indexOf(todo), 1)
        },
        [TYPES.TODO.TOGGLE](state, { todo }) {
            todo.completed = !todo.completed
        }
    },
    actions: {

    },
    getters: {

    }
}