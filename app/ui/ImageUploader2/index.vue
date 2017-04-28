<template>
    <div class="ui-image-uploader">
        <img v-if="src" :src="src" alt="" />
        <div class="ui-image-uploader-empty" v-else @click="handleUploadStart">
            <i class="kz-e-add"></i> 上传图片
        </div>
        <span @click="handleUploadStart" v-if="src">替换图片</span>
        <input style="display:none" ref="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="handleUpload" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import api from '../../api.js'
    
    @Component({
        props: {
            initial: String
        }
    })
    export default class ImageUploader extends Vue {
        name = 'ImageUploader'
        src = this.initial || ''
        handleUploadStart() {
            this.$refs['file'].click()
        }
        handleUpload(e) {
            let file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)
            api.uploadImage(formData).then(
                url => {
                    this.src = url
                    this.$emit("ui-image-uploader-done", url)
                },
                err => console.log(err)
            )
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
        background: #e5e5e5;
        text-align: center;
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
