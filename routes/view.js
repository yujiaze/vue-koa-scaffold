import Router from 'koa-router'

const router = new Router()

router.get('/', function* (next) {
    yield this.render('index.html')
})

export default router
