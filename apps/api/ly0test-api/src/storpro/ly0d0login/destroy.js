import {GQuery} from '../../main/GQuery.js'

// 注销工号
function number(data) {
    // data.number

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0number",
            operator: "deleteMany",
            query: {number: data.number}
        }).then(() => {
            resolve({code: 0, message: "工号已注销"})
        })
    })
}

// 注销手机号
function cellphone(data) {
    // data.cellphone

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0cellphone",
            operator: "deleteMany",
            query: {cellphone: data.cellphone}
        }).then(() => {
            resolve({code: 0, message: "手机号已注销"})
        })
    })
}

// 注销email
function email(data) {
    // data.email

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0email",
            operator: "deleteMany",
            query: {email: data.email}
        }).then(() => {
            return resolve({code: 0, message: "email已注销"})
        })
    })
}

// 注销微信
function wx(data){
    // data.appid
    // data.openid

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0wx",
            operator: "deleteMany",
            query: {
                appid: data.appid,
                openid: data.openid
            }
        }).then(() => {
            resolve({code: 0, message: "微信已注销"})
        })
    })
}

// 查询注册信息
function id_login(data) {
    // data.id_login

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d0login",
            operator: "findOne",
            query: {_id: data.id_login}
        }).then(result => {
            let objLogin = result.data
            GQuery({
                tblName: "ly0d0number",
                operator: "find",
                query: {id_login: data.id_login}
            }).then(result => {
                let arrNumber = result.data
                GQuery({
                    tblName: "ly0d0cellphone",
                    operator: "find",
                    query: {id_login: data.id_login}
                }).then(result => {
                    let arrCellphone = result.data
                    GQuery({
                        tblName: "ly0d0email",
                        operator: "find",
                        query: {id_login: data.id_login}
                    }).then(result => {
                        let arrEmail = result.data
                        GQuery({
                            tblName: "ly0d0wx",
                            operator: "find",
                            query: {id_login: data.id_login}
                        }).then(result => {
                            let arrWx = result.data
                            resolve({code: 0, message: "",
                                data: {
                                    objLogin,
                                    arrNumber,
                                    arrCellphone,
                                    arrEmail,
                                    arrWx
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

// 注销账号
function destroy(data){
    // data.id_login

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0number",
            operator: "deleteMany",
            query: {id_login: data.id_login}
        }).then(() => {
            GQuery({
                tblName: "ly0d0cellphone",
                operator: "deleteMany",
                query: {id_login: data.id_login}
            }).then(() => {
                GQuery({
                    tblName: "ly0d0email",
                    operator: "deleteMany",
                    query: {id_login: data.id_login}
                }).then(() => {
                    GQuery({
                        tblName: "ly0d0wx",
                        operator: "deleteMany",
                        query: {id_login: data.id_login}
                    }).then(() => {
                        GQuery({
                            tblName: "ly0d0login",
                            operator: "deleteOne",
                            query: {_id: data.id_login}
                        }).then(() => {
                            resolve({code: 0, message: "账号已注销"})
                        })
                    })
                })
            })
        })
    })
}

export default {
    number,
    cellphone,
    email,
    wx,
    id_login,
    destroy
}