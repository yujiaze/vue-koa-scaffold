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
        <div>
            <h2>页面管理</h2>
            <ul>
                <li>
                    <router-link to="/page-manage/index">狐首管理</router-link>
                </li>
                <li>
                    <router-link to="/page-manage/channel">频道管理</router-link>
                </li>
                <li>
                    <router-link to="/page-manage/topic">专题管理</router-link>
                </li>
            </ul>
        </div>
        <div>
            <router-view></router-view>
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
