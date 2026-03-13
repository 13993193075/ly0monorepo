<template>
    <div class="root">
        <div class="main">
            <div class="mall-name-box" @click="scopeThis.jump.goHome({scopeThis})">
                <span class="mall-name"
                >★&nbsp;{{
                    scopeThis.ly0session && scopeThis.ly0session.mall
                        ? scopeThis.ly0session.mall.branch[scopeThis.ly0session.mall.switch].name
                        : '未命名的商城'
                }}&nbsp;★</span>
            </div>
            <div class="login-box">
                <el-dropdown @command="hdlLoginMenu">
                    <!-- 微信登录 -->
                    <span
                        class="el-dropdown-link"
                        v-if="scopeThis.ly0session && scopeThis.ly0session.session &&
                            scopeThis.ly0session.session.type === 'wx'"
                    >
                    <el-image
                        :src="scopeThis.ly0session.session.wx_headimgurl"
                        style="width: 20px; height: 20px; border-radius: 50%"
                    ></el-image>
                    <span>&nbsp;{{ scopeThis.ly0session.session.wx_nickname }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <!-- 其它方式或匿名登录 -->
                    <span class="el-dropdown-link" v-else>
                        <i class="el-icon-user-solid"></i>
                        <span>&nbsp;{{handles.myInfo({scopeThis, state}).info}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            command="login-info"
                            v-if="!handles.myInfo({scopeThis, state}).none"
                        >我的账号</el-dropdown-item>
                        <el-dropdown-item command="login">{{
                            !handles.myInfo({scopeThis, state}).none ? '重新登录' : '登录'
                        }}</el-dropdown-item>
                        <el-dropdown-item command="logout" v-if="!handles.myInfo({scopeThis, state}).none">退出</el-dropdown-item>
                        <el-dropdown-item command="new">注册新用户</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>&nbsp;|&nbsp;</span>
                <span @click="scopeThis.jump.toCart({scopeThis})">
                    <i class="el-icon-shopping-cart-2"></i>
                    <span>&nbsp;我的购物车</span>
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span @click="scopeThis.jump.toRecord({scopeThis})">
                    <i class="el-icon-document-copy"></i>
                    <span>&nbsp;我的订单记录</span>
                </span>
            </div>
            <div></div>
        </div>
        
        <compLoginInfo
            v-if="!!loginInfo.popup.visible"
            :id_login="ly0session.session.id_login"
            :myProps="loginInfo"
        ></compLoginInfo>
        <compLogin v-if="!!login.popup.visible" :myProps="login"></compLogin>
    </div>
</template>

<script setup>
import dataRequest from '../../../../utils/data-request.js'
import compLoginInfo from '../../frame/header/id_login/Index.vue'
import loginInfo from '../../frame/header/login-info.js'
import compLogin from '../../d0login/Index.vue'
import handles from './handles.js'
import {reactive} from "vue";

const props = defineProps(['scopeThis'])
const state = reactive({

})

function hdlLoginMenu(label) {
    handles.loginMenu({scopeThis: props.scopeThis, state, label})
}
export default {
    data() {
        return {
            loginInfo,
            login: {
                usertbl: 'ly0d7guest',
                popup: {
                    visible: false,
                    title: 'ly0 - 企业应用集成平台@第三方登录',
                },
                sessionOnly: true,
                result: false,
            },
        }
    },
    computed: {
        popupLogin() {
            return this.login.popup.visible
        },
    },
    watch: {
        popupLogin(valNew, valOld) {
            if (!valNew && !!this.login.result) {
                // 重置session
                dataRequest.ly0sessionSave(
                    Object.assign(dataRequest.ly0sessionLoad(), {
                        mall: this.ly0session.mall,
                    }),
                )
                this.ly0session = dataRequest.ly0sessionLoad()
                location.reload()
            }
        },
    },
    mounted() {
        this.ly0session = dataRequest.ly0sessionLoad()
    },
}
</script>

<style scoped lang="scss">
// 顶部信息栏
.root {
    .main {
        display: flex;
        justify-content: space-between;
        background-color: #cecece;
        color: #6a6a6a;
        font-size: x-small;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        .mall-name-box {
            .mall-name {
                padding-left: 10px;
                font-size: 15px;
                font-weight: bolder;
                color: #009f95;
            }
        }
        .login-box {
        }
    }
}
</style>
