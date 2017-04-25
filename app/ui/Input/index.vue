<template>
    <div className="ui-input">
        <label v-if="label" :for="uid">{{label}}</label>
        <input :value="value" :id="uid" :type="type" :placeholder="placeholder" :maxlength="maxLength" @input="handleInput" @change="handleChange" />
        <span v-show="maxLength">还可以输入{{remain}}个字符</span>
        <span v-show="error">{{error}}</span>
    </div>
</template>

<script>
    import Vue from 'vue'
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
                value: this.initial || ''
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
    
</style>

