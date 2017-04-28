const promisify = (url, type = 'GET', data = {}, ...args) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            type,
            data,
            ...args[0],
            success(data) {
                resolve(data)
            },
            error(e, res) {
                reject(JSON.parse(e.responseText))
            }
        })
    })
}

export { promisify }

const api = {
    //登录
    [TYPES.USER.LOGIN]: (passport, password) => promisify('/login', 'POST', { passport, password }),
    //登出
    [TYPES.USER.LOGOUT]: () => promisify('/logout')
}

export default api