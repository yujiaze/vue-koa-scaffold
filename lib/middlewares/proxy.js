import request from 'request'
import config from '../../conf/config'
import BaseError from '../error'
import logger from '../logger'
import fs from 'fs'

var hyperRequest = request.defaults({
    pool: { maxSockets: 100 }
})

const create_opt = ctx => {
    const default_opt = {
        headers: {
            'content-type': ctx.headers['content-type'],
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
    var content_type = ctx.request.header['content-type']
    if (content_type && content_type.match(/multipart\/form-data/)) {
        var formData = {}
        try {
            for (var key in ctx.request.fields) {
                formData[key] = fs.createReadStream(ctx.request.files[0].path)
            }
        } catch (e) {
            logger.error(e)
        }
        return { formData: formData }
    }
    if (ctx.request.body) { //is buffer or string
        return { body: ctx.request.body }
    }
    if (ctx.request.fields) {
        if (content_type && content_type.indexOf('form') !== -1) {
            return { form: ctx.request.fields }
        } else {
            return { body: JSON.stringify(ctx.request.fields) }
        }
    }
    return { body: undefined }
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