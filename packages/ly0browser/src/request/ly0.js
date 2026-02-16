import axios from 'axios'
const domainPara = 'http://127.0.0.1:443'
const upload = '/ly0/upload-req/file'
const upload_image = '/ly0/upload-req/image'
const upload_carplate = '/ly0/upload-req/carplate'

// 后端请求
async function request({
    domain = domainPara,
    url = '', // 路由
    data = null // 请求数据
}) {
    let t0 = new Date() // 计时
    try {
        const response = await axios({
            url: (domain || '') + (url || ''),
            method: 'post',
            dataType: 'json',
            data: data ?? null
        })
        return response // response.data
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// ly0后端请求，需要处理session异常
async function ly0request({
    domain = domainPara,
    url = '', // 路由
    data = null, // 请求数据
    routerInstance = null // 路由实例
}){
    try {
        const response = await request({domain, url, data})

        // session 异常
        if (response.data.session && response.data.session.code !== 0) {
            console.log('session异常', response.data.session.message)

            const ly0session = ly0sessionLoad()
            ly0sessionSave({
                session: {
                    usertbl:
                        ly0session && ly0session.session && ly0session.session.usertbl
                        ? ly0session.session.usertbl
                        : 'ly0d0user',
                },
            })
            ly0sessionLose({routerInstance})
            return { code: 1, message: 'session 异常',
                session: response.data.session
            }
        }

        return response.data
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// 存储过程
async function storpro({
    storproName = '', // 存储过程名称
    data = null,
    domain = domainPara,
    noSession = false, // 不进行session验证
    routerInstance = null // 路由实例
}) {
    try {
        if(!storproName){
            return null
        }
        const result = await ly0request({
            domain,
            url: '/ly0/storpro/exec',
            data: {
                storproBody: {
                    storproName,
                    data: data ?? null,
                },
                noSession,
                ly0session: ly0sessionLoad(),
            },
            routerInstance
        })
        return result
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// session缓存
function ly0sessionSave(ly0session) {
    localStorage.setItem('ly0session', JSON.stringify(ly0session))
}

// session获取
function ly0sessionLoad() {
    return JSON.parse(localStorage.getItem('ly0session'))
}

// session清除
function ly0sessionClear() {
    localStorage.clear()
}

// session丢失
function ly0sessionLose({routerInstance}) {
    let ly0session = ly0sessionLoad(),
        lose = false,
        route = ''
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        !ly0session.session.id_user
    ) {
        lose = true
        switch (ly0session.session.usertbl) {
        case 'ly0d0user':
            route = '/'
            break
        case 'ly0d7guest':
            route = '/mall/*'
            break
        }
    }

    if (lose) {
        if(routerInstance){
            routerInstance.replace(route)
        }
    }
    return lose
}

// session丢失
function ly0sessionLoseWithUsertbl({routerInstance, usertbl}) {
    let ly0session = ly0sessionLoad(),
        lose = false,
        route = ''
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        !ly0session.session.id_user ||
        ly0session.session.usertbl !== usertbl
    ) {
        lose = true
        switch (usertbl) {
            case 'ly0d0user':
                route = '/'
                break
            case 'ly0d7guest':
                route = '/mall/*'
                break
        }
    }
    if (lose) {
        if(routerInstance){
            routerInstance.replace(route)
        }
    }
    return lose
}

// 导航
function navigate({
    code = '1', // 页面跳转类型
    path, // 跳转路径
    routerInstance // 路由实例
}){
    if(code === '0'){ // 页面跳转
        window.location.href = path
    }else if(code === '1'){ // VUE路由
        if(routerInstance){
            routerInstance.push(path)
        }
    }else{ // 默认VUE路由
        if(routerInstance){
            routerInstance.push(path)
        }
    }
}

const domain = domainPara
export {
    domain,
    upload,
    upload_image,
    upload_carplate,
    request,
    ly0request,
    storpro,
    ly0sessionSave,
    ly0sessionLoad,
    ly0sessionClear,
    ly0sessionLose,
    ly0sessionLoseWithUsertbl,
    navigate
}
export default {
    domain,
    upload,
    upload_image,
    upload_carplate,
    request,
    ly0request,
    storpro,
    ly0sessionSave,
    ly0sessionLoad,
    ly0sessionClear,
    ly0sessionLose,
    ly0sessionLoseWithUsertbl,
    navigate
}
