import {GQuery} from '../../main/GQuery.js'

// 通过账号id获取用户及相关信息
function withId_login(data){
    // data.id_login
    // data.usertbl 用户表名

    return new Promise((resolve, reject)=>{
        // 用户表名
        let usertbl = !!data.usertbl ? data.usertbl : "ly0d0user"

        // 获取用户信息
        GQuery({
            tblName: usertbl,
            operator: "find",
            query: {id_login: data.id_login}
        }).then(result=>{
            let arrUser = result.data

            // 获取数据单元及用户组信息
            withArrUser({arrUser}).then(result=>{
                resolve({code: 0, message: "",
                    data: {
                        arrUser,
                        arrDataunit: result.data.arrDataunit,
                        arrGroup: result.data.arrGroup
                    }
                })
            })
        })
    })
}

// 获取数据单元及用户组信息
function withArrUser(data){
    // data.arrUser

    return new Promise(function (resolve, reject) {
        let arrIdDataunit = [],
            arrIdGroup = []
        data.arrUser.forEach(i=>{
            if(!!i.id_dataunit){
                arrIdDataunit.push(i.id_dataunit)
            }
            if(!!i.id_group){
                arrIdGroup.push(i.id_group)
            }
        })

        GQuery({
            tblName: "ly0d0dataunit",
            operator: "find",
            query: {_id: {$in: arrIdDataunit}},
            sort: {_id: -1}
        }).then(result => {
            let arrDataunit = result.data
            GQuery({
                tblName: "ly0d0group",
                operator: "find",
                query: {_id: {$in: arrIdGroup}},
                sort: {_id: -1}
            }).then(result => {
                let arrGroup = result.data

                resolve({code: 0, message: "",
                    data: {
                        arrDataunit,
                        arrGroup
                    }
                })
            })
        })
    })
}

export default {
    withId_login,
    withArrUser
}