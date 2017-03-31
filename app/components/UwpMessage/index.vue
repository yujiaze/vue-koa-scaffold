<template>
    <tab>
        <tab-item label="消息推送">
            <h5>Windows 10 应用消息推送</h5>
            <button class="ui-button" @click="showModal = true">新建消息</button>
        </tab-item>
        <modal title="新建消息" v-if="showModal" v-on:ui-modal-close="showModal = false" v-on:ui-modal-confirm="uwpPush">
            <div class="new-message">
                <label>文章URL</label>
                <input class="ui-input" placeholder="请填入待推送文章链接" />
                <label>标题</label>
                <input class="ui-input" />
                <label>简介</label>
                <textarea class="ui-textarea" maxlength="400" @input="handleInputDesc" />
                <span class="ui-tips">还可以输入{{remainLength}}字</span>
                <label>头图</label>
                <image-uploder :url="'request url'" :initial="pushImg" @ui-image-uploader-done="handleHeadImage" />
                <checkbox title="不使用头图，使用默认LOGO" v-on:ui-checkbox-toggle="useHeadImage" />
            </div>
        </modal>
    </tab>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    import {
        Tab,
        Modal,
        ImageUploader,
        Checkbox
    } from '../../ui/index'
    
    const TabItem = Tab.TabItem
    
    export default {
        name: 'UwpMessage',
        components: {
            'tab': Tab,
            'tab-item': TabItem,
            'modal': Modal,
            'checkbox': Checkbox,
            'image-uploder': ImageUploader
        },
        data() {
            return {
                showModal: false,
                pushTitle: "",
                pushDesc: "",
                pushImg: "",
                pushUrl: "",
                pushUseHeadImage: false
            }
        },
        computed: {
            remainLength() {
                return 400 - this.pushDesc.length
            }
        },
        methods: {
            handleInputDesc(e) {
                this.pushDesc = e.target.value
            },
            useHeadImage(bool) {
                this.pushUseHeadImage = true
            },
            uwpPush() {
                this.showModal = false
            },
            handleHeadImage(data) {
                this.pushImg = data
            }
        }
    }
</script>

<style scoped lang="postcss">
    .new-message {
        width: 100%;
        font-size: 14px;
        padding: 0 20px;
        box-sizing: border-box;
        label {
            display: inline-block;
            width: 80px;
        }
        label+input {
            width: calc(100% - 117px);
            display: inline-block;
            margin-bottom: 25px;
        }
        label+textarea,
        .ui-image-uploader {
            width: calc(100% - 117px);
            display: inline-block;
            vertical-align: top;
            margin-bottom: 10px;
            max-width: calc(100% - 117px);
        }
        .ui-tips {
            margin-right: 30px;
            margin-bottom: 25px;
        }
        .ui-image-uploader {
            width: 400px;
            margin-bottom: 25px;
        }
        .ui-checkbox {
            margin-left: 80px;
        }
    }
</style>

