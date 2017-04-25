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
            this.$parent.tabList.push(this.label)
        }
    }
</script>
