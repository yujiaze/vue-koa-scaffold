<script lang="babel">
    import ImageUploader2 from '../ImageUploader2'
    import Input from '../Input'
    import Tab from '../Tab'
    
    const Form = {
        name: 'Form',
        data() {
            return {
                formData: {},
                throttingId: null
            }
        },
        watch: {
            formData: {
                handler(val) {
                    if(this.throttingId) window.clearTimeout(this.throttingId)
                    this.throttingId = setTimeout(() => {
                        this.onChange(this.formData)
                    }, 300)
                },
                deep: true
            }
        },
        props: {
            config: Array,
            initial: {
                type: Object,
                default: () => new Object()
            },
            onChange: Function
        },
        components: {
            'ui-input': Input,
            'image-uploader': ImageUploader2,
            'tab': Tab,
            'tab-item': Tab.TabItem
        },
        methods: {
            handleChange(value, key) {
                Vue.set(this.formData, key, value)
                if (key == 'link') this.handleParseUrl(value)
            },
            handleParseUrl(url) {
                if (!false) {
                    return
                }

            },
        },
        created() {
            this.config.forEach(widget => {
                this.initial[widget.key] && Vue.set(this.formData, widget.key, this.initial[widget.key])
            })
        },
        render(h) {
            var children = []
            var inputChildren = []
            var that = this
            this.config.forEach(widget => {
                var Comp = widget.comp
                var eventListeners = {}
                if (Comp == 'image-uploader') eventListeners['ui-image-uploader-done'] = (value) => this.handleChange(value, widget.key)
                if (Comp == 'ui-input') eventListeners['ui-input-onchange'] = (value) => this.handleChange(value, widget.key)
                var comp = h(Comp, {
                    // Component props
                    props: {
                        initial: this.formData[widget.key],
                        ...widget.opt
                    },
                    on: eventListeners
                })
                Comp == 'ui-input' ? inputChildren.push(comp) : children.push(comp)
            })
            return ( 
                <form accept-charset="utf-8" charset="utf-8" accept="utf-8" class="ui-form"> 
                    {children} 
                    <div class="ui-form-input"> 
                        {inputChildren} 
                    </div> 
                </form>
            )
        }
    
    }
    
    export default Form
</script>


<style>

</style>