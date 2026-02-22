import {GQuery} from '../../main/GQuery.js'
import code from './code.js'

// 内部模块：查询修正
function queryRevise(data) {
    const data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit
    // 邮寄状态（只能查询分拣中及以后状态）
    if(
        !data0.postal_status_code ||
        (
            data0.postal_status_code !== "1" &&
            data0.postal_status_code !== "2" &&
            data0.postal_status_code !== "3"
        )
    ){
        data1.postal_status_code = {$in: ["1", "2", "3"]}
    }else{
        data1.postal_status_code = data0.postal_status_code
    }

    // 商品编号 模糊匹配
    if (data0.number){
        data1.number = {'$regex': `.*${data0.number}.*`}
    }
    // 商品名称，模糊匹配
    if (data0.name){
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 订单id
    if(data0.id_business){
        data1.id_business = data0.id_business
    }
    // 邮寄开始时间
    if (data0.postal_time_start || data0.postal_time_end) {
        data1.postal_time = {}
        if (data0.postal_time_start) {
            data1.postal_time.$gte = data0.postal_time_start
        }
        if (data0.postal_time_end) {
            data1.postal_time.$lte = data0.postal_time_end
        }
    }
    // 分拣完成时间
    if (data0.postal_sorted_time_start || data0.postal_sorted_time_end) {
        data1.postal_sorted_time = {}
        if (data0.postal_sorted_time_start) {
            data1.postal_sorted_time.$gte = data0.postal_sorted_time_start
        }
        if (data0.postal_sorted_time_end) {
            data1.postal_sorted_time.$lte = data0.postal_sorted_time_end
        }
    }
    // 收货时间
    if (data0.postal_received_time_start || data0.postal_received_time_end) {
        data1.postal_received_time = {}
        if (data0.postal_received_time_start) {
            data1.postal_received_time.$gte = data0.postal_received_time_start
        }
        if (data0.postal_received_time_end) {
            data1.postal_received_time.$lte = data0.postal_received_time_end
        }
    }
    // 邮寄地址行政区划，左匹配
    let str = ""
    if (data0.postal_gbt2260code) {
        if (data0.postal_gbt2260code.endsWith("0000")) {
            str = data0.postal_gbt2260code.slice(0, 2)
            data1.postal_gbt2260code = {'$regex': `^${str}`}
        } else if (data0.postal_gbt2260code.endsWith("00")) {
            str = data0.postal_gbt2260code.slice(0, 4)
            data1.postal_gbt2260code = {'$regex': `^${str}`}
        } else {
            data1.postal_gbt2260code = data0.postal_gbt2260code
        }
    }
    // 收货联系电话，模糊匹配
    if (data0.postal_tel){
        data1.postal_tel = {'$regex': `.*${data0.postal_tel}.*`}
    }
    // 收货联系人
    // 商品名称
    if (data0.postal_name){
        data1.postal_name = {'$regex': `.*${data0.postal_name}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.number
    // data.query.name
    // data.query.id_business
    // data.query.postal_status_code
    // data.query.postal_time_start
    // data.query.postal_time_end
    // data.query.postal_sorted_time_start
    // data.query.postal_sorted_time_end
    // data.query.postal_received_time_start
    // data.query.postal_received_time_end
    // data.query.postal_gbt2260code
    // data.query.postal_tel
    // data.query.postal_name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
    // 排序
    const sort = {}
    if (data.sort && data.sort.label && data.sort.order) {
        if (data.sort.order === 'ascending') {
            sort[data.sort.label] = 1
        } else if (data.sort.order === 'descending') {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort['postal_time'] = -1
    }

    const resultData = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "countDocuments",
        query
    })
    return {
        data: resultData.data,
        total: resultTotal.count
    }
}

// 修改邮寄状态
async function setPostalStatus(data) {
    // data._id
    // data.postal_status_code

    // 提交
    const thisTime = new Date()
    const update = {
        postal_status_code: data.postal_status_code,
        postal_status_text: code.postalStatus.find(i=>{
            return i.code === data.postal_status_code
        }).text
    }
    if(data.postal_status_code === "2"){
        update.postal_sorted_time = thisTime
    }
    if(data.postal_status_code === "3"){
        update.postal_received_time = thisTime
    }
    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "updateOne",
        query: {_id: data._id},
        update
    })
    return {code: 0, message: "修改邮寄状态成功"}
}

// 获取页面初始化数据
function getPgData() {
    return {code: 0, message: "",
        data: {
            codePostalStatus: code.postalStatus
        }
    }
}

export default {
    find,
    setPostalStatus,
    getPgData
}
