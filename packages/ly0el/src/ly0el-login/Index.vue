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
            app: 'ly0'
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
        app: props.myProps.app,
        
        // 应用系统：ly0
        ly0: {
            arrDataunit: [],
            id_dataunit: null,
            arrGroup: [],
            arrGroup0: [],
            id_group: null,
            arrUser: [],
            arrUser0: [],
            id_user: null,
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
