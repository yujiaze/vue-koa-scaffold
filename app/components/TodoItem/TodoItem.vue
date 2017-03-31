<template>
    <li class="test">
        <input type="checkbox"
               v-model="todoItem.completed" />
        <span>{{todoItem.content}}</span>
        <button v-on:click="delTodo({todo:todoItem})">del</button>
    </li>
</template>

<script>
import { mapMutations } from 'vuex'


export default {
    name: 'TodoItem',
    data() {
        return {

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

<style scoped>
.test {
    background: red;
}
</style>