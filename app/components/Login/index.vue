<template>
    <div class="login-form">
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
    </div>
</template>

<script>
    import api from '../../api.js'
    import router from '../../routes'
    import {
        mapActions,
        mapState
    } from 'vuex'
    
    export default {
        data() {
            return {
                notice: ''
            }
        },
        computed: {
            ...mapState({
                userInfo : state => state.UserState.userInfo
            })
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
                            this.notice = err.detail
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
        },
        beforeRouteLeave (to, from, next) {
            if (this.userInfo.id) {
                next()
            }
        },
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

    tr{
        position: relative;
    }
    h1{
        /*margin-top: 50px;*/
        text-align: center;
    }
    tr{
        position: relative;
        width: 330px;
    }
    tr input{
        width: 330px;
        height: 40px;
        margin-bottom: 20px;
    }
    tr i{
        position: relative;
        top: 0;
        color: #bfcbd9;
        right: 30px;
        font-size: 16px;
    }
    .ui-tips{
        text-align: left;
        margin-bottom: 20px;
    }
    
    .login-form{
        width: 100%;
        height: 100%;
        background: #eee;
        padding-top: 100px;
    }
    .login{
        margin: 0 auto;
        padding: 30px;
        padding-right: 10px;
        width: 500px;
        height: 300px;
        background: #fff;
        .ui-button{
            float: right;
            
        }
    }
</style>
<style scoped lang="postcss">
    .login .ui-button{
        margin-top: 10px;
        margin-right: 16px;
        /*width: ;*/
        padding: 10px 30px;
    }
</style>