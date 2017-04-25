import api from '../../api'

export default {
    state: {
        userInfo: window._user_info || {}
    },
    mutations: {
        [TYPES.USER.SET_USER_INFO](state, { userInfo }) {
            state.userInfo = userInfo
        }
    },
    actions: {
        login(ctx, { passport, password, callback }) {
            api[TYPES.USER.LOGIN](passport, password)
                .then(
                data => callback(null, data),
                err => callback(err)
                )
        },
        logout(ctx, { callback }) {
            api[TYPES.USER.LOGOUT]()
                .then(
                data => callback(null, data),
                err => callback(err)
                )
        },
        setUserInfo(ctx, { userInfo }) {
            ctx.commit(TYPES.USER.SET_USER_INFO, { userInfo })
        }
    },
    getters: {

    }
}
