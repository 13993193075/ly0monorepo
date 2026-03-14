<script setup>
import {reactive} from "vue"
import {ElMessage} from "element-plus";
import {request as ly0request} from "@yoooloo42/ly0browser";

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({
            userTbl: 'ly0d0user',
            userId: null,
            popup: {
                switch: true,
                visible: false,
                title: "注册新工号"
            },
        })
    }
})

const formData = reactive({
    userTbl: props.myProps.userTbl,
    userId: props.myProps.userId,
    number: '',
    password: '',
    enterAgain: '',
})

const formProps = reactive({
    popup: props.myProps.popup,
    cols: [
        {
            items: [
                {
                    inputType: 'text',
                    label: '用户id',
                    fieldName: 'userId'
                },
                {
                    inputType: "input",
                    label: "工号",
                    fieldName: "number",
                },
                {
                    inputType: "input",
                    label: "登录密码",
                    fieldName: "password",
                    showPassword: true,
                },
                {
                    inputType: "input",
                    label: "密码复核",
                    fieldName: "enterAgain",
                    showPassword: true,
                    placeholder: "请再次输入登录密码",
                }
            ]
        }
    ],
    submit: {
        async handle({formData, formProps}){
            if(!formData.number){
                return ElMessage("未输入工号")
            }
            if(!formData.password || formData.password !== formData.enterAgain){
                return ElMessage("未输入登录密码或不一致")
            }
            
            const result = await ly0request.ly0.storpro({
                noSession: true,
                storproName: "ly0d0login.newNumber.newNumber",
                data: {
                    userTbl: formData.userTbl,
                    userId: formData.userId,
                    number: formData.number,
                    password: formData.password
                }
            })
            ElMessage(result.message);
            if(result.code === 0){
                // 关闭弹窗
                formProps.popup.visible = false
            }
        }
    }
})
</script>

<template>
    <ly0el-form v-model="formData" :myProps="formProps"></ly0el-form>
</template>

<style scoped lang="scss">

</style>