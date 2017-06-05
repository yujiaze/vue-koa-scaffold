<template>
    <div class="ui-image-cutter">
        <div class="ui-image-cutter-bg">
            <img ref="img" :src="src" alt="" />
            <div class="cutter" :style="style">
                <span class="e-line"></span>
                <span class="w-line"></span>
                <span class="s-line"></span>
                <span class="n-line"></span>
                <span class="ne-point"></span>
                <span class="nw-point"></span>
                <span class="se-point"></span>
                <span class="sw-point"></span>
            </div>
        </div>
        <div>
            <button class="ui-button">确定</button>
            <button class="ui-button">取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            src: String,
        },
        data() {
            return {
                style: {
                    width: null,
                    height: null,
                    left: 0,
                    top: 0
                }
            }
        },
        mounted() {
            this.width = this.$refs['img'].width
            this.height = this.$refs['img'].height
        }
    }
</script>

<style scoped lang="postcss">
    .ui-image-cutter {
        .ui-image-cutter-bg {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
            width: 500px;
            height: 500px;
            text-align: center;
            line-height: 500px;
            >img {
                max-height: 100%;
                max-width: 100%;
            }
        }
        .cutter {
            position: absolute;
        }
        .e-line {
            cursor: e-resize;
            width: 3px;
            height: 100%;
            background: #39f;
            position: absolute;
            right: 0;
            top: 0;
        }
        .w-line {
            cursor: w-resize;
            width: 3px;
            height: 100%;
            background: #39f;
            position: absolute;
            left: 0;
            top: 0;
        }
        .n-line {
            cursor: n-resize;
            width: 100%;
            height: 3px;
            background: #39f;
            position: absolute;
            left: 0;
            top: 0;
        }
        .s-line {
            cursor: n-resize;
            width: 100%;
            height: 3px;
            background: #39f;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .ne-point {
            cursor: ne-resize;
            width: 5px;
            height: 5px;
            background: #39f;
            z-index: 1;
            position: absolute;
            right: 0;
            top: 0;
        }
        .nw-point {
            cursor: nw-resize;
            width: 5px;
            height: px;
            background: #39f;
            z-index: 1;
            position: absolute;
            left: 0;
            top: 0;
        }
        .se-point {
            cursor: ne-resize;
            width: 5px;
            height: px;
            background: #39f;
            z-index: 1;
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .sw-point {
            cursor: ne-resize;
            width: 5px;
            height: px;
            background: #39f;
            z-index: 1;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }
</style>