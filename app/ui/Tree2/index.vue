<script type="babel/jsx">
import PNode from './PNode'
import CNode from './CNode'
import Store from './store.js'
const Tree2 = {
    name: 'Tree',
    props: {
        list: Array,               //用来渲染的列表
        showCheckbox: Boolean,     //展示checkbox
        defaultChecked: {          //默认选中的节点
            type: Array,
            default: () => []
        },
        defaultOpened: {           //默认打开的节点
            type: Array,
            default: () => []
        },
        identify: String,          //用于标识节点的key
        renderOptionForChild: Function,
    },
    data() {
        return {
            store: new Store(this.list, this.identify, this.defaultChecked, this.defaultOpened, {
                showCheckbox: this.showCheckbox || true,
                renderOptionForChild: this.renderOptionForChild
            })
        }
    },
    watch: {
        'store.checked'(val) {
            this.$emit('ui-tree-check', val.map(nodeId => this.store.nodeMap[nodeId]['data'][this.identify]))
        },
        'list'(val) {
            this.store.setList(val)
        },
        'defaultChecked'(val) {
            this.store.setChecked(val)
        },
        'defaultOpened'(val) {
            this.store.setOpened(val)
        }
    },
    render(h) {
        const { showCheckbox, store } = this
        return <div>
            <PNode store={store} node-id={store.rootPNodeId} />
        </div>
    }
}
export default Tree2
</script>