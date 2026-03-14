<template>
    <div class="root">
        <div class="main">
            <!-- 商城名称 -->
            <div class="mall-name-box" @click="scopeThis.jump.goHome({scopeThis})">
                <span class="mall-name"
                >★&nbsp;{{scopeThis.branch.name}}&nbsp;★</span>
            </div>
            <!-- 我的（账户相关信息） -->
            <div class="login-box">
                <!-- 用户logo（有下拉菜单） -->
                <el-dropdown @command="hdlLoginMenu">
                    <!-- 微信登录 -->
                    <span
                        v-if="scopeThis.ly0session && scopeThis.ly0session.session &&
                            scopeThis.ly0session.session.type === 'wx'"
                        class="el-dropdown-link"
                    >
                        <el-image
                            :src="scopeThis.ly0session.session.wx_headimgurl"
                            style="width: 20px; height: 20px; border-radius: 50%"
                        ></el-image>
                        <span>&nbsp;{{ scopeThis.ly0session.session.wx_nickname }}</span>
                        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                    </span>
                    
                    <!-- 其它方式或匿名登录 -->
                    <span v-else class="el-dropdown-link">
                        <el-icon><user-filled /></el-icon>
                        <span>&nbsp;{{state.myInfo.info}}</span>
                        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                    </span>
                    
                    <!-- 下拉菜单 -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-if="!state.myInfo.none"
                                command="login-info"
                            >我的账号</el-dropdown-item>
                            <el-dropdown-item command="login">{{
                                !state.myInfo.none ? '重新登录' : '登录'
                            }}</el-dropdown-item>
                            <el-dropdown-item command="logout" v-if="!state.myInfo.none">退出</el-dropdown-item>
                            <el-dropdown-item command="new">注册新用户</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                
                <span>&nbsp;|&nbsp;</span>
                
                <!-- 我的购物车 -->
                <span @click="scopeThis.jump.toCart({scopeThis})">
                    <el-icon><ShoppingCart /></el-icon>
                    <span>&nbsp;我的购物车</span>
                </span>
                
                <span>&nbsp;|&nbsp;</span>
                
                <!-- 我的订单记录 -->
                <span @click="scopeThis.jump.toRecord({scopeThis})">
                    <el-icon><CopyDocument /></el-icon>
                    <span>&nbsp;我的订单记录</span>
                </span>
            </div>
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
    login,
    myInfo: {
        info: '匿名/未登录',
        none: false,
    }
})

function hdlLoginMenu(label) {
    handles.loginMenu({scopeThis: props.scopeThis, state, label})
}

onMounted(() => {
    state.login.ly0d7mall.name = props.scopeThis.branch.name
    state.login.ly0d7mall.id_dataunit = props.scopeThis.branch.id_dataunit
    let ly0session = ly0request.ly0.ly0sessionLoad()
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        ly0session.session.usertbl !== 'ly0d7guest'
    ) {
        ly0session = {
            session: {
                usertbl: 'ly0d7guest',
            },
        }
    }
    ly0request.ly0.ly0sessionSave(
        Object.assign(ly0session, {
            ly0d7mall: state.login.ly0d7mall
        }),
    )
    props.scopeThis.ly0session = ly0request.ly0.ly0sessionLoad()
    state.loginInfo.id_login = props.scopeThis.ly0session.session.id_login
    handles.myInfo({scopeThis: props.scopeThis, state})
})
</script>

<style scoped lang="scss">
// 顶部信息栏
.root {
    .main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #cecece;
        color: #6a6a6a;
        font-size: 13px;
        height: 40px;
        .mall-name-box {
            .mall-name {
                padding-left: 10px;
                font-size: 15px;
                font-weight: bolder;
                color: #009f95;
            }
        }
        .login-box {
            width: 50%;
            display: flex;
            align-items: center;
            font-size: 13px;
        }
    }
}
// 强制去掉 el-dropdown 触发时的黑色边框
:deep(.el-tooltip__trigger:focus-visible) {
    outline: none !important;
}
</style>
