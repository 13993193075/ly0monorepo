// 获取验证码
async function getVercode ({data, dependencies}) {
    // data.email
    const codeLength = 6, // 验证码长度
        time = new Date(), // 验证码发生时间
        minutes = 5 // 几分钟内有效

    if(!data.email){
        return {code: 1, message: "没有Email"}
    }
    if (!dependencies.ly0utils.utils.regexp.email(data.email)) {
        return {code: 1, message: "Email格式错误"}
    }

    // 发送验证码
    const result = dependencies.ly0nodejs.Email.sendVercode(data.email, codeLength, minutes)
    if(result.success){
        return{code: 0, message: 'Email获取验证码成功',
            data: {
                email: data.email,
                vercode: result.vercode,
                time,
                minutes
            }
        }
    }else{
        return {code: 1, message: 'Email获取验证码失败'}
    }
}

// 获取验证码 - 登录时
async function getVercodeLogin ({data, dependencies}) {
    // data.email

    // 获取Email注册信息
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0email',
        operator: 'findOne',
        query: {email: data.email}
    })
    if(!result.data){
        return {code: 1, message: "Email未注册"}
    }
    const objEmail = result.data

    // 获取验证码
    const resultGetVercode = await getVercode({email: data.email})
    if (resultGetVercode.code !== 0) {
        return {code: 1, message: "获取验证码失败"}
    }

    // 验证码加密
    const vercodeCipherText = resultGetVercode.data.vercode ? dependencies.ly0nodejs.crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
    // 缓存验证码
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0email',
        operator: 'updateOne',
        query: {_id: objEmail._id},
        update: {
            vercode: vercodeCipherText,
            time: resultGetVercode.data.time,
            minutes: resultGetVercode.data.minutes
        }
    })
    return {code: 0, message: "获取验证码成功"}
}

// Email验证码登录
async function login({data, dependencies}){
    // data.email
    // data.vercode

    if(!data.email){
        return {code: 1, message: "没有Email"}
    }
    // Email格式
    if (!dependencies.ly0utils.utils.regexp.email(data.email)) {
        return {code: 1, message: "Email格式错误"}
    }
    if(!data.vercode){
        return {code: 1, message: "没有验证码"}
    }
    // 验证码加密
    const vercodeCipherText = data.vercode ? dependencies.ly0nodejs.crypto.Hash.sha256(data.vercode) : ""

    // 获取Email注册信息
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0email',
        operator: 'findOne',
        query: {email: data.email}
    })
    if(!result.data){
        return {code: 1, message: "Email未注册"}
    }
    const objEmail = result.data

    // Email登录许可验证
    if(!objEmail.vercode || objEmail.vercode !== vercodeCipherText){
        return {code: 1, message: "验证码错误"}
    }
    return {code: 0, message: "Email验证码登录成功",
        id_login: objEmail.id_login
    }
}

// 获取验证码 - 绑定时
async function getVercodeBind ({data, dependencies}) {
    // data.id_login
    // data.email

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }
    if(!data.email){
        return {code: 1, message: "没有Email"}
    }
    // Email格式
    if (!dependencies.ly0utils.utils.regexp.email(data.email)) {
        return {code: 1, message: "Email格式错误"}
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
    const objLogin = result.data

    // 获取验证码并发送
    const resultGetVercode = await getVercode({email: data.email})
    if (resultGetVercode.code !== 0) {
        return {code: 1, message: "获取验证码失败"}
    }

    // 验证码加密
    const vercodeCipherText = resultGetVercode.data.vercode ? dependencies.ly0nodejs.crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
    // 缓存验证码
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0email",
        operator: "updateOne",
        query: {email: data.email},
        update: {
            id_login: objLogin._id,
            email: data.email,
            vercode: vercodeCipherText,
            time: resultGetVercode.data.time,
            minutes: resultGetVercode.data.minutes
        },
        upsert: true
    })
    return {code: 0, message: "获取验证码成功"}
}

// email绑定
async function bind ({data, dependencies}) {
    // data.id_login
    // data.email
    // data.vercode
    // data.password

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }

    if(!data.email){
        return {code: 1, message: "没有Email"}
    }
    if (!dependencies.ly0utils.utils.regexp.email(data.email)) {
        return {code: 1, message: "Email格式错误"}
    }

    if(!data.vercode){
        return {code: 1, message: "没有验证码"}
    }
    // 验证码加密
    const vercodeCipherText = dependencies.ly0nodejs.crypto.Hash.sha256(data.vercode)

    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 登录密码格式验证
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
        tblName: 'ly0d0email',
        operator: 'findOne',
        query: {
            email: data.email
        }
    })
    // 绑定许可验证
    if(
        !result.data ||
        result.data.vercode !== vercodeCipherText
    ){
        return {code: 1, message: "Email或验证码错误"}
    }
    // 清空垃圾数据
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0email',
        operator: 'deleteMany',
        query: {email: data.email}
    })
    // 注册Email
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0email',
        operator: 'insertOne',
        update: {
            id_login: objLogin._id,
            email: data.email,
            password: passwordCipherText
        }
    })
    return {code: 0, message: '绑定Email成功'}
}

export default {
    getVercode,
    getVercodeLogin,
    login,
    getVercodeBind,
    bind
}