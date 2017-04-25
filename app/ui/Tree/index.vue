<template>
    <div class="ui-tree">
        <div class="ui-ripple" @click="toggle">
            {{this.items.label}}
            <i ref="angle" class="kz-e-angle-up"></i>
        </div>
        <ul class="ui-tree-children" v-if="isFolder" v-show="open">
            <template v-for="content in this.items.children">
                <tree v-if="content.children && content.children.length != 0" :key="content" :items="content"></tree>
                <li class="ui-ripple" v-else-if="content.route">
                    <router-link :key="content" :to="content.route">{{content.label}}</router-link>
                </li>
                <li class="ui-ripple" v-else :key="content" @click="content.onClick || noop">
                    <span>{{content.label}}</span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Tree",
        props: {
            items: Object
        },
        data() {
            return {
                open: false,
                noop: () => {}
            }
        },
        computed: {
            isFolder() {
                return this.items.children && this.items.children.length != 0 ? true : false
            }
        },
        methods: {
            toggle() {
                if (!this.open){
                    this.$refs.angle.style = 'transform: rotate(180deg)'
                } else {
                    this.$refs.angle.style = 'transform: rotate(0deg)'
                }
                this.open = !this.open

            }
        }
    }
</script>

<style scoped lang="postcss">
    .ui-tree {
        width: 256px;
    }
    .kz-e-angle-up {
        float: right;
        margin-right: 20px;
        margin-top: 15px;
        transition: all 0.5s;
    }
    .ui-ripple, ul, li {
        width: 100%;
    }
    .ui-ripple, li {
        padding-left: 30px;
        line-height: 48px;
    }
    .ui-tree .ui-tree .ui-ripple {
        padding-left: 50px;
    }
    .ui-ripple {
        box-sizing: border-box;
        &:before{
            width: 300px;
        }
        &:hover {
            background: #e5e5e5;
        }
    }
    .ui-tree .ui-tree {
        box-sizing: border-box;
        width: 100%;
    }
    li>* {
        padding-left: 20px;
    }
</style>