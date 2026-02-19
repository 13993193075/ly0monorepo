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
import { ref, reactive } from "vue";
import compMain from './main.vue'
import handlers from './handlers.js'

const props = defineProps({
    // modelValue: 外部 v-model 绑定的值
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({
            popup: {
                switch: false,
                visible: false,
                title: 'ly0 - 通用登录组件',
                width: '1000px',
                top: '15vh',
            },
            sessionOnly: false, // 仅刷新session，不做应用跳转
            route_type: '1',
            route: '',
            app: 'ly0',
            ly0: {
                id_dataunit: null, // 数据单元预置
                id_group: null, // 用户组预置
                usertbl: 'ly0d0user', // 用户数据表名
                id_user: null, // 用户预置
            }
        })
    }
})
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['update:modelValue', 'change'])

const scopeThis = reactive({
    modelValue: props.modelValue,
    popup: props.myProps.popup,
    showPg: 'Password', // 初始页面：密码登录
    handlers,
    LoginData: {
        id_login: null, // 登录账号id
        type: 'number', // 登录类型
        number: "", // 工号
        cellphone: "", // 手机号
        email: "", // 电子邮箱
        wx_appid: "", // 微信
        wx_openid: "",
        wx_nickname: "",
        wx_headimgurl: "",
        sessionOnly: props.myProps.sessionOnly,
        route_type: '', // 登录账号验证成功后的路由跳转类型：'0' - Web地址, '1' - Vue路由
        route: '', // 登录账号验证成功后的路由跳转地址
        app: props.myProps.app, // 应用入口
        
        // 应用系统：ly0
        ly0: {
            arrDataunit: [],
            id_dataunit: props.ly0.id_dataunit,
            arrGroup: [],
            arrGroup0: [],
            id_group: props.ly0.id_group,
            arrUser: [],
            arrUser0: [],
            usertbl: props.ly0.usertbl,
            id_user: props.ly0.id_user,
        },
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
</script>
