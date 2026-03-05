// 初始化
const navigation = 'first'

// 内部模块：查询修正
function queryRevise (data) {
    const data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.navigation = navigation

    // 名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
    // 排序
    const sort = {}
    if(data.sort && data.sort.label && data.sort.order){
        if(data.sort.order === "ascending"){
            sort[data.sort.label] = 1
        }else if(data.sort.order === "descending"){
            sort[data.sort.label] = -1
        }else{
            sort[data.sort.label] = 1
        }
    }else{
        sort.route_type = 1
        sort.route = 1
    }

    const resultData = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0test',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0test',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule (data) {
    if (!data.name) {
        return {code: 1, message: '名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.name
    // data.route_type
    // data.route

    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0test',
        operator: 'insertOne',
        update: {
            navigation,
            name: data.name,
            route_type: data.route_type ? data.route_type : "",
            route_type_text: data.route_type ? (data.route_type === "1" ? "VUE路由" : "URL") : "",
            route: data.route ? data.route : ""
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.name
    // data.route_type
    // data.route

    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0test',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            navigation,
            name: data.name,
            route_type: data.route_type ? data.route_type : "",
            route_type_text: data.route_type ? (data.route_type === "1" ? "VUE路由" : "URL") : "",
            route: data.route ? data.route : ""
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    // data._id

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0test',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne
}
