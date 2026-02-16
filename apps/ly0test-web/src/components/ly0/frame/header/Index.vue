<template>
    <div v-if="!!scopeThis.ly0session" class="container">
        <div class="left">
            <img class="group-image" v-if="!!hdlGetGroupIcon()" :src="hdlGetGroupIcon()" />
            <img class="group-image" v-else src="./group.png" />
            {{
                (scopeThis.ly0session.dataunit && scopeThis.ly0session.dataunit.name
                ? scopeThis.ly0session.dataunit.name
                : '&lt;数据单元&gt;') + ' | ' +
                    (scopeThis.ly0session.group && scopeThis.ly0session.group.name ? scopeThis.ly0session.group.name : '&lt;用户组&gt;')
            }}
        </div>
        <div class="right">
            <el-menu
                :default-active="scopeThis.activeIndex"
                mode="horizontal"
                @select="handleSelect"
                background-color="#323232"
                text-color="#fff"
                active-text-color="#ffd04b"
                :ellipsis="false"
            >
                <el-sub-menu index="0">
                    <template v-slot:title>
                        <img class="user-image" v-if="!!hdlGetUserIcon()" :src="hdlGetUserIcon()" />
                        <img class="user-image" v-else src="./user.jpg" />
                        {{ hdlGetUserName() }}
                    </template>
                    <el-menu-item class="user-menu-item" index="user-info">业务用户</el-menu-item>
                    <el-menu-item class="user-menu-item" index="login-info">我的账号</el-menu-item>
                    <el-menu-item class="user-menu-item" index="session-info">当前登录</el-menu-item>
                    <el-sub-menu index="login-new" :popper-append-to-body="true">
                        <template v-slot:title>注册新工号</template>
                        <el-menu-item class="user-menu-item" index="new-number">注册新工号</el-menu-item>
                        <el-menu-item class="user-menu-item" index="cellphone-bind">绑定手机号</el-menu-item>
                        <el-menu-item class="user-menu-item" index="email-bind">绑定email</el-menu-item>
                        <el-menu-item class="user-menu-item" index="wx-bind">绑定微信</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="logout">退出</el-menu-item>
            </el-menu>
        </div>
    </div>

    <!-- 子组件 -->
    <ly0el-form
        v-if="!!scopeThis.userInfo.formProps.popup.visible"
        v-model="scopeThis.userInfo.formData"
        :myProps="scopeThis.userInfo.formProps"
    ></ly0el-form>
    <compLoginInfo
        v-if="!!scopeThis.loginInfo.popup.visible"
        :id_login="scopeThis.ly0session.session.id_login"
        :myProps="scopeThis.loginInfo"
    ></compLoginInfo>
    <ly0el-form
        v-if="!!scopeThis.sessionInfo.formProps.popup.visible"
        v-model="scopeThis.sessionInfo.formData"
        :myProps="scopeThis.sessionInfo.formProps"
    ></ly0el-form>
    <ly0el-form
        v-if="!!scopeThis.newNumber.formProps.popup.visible"
        v-model="scopeThis.newNumber.formData"
        :myProps="scopeThis.newNumber.formProps"
    ></ly0el-form>
    <ly0el-form
        v-if="!!scopeThis.cellphoneBind.formProps.popup.visible"
        v-model="scopeThis.cellphoneBind.formData"
        :myProps="scopeThis.cellphoneBind.formProps"
    ></ly0el-form>
    <ly0el-form
        v-if="!!scopeThis.emailBind.formProps.popup.visible"
        v-model="scopeThis.emailBind.formData"
        :myProps="scopeThis.emailBind.formProps"
    ></ly0el-form>
    <compWxBind
        v-if="!!scopeThis.wxBind.popup"
        :myProps="scopeThis.wxBind"
    ></compWxBind>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import { useRouter } from 'vue-router';
import {reactive} from 'vue'
import compLoginInfo from './id_login/Index.vue'
import compWxBind from './bind/WxBind.vue'
import {request as ly0request} from '@yoooloo42/ly0browser'
import userInfo from './user-info.js'
import loginInfo from './login-info.js'
import sessionInfo from './session-info.js'
import newNumber from './bind/new-number.js'
import cellphoneBind from './bind/cellphone-bind.js'
import emailBind from './bind/email-bind.js'
import wxBind from './bind/wx-bind.js'

const routerInstance = useRouter()
const ly0session = ly0request.ly0request.ly0sessionLoad()
const scopeThis = reactive({
    activeIndex: '0',
    ly0session,
    userInfo,
    loginInfo,
    sessionInfo,
    newNumber,
    cellphoneBind,
    emailBind,
    wxBind,
})

function handleSelect(key) {
    if (key === 'user-info') {
        scopeThis.userInfo.formProps.popup.visible = true
        return
    }
    if (key === 'login-info') {
        scopeThis.loginInfo.popup.visible = true
        return
    }
    if (key === 'session-info') {
        scopeThis.sessionInfo.formProps.popup.visible = true
        return
    }
    if (key === 'new-number') {
        scopeThis.newNumber.formProps.popup.visible = true
        return
    }
    if (key === 'cellphone-bind') {
        scopeThis.cellphoneBind.formProps.popup.visible = true
        return
    }
    if (key === 'email-bind') {
        scopeThis.emailBind.formProps.popup.visible = true
        return
    }
    if (key === 'wx-bind') {
        scopeThis.wxBind.popup = true
        return
    }
    if (key === 'logout') {
        ly0request.ly0request.storpro({
            noSession: true,
            storproName: 'ly0d0login.session.logout',
            data: { ly0session: scopeThis.ly0session },
        }).then(() => {
            ly0request.ly0request.ly0sessionClear()
            ly0request.ly0request.navigate({path: '/', routerInstance})
        })
    }
}

function hdlGetGroupIcon() {
    return scopeThis.ly0session.group && scopeThis.ly0session.group.icon
        ? ly0request.ly0request.domain + scopeThis.ly0session.group.icon
        : ''
}

function hdlGetUserName() {
    let userName = ''
    if (
        scopeThis.ly0session &&
        scopeThis.ly0session.session &&
        scopeThis.ly0session.session.usertbl &&
        scopeThis.ly0session.session.usertbl === 'ly0d0user'
    ) {
        userName =
            scopeThis.ly0session.user && scopeThis.ly0session.user.name
                ? scopeThis.ly0session.user.name
                : '&lt;用户名称&gt;'
    }
    return userName
}

function hdlGetUserIcon() {
    let userIcon = ''
    if (
        scopeThis.ly0session &&
        scopeThis.ly0session.session &&
        scopeThis.ly0session.session.usertbl &&
        scopeThis.ly0session.session.usertbl === 'ly0d0user'
    ) {
        userIcon =
            scopeThis.ly0session.user && scopeThis.ly0session.user.icon
                ? ly0request.ly0request.domain + scopeThis.ly0session.user.icon
                : ''
    }
    return userIcon
}
</script>
