<template>
    <div class="">
        <label v-if="label" :for="uid">{{label}}</label>
        <input class="ui-input" :value="value" :id="uid" :type="type" :placeholder="placeholder" :maxlength="maxLength" @input="handleInput" @change="handleChange" />
        <p class="ui-input-hint" v-show="maxLength" v-if="remain>=0">还可以输入{{remain}}个字符</p>
        <p class="ui-input-hint exceed" v-if="remain<0" v-show="maxLength">已超出{{0-remain}}个字符</p>
        <span v-show="error">{{error}}</span>
    </div>
</template>

<script>
import uid from '../../utils/uuid.js'

let uidPrefix = 'ui-input'

const Input = {
    name: 'Input',
    props: {
        type: {
            default: 'text',
            type: String
        },
        maxLength: Number,
        validator: {
            type: Function,
            default: (value) => ({
                valid: true,
                msg: ''
            })
        }, //接受this.value作为参数，返回 { valid : Boolean, msg: String }
        label: String,
        initial: [String, Number],
        placeholder: String
    },
    data() {
        return {
            uid: uid(uidPrefix),
            value: typeof this.initial === 'undefined' ? '' : this.initial
         }
    },
    watch: {
        initial() {
            this.value = this.initial
        }
    },
    computed: {
        remain() {
            return this.maxLength && (this.maxLength - this.value.length)
        },
        error() {
            let result = this.validator(this.value)
            if (!result.valid) {
                return result.msg || ''
            } else {
                return null
            }
        }
    },
    methods: {
        handleInput(e) {
            this.value = e.target.value
            if (this.remain <= 0) return
            this.$emit('ui-input-oninput', this.value)
        },
        handleChange(e) {
            this.$emit('ui-input-onchange', this.value)
        }
    }
}
export default Input
</script>

<style scoped lang="postcss">
    .ui-input-hint{
        color: #008000;
        font-size: 12px;
        text-align: right;
        margin-top: 0;
    }
    .exceed{
        color: #f40;
    }
    label{
        float: left;
        height: 30px;
        line-height: 30px;
        padding-right: 6px;
    }
</style>

