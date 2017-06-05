import Vue from 'vue'

/*
    @params:{
        group: String|Number //用于判断是否可以在多个列表间相互拖拽，
        sort = true: boolean //是否允许内部排序
        put = true: true|false|["foo", "bar"] //是否允许其他sortable拖入
        pull = true: boolean //是否允许拖出
        onChange: (newIndex, oldIndex, from, to) => void
        handler: String //用于拖拽的元素，有嵌套拖拽时应该使用
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

function shouldReturn(e, group, sort, put, pull) {
    if (!_currentDraggingDOM) return true
    if (!_currentDraggingDOM._sortable_parent_._sortable_pull_ && e.currentTarget.parentNode != _currentDraggingDOM._sortable_parent_) return true //如果不允许拖出
    if ((put == false && _currentDraggingDOM._sortable_parent_ != e.currentTarget.parentNode) || (put.indexOf && put.indexOf(_currentDraggingDOM.parentNode._sortable_group_)) == -1) return true //如果不允许拖入或者不在允许拖入的列表中
    if (!sort && e.currentTarget.parentNode == _currentDraggingDOM._sortable_parent_) return true //如果不允许内部排序
    return false
}

function onMouseDown(e, handler) {
    e.currentTarget.draggable = 'true'
    if (handler && e.currentTarget.querySelector(handler) != e.target && !e.currentTarget.querySelector(handler).contains(e.target)) {
        return e.currentTarget.removeAttribute('draggable')
    }
}

function onDragStart(e, group, sort, put, pull) {
    e.stopPropagation()
    _currentDraggingDOM = e.currentTarget
    _currentDraggingDOM.style.opacity = '0.5'
    _currentDraggingDOM._sortable_parent_ = e.currentTarget.parentNode
    _currentDraggingDOM.ondragstart = noop
    _currentDraggingDOM.ondragover = noop
    _currentDraggingDOM.ondragleave = noop
    _currentDraggingDOM.ondragenter = noop
    _currentDraggingDOM.ondrop = noop
    _currentDraggingDOM._sortable_index_ = getIndex(_currentDraggingDOM)
}

function onDragEnter(e, group, sort, put, pull) {
    e.stopPropagation()
    if (shouldReturn(e, group, sort, put, pull)) return
    _insertInfo.dom = e.currentTarget
}


function onDragOver(e, group, sort, put, pull) {
    e.stopPropagation()
    if (shouldReturn(e, group, sort, put, pull)) return
    e.preventDefault() //调用了这个方法才会有接下来的事件
    var box = e.currentTarget.getBoundingClientRect(),
        /* eslint-disable no-unused-vars */
        offsetX = e.clientX - box.left,
        /* eslint-enable no-unused-vars */
        offsetY = e.clientY - box.top,
        height = e.currentTarget.offsetHeight
    var _insertPos = 'beforebegin'
    if (offsetY < height / 2) {
        _insertPos = 'afterend'
    }
    e.currentTarget.insertAdjacentElement(_insertPos, _currentDraggingDOM)
    _insertInfo.pos = _insertPos
}

function onDragLeave(e) {
    // _insertInfo.dom = null //离开的时候清除信息
}

// function onDrop(e, parent) {
//     if (_insertInfo.dom) {
//         _currentDraggingDOM._sortable_parent_ != e.target.parentNode && _currentDraggingDOM._sortable_parent_.removeChild(_currentDraggingDOM)
//     }
//     console.log('drop')
// }

function onDragEnd(e, onChange, group, sort, put, pull) {
    e.stopPropagation()
    if (_insertInfo.dom) {
        group = _insertInfo.dom.parentNode._sortable_group_
        sort = _insertInfo.dom.parentNode._sortable_sort_
        put = _insertInfo.dom.parentNode._sortable_put_
        pull = _insertInfo.dom.parentNode._sortable_pull_
    }

    _currentDraggingDOM.style.opacity = '1'
    _currentDraggingDOM.ondragstart = e => onDragStart(e, group, sort, put, pull)
    _currentDraggingDOM.ondragover = e => onDragOver(e, group, sort, put, pull)
    _currentDraggingDOM.ondragleave = e => onDragLeave(e, group, sort, put, pull)
    _currentDraggingDOM.ondragenter = e => onDragEnter(e, group, sort, put, pull)
    // _currentDraggingDOM.ondrop = onDrop
    if (_currentDraggingDOM._sortable_index_ != getIndex(_currentDraggingDOM) || _currentDraggingDOM._sortable_parent_ != _currentDraggingDOM.parentNode) {
        onChange(getIndex(_currentDraggingDOM), _currentDraggingDOM._sortable_index_, _currentDraggingDOM._sortable_parent_._sortable_group_, _currentDraggingDOM.parentNode._sortable_group_)
    }
    _currentDraggingDOM = null
}
Vue.directive('sortable', {
    bind(el, binding, vnode, oldVnode) {
        let { onChange, group = '', sort = true, put = true, pull = true, handler } = binding.value
        el._sortable_group_ = group
        el._sortable_sort_ = sort
        el._sortable_put_ = put
        el._sortable_pull_ = pull
        ;[].forEach.call(el.children, child => {
            if (handler) {
                var _onMouseDown = child.onmousedown || noop
                child.onmousedown = (e, ...args) => {
                    _onMouseDown(e, args)
                    onMouseDown(e, handler)
                }
            }
            child.draggable = true
            child.ondragstart = e => onDragStart(e, group, sort, put, pull)
            child.ondragover = e => onDragOver(e, group, sort, put, pull)
            child.ondragleave = e => onDragLeave(e, group, sort, put, pull)
            child.ondragenter = e => onDragEnter(e, group, sort, put, pull)
            // child.ondrop = e => onDrop(e, group, sort, put, pull)
            child.ondragend = e => onDragEnd(e, onChange, group, sort, put, pull)
        })
    },
    inserted(el) {

    },
    update(el, binding) {
    },
    componentUpdated(el, binding) {
        let { onChange, group = '', sort = true, put = true, pull = true, handler } = binding.value
        el._sortable_group_ = group
        el._sortable_sort_ = sort
        el._sortable_put_ = put
        el._sortable_pull_ = pull
        ;[].forEach.call(el.children, child => {
            if (handler) {
                var _onMouseDown = child.onmousedown || noop
                child.onmousedown = (e, ...args) => {
                    _onMouseDown(e, args)
                    onMouseDown(e, handler)
                }
            }
            child.draggable = true
            child.ondragstart = e => onDragStart(e, group, sort, put, pull)
            child.ondragover = e => onDragOver(e, group, sort, put, pull)
            child.ondragleave = e => onDragLeave(e, group, sort, put, pull)
            child.ondragenter = e => onDragEnter(e, group, sort, put, pull)
            // child.ondrop = e => onDrop(e, group, sort, put, pull)
            child.ondragend = e => onDragEnd(e, onChange, group, sort, put, pull)
        })
    },
    unbind() {

    }
})