// 注销工号
async function number({data, dependencies}) {
    // data.number

    await dependencies.GQuery.GQuery({
        tblName: "ly0d0number",
        operator: "deleteMany",
        query: {number: data.number}
    })
    return {code: 0, message: "工号已注销"}
}

// 注销手机号
async function cellphone({data, dependencies}) {
    // data.cellphone

    await dependencies.GQuery.GQuery({
        tblName: "ly0d0cellphone",
        operator: "deleteMany",
        query: {cellphone: data.cellphone}
    })
    return {code: 0, message: "手机号已注销"}
}

// 注销email
async function email({data, dependencies}) {
    // data.email

    await dependencies.GQuery.GQuery({
        tblName: "ly0d0email",
        operator: "deleteMany",
        query: {email: data.email}
    })
    return {code: 0, message: "email已注销"}
}

// 注销微信
async function wx({data, dependencies}){
    // data.appid
    // data.openid

    await dependencies.GQuery.GQuery({
        tblName: "ly0d0wx",
        operator: "deleteMany",
        query: {
            appid: data.appid,
            openid: data.openid
        }
    })
    return {code: 0, message: "微信已注销"}
}

// 查询注册信息
async function id_login({data, dependencies}) {
    // data.id_login

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "findOne",
        query: {_id: data.id_login}
    })
    const objLogin = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0number",
        operator: "find",
        query: {id_login: data.id_login}
    })
    const arrNumber = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0cellphone",
        operator: "find",
        query: {id_login: data.id_login}
    })
    const arrCellphone = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0email",
        operator: "find",
        query: {id_login: data.id_login}
    })
    const arrEmail = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0wx",
        operator: "find",
        query: {id_login: data.id_login}
    })
    const arrWx = result.data
    return {code: 0, message: "",
        data: {
            objLogin,
            arrNumber,
            arrCellphone,
            arrEmail,
            arrWx
        }
    }
}

// 注销账号
async function destroy({data, dependencies}){
    // data.id_login

    await dependencies.GQuery.GQuery({
        tblName: "ly0d0number",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0cellphone",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0email",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0wx",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0login",
        operator: "deleteOne",
        query: {_id: data.id_login}
    })
    return {code: 0, message: "账号已注销"}
}

export default {
    number,
    cellphone,
    email,
    wx,
    id_login,
    destroy
}