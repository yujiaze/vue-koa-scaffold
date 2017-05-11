<script type="babel/jsx">
import CNode from './CNode'

const PNode = {
    props: {
        store: Object,
        nodeId: String,
    },
    render(h) {
        const { store, nodeId, toggleOpen } = this
        let children = []
        store.pNodeMap[this.nodeId].forEach(cid => {
            if (store.nodeMap[cid].isParent) {
                children.push(<PNode store={store} nodeId={cid} />)
            } else {
                children.push(<CNode store={store} nodeId={cid} />)
            }
        })
        let childrenStyle = {
            paddingLeft: '20px',
            display: store.isOpening(nodeId).opened ? 'block' : 'none'
        }
        return <div class="p">
            <div onClick={toggleOpen}>
                {store.nodeMap[nodeId] && <CNode store={store} nodeId={nodeId} />}
            </div>
            <div style={childrenStyle}>
                {children}
            </div>
        </div>
    },
    methods: {
        toggleOpen() {
            this.store.toggleOpen(this.nodeId)
        }
    }
}
export default PNode
</script>