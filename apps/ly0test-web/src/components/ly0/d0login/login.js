import { ElMessage, ElMessageBox } from 'element-plus'
import {ly0request} from '@yoooloo42/ly0browser/ly0request'

// 标题
function title(scopeThis){
    if(scopeThis.loginData.type === "number"){
        return scopeThis.loginData.number
    }else if(scopeThis.loginData.type === "cellphone"){
        return scopeThis.loginData.cellphone
    }else if(scopeThis.loginData.type === "email"){
        return scopeThis.loginData.email
    }else if(scopeThis.loginData.type === "wx"){
        return scopeThis.loginData.wx_nickname
    }
}

// 登录成功后，获取用户及相关信息
function withId_login(scopeThis){
    return new Promise((resolve, reject)=>{
        // 根据id_login获取业务用户相关信息
        ly0request.storpro({
            storproName: "ly0d0login.user.withId_login",
            data: {
                id_login: scopeThis.loginData.id_login,
                usertbl: !!scopeThis.myProps && !!scopeThis.myProps.usertbl ? scopeThis.myProps.usertbl : ""
            },
            noSession: true,
        }).then(result=>{
            scopeThis.loginData.arrDataunit = result.data.arrDataunit
            scopeThis.loginData.arrGroup = result.data.arrGroup
            scopeThis.loginData.arrUser = result.data.arrUser

            // 如果已预置数据单元
            if(scopeThis.myProps && scopeThis.myProps.id_dataunit){
                let objDataunit = scopeThis.loginData.arrDataunit.find(i=>{
                    return i._id === scopeThis.myProps.id_dataunit
                })
                if(!objDataunit){
                    ElMessage("非法登录 - 用户数据单元错误")
                    scopeThis.loginPg = "password" // 返回密码登录页面
                    return resolve()
                }else{
                    scopeThis.loginData.arrDataunit = [objDataunit]
                }
            }
            // 如果已预置用户组
            if(scopeThis.myProps && scopeThis.myProps.id_group){
                let objGroup = scopeThis.loginData.arrGroup.find(i=>{
                    return i._id === scopeThis.myProps.id_group
                })
                if(!objGroup){
                    ElMessage("非法登录 - 用户组错误")
                    scopeThis.loginPg = "password" // 返回密码登录页面
                    return resolve()
                }else{
                    scopeThis.loginData.arrGroup = [objGroup]
                }
            }
            // 如果已预置用户
            if(scopeThis.myProps && scopeThis.myProps.id_user){
                let objUser = scopeThis.loginData.arrUser.find(i=>{
                    return i._id === scopeThis.myProps.id_user
                })
                if(!objUser){
                    ElMessage("非法登录 - 用户错误")
                    scopeThis.loginPg = "password" // 返回密码登录页面
                    return resolve()
                }else{
                    scopeThis.loginData.arrUser = [objUser]
                }
            }

            // 级联
            scopeThis.loginData.id_dataunit = scopeThis.loginData.arrDataunit.length > 0 ? scopeThis.loginData.arrDataunit[0]._id : null
            setArrGroup0(scopeThis)
            scopeThis.loginData.id_group = scopeThis.loginData.arrGroup0.length > 0 ? scopeThis.loginData.arrGroup0[0]._id : null
            setArrUser0(scopeThis)

            // 用户组或用户唯一，直接进入应用
            if(scopeThis.loginData.arrGroup.length <= 1 || scopeThis.loginData.arrUser.length <= 1){
                scopeThis.handles.login.submit(scopeThis)
            }

            resolve()
        })
    })
}

// 同步用户组数组arrGroup0
function setArrGroup0(scopeThis){
    scopeThis.loginData.arrGroup0 = []
    if(!!scopeThis.loginData.id_dataunit){
        scopeThis.loginData.arrGroup0 = scopeThis.loginData.arrGroup.filter(i=>{
            return i.id_dataunit === scopeThis.loginData.id_dataunit
        })
        if(scopeThis.loginData.arrGroup0.length === 1){
            scopeThis.loginData.id_group = scopeThis.loginData.arrGroup0[0]._id
        }
    }
}

