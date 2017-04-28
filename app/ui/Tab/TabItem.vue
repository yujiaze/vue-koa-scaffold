<template>
    <div v-show="show">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabItem",
        props: {
            label: String
        },
        computed: {
            show() {
                return this.$parent && this.$parent.cur === this.$parent.tabList.indexOf(this.label)
            }
        },
        created() {
            if (this.$parent.tabList.indexOf(this.label) === -1) {
                this.$parent.tabList.push(this.label)
            }
        },
        beforeDestroy() {
            this.$parent.tabList.splice(this.$parent.tabList.indexOf(this.label), 1)
        }
    }
</script>
