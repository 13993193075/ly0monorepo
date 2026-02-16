<template>
    <el-dialog
        v-if="myProps.popup.visible"
        v-model="myProps.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        title="登录账号信息"
        width="1000px"
        :top="myProps.popup.top ? myProps.popup.top : '15vh'"
        :destroy-on-close="true"
    >
        <compForm :scopeThis="scopeThis"></compForm>
    </el-dialog>
    <compForm v-else :scopeThis="scopeThis"></compForm>

    <ly0el-form
        v-if="scopeThis.setPassword.formProps.popup.visible"
        v-model="scopeThis.setPassword.formData"
        :myProps="scopeThis.setPassword.formProps"
    ></ly0el-form>
</template>

<style scoped></style>

<script setup>
import { reactive, onMounted } from 'vue'
import compForm from './Form.vue'
import handles from './handles.js'
import setPassword from './set-password.js'

const props = defineProps({
    id_login: {
        type: String,
        default: ''
    },
    myProps: {
        type: Object,
        default: () => ({})
    }
})

const scopeThis = reactive({
    id_login: props.id_login,
    readonly: props.myProps.readonly,
    destroy: props.myProps.destroy,
    loginData: {
        objLogin: {},
        arrNumber: [],
        arrCellphone: [],
        arrEmail: [],
        arrWx: [],
    },
    setPassword,
    handles
})

onMounted(() => {
    scopeThis.handles.getData(scopeThis).then(()=>{
    })
})
</script>
