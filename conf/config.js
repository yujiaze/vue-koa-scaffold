const config = {
    base: {
        LOG_LEVEL: 'debug',
    },
    dev: {
        LOG_LEVEL: 'debug',
        proxy_url: 'http://baidu.com'
    },
    test: {
        LOG_LEVEL: 'info'
    },
    production: {
        LOG_LEVEL: 'info'
    }
}


var env = process.env.NODE_ENV || 'dev'

export default Object.assign({}, config['base'], config[env])