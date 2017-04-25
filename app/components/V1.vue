<template>
    <div class="page-container">
        <div class="nav-left">
            <h2>
                <router-link to="/uwp-push/message">UWP推送</router-link>
            </h2>
            <tree v-for="item in kkk" :items="item"></tree>
        </div>
        <div class="content-right">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {
        Tree
    } from '../ui'
    window.onload = () => {
    
    }
    export default {
        data() {
            return {
                kkk: [{
                        label: '1',
                        children: [{
                                label: '2',
                                route: '/uwp-push/message',
                                children: [
    
                                ]
                            },
                            {
                                label: '3',
                                onClick: () => alert(1)
                            },
                            {
                                label: '4',
                                children: [{
                                    label: '5',
                                    children: [
    
                                    ]
                                }]
                            }
                        ]
                    },
                    {
                        label: '6',
                        children: [{
                                label: '7',
                                children: [
    
                                ]
                            },
                            {
                                label: '8',
                                children: [
    
                                ]
                            },
                            {
                                label: '9',
                                children: [{
                                    label: '10',
                                    children: [
    
                                    ]
                                }]
                            }
                        ]
                    },
                    {
                        label: '1',
                        children: [
    
                        ]
                    },
                ]
            }
        },
        components: {
            'tree': Tree
        }
    }
</script>

<style scoped lang="postcss">
    .page-container {
        padding: 55px 30px 95px 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        min-height: 1200px;
    }
    
    .nav-left {
        width: 25%;
        float: left;
        h2,
        h2>a {
            font-size: 16px;
            color: #5e6d82;
            line-height: 40px;
            height: 40px;
            margin: 0;
            padding: 0;
            text-decoration: none;
            display: block;
            position: relative;
        }
        h2 {
            cursor: default;
            font-weight: initial;
        }
        h2>a {
            &:hover {
                color: #20a0ff;
            }
            &.router-link-active {
                color: #20a0ff;
            }
        }
        li>a {
            text-decoration: none;
            display: block;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            padding-left: 24px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #5e6d82;
            &:hover {
                color: #20a0ff;
            }
            &.router-link-active {
                color: #20a0ff;
            }
        }
    }
    
    .content-right {
        float: left;
        width: 75%;
    }
</style>