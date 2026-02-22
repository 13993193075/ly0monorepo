import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save.js'
import {GBT} from 'packages/ly0utils/src/index.js'

// 内部模块：查询修正
function queryRevise(data) {
    const data0 = data ? data : {},
        data1 = {$and: []}

    if (data0._id) { // _id 必须置于首项查询
        data1.$and.push({_id: data0._id})
        return data1
    }
    data1.$and.push({id_dataunit: data0.id_dataunit})

    // 商店 _id
    if (data0.id_shop) {
        data1.$and.push({id_shop: data0.id_shop})
    }
    // 商品编号 模糊匹配
    if (data0.number) {
        data1.$and.push({number: {'$regex': `.*${data0.number}.*`}})
    }
    // 商品名称 模糊匹配
    if (data0.name) {
        data1.$and.push({name: {'$regex': `.*${data0.name}.*`}})
    }
    // 商品分类 group
    if (data0.group && data0.group.length > 0) {
        data0.group.forEach(i=>{
            // 空值忽略
            if(!!i){
                data1.$and.push({
                    group: i
                })
            }
        })
    }
    // 商品规格 size
    if (data0.size && data0.size.length > 0) {
        data0.size.forEach(i=>{
            let q = {}
            // 空值忽略
            if(!!i.name){
                q.name = i.name
            }
            // 空值忽略
            if(!!i.size){
                q.size = i.size
            }
            // 上新标注false，忽略
            if(i.new === "true"){
                q.new = true
            }

            if(JSON.stringify(q) !== "{}"){
                data1.$and.push({
                    size: {
                        $elemMatch: q
                    }
                })
            }
        })
    }
    // 品牌 模糊匹配
    if (data0.brand) {
        data1.$and.push({brand: {'$regex': `.*${data0.brand}.*`}})
    }
    // 是否进口
    if("import" in data0 && data0.import !== null && data0.import !== "null"){
        if(data0.import === true || data0.import === 'true'){
            data1.import = true
        }else if(data0.import === false || data0.import === 'false'){
            data1.import = false
        }
    }
    // 国内产地 左匹配
    let str = ""
    if (data0.domestic_code) {
        if (data0.domestic_code.endsWith("0000")) {
            str = data0.domestic_code.slice(0, 2)
            data1.domestic_code = {'$regex': `^${str}`}
        } else if (data0.domestic_code.endsWith("00")) {
            str = data0.domestic_code.slice(0, 4)
            data1.domestic_code = {'$regex': `^${str}`}
        } else {
            data1.domestic_code = data0.domestic_code
        }
    }
    // 国外产地
    if (data0.foreign_code) {
        data1.foreign_code = data0.foreign_code
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_shop
    // data.query.number
    // data.query.name
    // data.query.group
    // data.query.size
    // data.query.brand
    // data.query.import
    // data.query.domestic_code
    // data.query.foreign_code
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
    // 排序
    let sort = {}
    if (data.sort && data.sort.label && data.sort.order) {
        if (data.sort.order === 'ascending') {
            sort[data.sort.label] = 1
        } else if (data.sort.order === 'descending') {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort['_id'] = -1
    }

    const resultData = await GQuery({
        tblName: "ly0d7goods",
        operator: "find",
        query,
        sort: {number: 1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7goods",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data.map(i=>{
            return Object.assign(i, {
                thumb: imageDomain.domain + i.thumb,
                illustration: i.illustration.map(j=>{
                    return imageDomain.domain + j
                })
            })
        }),
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.id_shop) {
        return {code: 1, message: "商店：必选项"}
    }
    if (!data.number) {
        return {code: 1, message: "商品编号：必填项"}
    }
    if (!data.name) {
        return {code: 1, message: "商品名称：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
async function insertOne(data) {
    // data.id_shop
    // data.number
    // data.name
    // data.group
    // data.size
    // data.price
    // data.brand
    // data.import
    // data.domestic_code
    // data.foreign_code
    // data.thumb
    // data.illustration

    // 数据约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }
    if(data.size && data.size.length > 0){
        data.size.forEach(i=>{
            i.new = i.new === "true"
        })
    }
    if(data.price && data.price.length > 0){
        data.price.forEach(i=>{
            i.member = i.member === "true"
            i.hot = i.hot === "true"
        })
    }

    // 提交
    let result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {
            _id: data.id_shop
        }
    })
    const objShop = result.data
    result = await GQuery({
        tblName: "ly0d7goods",
        operator: "insertOne",
        update: {
            id_dataunit: objShop.id_dataunit,
            dataunit_name: objShop.dataunit_name,
            id_shop: objShop._id,
            shop_name: objShop.name,
            number: data.number,
            name: data.name,
            group: data.group ? data.group : null,
            size: data.size ? data.size : null,
            price: data.price ? data.price : null,
            brand: data.brand ? data.brand : "",
            import: ("import" in data && (data.import === true || data.import === "true")),
            domestic_code: !!data.domestic_code ? data.domestic_code : "",
            domestic: !!data.domestic_code ? GBT.gbt2260code6.find(i=>{
                return i.code6 === data.domestic_code
            }).text6 : "",
            foreign_code: !!data.foreign_code ? data.foreign_code : "",
            foreign: !!data.foreign_code ? GBT.gbt2659.find(i=>{
                return i.code === data.foreign_code
            }) : ""
        }
    })
    const objGoods = result.data
    // 缩略图处理
    const thumb = await ImageSave.imageAppend({
        uploaded: data.thumb,
        dataunitId: objGoods.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "thumb",
        dataId: objGoods._id
    })
    // 商品图示处理
    const illustration = await ImageSave.imagesAppend({
        arrUploaded: data.illustration,
        dataunitId: objGoods.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "illustration",
        dataId: objGoods._id
    })
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: objGoods._id},
        update: {
            thumb,
            illustration
        }
    })
    return {code: 0, message: "插入一条记录成功",
        _id: objGoods._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_shop
    // data.number
    // data.name
    // data.group
    // data.size
    // data.price
    // data.brand
    // data.import
    // data.domestic_code
    // data.foreign_code
    // data.thumbDelete
    // data.thumbNew
    // data.illustrationDelete
    // data.illustrationNew

    // 数据约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message // 不能提交
    }
    if(data.size && data.size.length > 0){
        data.size.forEach(i=>{
            i.new = i.new === "true"
        })
    }
    if(data.price && data.price.length > 0){
        data.price.forEach(i=>{
            i.member = i.member === "true"
            i.hot = i.hot === "true"
        })
    }

    // 提交
    let result  = await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {_id: data._id},
        update: {
        }
    })
    const objGoods = result.data
    // 缩略图处理
    const thumb = await ImageSave.imageUpdate({
        uploaded: data.thumbNew,
        old: objGoods.thumb,
        deleteIfNotUploaded: "thumbDelete" in data && (data.thumbDelete === true || data.thumbDelete === "true"),
        dataunitId: objGoods.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "thumb",
        dataId: objGoods._id
    })
    // 商品图示处理
    const illustration = await ImageSave.imagesUpdate({
        arrUploaded: data.illustrationNew,
        arrOld: objGoods.illustration,
        arrDelete: data.illustrationDelete,
        dataunitId: objGoods.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "illustration",
        dataId: objGoods._id
    })
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: objGoods._id},
        update: {
            id_dataunit: objGoods.id_dataunit,
            dataunit_name: objGoods.dataunit_name,
            id_shop: objGoods.id_shop,
            shop_name: objGoods.shop_name,
            number: data.number,
            name: data.name,
            group: data.group ? data.group : null,
            size: data.size ? data.size : null,
            price: data.price ? data.price : null,
            brand: data.brand ? data.brand : "",
            import: ("import" in data && (data.import === true || data.import === "true")),
            domestic_code: !!data.domestic_code ? data.domestic_code : "",
            domestic: !!data.domestic_code ? GBT.gbt2260code6.find(i=>{
                return i.code6 === data.domestic_code
            }).text6 : "",
            foreign_code: !!data.foreign_code ? data.foreign_code : "",
            foreign: !!data.foreign_code ? GBT.gbt2659.find(i=>{
                return i.code === data.foreign_code
            }) : "",
            thumb,
            illustration
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({_id}) {
    let result = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "findOne",
        query: {id_goods: _id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d7b_goods"}
    }

    result = await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {_id}
    })
    const objGoods = result.data
    // 缩略图处理
    await ImageSave.imageDelete({url: objGoods.thumb})
    // 商品图示处理
    await ImageSave.imagesDelete({arrUrl: objGoods.illustration})
    await GQuery({
        tblName: "ly0d7goods",
        operator: "deleteOne",
        query: {_id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 获取页面初始化数据
async function getPgData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    const q = {id_dataunit: data.id_dataunit}
    const q0 = JSON.parse(JSON.stringify(q))
    if (data.id_shop) {
        q._id = data.id_shop
        q0.id_shop = data.id_shop
    }

    let result = await GQuery({
        tblName: "ly0d7shop",
        operator: "find",
        query: q
    })
    const arrShop = result.data
    result = await GQuery({
        tblName: "ly0d7goods",
        operator: "find",
        query: q0
    })
    const arrGoods = result.data
    return {code: 0, message: "",
        data: {
            arrShop,
            arrGoods,
            gbt2659: GBT.gbt2659
        }
    }
}

// 设置商品分类
async function setGroup(data) {
    // data._id
    // data.group

    // 提交
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            group: data.group ? data.group : null
        }
    })
    return {code: 0, message: "设置商品分类成功"}
}

