import uid from '../../utils/uuid.js'

const TREE_NODE_ID = 'ui_tree_uid'

export default class Store {
    constructor(list, identifyKey, defaultChecked, defaultOpened, opt) {
        this.list = list
        this.identifyKey = identifyKey  //用来将TREE_NODE_ID转换为node data对应的属性

        this.nodeMap = {}               //节点池
        this.rootPNodeId = uid(TREE_NODE_ID)
        this.pNodeMap = {               //父节点池
            [this.rootPNodeId]: []      //用rootPNodeId初始化
        }
        this.setChecked(defaultChecked) 
        this.setOpened(defaultOpened)
        Store.createNode(list, this.pNodeMap, this.nodeMap, this.rootPNodeId) //实例化所有节点
        this.opt = opt
    }
    isChecking(nodeId) {
        let idx = this.checked.indexOf(nodeId)
        return idx === -1 ? { checked: false } : { checked: true, idx }
    }
    isOpening(nodeId) {
        let idx = this.opened.indexOf(nodeId)
        return idx === -1 ? { opened: false } : { opened: true, idx }
    }
    toggleCheck(val, nodeId) {
        var result = this.isChecking(nodeId)
        if (result.checked) {
            this.checked.splice(result.idx, 1)
        } else {
            this.checked.push(nodeId)
            this.checkAll(nodeId)
        }
    }
    toggleOpen(identifyValue) {
        var result = this.isOpening(identifyValue)
        result.opened ? this.opened.splice(result.idx, 1) : this.opened.push(identifyValue)
    }
    checkAll(nodeId) {
        this.pNodeMap[nodeId] && this.pNodeMap[nodeId].forEach(cid => {
            if (!this.isChecking(cid).checked) {
                this.checked.push(cid)
            }
            this.checkAll(cid)
        })
    }
    setList(list) {
        Store.createNode(list, this.pNodeMap, this.nodeMap, this.rootPNodeId)
    }
    setChecked(checked) {
        var trulyChecked = []
        for (var i in this.nodeMap) {
            if (this.nodeMap.hasOwnProperty(i)) {
                checked.indexOf(this.nodeMap[i]['data'][this.identifyKey]) !== -1 && trulyChecked.push(i) //根据identifyKey转换传入的属性为对应的 TREE_NODE_ID 
            }
        }
        if (JSON.stringify(trulyChecked) == JSON.stringify(this.checked)) return // 因为这个操作会触发checked改变，调用组件的父组件可能会重新计算defaultChecked再次传入store,防止TREE_NODE_ID 到 无限循环 
        this.checked = trulyChecked
    }
    setOpened(opened) {
        this.opened = [this.rootPNodeId, ...opened] //根节点默认打开
    }
    static createNode(list, pNodeMap, nodeMap, pNodeId) {
        for (var i = 0; i < list.length; i++) {
            var node = new Node(list[i])
            pNodeMap[pNodeId].push(node[TREE_NODE_ID])
            nodeMap[node[TREE_NODE_ID]] = node
            node.setParent(pNodeId)
            if (node.data.children) {
                pNodeMap[node[TREE_NODE_ID]] = []
                node.setAsParent()
                Store.createNode(node.data.children, pNodeMap, nodeMap, node[TREE_NODE_ID])
            }
        }
    }
}

class Node {
    constructor(data) {
        this.data = data
        this._definePrivateProperty(TREE_NODE_ID, uid(TREE_NODE_ID))
    }
    setAsParent() {
        this._definePrivateProperty('isParent', true)
    }
    setParent(id) {
        this._definePrivateProperty('parent', id)
    }
    _definePrivateProperty(key, value) {
        Object.defineProperty(this, key, {
            value: value,
            writable: false,
            enumerable: false,
            configurable: false
        })
    }
}