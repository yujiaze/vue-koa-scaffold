import VueRouter from 'vue-router'
import IndexManage from '../components/IndexManage'
import UwpMessage from '../components/UwpMessage'

const FooComponent = {
    render() {
        return <div>{'you\'re visiting ' + this.$route.path}</div>
    }
}


const routes = [
    { path: '/page-manage/index', component: IndexManage },
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