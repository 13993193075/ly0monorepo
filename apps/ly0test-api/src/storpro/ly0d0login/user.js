// 通过账号id获取用户及相关信息
async function withId_login({data, dependencies}){
    // data.id_login
    // data.usertbl 用户表名

    // 用户表名
    const usertbl = !!data.usertbl ? data.usertbl : "ly0d0user"

    // 获取用户信息
    let result = await dependencies.GQuery.GQuery({
        tblName: usertbl,
        operator: "find",
        query: {id_login: data.id_login}
    })
    const arrUser = result.data

    // 获取数据单元及用户组信息
    result = await withArrUser({data: {arrUser}, dependencies})
    return {code: 0, message: "",
        data: {
            arrUser,
            arrDataunit: result.data.arrDataunit,
            arrGroup: result.data.arrGroup
        }
    }
}

// 获取数据单元及用户组信息
async function withArrUser({data, dependencies}){
    // data.arrUser

    const arrIdDataunit = [],
        arrIdGroup = []
    data.arrUser.forEach(i=>{
        if(!!i.id_dataunit){
            arrIdDataunit.push(i.id_dataunit)
        }
        if(!!i.id_group){
            arrIdGroup.push(i.id_group)
        }
    })

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0dataunit",
        operator: "find",
        query: {_id: {$in: arrIdDataunit}},
        sort: {_id: -1}
    })
    const arrDataunit = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0group",
        operator: "find",
        query: {_id: {$in: arrIdGroup}},
        sort: {_id: -1}
    })
    const arrGroup = result.data

    return {code: 0, message: "",
        data: {
            arrDataunit,
            arrGroup
        }
    }
}

export default {
    withId_login,
    withArrUser
}