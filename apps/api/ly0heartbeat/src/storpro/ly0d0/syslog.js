import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    // 只查我的数据单元 - 空查询
    if(data.id_dataunit && data.id_dataunit === "myDataunitNone"){
        return {
            $and: [
                {id_dataunit: null},
                {id_dataunit: {$ne: null}}
            ]
        }
    }

    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    // 登录账号id
    if (data0.id_login) {
        data1.id_login = data0.id_login
    }
    // 工号
    if (data0.number) {
        data1.number = data0.number
    }
    // 手机号
    if (data0.cellphone) {
        data1.cellphone = data0.cellphone
    }
    // email
    if (data0.email) {
        data1.email = data0.email
    }
    // email
    if (data0.email) {
        data1.email = data0.email
    }
    // 微信
    if (data0.wx_appid) {
        data1.wx_appid = data0.wx_appid
    }
    if (data0.wx_openid) {
        data1.wx_openid = data0.wx_openid
    }
    //
    if (data0.type) {
        data1.type = data0.type
    }
    // 数据单元
    if (data0.id_dataunit) {
        data1.id_dataunit = data0.id_dataunit
    }
    // 用户组
    if (data0.id_group) {
        data1.id_group = data0.id_group
    }
    // 用id
    if (data0.id_user) {
        data1.id_user = data0.id_user
    }
    // 用户表名
    if (data0.usertbl) {
        data1.usertbl = data0.usertbl
    }
    // 时间
    if (data0.time_start || data0.time_end) {
        data1.time = {}
        if (data0.time_start) {
            data1.time.$gte = data0.time_start
        }
        if (data0.time_end) {
            data1.time.$lte = data0.time_end
        }
    }
    // 备忘 模糊匹配
    if (data0.memo) {
        data1.memo = {'$regex': `.*${data0.memo}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_login
    // data.query.number
    // data.query.cellphone
    // data.query.email
    // data.query.wx_appid
    // data.query.wx_openid
    // data.query.type
    // data.query.id_dataunit
    // data.query.id_group
    // data.query.id_user
    // data.query.usertbl
    // data.query.time_start
    // data.query.time_end
    // data.query.memo
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
        // 排序
        let sort
        if(data.sort && data.sort.label && data.sort.order){
            sort = {}
            if(data.sort.order === "ascending"){
                sort[data.sort.label] = 1
            }else if(data.sort.order === "descending"){
                sort[data.sort.label] = -1
            }else{
                sort[data.sort.label] = 1
            }
        }else{
            sort = {_id: -1}
        }

        Promise.all([
            GQuery({
                tblName: "ly0d0syslog",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d0syslog",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data,
                total: result [1].count
            })
        })
    })
}

export default {
    find
}
