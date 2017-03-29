<template>
    <li :class="styles.test">
        <input type="checkbox"
               v-model="todoItem.completed" />
        <span>{{todoItem.content}}</span>
        <button v-on:click="delTodo({todo:todoItem})">del</button>
    </li>
</template>

<script>
import { mapMutations } from 'vuex'
import styles from './TodoItem.css'

export default {
    name: 'TodoItem',
    data() {
        return {
            styles: styles
        }
    },
    computed: {

    },
    props: ['todo-item'],
    methods: {
        ...mapMutations({
            delTodo: TYPES.TODO.DELETE
        })
    }
}
</script>