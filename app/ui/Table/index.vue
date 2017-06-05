<template>
    <table class="ui-table">
        <thead>
            <tr>
                <th v-for="column in columnList" :key="column.prop">{{column.label}}</th>
            </tr>
        </thead>
        <tbody>
            <div secret-dom-data-bus>
                <slot>
                </slot>
            </div>
            <row v-for="(item, idx) in data" :index="idx" :column="columnList" :item="item" :key="item.id"></row>
        </tbody>
    </table>
</template>

<script>
    import Row from './Row'
    import Column from './Column'
    
    
    const Table = {
        name: 'Table',
        props: {
            data: Array
        },
        components: {
            'row': Row
        },
        data() {
            return {
                columnList: [],
            }
        }
    }
    
    Table.Column = Column
    
    export default Table
</script>

<style scoped lang="postcss">
    
</style>