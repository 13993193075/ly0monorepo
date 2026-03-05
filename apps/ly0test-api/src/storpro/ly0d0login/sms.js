// 阿里云客户端参数集
const clientBox = {
    accessKeyId: process.env.ALI_SMS_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.ALI_SMS_ACCESS_KEY_SECRET || '',
    signName: process.env.ALI_SMS_SIGN_NAME || '',
    templateCode: process.env.ALI_SMS_TEMPLATE_CODE || '',
}

// 获取验证码
async function getVercode ({data, dependencies}) {
    // data.cellphone
    const codeLength = 6, // 验证码长度
        time = new Date(), // 验证码发生时间
        minutes = 5 // 几分钟内有效

    if(!data.cellphone){
        return {code: 1, message: "没有手机号"}
    }
    if (!dependencies.ly0utils.utils.regexp.cellphone(data.cellphone)) {
        return {code: 1, message: "手机号格式错误"}
    }

    // 调用阿里云接口
    const result = await dependencies.ly0nodejs.Ali.SMS.sendVercode(data.cellphone, codeLength, clientBox)
    if(result.code === 0){
        console.log('短信验证码：', result.vercode)
        return {code: 0, message: '获取验证码成功',
            data: {
                cellphone: data.cellphone,
                vercode: result.vercode,
                time,
                minutes
            }
        }
    }else{
        return {code: 1, message: '获取验证码失败'}
    }
}

// 获取验证码 - 登录时
async function getVercodeLogin ({data, dependencies}) {
    // data.cellphone

    // 获取手机号注册信息
    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'findOne',
        query: {cellphone: data.cellphone}
    })
    if(!result.data){
        return {code: 1, message: "手机号未注册"}
    }
    const objCellphone = result.data

    // 短信额度
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "findOne",
        query: {_id: objCellphone.id_login}
    })
    const objLogin = result.data
    if (!objLogin.count || objLogin.count <= 0) {
        return {code: 1, message: '短信额度剩余次数不足'}
    }

    // 获取验证码
    const resultGetVercode = await getVercode({cellphone: data.cellphone})
    if (resultGetVercode.code !== 0) {
        return {code: 1, message: "获取验证码失败"}
    }

    // 验证码加密
    const vercodeCipherText = resultGetVercode.data.vercode ?
        dependencies.ly0nodejs.crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
    // 缓存验证码
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'updateOne',
        query: {_id: objCellphone._id},
        update: {
            vercode: vercodeCipherText,
            time: resultGetVercode.data.time,
            minutes: resultGetVercode.data.minutes
        }
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "updateOne",
        query: {_id: objLogin._id},
        update: {
            count: objLogin.count - 1 // 短信额度剩余次数减1
        }
    })
    return {code: 0, message: "获取验证码成功"}
}

// 短信登录
async function login({data, dependencies}){
    // data.cellphone
    // data.vercode

    if(!data.cellphone){
        return {code: 1, message: "没有手机号"}
    }
    if (!dependencies.ly0utils.utils.regexp.cellphone(data.cellphone)){
        return {code: 1, message: "手机号格式错误"}
    }
    if(!data.vercode){
        return {code: 1, message: "没有验证码"}
    }
    // 验证码加密
    const vercodeCipherText = data.vercode ?
        dependencies.ly0nodejs.crypto.Hash.sha256(data.vercode) : ""

    // 获取手机号注册信息
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'findOne',
        query: {cellphone: data.cellphone}
    })
    if(!result.data){
        return {code: 1, message: "手机号未注册"}
    }
    const objCellphone = result.data

    // 短信登录许可验证
    if(!objCellphone.vercode || objCellphone.vercode !== vercodeCipherText){
        return {code: 1, message: "验证码错误"}
    }
    return {code: 0, message: "短信登录成功",
        id_login: objCellphone.id_login
    }
}

// 获取验证码 - 绑定时
async function getVercodeBind ({data, dependencies}) {
    // data.id_login
    // data.cellphone

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }
    if(!data.cellphone){
        return {code: 1, message: "没有手机号"}
    }
    if (!dependencies.ly0utils.utils.regexp.cellphone(data.cellphone)) {
        return {code: 1, message: "手机号格式错误"}
    }

    // 获取登录账号信息
    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "findOne",
        query: {_id: data.id_login}
    })
    if(!result.data){
        return {code: 0, message: "账号id错误"}
    }
    let objLogin = result.data

    // 短信额度
    if (!objLogin.count || objLogin.count <= 0) {
        return {code: 1, message: '短信额度剩余次数不足'}
    }

    // 获取验证码
    const resultGetVercode = await getVercode({cellphone: data.cellphone})
    if (resultGetVercode.code !== 0) {
        return {code: 1, message: "获取验证码失败"}
    }

    // 验证码加密
    const vercodeCipherText = resultGetVercode.data.vercode ?
        dependencies.ly0nodejs.crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
    // 缓存验证码
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0cellphone",
        operator: "updateOne",
        query: {cellphone: data.cellphone},
        update: {
            id_login: objLogin._id,
            cellphone: data.cellphone,
            vercode: vercodeCipherText,
            time: resultGetVercode.data.time,
            minutes: resultGetVercode.data.minutes
        },
        upsert: true
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "updateOne",
        query: {_id: objLogin._id},
        update: {count: objLogin.count - 1} // 短信额度剩余次数减1
    })
    return {code: 0, message: "获取验证码成功"}
}

// 手机号绑定
async function bind ({data, dependencies}) {
    // data.id_login
    // data.cellphone
    // data.vercode
    // data.password

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }

    if(!data.cellphone){
        return {code: 1, message: "没有手机号"}
    }
    if (!dependencies.ly0utils.utils.regexp.cellphone(data.cellphone)) {
        return {code: 1, message: "手机号格式错误"}
    }

    if(!data.vercode){
        return {code: 1, message: "没有验证码"}
    }
    // 验证码加密
    const vercodeCipherText = dependencies.ly0nodejs.crypto.Hash.sha256(data.vercode)

    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    if (!dependencies.ly0utils.utils.regexp.password(data.password)) {
        return {code: 1, message: '登录密码格式错误'}
    }
    // 登录密码加密
    const passwordCipherText = dependencies.ly0nodejs.crypto.Hash.sha256(data.password)

    // 获取登录账号信息
    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0login',
        operator: 'findOne',
        query: {_id: data.id_login}
    })
    if (!result.data) {
        return {code: 1, message: '账号id错误'}
    }
    const objLogin = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'findOne',
        query: {
            cellphone: data.cellphone
        }
    })
    // 绑定许可验证
    if(
        !result.data ||
        result.data.vercode !== vercodeCipherText
    ){
        return {code: 1, message: "手机号或验证码错误"}
    }
    // 清空垃圾数据
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'deleteMany',
        query: {cellphone: data.cellphone}
    })
    // 注册手机号
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0cellphone',
        operator: 'insertOne',
        update: {
            id_login: objLogin._id,
            cellphone: data.cellphone,
            password: passwordCipherText
        }
    })
    return {code: 0, message: '绑定手机号成功'}
}

export default {
    getVercode,
    getVercodeLogin,
    login,
    getVercodeBind,
    bind
}