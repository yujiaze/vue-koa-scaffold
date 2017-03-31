<template>
    <form ref="form" method="post" enctype="multipart/form-data" :target="uuid" :action="action">
        <input @change="handleUpload" ref="input" type="file" :name="filename" :accept="accept" />
        <iframe ref="iframe" :name="uuid"></iframe>
    </form>
</template>

<script>
    let _uid = 0
    
    const _uuid = () => 'iframe-uploader-' + _uid
    
    export default {
        data() {
            return {
                uuid: _uuid()
            }
        },
        props: {
            accept: {
                type: String,
                default: 'image/*'
            },
            action: String,
            filename: String,
            'max-size': {
                type: Number,
                default: 4194304
            }
        },
        mounted() {
            this.$emit('ui-uploader-ready', () => this.$refs['input'].click())
        },
        methods: {
            handleUpload(e) {
                if (e.target.files && e.target.files[0].length > this['max-size']) {
                    return alert('请选择小于' + Math.floor(this['max-size'] / 1048576) + "M的文件!")
                }
                this.$refs['form'].submit()
                e.target.value = null
                this.$once("upload-completed", data => this.$emit("ui-uploader-done", data))
                setTimeout(() => this.iframeReload(), 1000)
            },
            iframeReload() {
                try {
                    if (this.$refs['iframe'].contentDocument.readyState === 'complete') {
                        this.$emit("upload-completed", (this.$refs['iframe'].contentDocument.body.innerHTML))
                    } else {
                        setTimeout(() => this.iframeReload(), 0)
                    }
                } catch (e) {
                    console.log(e)
                }
    
            }
        }
    }
</script>

<style>
    form {
        display: none;
    }
</style>