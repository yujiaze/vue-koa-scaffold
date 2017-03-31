<template>
    <div>
        <ul class="ui-tab-ul">
            <template v-for="tab in tabList">
                            <li :class="[tab == cur ? 'active' : '']"
                                :key="tab">
                                <a href="javascript:;"
                                   @click="setActive(tab)">
                                                            {{tab}}
                                                        </a>
                            </li>
</template>
        </ul>
        <div>
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
    import TabItem from './TabItem'
    
    const Tab = {
        name: 'Tab',
        components: {
            'tab-item': TabItem
        },
        data() {
            return {
                tabList: [],
                cur: ''
            }
        },
        mounted() {
            this.cur = this.tabList[0]
        },
        methods: {
            setActive(idx) {
                this.cur = idx
            }
        }
    }
    
    Tab.TabItem = TabItem
    
    export default Tab
</script>

<style scoped lang="postcss">
    .ui-tab-ul {
        border-bottom: 1px solid #d1dbe5;
        height: 42px;
        line-height: 42px;
        >li {
            display: inline-block;
            padding: 0 16px;
            height: 42px;
            box-sizing: border-box;
            line-height: 42px;
            display: inline-block;
            list-style: none;
            font-size: 14px;
            color: #8391a5;
            position: relative;
            cursor: pointer;
            >a {
                text-decoration: none;
                color: inherit;
            }
            &.active {
                color: #20a0ff;
                border-bottom: 3px solid #20a0ff;
            }
        }
    }
</style>