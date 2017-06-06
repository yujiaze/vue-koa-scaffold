<script lang="babel">
    import Checkbox from '../Checkbox'

    function createProps(item, prop, index) {
        if (!prop) return { _self: item, index: index }
        if (typeof prop == 'string') {
            return {
                [prop]: item[prop],
                _self: item,
                index: index
            }
        } else {
            return prop.reduce((prev, cur) => {
                prev[cur] = item[cur]
                return prev
            }, { _self: item, index:index, [prop[0]]: item[prop[0]] })
        }
    }

    export default {
        name: "Row",
        props: {
            column: Array,
            item: [Object, Array],
            index: Number,
            checking: Array,
            emitCheckingChange: Function
        },
        render(h) {
            let { item, column, index } = this
            for (var i = 0, children = []; i < column.length; i++){
                if (!column[i].slot) {
                    var child =  <td key={ column[i].id }>
                        <div>
                            { item[column[i].prop] }
                        </div>
                    </td>
                } else {
                    child = <td class='ui-td' key={ column[i].id }>
                        <div>
                            { column[i].slot(createProps(item, column[i].prop, index)) }
                        </div>
                    </td>
                }
                switch (column[i].type) {
                    case 'index':
                        child = <td key={ column[i].id }>
                            <div>
                                { index + 1 }
                            </div>
                        </td>
                        break
                    case 'select':
                        child =  <td key={ column[i].id }>
                            <div>
                                <Checkbox on-ui-checkbox-toggle={(val) => this.handleCheck(val, item)} initial={this.checking.indexOf(item) !== -1}/>
                            </div>
                        </td>
                        break
                    default:
                        break
                }
                children.push(child)
            }
            return (
                <tr>
                    { children }
                </tr>
            )
        },
        methods:{
            handleCheck(bool, item){
                const idx = this.checking.indexOf(item)
                idx == -1 ? this.$parent.checking.push(item): this.$parent.checking.splice(idx, 1)
                this.emitCheckingChange()
            }
        }
    }
</script>