// 同步用户数组arrUser0
function setArrUser0(scopeThis){
    scopeThis.loginData.arrUser0 = []
    if(!!scopeThis.loginData.id_group){
        scopeThis.loginData.arrUser0 = scopeThis.loginData.arrUser.filter(i=>{
            return i.id_group === scopeThis.loginData.id_group
        })
    }else if(!!scopeThis.loginData.id_dataunit){
        scopeThis.loginData.arrUser0 = scopeThis.loginData.arrUser.filter(i=>{
            return i.id_dataunit === scopeThis.loginData.id_dataunit
        })
    }else{
        scopeThis.loginData.arrUser0 = scopeThis.loginData.arrUser.concat([])
    }
}

// 级联 - 数据单元
function id_dataunitChange(scopeThis){
    scopeThis.loginData.id_group = null
    setArrGroup0(scopeThis)
    setArrUser0(scopeThis)
}

// 应用入口
function submit(scopeThis){
    return new Promise((resolve, reject)=>{
        if(scopeThis.loginData.arrUser0.length === 0){
            ElMessage("用户不存在")
            scopeThis.loginPg = "password" // 返回密码登录页面
            return resolve()
        }

        let objDataunit = scopeThis.loginData.arrDataunit.find(i=>{
            return i._id === scopeThis.loginData.id_dataunit
        })
        if(!objDataunit){
            ElMessage('数据单元错误')
            scopeThis.loginPg = "password" // 返回密码登录页面
            return resolve()
        }
        if(!!objDataunit.systemoff){
            ElMessage('数据单元关闭')
            scopeThis.loginPg = "password" // 返回密码登录页面
            return resolve()
        }

        // 数据库写入session
        ly0request.storpro({
            storproName: "ly0d0login.session.newSession",
            data: {
                id_login: scopeThis.loginData.id_login,
                number: scopeThis.loginData.number,
                cellphone: scopeThis.loginData.cellphone,
                email: scopeThis.loginData.email,
                wx_appid: scopeThis.loginData.wx_appid,
                wx_openid: scopeThis.loginData.wx_openid,
                type: scopeThis.loginData.type,
                id_user: scopeThis.loginData.arrUser0[0]._id,
                usertbl: scopeThis.myProps && scopeThis.myProps.usertbl ? scopeThis.myProps.usertbl : ""
            },
            noSession: true,
        }).then(result=>{
            ElMessage(result.message)
            if(result.code !== 0){
                ElMessage("数据库写入session失败")
                scopeThis.loginPg = "password"
                return resolve()
            }
            // 浏览器缓存session
            ly0request.ly0sessionSave(result.ly0session)

            // 仅重写session，不发生应用跳转
            let sessionOnly = scopeThis.myProps &&
                scopeThis.myProps.sessionOnly &&
                (scopeThis.myProps.sessionOnly === true || scopeThis.myProps.sessionOnly === "true")
            if(!!sessionOnly){
                // 登录成功，返回登录结果
                if("result" in scopeThis.myProps){
                    scopeThis.myProps.result = true
                }
                // 关闭登录窗口
                if(scopeThis.myProps && scopeThis.myProps.popup){
                    scopeThis.myProps.popup.visible = false
                }
                return resolve()
            }

            // 用户组（应用入口）处理
            let route_type = "", route = ""
            if(scopeThis.myProps && scopeThis.myProps.route){
                route_type = scopeThis.myProps.route_type ? scopeThis.myProps.route_type : "1"
                route = scopeThis.myProps.route
            }else{
                let objGroup = scopeThis.loginData.arrGroup0.find(i=>{
                    return i._id === scopeThis.loginData.id_group
                })
                if(objGroup && objGroup.route){
                    route_type = objGroup.route_type ? objGroup.route_type : "1"
                    route = objGroup.route
                }else{
                    ElMessage('用户组或应用入口错误')
                    scopeThis.loginPg = "password"
                    return resolve()
                }
            }

            // 关闭登录窗口
            if(scopeThis.myProps && scopeThis.myProps.popup){
                scopeThis.myProps.popup.visible = false
            }

            // 应用跳转（应用入口）
            ly0request.navigate({
                code: route_type,
                path: route,
                routerInstance: scopeThis.routerInstance,
            })
        })
    })
}

function cancel(scopeThis){
    scopeThis.loginPg = "password"
}

export default {
    title,
    withId_login,
    setArrGroup0,
    setArrUser0,
    id_dataunitChange,
    submit,
    cancel
}
