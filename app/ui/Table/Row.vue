<script lang="babel">
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
                return prev;
            }, { _self: item, index:index, [prop[0]]: item[prop[0]] })
        }
    }

    export default {
        name: "Row",
        props: {
            column: Array,
            item: [Object, Array],
            index: Number
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
                if (column[i].type == 'index') {
                    child = <td key={ column[i].id }>
                        <div>
                            { index + 1 }
                        </div>
                    </td>
                }
                children.push(child)
            }
            return (
                <tr>
                    { children }
                </tr>
            )
        }
    }
</script>