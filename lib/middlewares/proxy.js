import * as request from 'request'
import config from '../../conf/config'

const create_opt = ctx => {
    const default_opt = {
        headers: {
            'Content-Type': ctx.request.headers['content-type'],
            Host: config.proxy_url.replace(/https?:\/\//g, ''),
            Referer: config.proxy_url

        },
        encoding: null, //for image return as Buffer
        timeout: 8000,
        jar: true
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


export const request_promise = (url, opt) => new Promise(
    (resolve, reject) => {
        console.log(url, opt)
        request(
            url,
            opt,
            (err, response, body) => (!err && response.statusCode == 200) ? resolve(response) : reject(err)
        )
    }
)

export default function* (next) {
    var proxy_url
    if (this.path.match(/proxy/)) {
        proxy_url = config.proxy_url + this.path.replace(/proxy\//g, '') + this.search
        var result = yield request_promise(proxy_url, create_opt(this))
        this.type = result.headers['content-type']
        this.body = result.body
    }
    yield next
}