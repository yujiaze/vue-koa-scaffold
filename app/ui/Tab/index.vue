<template>
    <div class="ui-tab">
        <ul class="ui-tab-ul">
            <li v-for="(tab,idx) in tabList" :class="[idx == cur ? 'active' : '']" :key="tab">
                <a href="javascript:;" @click="setActive(idx)">{{tab}}</a>
            </li>
        </ul>
        <div class="ui-tab-content">
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
                valueList: [],
                cur: 0
            }
        },
        methods: {
            setActive(idx) {
                this.cur = idx
            }
        },
        beforeUpdate() {
            this.$emit('ui-tab-switch', this.valueList[this.cur] || this.cur)
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
        margin-bottom: 15px;
        >li {
            display: inline-block;
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
                display: block;
                padding: 0 16px;
            }
            &.active {
                color: #20a0ff;
                border-bottom: 3px solid #20a0ff;
            }
        }
    }
</style>