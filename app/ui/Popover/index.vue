<template>
    <div class="popover">
        <div class="ui-popover-button" @mouseover="popoverShow=true" @mouseout="popoverShow=false">
            <slot name="button-hover"></slot>
        </div>
        <div class="ui-popover-button" @click="openPopover">
            <slot name="button-click"></slot>
        </div>
        <div class="ui-popover" v-show="popoverShow">
            <div class="ui-popover-arrow">
                <i class="kz-e-page_plugin-up"></i>
            </div>
            <slot name="nest-content"></slot>
        </div>
    </div>
</template>
<script>
    const Popover = {
        name: 'Popover',
        data() {
            return {
                popoverShow: false
            }
        },
        methods: {
            openPopover(e) {
                this.popoverShow = !this.popoverShow
                e.stopPropagation();
                document.addEventListener('click', () => { this.popoverShow = false }, false)
            }
        }
    }
    export default Popover
</script>
<style scoped lang="postcss">
    .popover{
        display: inline-block;
        position: relative;
    }
    .ui-popover-button{
        display: inline-block;
    }
    .ui-popover-arrow{
        // bottom: -6px;
        top: -16px;
        left: 50%;
        margin-right: 3px;
        border-top-color: #d1dbe5;
        border-bottom-width: 0;
        border-width: 6px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        color: #d1dbe5;
    }
    .ui-popover-title{
        color: #1f2d3d;
        font-size: 13px;
        line-height: 1;
        margin-bottom: 9px;
    }
    .ui-popover{
        margin-top: 10px;
        text-align: center;
        margin-bottom: 12px;
        background: #fff;
        min-width: 150px;
        border-radius: 2px;
        border: 1px solid #d1dbe5;
        padding: 10px;
        font-size: 12px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        position: absolute;
        // top: -35px;
        left: -55px;
        transform-origin: center top 0px;
        z-index: 2000;
    }
    .ui-popover-arrow:after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
        content: " ";
        border-width: 6px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
</style>