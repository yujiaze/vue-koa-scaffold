<template>
    <div class="ui-image-uploader">
        <img v-if="src" :src="src" alt="" />
        <div class="ui-image-uploader-empty" v-else @click="handleUpload">
            <i class="kz-e-add"></i> 上传图片
        </div>
        <span @click="handleUpload" v-if="src">替换图片</span>
        <uploader :action="url" :filename="imagename" @ui-uploader-ready="handleUploaderReady" @ui-uploader-done="handleUploadDone" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Uploader from '../Uploader'
    
    @Component({
        props: {
            initial: String,
            url: String,
            imagename: String
        },
        computed: {
            src() {
                return this.initial
            }
        },
        components: {
            'uploader': Uploader
        }
    })
    export default class ImageUploader extends Vue {
        name = 'ImageUploader'
        ready = false
        handleUpload() {
            if (!this.ready) return
            this.ready()
        }
        handleUploaderReady(func) {
            this.ready = func
        }
        handleUploadDone(data) {
            this.$emit("ui-image-uploader-done", data)
        }
    }
</script>

<style scoped lang="postcss">
    .ui-image-uploader-empty {
        height: 100px;
        color: #707070;
        background: #EFF2F7;
        text-align: center;
        font-size: 16px;
        padding-top: 50px;
        .kz-e-add {
            display: block;
            height: 25px;
        }
    }
    
    .ui-image-uploader {
        position: relative;
        >img {
            max-width: 100%;
            max-height: 100%;
        }
        &:hover {
            >span {
                display: block;
            }
        }
        >span {
            display: none;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: #20a0ff;
            color: #fff;
            text-align: center;
            cursor: default;
        }
    }
</style>
