<template>
    <div class="ui-pagination">
        <button :class="{ 'disable':curPage == 1 }" :disabled="curPage == 1" @click="firstPage">
            <i class="kz-e-pagination-previous"></i>
        </button>
        <button :class="{ 'disable':curPage == 1 }" :disabled="curPage == 1" @click="previousPage">
            <i class="kz-e-angle-left"></i>
        </button>
        <ul class="ui-pagination-ul">
            <li v-for="item in pageList" :key="item" @click="selectPage(item)">
                <button :class="{ 'active' : curPage == item }">{{item}}</button>
            </li>
        </ul>
        <button :class="{ 'disable' :curPage == total }" :disabled="curPage == total" @click="nextPage">
            <i class="kz-e-angle-right"></i>
        </button>
        <button :class="{ 'disable' :curPage == total }" :disabled="curPage == total" @click="lastPage">
            <i class="kz-e-pagination-next"></i>
        </button>
        <span v-if="jump">
            前往<input type="number" min="1"  class="goto-page-input" @change="gotoPage" />页
        </span>
    </div>
</template>

<script>
    import Vue from 'vue'
    const Pagination = {
        name: 'Pagination',
        props: {
            total: Number,
            jump: Boolean,
            initial: {
                default: 1,
                type: Number
            },
            size: {
                default: 5,
                type: Number
            }
        },
        data() {
            return {
                pageList: [],
                curPage: this.initial
            }
        },
        methods: {
            selectPage(item) {
                this.curPage = item
            },
            previousPage() {
                this.curPage--
            },
            nextPage() {
                this.curPage++
            },
            gotoPage(e) {
                var i = e.target.value
                e.target.value = parseInt(i)
                if (!i || i < 1 || i > this.total) return
                this.curPage = i
            },
            lastPage() {
                this.curPage = this.total
            },
            firstPage() {
                this.curPage = 1
            },
            calcPageList() {
                this.pageList = []
                var sep = parseInt(this.size / 2) + 1
                if (this.curPage <= sep) {
                    for (var i = 1; i <= this.size; i++) {
                        this.pageList.push(i)
                    }
                } else if (this.curPage > this.total - sep) {
                    for (var i = this.total - this.size + 1; i <= this.total; i++) {
                        this.pageList.push(i)
                    }
                } else {
                    for (var i = this.curPage - sep + 1; i < this.curPage + sep; i++) {
                        this.pageList.push(i)
                    }
                }
            }
        },
        created() {
            this.calcPageList()
        },
        watch: {
            curPage() {
                this.calcPageList()
                this.$emit('ui-pagination-change', this.curPage)
            }
        }
    }
    export default Pagination
</script>

<style scoped lang="postcss">
    .ui-pagination {
        user-select: none;
    }
    
    .ui-pagination-ul {
        display: -webkit-inline-box;
        margin: 0;
        padding: 0;
        li button {
            border-left: 0;
        }
        li:nth-of-type(1) button {
            border-left: 1px solid #d1dbe5;
        }
    }
    
    .ui-pagination button {
        padding: 0 4px;
        border: 1px solid #d1dbe5;
        background: #fff;
        cursor: pointer;
        text-align: center;
        margin: 0;
        display: inline-block;
        font-size: 13px;
        min-width: 28px;
        height: 28px;
        line-height: 28px;
        color: #97a8be;
        vertical-align: top;
        box-sizing: border-box;
        &.disable {
            color: #e4e4e4;
            background-color: #fff;
            cursor: not-allowed;
            pointer-events: none;
        }
        &.active {
            border-color: #20a0ff;
            background-color: #20a0ff;
            color: #fff;
            cursor: default;
        }
    }
    
    .goto-page-input {
        border: 1px solid #d1dbe5;
        border-radius: 2px;
        line-height: 18px;
        padding: 4px 2px;
        width: 30px;
        text-align: center;
        margin: 0 6px;
        box-sizing: border-box;
        transition: border .3s;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
        width: 30px;
    }
</style>

