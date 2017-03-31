import Router from 'koa-router'

const router = new Router()

router.get('/', function* (next) {
    yield this.render('index.html')
})

router.get(
    /page-manage\/(index|topic|channel)/,
    function* (next) {
        yield this.render('index.html')
    }
)


router.get(
        /uwp-push\/(message|history)/,
    function* (next) {
        yield this.render('index.html')
    }
)

export default router
