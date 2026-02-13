<template>
        <div class="root">
            <compPassword v-if="scopeThis.loginPg==='password'" :scopeThis="scopeThis"></compPassword>
            <compSms v-else-if="scopeThis.loginPg==='sms'" :scopeThis="scopeThis"></compSms>
            <compEmail v-else-if="scopeThis.loginPg==='email'" :scopeThis="scopeThis"></compEmail>
            <compWx v-else-if="scopeThis.loginPg==='wx'" :scopeThis="scopeThis"></compWx>
            <compLogin v-else-if="scopeThis.loginPg==='login'" :scopeThis="scopeThis"></compLogin>
        </div>
</template>

<style lang="scss" scoped>
    @use "./index0.scss";
</style>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
import compPassword from './Password.vue'
import compSms from './sms.vue'
import compEmail from './email.vue'
import compWx from './wx.vue'
import compLogin from './Login.vue'
import handles from './handles.js'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({})
    }
})

const loginDataInit = {
    id_login: null,
    number: "",
    cellphone: "",
    email: "",
    wx_appid: "",
    wx_openid: "",
    wx_nickname: "",
    wx_headimgurl: "",
    type: "",
    arrDataunit: [],
    id_dataunit: "",
    arrGroup: [],
    arrGroup0: [],
    id_group: "",
    arrUser: [],
    arrUser0: []
}

const scopeThis = reactive({
    routerInstance: useRouter(), // 路由实例
    loginPg: "password",
    loginDataInit,
    loginData: JSON.parse(JSON.stringify(loginDataInit)),
    passwordData: {
        number: "",
        type: "number",
        password: ""
    },
    smsData: {
        cellphone: "",
        vercode: "",
        lastTime: null,
        thisTime: null
    },
    emailData: {
        email: "",
        vercode: "",
        lastTime: null,
        thisTime: null
    },
    handles
})

watch(() => scopeThis.loginPg, (newValue, oldValue)=>{
    // 登录方式切换
    if(newValue !== "login"){
        // 微信登录
        if(newValue === "wx"){
            scopeThis.handles.wx.show(scopeThis)
        }
        return
    }

    // 初始状态或登录失败
    if(
        !scopeThis.loginData.type ||
        (scopeThis.loginData.type === "number" && !scopeThis.loginData.number) ||
        (scopeThis.loginData.type === "cellphone" && !scopeThis.loginData.cellphone) ||
        (scopeThis.loginData.type === "email" && !scopeThis.loginData.email) ||
        (scopeThis.loginData.type === "wx" && (!scopeThis.loginData.wx_appid || !scopeThis.loginData.wx_openid))
    ){
        // 重置登录信息
        scopeThis.loginData = JSON.parse(JSON.stringify(scopeThis.loginDataInit))
        scopeThis.loginPg = "password"
        return
    }

    // 登录成功，获取用户及相关信息
    scopeThis.handles.login.withId_login(scopeThis)
})
</script>
