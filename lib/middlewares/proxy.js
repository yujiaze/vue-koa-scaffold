import request from 'request'
import config from '../../conf/config'
import BaseError from '../error'

var hyperRequest = request.defaults({
    pool: { maxSockets: 100 }
})

const create_opt = ctx => {
    const default_opt = {
        headers: {
            'Content-Type': ctx.headers['content-type'],
            Host: config.proxy_url.replace(/https?:\/\//g, ''),
            Referer: config.proxy_url,
            cookie: ctx.headers['cookie']
        },
        encoding: null, //for image return as Buffer
        timeout: 4000,
        uri: config.proxy_url + ctx.path + ctx.search
    }
    return Object.assign(default_opt, parse_body(ctx), { method: ctx.request.method })
}




const parse_body = ctx => {
    var body = ctx.request.body
    if (body === undefined || body === null) {
        return { body: undefined }
    }
    var content_type = ctx.request.header['content-type']

    if (!Buffer.isBuffer(body) && typeof body !== 'string') {
        if (content_type && content_type.indexOf('form') !== -1) {
            return { form: body }
        } else {
            body = JSON.stringify(body)
            return { body: body }
        }
    }
    return { body: body }
}


export const request_promise = opt => new Promise(
    (resolve, reject) => {
        hyperRequest(
            opt,
            (err, response, body) => {
                if (err) return reject(err)
                if (response.statusCode == 200) return resolve(response)
                reject(new BaseError(response.body, response.statusCode))
            }
        )
    }
)

export default function* (next) {
    var result = yield request_promise(create_opt(this))
    this.type = result.headers['content-type']
    this.set({
        ...result.headers
    })
    this.body = result.body
    yield next
}