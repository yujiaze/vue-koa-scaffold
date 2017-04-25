<template>
    <form class='login'>
        <table>
            <tr>
                <label>用户名</label>
                <input ref="passport" class="ui-input" placeholder="请输入用户名" />
            </tr>
            <tr>
                <label>密码</label>
                <input type="password" ref="password" class="ui-input" placeholder="请输入密码" />
            </tr>
            <tr>
                <button class="ui-button" @click="handleLogin">登录</button>
            </tr>
            <tr>
                <div>{{notice}}</div>
            </tr>
        </table>
    </form>
</template>

<script>
    import api from '../../api.js'
    import router from '../../routes'
    import {
        mapActions
    } from 'vuex'
    
    export default {
        data() {
            return {
                notice: ''
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault()
                var passport = this.$refs['passport'].value
                this.login({
                    passport,
                    password: this.$refs['password'].value,
                    callback: (err, data) => {
                        if (err) {
                            this.notice = JSON.parse(err.responseText).detail
                            return
                        }
                        if (data.id) {
                            window._user_info = data
                            this.setUserInfo({
                                userInfo: data
                            })
                            router.push('/')
                        } else {
                            this.notice = '登录失败,' + data.detail
                        }
                    }
                })
            },
            ...mapActions({
                'login': 'login',
                'setUserInfo': 'setUserInfo'
            })
        }
    }
</script>

<style scoped lang="postcss">
    label {
        display: inline-block;
        width: 80px;
    }
    
    label+input {
        width: 300px;
        display: inline-block;
        margin-bottom: 25px;
    }
    
    table {
        margin: 0 auto;
        margin-top: 50px;
        >tr:nth-of-type(3) {
            text-align: center;
        }
    }
</style>