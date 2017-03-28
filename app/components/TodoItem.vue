<template>
    <li>
        <input type="checkbox"
               v-model="completed" />
        <span v-model="content"></span>
        <button v-on:click="delTodo">del</button>
    </li>
</template>

<script>
export default {
    name: 'TodoItem',
    data: {

    },
    computed: {

    },
    props: ['todoItem'],
    method: {
        delTodo() {

        }
    }
}
</script>