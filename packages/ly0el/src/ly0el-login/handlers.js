import { useRouter } from 'vue-router'
import {request as ly0request} from "@yoooloo42/ly0browser";
import password from "./password.js"
import sms from "./sms.js"
import email from "./email.js"
import wx from "./wx.js"
import group from "./group.js"
const routerInstance = useRouter() // 路由实例

// 登录流程完成
async function submit({scopeThis}){
    // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
    emit("update:modelValue", scopeThis.modelValue)
}

export default {
    password,
    sms,
    email,
    submit,
    wx,
    group
}