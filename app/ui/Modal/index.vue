<template>
    <div class="ui-modal">
        <div class="ui-modal-content">
            <div class="ui-modal-title">
                <span>{{title}}</span>
                <span class="ui-modal-close" @click="remove"></span>
            </div>
            <div class="ui-modal-main">
                <slot></slot>
            </div>
            <div class="ui-modal-bottom">
                <button class="ui-button" @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    
    @Component({
        props: {
            title: String
        }
    })
    export default class Modal extends Vue {
        test = 1
        constructor() {
            super()
        }
        remove() {
            this.$emit('ui-modal-close')
        }
        confirm() {
            this.$emit('ui-modal-confirm')
        }
        cancel() {
            this.$emit('ui-modal-cancel')
        }
        beforeDestroy() {}
    }
</script>

<style scoped lang="postcss">
    .ui-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(0, 0, 0, .4)
    }
    
    .ui-modal-content {
        width: 800px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }
    
    .ui-modal-title {
        width: calc(100% - 40px);
        height: 18px;
        padding: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #333;
    }
    
    .ui-modal-close {
        width: 16px;
        height: 20px;
        display: block;
        position: relative;
        float: right;
        top: -2px;
        &::before {
            content: ' ';
            background: #999;
            width: 16px;
            height: 2px;
            position: absolute;
            transform: rotate(-45deg);
            top: 10px;
        }
        &::after {
            content: ' ';
            background: #999;
            width: 16px;
            height: 2px;
            position: absolute;
            transform: rotate(45deg);
            top: 10px;
        }
    }
    
    .ui-modal-bottom {
        padding: 20px;
        text-align: right;
    }
</style>