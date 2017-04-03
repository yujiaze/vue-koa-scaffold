import Vue from 'vue'

/*
    @params:{
        group: String //用于判断是否可以在多个列表间相互拖拽，
        put: boolean //是否允许其他sortable拖入
        pull: boolean //是否允许拖出
        onChange: (newIndex, oldIndex) => void


        dragstart(memory DragDOM) -> dragenter(memory DropDOM) -> dragOver(insert DragDOM on correct place) -> afterInsert(triggers dragleave)
        -> DragDOM events handle all noop(prevent trigger events itself)-> dragenter -> dragover(insert DragDOM again, the DragDOM inserted before is **the same instance** with now)
    } 
*/


let _currentDraggingDOM = null
let _insertInfo = {
    dom: null,
    pos: ''
}

function getIndex(el) {
    var childs = el.parentNode.children
    for (var i = 0; i < childs.length; i++) {
        if (childs[i] == el)
            return i
    }
}

function noop() {

}

function onDragStart(e, parent) {
    _currentDraggingDOM = e.currentTarget
    _currentDraggingDOM.style.opacity = '0.5'
    _currentDraggingDOM._sortable_parent_ = e.target.parentNode
    _currentDraggingDOM.ondragstart = noop
    _currentDraggingDOM.ondragover = noop
    _currentDraggingDOM.ondragleave = noop
    _currentDraggingDOM.ondragenter = noop
    _currentDraggingDOM.ondrop = noop
    _currentDraggingDOM._sortable_index_ = getIndex(_currentDraggingDOM)
}

function onDragEnter(e) {
    _insertInfo.dom = e.currentTarget
}


function onDragOver(e) {
    e.preventDefault()
    var box = e.currentTarget.getBoundingClientRect(),
        offsetX = e.clientX - box.left,
        offsetY = e.clientY - box.top,
        height = e.currentTarget.offsetHeight;
    var _insertPos = 'beforebegin'
    if (offsetY < height / 2) {
        _insertPos = 'afterend'
    }
    e.currentTarget.insertAdjacentElement(_insertPos, _currentDraggingDOM)
    _insertInfo.pos = _insertPos
}

function onDragLeave(e) {
    _insertInfo.dom = null //离开的时候清除信息
}

function onDrop(e, parent) {
    if (_insertInfo.dom) {
        _currentDraggingDOM._sortable_parent_ != e.target.parentNode && _currentDraggingDOM._sortable_parent_.removeChild(_currentDraggingDOM)
    }
}

function onDragEnd(e, onChange) {
    _currentDraggingDOM.style.opacity = '1'
    _currentDraggingDOM.ondragstart = onDragStart
    _currentDraggingDOM.ondragover = onDragOver
    _currentDraggingDOM.ondragleave = onDragLeave
    _currentDraggingDOM.ondragenter = onDragEnter
    _currentDraggingDOM.ondrop = onDrop
    if (_currentDraggingDOM._sortable_index_ != getIndex(_currentDraggingDOM) || _currentDraggingDOM._sortable_parent_ != _currentDraggingDOM.parentNode) {
        onChange(getIndex(_currentDraggingDOM), _currentDraggingDOM._sortable_index_)
    }
}
Vue.directive('sortable', {
    bind(el, binding, vnode, oldVnode) {
        let { onChange } = binding.value;
        [].forEach.call(el.children, e => {
            e.draggable = true
            e.ondragstart = onDragStart
            e.ondragover = onDragOver
            e.ondragleave = onDragLeave
            e.ondragenter = onDragEnter
            e.ondrop = onDrop
            e.ondragend = e => onDragEnd(e, onChange)
        })
    },
    inserted(el) {

    },
    update() {

    },
    componentUpdated() {

    },
    unbind() {

    }
})