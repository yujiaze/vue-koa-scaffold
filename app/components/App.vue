<template>
    <div>
        <ul>
            <todo-item v-for="(todo, index) in todos"
                      :key="index"
                      :todo="todo" />
        </ul>
        <div>
            add todo:
            <input autocomplete="off"
                   @keyup.enter="TODO_ADD" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TodoItem from './TodoItem.vue'

export default {
    components: { "todo-item": TodoItem },
    computed: {
        ...mapState({
            todos: state => state.todosState.todos
        })
    },
    methods: {
        ...mapMutations([
            TYPES.TODO.ADD,
        ])
    }
}
</script>
