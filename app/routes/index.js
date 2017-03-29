import VueRouter from 'vue-router'

const FooComponent = {
    render() {
        return <div>{'you\'re visiting' + this.$route.path}</div>
    }
}


const routes = [
    { path: '/page-manage/index', component: FooComponent },
    { path: '/page-manage/channel', component: FooComponent },
    { path: '/page-manage/topic', component: FooComponent },
]


const router = new VueRouter({
    base: '/v1/',
    mode: 'history',
    routes
})

export default router