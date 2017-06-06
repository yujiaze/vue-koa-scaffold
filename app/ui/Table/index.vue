<template>
    <table class="ui-table">
        <thead>
            <tr>
                <th v-for="column in columnList" :key="column.prop">
                    <div v-if="column.type === 'select'">
                        <button class="ui-button-text" @click="handleBatchCheck(true)">全选</button>
                        <button class="ui-button-text" @click="handleBatchCheck(false)">反选</button>
                    </div>
                    <div v-else>{{column.label}}</div>
                </th>
            </tr>
        </thead>
        <tbody>
            <div secret-dom-data-bus>
                <slot>
                </slot>
            </div>
            <row v-for="(item, idx) in data" v-if="totalPage === 1 ? true : (idx > (curPage - 1) * purPage && idx < curPage * purPage)" :index="idx" :column="columnList" :item="item" :key="item.id" :checking="checking" :emit-checking-change="emitCheckingChange.bind(this)"></row>
        </tbody>
        <pagination v-if="totalPage > 1" :total="totalPage" v-on:ui-pagination-change="handlePaginationChange" />
    </table>
</template>

<script>
    import Row from './Row'
    import Column from './Column'
    import Pagination from '../Pagination'
    import Checkbox from '../Checkbox'
    
    const Table = {
        name: 'Table',
        props: {
            data: Array,
            purPage: Number, //每页展示数量,
            totalPage: { //总页数
                type: Number,
                default: 1
            }
        },
        components: {
            Row,
            Pagination,
            Checkbox
        },
        data() {
            return {
                columnList: [],
                curPage: 1,
                checking: []
            }
        },
        methods: {
            handlePaginationChange(curPage) {
                this.curPage = curPage
                this.$emit('ui-table-pagination-change', this.curPage)
            },
            handleBatchCheck(bool) {
                this.checking = []
                if (bool) {
                    this.data.forEach(item => {
                        this.checking.push(item)
                    })
                }
                this.emitCheckingChange()
            },
            emitCheckingChange() {
                this.$emit('ui-table-checking-change', this.checking)
            },
            // call this method by refs
            setChecking(checking) {
                this.checking = checking
            }
        }
    }
    
    Table.Column = Column
    
    export default Table
</script>

<style scoped lang="postcss">
    
</style>