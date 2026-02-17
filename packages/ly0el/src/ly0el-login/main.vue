<template>
    <div style="text-align: center; margin-top: 60px;">
        <compPassword v-if="scopeThis.showPg==='Password'" :scopeThis="scopeThis"></compPassword>
        <compSms v-else-if="scopeThis.showPg==='Sms'" :scopeThis="scopeThis"></compSms>
        <compEmail v-else-if="scopeThis.showPg==='Email'" :scopeThis="scopeThis"></compEmail>
        <compWx v-else-if="scopeThis.showPg==='Wx'" :scopeThis="scopeThis"></compWx>
        <compLogin v-else-if="scopeThis.showPg==='Group'" :scopeThis="scopeThis"></compLogin>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive, watch } from 'vue'
import compPassword from './Password.vue' // 密码验证页面
import compSms from './Sms.vue' // 短信验证页面
import compEmail from './Email.vue' // 电子邮箱验证页面
import compWx from './Wx.vue' // 微信验证页面
import compGroup from './Group.vue' // ly0 - 应用入口（选择用户组）

const props = defineProps(['scopeThis'])

watch(() => props.scopeThis.showPg, (newValue, oldValue)=>{
    // 登录方式切换
    if(newValue !== "Group"){
        return
    }

    // 登录账号（身份）验证成功，获取用户及相关信息
    props.scopeThis.handlers.withId_login({scopeThis: props.scopeThis})
})
</script>
