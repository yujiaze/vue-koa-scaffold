<template>
    <div style="display:none">
    </div>
</template>

<script>
    export default {
        name: "Column",
        props: {
            label: String,
            prop: [String, Array],
            type: String
        },
        mounted() {
            this.$parent.columnList.push({
                label: this.label,
                prop: this.prop,
                type: this.type,
                slot: this.$scopedSlots.default
            })
        }
    }
</script>

<style scoped lang="postcss">
    
</style>
