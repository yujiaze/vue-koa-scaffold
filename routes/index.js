import Router from 'koa-router'
import view from './view'
import api from './api'

const router = new Router({
    prefix: '/v1'
})

router.use('/', view.routes())
router.use('/api', api.routes())

export default router