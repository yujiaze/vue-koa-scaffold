<template>
    <tab>
        <tab-item label="123">
            <h5>223</h5>
            <ul v-sortable="{onChange:onChange}">
                <li><h3><a>yu</a></h3></li>
                <li><h3><a>jia</a></h3></li>
                <li>ze</li>
            </ul>
        </tab-item>
    </tab>
</template>


<script>
    import {
        Tab
    } from '../../ui'
    
    
    export default {
        components: {
            'tab': Tab,
            'tab-item': Tab.TabItem
        },
        methods: {
            onChange: (newIndex, oldIndex) => console.log(newIndex, oldIndex)
        }
    }
</script>