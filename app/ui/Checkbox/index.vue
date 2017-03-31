<template>
    <div class="ui-checkbox">
        <div class="ui-checkbox-item">
            <input :id="id"
                   type="checkbox"
                   ref="checkbox" />
            <label :for="id"
                   @click="toggle">
                {{title}}
            </label>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import Component from 'vue-class-component'


let _uid = 0

const _uuid = () => "ui-checkbox-" + (_uid++)

@Component({
    props: {
        title: String
    }
})
export default class Checkbox extends Vue {
    name = 'Checkbox'
    id = _uuid()
    constructor() {
        super()
    }
    toggle(e) {
        this.$emit("ui-checkbox-toggle", !this.$refs['checkbox'].checked) //when label click trigger , the checkbox doesn't trigger click yet
    }
}


</script>

<style scoped lang="postcss">
.ui-checkbox {
    .ui-checkbox-item {
        display: inline-block;
        >label {
            margin-left: 5px;
        }
        >input[type='checkbox'] {
            width: 0;
            height: 0;
            display: none;
        }
        >input[type='checkbox']:checked+label {
            &::before {
                margin-right: 5px;
                content: ' ';
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAALGPC/xhBQAAAMRJREFUKBVjZJh5awsDA4M3EBMDtjICNfwnRiVMDROMQSxNUEOcKi9DphY/3DwWOAsLI12Tj2G6jRgDIyMjw+lXPxjOvPnJALchRYOPIUqFF64NWfHCW58YzgEVgwDYBhMRdobZduIM////Z+BgZmRgYWSAmwxSnHTgJcM/qFHgUAKqYVjoIM4QrcoH1gSSAzkDXTFIHGzDX2DAxgNNAQGQJhDAphgkDvc0TNMPIOMP0P6sI6/gzgAphAGyIm4rTDcR9FYAK8lGrKKQBNgAAAAASUVORK5CYII=');
                width: 12px;
                height: 12px;
                display: inline-block;
                top: 2px;
                position: relative;
            }
        }
        >input[type='checkbox']:not(:checked)+label {
            &::before {
                top: 2px;
                position: relative;
                margin-right: 5px;
                display: inline-block;
                content: ' ';
                color: #fff;
                background: #fff;
                width: 10px;
                border: 1px solid #E5E5E5;
                height: 10px;
            }
        }
    }
}
</style>