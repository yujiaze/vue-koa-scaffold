import * as Koa from 'koa'
import timeoutMdr from './lib/middlewares/timeout'
import views from 'koa-views'
import path from 'path'
import router from './routes'
import send from 'koa-send'
import * as bodyParserMiddleware from 'koa-bodyparser'
import proxyMdr from './lib/middlewares/proxy'

var app = new Koa()

// Must be used before any router is used

app.use(views(path.join(__dirname, '..', '/build'), {
    // map: {
    //     html: 'pug'
    // },
    // extension: 'pug'
}))

app.use(timeoutMdr)

app.use(bodyParserMiddleware({
    formLimit: '1mb' //prevent payload too large 413
}))

app.use(router.routes())

app.use(function* (next) {
    if (this.path.match(/build/)) {
        yield send(this, this.path, { root: path.join(__dirname, '..') });
    } else {
        yield next
    }
})

app.use(proxyMdr)

app.listen(8888)

