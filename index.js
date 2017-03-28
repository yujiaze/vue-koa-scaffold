import * as Koa from 'koa'
import timeoutMdr from './lib/middlewares/timeout'
import views from 'koa-views'
import path from 'path'

var app = new Koa()

// Must be used before any router is used
app.use(views('./build', {
    // map: {
    //     html: 'pug'
    // },
    // extension: 'pug'
}))

import staticMdr from 'koa-static'

var send = require('koa-send');


// app.use(staticMdr(path.join(__dirname, '/build/'), {

// }))

import Router from 'koa-router'

const router = new Router()

router.get('/', function* (next) {
    yield this.render('index.html')
})


app.use(router.routes())
    .use(router.allowedMethods())

app.use(function* () {
    yield send(this, this.path, { root: __dirname });
});

app.use(timeoutMdr)

app.listen(3000)