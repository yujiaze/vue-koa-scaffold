<script type="babel/jsx">
import CNode from './CNode'
import Checkbox from '../Checkbox'

export default {
    props: {
        store: Object,
        nodeId: String,
    },
    render(h) {
        const { store, nodeId, toggleCheck } = this
        return <div class="c">
            {store.opt.showCheckbox && <Checkbox initial={store.isChecking(nodeId).checked} on-ui-checkbox-toggle={toggleCheck} />}
            {store.nodeMap[this.nodeId].data.label}
            {!store.pNodeMap[this.nodeId] && store.opt.renderOptionForChild && store.opt.renderOptionForChild(h, { store, nodeData: store.nodeMap[nodeId].data, nodeId })}
        </div>
    },
    methods: {
        toggleCheck(val) {
            this.store.toggleCheck(val, this.nodeId)
        }
    }
}
</script>