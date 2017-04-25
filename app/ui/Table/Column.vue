<template>
    <div style="display:none">
    </div>
</template>

<script>
    export default {
        name: "Column",
        props: {
            label: String,
            prop: [String, Array]
        },
        mounted() {
            this.$parent.columnList.push({
                label: this.label,
                prop: this.prop,
                slot: this.$scopedSlots.default
            })
        }
    }
</script>

<style scoped lang="postcss">
    
</style>
