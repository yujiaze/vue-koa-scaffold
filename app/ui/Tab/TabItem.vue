<template>
    <div v-show="show">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabItem",
        props: {
            label: String,
            value: [String, Number, Object]
        },
        computed: {
            show() {
                return this.$parent && this.$parent.$data.cur === this.$parent.tabList.indexOf(this.label)
            }
        },
        created() {
            if (this.$parent.$data.tabList.indexOf(this.label) === -1) {
                this.$parent.$data.tabList.push(this.label)
                this.value && this.$parent.$data.valueList.push(this.value)
            }
        },
        beforeDestroy() {
            this.$parent.$data.tabList.splice(this.$parent.$data.tabList.indexOf(this.label), 1)
            this.value && this.$parent.$data.valueList.splice(this.$parent.$data.valueList.indexOf(this.value), 1)
            this.$parent.$data.cur = 0
        }
    }
</script>
