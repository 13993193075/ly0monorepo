import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save.js'
import {GBT} from 'packages/ly0utils/src/index.js'

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {$and: []}

        if (data0._id) { // _id 必须置于首项查询
            data1.$and.push({_id: data0._id})
            return resolve(data1)
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

        resolve(data1)
    })
}

// 分页查询
function find(data) {
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

    return new Promise(function (resolve, reject) {
        queryRevise(data.query).then(query => { // 查询修正
            // 排序
            let sort
            if (data.sort && data.sort.label && data.sort.order) {
                sort = {}
                if (data.sort.order === 'ascending') {
                    sort[data.sort.label] = 1
                } else if (data.sort.order === 'descending') {
                    sort[data.sort.label] = -1
                } else {
                    sort[data.sort.label] = 1
                }
            } else {
                sort = {_id: -1}
            }

            Promise.all([
                GQuery({
                    tblName: "ly0d7goods",
                    operator: "find",
                    query,
                    sort: {number: 1},
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: "ly0d7goods",
                    operator: "countDocuments",
                    query
                })
            ]).then(result => {
                resolve({
                    data: result[0].data.map(i=>{
                        return Object.assign(i, {
                            thumb: imageDomain + i.thumb,
                            illustration: i.illustration.map(j=>{
                                return imageDomain + j
                            })
                        })
                    }),
                    count: result[1].count
                })
            })
        })
    })
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
function insertOne(data) {
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

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
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
        GQuery({
            tblName: "ly0d7shop",
            operator: "findOne",
            query: {
                _id: data.id_shop
            }
        }).then(result=>{
            let objShop = result.data
            GQuery({
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
            }).then(result => {
                let objGoods = result.data
                // 缩略图处理
                ImageSave.imageAppend({
                    uploaded: data.thumb,
                    dataunitId: objGoods.id_dataunit,
                    tblName: "ly0d7goods",
                    fieldName: "thumb",
                    dataId: objGoods._id
                }).then(function (thumb) {
                    // 商品图示处理
                    ImageSave.imagesAppend({
                        arrUploaded: data.illustration,
                        dataunitId: objGoods.id_dataunit,
                        tblName: "ly0d7goods",
                        fieldName: "illustration",
                        dataId: objGoods._id
                    }).then(function (illustration) {
                        GQuery({
                            tblName: "ly0d7goods",
                            operator: "updateOne",
                            query: {_id: objGoods._id},
                            update: {
                                thumb,
                                illustration
                            }
                        }).then(() => {
                            resolve({code: 0, message: "提交成功",
                                _id: objGoods._id
                            })
                        })
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne(data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d7goods",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "已查询一条记录",
                doc: Object.assign(result.data, {
                    thumb: imageDomain + result.data.thumb,
                    illustration: result.data.illustration.map(i=>{
                        return imageDomain + i
                    })
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
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

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message) // 不能提交
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
        GQuery({
            tblName: "ly0d7goods",
            operator: "findOne",
            query: {_id: data._id},
            update: {
            }
        }).then(result => {
            let objGoods = result.data
            // 缩略图处理
            ImageSave.imageUpdate({
                uploaded: data.thumbNew,
                old: objGoods.thumb,
                deleteIfNotUploaded: "thumbDelete" in data && (data.thumbDelete === true || data.thumbDelete === "true"),
                dataunitId: objGoods.id_dataunit,
                tblName: "ly0d7goods",
                fieldName: "thumb",
                dataId: objGoods._id
            }).then(function (thumb) {
                // 商品图示处理
                ImageSave.imagesUpdate({
                    arrUploaded: data.illustrationNew,
                    arrOld: objGoods.illustration,
                    arrDelete: data.illustrationDelete,
                    dataunitId: objGoods.id_dataunit,
                    tblName: "ly0d7goods",
                    fieldName: "illustration",
                    dataId: objGoods._id
                }).then(function (illustration) {
                    GQuery({
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
                    }).then(() => {
                        resolve({code: 0, message: "修改成功"})
                    })
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d7b_goods",
            operator: "findOne",
            query: {id_goods: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d7b_goods"});
            }

            GQuery({
                tblName: "ly0d7goods",
                operator: "findOne",
                query: {_id}
            }).then(result => {
                let objGoods = result.data
                // 缩略图处理
                ImageSave.imageDelete({url: objGoods.thumb}).then(function () {
                    // 商品图示处理
                    ImageSave.imagesDelete({arrUrl: objGoods.illustration}).then(()=>{
                        GQuery({
                            tblName: "ly0d7goods",
                            operator: "deleteOne",
                            query: {_id}
                        }).then(() => {
                            resolve({code: 0, message: "删除成功"})
                        })
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_shop) {
            q._id = data.id_shop
            q0.id_shop = data.id_shop
        }

        GQuery({
            tblName: "ly0d7shop",
            operator: "find",
            query: q
        }).then(result => {
            let arrShop = result.data
            GQuery({
                tblName: "ly0d7goods",
                operator: "find",
                query: q0
            }).then(result => {
                let arrGoods = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrShop,
                        arrGoods,
                        gbt2659: GBT.gbt2659
                    }
                })
            })
        })
    })
}

// 设置商品分类
function setGroup(data) {
    // data._id
    // data.group

    return new Promise(function (resolve, reject) {
        // 提交
        GQuery({
            tblName: "ly0d7goods",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                group: data.group ? data.group : null
            }
        }).then(() => {
            resolve({code: 0, message: "商品分类成功"})
        })
    })
}

// 设置商品规格
function setSize(data) {
    // data._id
    // data.size

    return new Promise(function (resolve, reject) {
        data.size.forEach(i=>{
            i.new = i.new === "true"
        })

        // 提交
        GQuery({
            tblName: "ly0d7goods",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                size: data.size ? data.size : null
            }
        }).then(() => {
            resolve({code: 0, message: "设置商品规格成功"})
        })
    })
}

// 设置商品标价
function setPrice(data) {
    // data._id
    // data.price

    return new Promise(function (resolve, reject) {
        data.price.forEach(i=>{
            i.member = i.member === "true"
            i.hot = i.hot === "true"
        })

        // 提交
        GQuery({
            tblName: "ly0d7goods",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                price: data.price ? data.price : null
            }
        }).then(() => {
            resolve({code: 0, message: "商品标价成功"})
        })
    })
}

// 设置商品缩略图
function setThumb(data) {
    // data._id
    // data.thumb
    // data.number
    // data.name

    return new Promise(function (resolve, reject) {
        // 提交
        GQuery({
            tblName: "ly0d7goods",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                number: data.number,
                name: data.name
            }
        }).then(() => {
            GQuery({
                tblName: "ly0d7goods",
                operator: "findOne",
                query: {_id: data._id}
            }).then(result=>{
                let oldData= result.data
                ImageSave.imageUpdate({
                    uploaded: data.thumb,
                    old: oldData.thumb,
                    dataunitId: oldData.id_dataunit,
                    tblName: "ly0d7goods",
                    fieldName: "thumb",
                    dataId: data._id
                }).then(thumb => {
                    GQuery({
                        tblName: "ly0d7goods",
                        operator: "updateOne",
                        query: {_id: data._id},
                        update: {thumb: thumb ? thumb : ""}
                    }).then(result => {
                        resolve({code: 0, message: "设置商品缩略图成功",
                            dataNew: result.dataNew[0]
                        })
                    })
                })
            })
        })
    })
}

// 修改商品图示
function setIllustration(data){
    // data._id
    // data.illustration
    // data.illustrationDelete
    // data.illustrationNew

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d7goods",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result=>{
            let objGoods = result[0]
            ImageSave.imagesUpdate({
                arrUploaded: data.illustrationNew,
                arrOld: data.illustration,
                arrDelete: data.illustrationDelete,
                dataunitId: objGoods.id_dataunit,
                tblName: "ly0d7goods",
                fieldName: "illustration",
                dataId: objGoods._id
            }).then(function (illustration) {
                GQuery({
                    tblName: "ly0d7goods",
                    operator: "updateOne",
                    query: {_id: objGoods._id},
                    update: {
                        illustration: !!illustration && illustration.length > 0 ? illustration : []
                    }
                }).then(() => {
                    resolve({code: 0, message: "修改成功"})
                })
            })
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne,
    getPageData,
    setGroup,
    setSize,
    setPrice,
    setThumb,
    setIllustration
}
