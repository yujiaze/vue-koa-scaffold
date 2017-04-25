<template>
    <li :class="[isCur() ? 'cur' : '']" @click="change">
        {{label}}
    </li>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    
    @Component({
        props: {
            value: [String, Number, Object, Function, Array],
            label: String,
            initial: Boolean //是否设置为默认选中
        }
    })
    export default class Option extends Vue {
        constructor() {
            super()
        }
        change() {
            if (this.isCur()) return
            this.setCur({
                label: this.label,
                value: this.value
            })
        }
        created() {
            if (this.initial) {
                this.setCur({
                    label: this.label,
                    value: this.value
                })
            }
        }
        setCur(op) {
            if (this.$parent.multiple) {
                this.$parent.cur.push(op)
            } else {
                this.$parent.cur = [op]
            }
        }
        isCur() {
            var isCur = false
            var cur = this.$parent.cur
            for (let i = 0; i < cur.length; i++) {
                JSON.stringify(cur[i]) == JSON.stringify({
                    label: this.label,
                    value: this.value
                }) && (isCur = true)
            }
            return isCur
        }
    }
</script>

<style scoped lang="postcss">
    
</style>