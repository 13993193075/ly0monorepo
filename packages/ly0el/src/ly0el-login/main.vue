<template>
    <div style="text-align: center; margin-top: 60px;">
        <compPassword v-if="scopeThis.showPg==='Password'" :scopeThis="scopeThis"></compPassword>
        <compSms v-else-if="scopeThis.showPg==='Sms'" :scopeThis="scopeThis"></compSms>
        <compEmail v-else-if="scopeThis.showPg==='Email'" :scopeThis="scopeThis"></compEmail>
        <compWx v-else-if="scopeThis.showPg==='Wx'" :scopeThis="scopeThis"></compWx>
        <compLy0 v-else-if="scopeThis.showPg==='ly0'" :scopeThis="scopeThis"></compLy0>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {watch} from 'vue'
import compPassword from './Password.vue' // 密码验证页面
import compSms from './Sms.vue' // 短信验证页面
import compEmail from './Email.vue' // 电子邮箱验证页面
import compWx from './Wx.vue' // 微信验证页面
import compLy0 from './ly0/Index.vue' // ly0 - 应用入口（选择用户组）

const props = defineProps(['scopeThis'])

watch(() => props.scopeThis.showPg, (newValue, oldValue)=>{
    // 微信登录
    if(newValue === "wx"){
        scopeThis.handles.wx.show({scopeThis})
    }
})
</script>
