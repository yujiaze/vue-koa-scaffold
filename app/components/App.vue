<template>
    <div>
        <ul>
            <todo-item v-for="(todo, index) in todos"
                       :key="index"
                       :todo-item="todo" />
        </ul>
        <div>
            add todo:
            <input autocomplete="off"
                   @keyup.enter="addTodo" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TodoItem from './TodoItem/TodoItem.vue'

export default {
    components: { "todo-item": TodoItem },
    computed: {
        ...mapState({
            todos: state => state.todosState.todos
        })
    },
    methods: {
        ...mapMutations({
            addTodo: TYPES.TODO.ADD,
        }),
        addTodo(e) {
            var content = e.target.value
            e.target.value = ''
            this.$store.commit(TYPES.TODO.ADD, { content })
        }
    }
}
</script>
