import { ElMessage } from 'element-plus'
import {request as ly0request} from '@yoooloo42/ly0browser'

export default {
    formData: {
        number: "",
        type: "number",
        passwordOld: "",
        passwordNew: "",
        passwordNewConfirm: ""
    },
    formProps: {
        popup: {
            visible: false,
            title: "设置登录密码"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "text",
                        label: "",
                        fieldName: "number",
                        style: {
                            width: '300px'
                        }
                    },
                    {
                        inputType: "input",
                        label: "旧密码",
                        fieldName: "passwordOld",
                        showPassword: true,
                        style: {
                            width: '200px'
                        }
                    },
                    {
                        inputType: "input",
                        label: "新密码",
                        fieldName: "passwordNew",
                        showPassword: true,
                        style: {
                            width: '200px'
                        }
                    },
                    {
                        inputType: "input",
                        label: "新密码复核",
                        fieldName: "passwordNewConfirm",
                        showPassword: true,
                        placeholder: "请再次输入新密码",
                        style: {
                            width: '200px'
                        }
                    }
                ]
            }
        ],
        submit: {
            handle({formData, formProps}){
                if(!formData.passwordNew || (formData.passwordNew !== formData.passwordNewConfirm)){
                    ElMessage("新密码未输入或不一致")
                    return
                }

                ly0request.ly0request.storpro({
                    noSession: true,
                    storproName: "ly0d0login.password.setPassword",
                    data: {
                        number: formData.number,
                        type: formData.type,
                        password: formData.passwordNew,
                        password_old: formData.passwordOld
                    }
                }).then(result=>{
                    ElMessage(result.message);
                    if(result.code === 0){
                        // 关闭弹窗
                        formProps.popup.visible = false
                    }
                })
            }
        }
    }
}
