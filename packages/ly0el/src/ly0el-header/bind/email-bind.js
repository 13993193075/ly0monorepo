import { ElMessage } from 'element-plus'
import {request as ly0request} from '@yoooloo42/ly0browser'

function get({scopeThis}){
    return {
        formData: {
            id_login: scopeThis.ly0session.session.id_login,
            email: "",
            vercode: "",
            thisTime: null,
            lastTime: null,
            password: "",
            password0: ""
        },
        formProps: {
            popup: {
                switch: true,
                visible: false,
                title: "email绑定"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "text",
                            label: "我的账号",
                            fieldName: "id_login",
                            style: {
                                width: '300px'
                            }
                        },
                        {
                            inputType: "input",
                            label: "email",
                            fieldName: "email",
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            inputType: "input",
                            label: "获取验证码",
                            fieldName: "vercode",
                            labelStyle: "color:blue; text-decoration:underline;",
                            placeholder: "请在这里输入验证码",
                            hdlLabelClick({formData}){
                                formData.thisTime = new Date()
                                if (formData.lastTime && (formData.thisTime - formData.lastTime) <= 1000 * 60) {
                                    ElMessage("1分钟内不能再次发送验证码")
                                    return
                                }
                                if(!formData.email){
                                    ElMessage("没有email")
                                    return
                                }

                                ly0request.ly0.storpro({
                                    noSession: true,
                                    storproName: "ly0d0login.email.getVercodeBind",
                                    data: {
                                        id_login: formData.id_login,
                                        email: formData.email
                                    }
                                }).then(result => {
                                    ElMessage(result.message)
                                    if (result.code === 0) {
                                        formData.lastTime = formData.thisTime
                                    } else {
                                        formData.lastTime = null
                                    }
                                })
                            },
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            inputType: "input",
                            label: "登录密码",
                            fieldName: "password",
                            showPassword: true,
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            inputType: "input",
                            label: "密码复核",
                            fieldName: "password0",
                            showPassword: true,
                            placeholder: "请再次输入登录密码",
                            style: {
                                width: '200px'
                            }
                        }
                    ]
                }
            ],
            submit: {
                handle({formData, formProps}){
                    if(! formData.email){
                        return ElMessage("email为空")
                    }
                    if(! formData.vercode){
                        return ElMessage("验证码为空")
                    }
                    if(!formData.password || formData.password !== formData.password0){
                        return ElMessage("登录密码为空或不一致")
                    }

                    ly0request.ly0.storpro({
                        noSession: true,
                        storproName: "ly0d0login.email.bind",
                        data: {
                            id_login: formData.id_login,
                            email: formData.email,
                            vercode: formData.vercode,
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
}
export default {
    get
}
