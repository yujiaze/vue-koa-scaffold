<template>
    <div>
        <div class="ui-image-uploader">
            <img v-if="src" :src="src" alt="" />
            <div class="ui-image-uploader-empty" v-else @click="handleUploadStart">
                <i class="kz-e-add"></i> 上传图片
            </div>
            <span @click="handleUploadStart" v-if="src">替换图片</span>
            <input style="display:none" ref="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="handleUpload" />
        </div>
        <p class="ui-image-hint" v-show="hint">{{hint}}</p>
    </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import api from '../../api.js'
import ImageCutter from '../ImageCutter'

@Component({
    props: {
        initial: String,
        hint: String,
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        }
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
        let _img = new Image()
        let that = this
        _img.onload = () => {
            if (_img.width >= that.width && _img.height >= that.height) {
                formData.append('file', file)
                api.uploadImage(formData).then(
                    url => {
                        that.src = url
                        that.$emit("ui-image-uploader-done", url)
                    },
                    err => console.log(err)
                )
            } else {
                $notify({
                    type: 'error',
                    title: '图片分辨率不满足要求',
                    duration: 3000
                })
            }
            _img = null
            e.target.value = null
            e.target.files = null
        }
        _img.src = URL.createObjectURL(file)

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
            cursor: pointer;
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

    .ui-image-hint{
        font-size: 12px;
        color: #f40;
        background: #fff;
        padding-right: 20px;
        text-align: center;
    }
</style>
