import Koa from 'koa'
import timeoutMdr from './lib/middlewares/timeout'
import views from 'koa-views'
import path from 'path'
import router from './routes'
import send from 'koa-send'
import bodyParser from 'koa-better-body'
import proxyMdr from './lib/middlewares/proxy'
import config from './conf/config'
import logger from './lib/logger'

var app = new Koa()

// Must be used before any router is used
app.use(views(path.join(__dirname, '..', '/build'), {
    // map: {
    //     html: 'pug'
    // },
    // extension: 'pug'
}))

app.use(function* (next) {
    try {
        yield next
    } catch (e) {
        logger.error(e)
        this.status = e.status || 500
        this.body = e.message
    }
})

app.use(timeoutMdr)

// global information for middlewares
app.use(function* (next) {
    this.state.config = config
    yield next
})

app.use(bodyParser({}))

app.use(router.routes())

app.use(function* (next) {
    if (this.path.match(/build/)) {
        yield send(this, this.path, { root: path.join(__dirname, '..') });
    } else {
        yield next
    }
})

app.use(proxyMdr)

var argv = require('optimist').argv

var port = argv.port

app.listen(port || 8888)

