<script lang="babel">
    function createProps(item, prop) {
        if (!prop) return {}
        if (typeof prop == 'string') {
            return {
                [prop]: item[prop]
            }
        } else {
            return prop.reduce((prev, cur) => {
                prev[cur] = item[cur]
                return prev;
            }, { [prop[0]]: item[prop[0]] })
        }
    }

    export default {
        name: "Row",
        props: {
            column: Array,
            item: Object
        },
        render(h) {
            let { item, column } = this
            for (var i = 0, children = []; i < column.length; i++){
                if (!column[i].slot) {
                    var child =  <td key={ column[i].id }>
                        <div>
                            { item[column[i].prop] }
                        </div>
                    </td>
                } else {
                    child = <td key={ column[i].id }>
                        <div>
                            { column[i].slot(createProps(item, column[i].prop)) }
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