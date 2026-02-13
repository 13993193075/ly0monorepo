import { ElMessage } from 'element-plus'
import {request as ly0request} from "@yoooloo42/joker"
const ly0session = ly0request.ly0.ly0sessionLoad()

export default {
    formData: {
        id_login: ly0session.session.id_login,
        number: "",
        password: "",
        password0: ""
    },
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "注册新工号"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "text",
                        label: "我的账号",
                        fieldName: "id_login",
                        style: {
                            width: "300px"
                        }
                    },
                    {
                        inputType: "input",
                        label: "工号",
                        fieldName: "number",
                        style: {
                            width: "200px"
                        }
                    },
                    {
                        inputType: "input",
                        label: "登录密码",
                        fieldName: "password",
                        showPassword: true,
                        style: {
                            width: "200px"
                        },
                    },
                    {
                        inputType: "input",
                        label: "密码复核",
                        fieldName: "password0",
                        showPassword: true,
                        placeholder: "请再次输入登录密码",
                        style: {
                            width: "200px"
                        }
                    }
                ]
            }
        ],
        submit: {
            handle({formData, formProps}){
                if(!formData.number){
                    return ElMessage("工号为空")
                }
                if(!formData.password || formData.password !== formData.password0){
                    return ElMessage("登录密码为空或不一致")
                }

                ly0request.ly0.storpro({
                    noSession: true,
                    storproName: "ly0d0login.password.new_number",
                    data: {
                        id_login: formData.id_login,
                        number: formData.number,
                        password: formData.password
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
