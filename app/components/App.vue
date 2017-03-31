<template>
    <div>
        <os-header></os-header>
    
        <div class="page-container">
            <!--<ul>
                            <todo-item v-for="(todo, index) in todos" :key="index" :todo-item="todo" />
                        </ul>
                        <div>
                            add todo:
                            <input autocomplete="off" @keyup.enter="addTodo" />
                        </div>-->
            <div class="nav-left">
                <h2>页面管理</h2>
                <ul>
                    <li>
                        <router-link to="/page-manage/index">首页管理</router-link>
                    </li>
                    <li>
                        <router-link to="/page-manage/channel">频道管理</router-link>
                    </li>
                    <li>
                        <router-link to="/page-manage/topic">专题管理</router-link>
                    </li>
                </ul>
                <h2>
                    <router-link to="/uwp-push/message">UWP推送</router-link>
                </h2>
            </div>
            <div class="content-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import OsHeader from './OsHeader'
    import TodoItem from './TodoItem/TodoItem.vue'
    export default {
        components: {
            "todo-item": TodoItem,
            'os-header': OsHeader
        },
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
                this.$store.commit(TYPES.TODO.ADD, {
                    content
                })
            }
        }
    }
</script>


<style scoped lang="postcss">
    .page-container {
        padding: 55px 30px 95px 30px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    
    .nav-left {
        width: 25%;
        float: left;
        h2,
        h2>a {
            font-size: 16px;
            color: #5e6d82;
            line-height: 40px;
            height: 40px;
            margin: 0;
            padding: 0;
            text-decoration: none;
            display: block;
            position: relative;
        }
        h2 {
            cursor: default;
            font-weight: initial;
        }
        h2>a {
            &:hover {
                color: #20a0ff;
            }
            &.router-link-active {
                color: #20a0ff;
            }
        }
        li>a {
            text-decoration: none;
            display: block;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            padding-left: 24px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #5e6d82;
            &:hover {
                color: #20a0ff;
            }
            &.router-link-active {
                color: #20a0ff;
            }
        }
    }
    
    .content-right {
        float: left;
        width: 75%;
    }
</style>