// 设置商品规格
async function setSize(data) {
    // data._id
    // data.size

    data.size.forEach(i=>{
        i.new = i.new === "true"
    })

    // 提交
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            size: data.size ? data.size : null
        }
    })
    return {code: 0, message: "设置商品规格成功"}
}

// 设置商品标价
async function setPrice(data) {
    // data._id
    // data.price

    data.price.forEach(i=>{
        i.member = i.member === "true"
        i.hot = i.hot === "true"
    })

    // 提交
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            price: data.price ? data.price : null
        }
    })
    return {code: 0, message: "商品标价成功"}
}

// 设置商品缩略图
async function setThumb(data) {
    // data._id
    // data.thumb
    // data.number
    // data.name

    // 提交
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            number: data.number,
            name: data.name
        }
    })
    let result = await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {_id: data._id}
    })
    const oldData= result.data
    const thumb = await ImageSave.imageUpdate({
        uploaded: data.thumb,
        old: oldData.thumb,
        dataunitId: oldData.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "thumb",
        dataId: data._id
    })
    result = await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {thumb: thumb ? thumb : ""}
    })
    return {code: 0, message: "设置商品缩略图成功",
        dataNew: result.dataNew[0]
    }
}

// 修改商品图示
async function setIllustration(data){
    // data._id
    // data.illustration
    // data.illustrationDelete
    // data.illustrationNew

    const result= await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {_id: data._id}
    })
    const objGoods = result[0]
    const illustration = await ImageSave.imagesUpdate({
        arrUploaded: data.illustrationNew,
        arrOld: data.illustration,
        arrDelete: data.illustrationDelete,
        dataunitId: objGoods.id_dataunit,
        tblName: "ly0d7goods",
        fieldName: "illustration",
        dataId: objGoods._id
    })
    await GQuery({
        tblName: "ly0d7goods",
        operator: "updateOne",
        query: {_id: objGoods._id},
        update: {
            illustration: !!illustration && illustration.length > 0 ? illustration : []
        }
    })
    return {code: 0, message: "修改商品图示成功"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    setGroup,
    setSize,
    setPrice,
    setThumb,
    setIllustration
}
