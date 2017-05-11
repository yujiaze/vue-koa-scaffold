<template>
    <div class="ui-radio-group">
        <div v-for="(item,idx) in list" :key="idx">
            <input type="radio" :id="uid + idx" v-model="picked" :value="item.value" @change="handleCheck" />
            <label :for="uid + idx">{{item.label}}</label>
        </div>
    </div>
</template>

<script>
import uid from '../../utils/uuid.js'

const RadioGroup = {
    name: 'RadioGroup',
    props: {
        list: Array,
        defaultPicked: Number
    },
    data() {
        return {
            picked: this.defaultPicked || null,
            uid: uid('ui_radio')
        }
    },
    methods: {
        handleCheck() {
            this.$emit('ui-radio-group-change', this.picked)
        }
    }
}

export default RadioGroup
</script>

<style scoped lang="postcss">
  
</style>