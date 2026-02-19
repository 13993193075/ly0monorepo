import { ElMessage, ElMessageBox } from 'element-plus'
import { request as ly0request } from '@yoooloo42/ly0browser'

// 标题
function title({scopeThis}){
    if(scopeThis.loginData.type === "wx"){
        return scopeThis.loginData.wx_nickname
    }else{
        return scopeThis.loginData[scopeThis.loginData.type]
    }
}

// 根据id_login获取业务用户相关信息
async function withId_login({scopeThis}){
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.user.withId_login",
        data: {
            id_login: scopeThis.loginData.id_login,
            usertbl: scopeThis.loginData.ly0.usertbl
        },
        noSession: true,
    })
    scopeThis.loginData.ly0.arrDataunit = result.data.arrDataunit
    scopeThis.loginData.ly0.arrGroup = result.data.arrGroup
    scopeThis.loginData.ly0.arrUser = result.data.arrUser

    // 如果已预置数据单元
    if(scopeThis.loginData.ly0.id_dataunit){
        const objDataunit = scopeThis.loginData.ly0.arrDataunit.find(i=>{
            return i._id === scopeThis.loginData.ly0.id_dataunit
        })
        if(!objDataunit){
            ElMessage("非法登录 - 数据单元预置错误")
            scopeThis.showPg = "Password" // 返回密码登录页面
            return
        }else{
            scopeThis.loginData.ly0.arrDataunit = [objDataunit]
        }
    }
    // 如果已预置用户组
    if(scopeThis.loginData.ly0.id_group){
        const objGroup = scopeThis.loginData.ly0.arrGroup.find(i=>{
            return i._id === scopeThis.loginData.ly0.id_group
        })
        if(!objGroup){
            ElMessage("非法登录 - 用户组预置错误")
            scopeThis.showPg = "Password" // 返回密码登录页面
            return
        }else{
            scopeThis.loginData.ly0.arrGroup = [objGroup]
        }
    }
    // 如果已预置用户
    if(scopeThis.loginData.ly0.id_user){
        const objUser = scopeThis.loginData.ly0.arrUser.find(i=>{
            return i._id === scopeThis.loginData.ly0.id_user
        })
        if(!objUser){
            ElMessage("非法登录 - 用户预置错误")
            scopeThis.showPg = "Password" // 返回密码登录页面
            return
        }else{
            scopeThis.loginData.ly0.arrUser = [objUser]
        }
    }
    // 用户唯一：置用户组唯一
    if(scopeThis.loginData.ly0.arrUser.length === 1){
        scopeThis.loginData.ly0.arrGroup = scopeThis.loginData.ly0.arrGroup.find(i=>{
            return i.id_user === scopeThis.loginData.ly0.arrUser[0]._id
        })
    }

    // 级联
    scopeThis.loginData.ly0.id_dataunit = scopeThis.loginData.ly0.arrDataunit.length > 0 ? scopeThis.loginData.ly0.arrDataunit[0]._id : null
    setArrGroup0({scopeThis})
    scopeThis.loginData.ly0.id_group = scopeThis.loginData.ly0.arrGroup0.length > 0 ? scopeThis.loginData.ly0.arrGroup0[0]._id : null
    setArrUser0({scopeThis})

    // 用户组唯一，直接进入应用
    if(scopeThis.loginData.ly0.arrGroup.length === 1){
        await submit({scopeThis})
    }
}

// 同步用户组数组arrGroup0
function setArrGroup0({scopeThis}){
    scopeThis.loginData.ly0.arrGroup0 = []
    if(scopeThis.loginData.ly0.id_dataunit){
        scopeThis.loginData.ly0.arrGroup0 = scopeThis.loginData.ly0.arrGroup.filter(i=>{
            return i.id_dataunit === scopeThis.loginData.ly0.id_dataunit
        })
        if(scopeThis.loginData.ly0.arrGroup0.length === 1){
            scopeThis.loginData.ly0.id_group = scopeThis.loginData.ly0.arrGroup0[0]._id
        }
    }
}

// 同步用户数组arrUser0
function setArrUser0({scopeThis}){
    scopeThis.loginData.ly0.arrUser0 = []
    if(!!scopeThis.loginData.ly0.id_group){
        scopeThis.loginData.ly0.arrUser0 = scopeThis.loginData.ly0.arrUser.filter(i=>{
            return i.id_group === scopeThis.loginData.ly0.id_group
        })
    }else if(scopeThis.loginData.ly0.id_dataunit){
        scopeThis.loginData.ly0.arrUser0 = scopeThis.loginData.ly0.arrUser.filter(i=>{
            return i.id_dataunit === scopeThis.loginData.ly0.id_dataunit
        })
    }else{
        scopeThis.loginData.ly0.arrUser0 = scopeThis.loginData.ly0.arrUser.concat([])
    }
}

// 级联 - 数据单元
function id_dataunitChange({scopeThis}){
    scopeThis.loginData.ly0.id_group = null
    setArrGroup0({scopeThis})
    setArrUser0({scopeThis})
}

// 应用入口
async function submit({scopeThis}){
    if(scopeThis.loginData.ly0.arrUser0.length === 0){
        ElMessage("用户不存在")
        scopeThis.showPg = "password" // 返回密码登录页面
        return
    }

    let objDataunit = scopeThis.loginData.ly0.arrDataunit.find(i=>{
        return i._id === scopeThis.loginData.ly0.id_dataunit
    })
    if(!objDataunit){
        ElMessage('数据单元错误')
        scopeThis.showPg = "password" // 返回密码登录页面
        return
    }
    if(!!objDataunit.systemoff){
        ElMessage('数据单元关闭')
        scopeThis.showPg = "password" // 返回密码登录页面
        return
    }

    // 发生新session
    await scopeThis.handlers.newSession({scopeThis})

    // 用户组（应用入口）处理
    const objGroup = scopeThis.loginData.ly0.arrGroup0.find(i=>{
        return i._id === scopeThis.loginData.ly0.id_group
    })
    if(!objGroup || !objGroup.route){
        ElMessage('用户组或应用入口错误')
        scopeThis.showPg = "password"
        return
    }
    const route_type = objGroup.route_type || "1",
        route = objGroup.route

    // 关闭登录窗口
    if(scopeThis.popup.switch){
        scopeThis.popup.visible = false
    }

    // 应用跳转（应用入口）
    ly0request.ly0.navigate({
        code: route_type,
        path: route,
        routerInstance: scopeThis.routerInstance
    })
}

function cancel({scopeThis}){
    scopeThis.showPg = "password"
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
