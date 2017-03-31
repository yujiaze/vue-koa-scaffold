import VueRouter from 'vue-router'
import UwpMessage from '../components/UwpMessage'

const FooComponent = {
    render() {
        return <div>{'you\'re visiting ' + this.$route.path}</div>
    }
}


const routes = [
    { path: '/page-manage/index', component: FooComponent },
    { path: '/page-manage/channel', component: FooComponent },
    { path: '/page-manage/topic', component: FooComponent },
    { path: '/uwp-push/message', component: UwpMessage }
]


const router = new VueRouter({
    base: '/v1/',
    mode: 'history',
    routes
})

export default router