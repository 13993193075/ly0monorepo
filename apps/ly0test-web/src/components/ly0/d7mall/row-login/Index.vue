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
        
        <ly0el-idlogin
            v-if="state.loginInfo && state.loginInfo.popup.visible"
            :myProps="state.loginInfo"
        ></ly0el-idlogin>
        <ly0el-login
            v-if="state.login && state.login.popup.visible"
            :myProps="state.login"
        ></ly0el-login>
    </div>
</template>

<script setup>
import {reactive, onMounted, watch} from "vue";
import handles from './handles.js'
import loginInfo from './login-info.js'
import login from './login.js'
import {request as ly0request} from "@yoooloo42/ly0browser";

const props = defineProps(['scopeThis'])
const state = reactive({
    loginInfo,
    login
})

function hdlLoginMenu(label) {
    handles.loginMenu({scopeThis: props.scopeThis, state, label})
}

onMounted(() => {
    state.loginInfo.id_login = props.scopeThis.ly0session.session.id_login
    const branch = props.scopeThis.ly0session.mall.branch
    state.login.ly0d7mall.id_dataunit = branch.branch[branch.switch].id_dataunit
})

watch(()=>state.login.popup.visible, (valNew, valOld) => {
    if(!valNew) {
        props.scopeThis.ly0session = ly0request.ly0.ly0sessionLoad()
    }
})
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
