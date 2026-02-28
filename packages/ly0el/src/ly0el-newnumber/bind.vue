<script setup>
import {reactive} from "vue"
import {ElMessage} from "element-plus";
import {request as ly0request} from "@yoooloo42/ly0browser";

const props = defineProps({
    Props: {
        type: Object,
        default: () => ({
            userTbl: 'ly0d0user',
            userId: null,
            popup: {
                switch: true,
                visible: false,
                title: "绑定已有工号"
            },
        })
    }
})

const formData = reactive({
    userTbl: props.Props.userTbl,
    userId: props.Props.userId,
    number: '',
    password: '',
})

const formProps = reactive({
    popup: props.Props.popup,
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
            ]
        }
    ],
    submit: {
        async handle({formData, formProps}){
            if(!formData.number){
                return ElMessage("未输入工号")
            }
            if(!formData.password){
                return ElMessage("未输入登录密码")
            }
            
            const result = await ly0request.ly0.storpro({
                noSession: true,
                storproName: "ly0d0login.newNumber.bind",
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