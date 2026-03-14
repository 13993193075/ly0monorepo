<!-- 组件的“壳” -->
<template>
    <el-dialog
        v-if="scopeThis.popup.switch"
        v-model="scopeThis.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.popup.title"
        :width="scopeThis.popup.width"
        :top="scopeThis.popup.top"
        :destroy-on-close="true"
    >
        <compMain :scopeThis="scopeThis"></compMain>
    </el-dialog>
    <compMain v-else :scopeThis="scopeThis"></compMain>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router';
import compMain from './main.vue'
import handlers from './handlers.js'
import branch from './branch.js'

const props = defineProps(['myProps'])
const scopeThis = reactive({
    routerInstance: useRouter(), // Vue路由实例
    popup: {
        switch: false,
        visible: false,
        title: 'ly0 - 通用登录组件',
        width: '1000px',
        top: '15vh',
    },
    showPg: 'Password', // 初始页面：密码登录
    handlers,
    loginData: {
        id_login: null, // 登录账号id
        type: 'number', // 登录类型
        number: "", // 工号
        cellphone: "", // 手机号
        email: "", // 电子邮箱
        wx_appid: "", // 微信
        wx_openid: "",
        wx_nickname: "",
        wx_headimgurl: "",
        sessionOnly: false,
        route_type: '1', // 登录账号验证成功后的路由跳转类型：'0' - Web地址, '1' - Vue路由
        route: '', // 登录账号验证成功后的路由跳转地址
        app: 'ly0', // 应用入口
        branch: JSON.parse(JSON.stringify(branch)),
    },
    passwordData: {
        type: 'number', // 密码登录类型：'number', 'cellphone', 'email'
        label: '工号', // 密码登录标签：'工号', '手机号', '电子邮箱'
        number: "",
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
})

onMounted(() => {
    // 没有传入参数
    if(!props.myProps){
        return
    }
    
    // 是否传入弹窗状态
    if(props.myProps.popup){
        Object.assign(scopeThis.popup, props.myProps.popup)
    }
    // 是否传入sessionOnly
    if('sessionOnly' in props.myProps){
        scopeThis.loginData.sessionOnly = props.myProps.sessionOnly
    }
    // 是否传入路由跳转
    if(props.myProps.route_type){
        scopeThis.loginData.route_type = props.myProps.route_type
    }
    if(props.myProps.route){
        scopeThis.loginData.route = props.myProps.route
    }
    // 是否传入应用入口
    if(props.myProps.app){
        scopeThis.loginData.app = props.myProps.app
    }
    // 是否传入业务参数
    if(props.myProps[scopeThis.loginData.app]){
        Object.assign(
            scopeThis.loginData.branch[scopeThis.loginData.app],
            props.myProps[scopeThis.loginData.app]
        )
    }
})
</script>
