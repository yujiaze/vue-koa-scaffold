<template>
    <div class="ui-select">
        <div :class="[multiple ? 'ui-select-cur-multi' : 'ui-select-cur']" @click="toggleShow">
            <input ref="search" readonly class="ui-select-cur-none" v-if="cur.length == 0" placeholder="请选择" />
            <span :class="[multiple ? 'ui-tag': 'ui-select-cur-item' ]" v-else v-for="item in cur">
                {{item.label}}
                <i class="kz-e-close" v-if="multiple" v-on:click.stop="handleRemoveCur(item)"></i>
            </span>
            <i class="kz-e-angle-down"></i>
        </div>
        <ul v-show="show">
            <slot>
                <ui-option v-for="item in options" key="item.value" label="item.label" value="item.value"></ui-option>
            </slot>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Option from './Option'
    
    @Component({
        props: {
            multiple: Boolean, //是否多选
            searchable: [Function, Boolean], //如果传入此funtion，则支持远程搜索
            remote: Function //如果传入此function，则列表项由该function的返回值渲染
        },
        components: {
            'ui-option': Option
        },
        watch: {
            cur: function() {
                this.$emit('ui-select-change', this.multiple ? this.cur : this.cur[0])
            }
        }
    })
    export default class Select extends Vue {
        cur = []
        options = []
        keywords = ''
        show = false
        constructor() {
            super()
        }
        created() {
            this.remote && this.remote(data => this.options = data)
            document.addEventListener('click', () => {
                this.show = false
            })
        }
        mounted() {
            var that = this
            if (this.searchable) {
                this.$refs['search'].removeAttribute('readonly')
                this.$refs['search'].oninput = e => {
                    that.keywords = e.target.value
                    that.$children.forEach(child => {
                        child.shouldShow = child.label.includes(e.target.value)})
                }
            }
        }
        toggleShow(e) {
            e.stopPropagation()
            this.show = !this.show
        }
        handleRemoveCur(item) {
            for (let i = 0; i < this.cur.length; i++) {
                JSON.stringify(item) == JSON.stringify(this.cur[i]) && this.cur.splice(i, 1)
            }
        }
    }
    
    Select.Option = Option
</script>

<style scoped lang="postcss">
    @define-extend ui-select-one {
        appearance: none;
        background-color: #fff;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: block;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: none;
        padding: 3px 10px;
    }
    
    @define-extend ui-select-cur-none {
        line-height: 28px;
        display: inline-block;
        height: 28px;
        width: calc(100% - 25px);
        cursor: default;
        border: none;
        outline: none;
        margin: 0;
        padding: 0;
    }
    
    .kz-e-angle-down {
        position: relative;
        top: 6px;
        float: right;
    }
    
    .ui-select {
        font-size: 14px;
        position: relative;
        .ui-select-cur-multi {
            @extend ui-select-one;
            .ui-select-cur-none {
                @extend ui-select-cur-none;
            }
            .ui-select-cur-item {}
        }
        .ui-select-cur {
            @extend ui-select-one;
            .ui-select-cur-none,
            .ui-select-cur-item {
                @extend ui-select-cur-none;
            }
        }
        >ul {
            padding: 6px 0;
            overflow: scroll;
            max-height: 274px;
            border: 1px solid #d1dbe5;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            box-sizing: border-box;
            margin-top: 5px;
            position: absolute;
            top: 35px;
            width: 100%;
            z-index: 10;
            >li {
                padding: 8px 10px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #48576a;
                height: 36px;
                line-height: 1.5;
                box-sizing: border-box;
                cursor: pointer;
                &:hover {
                    background-color: #e4e8f1;
                }
                &.cur {
                    color: #1c8de0;
                }
            }
        }
    }
</style>