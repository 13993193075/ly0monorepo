import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"
import ly0d9property from './property.js'

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 物业单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 户号，模糊匹配
        if (data0.number) {
            data1.number = {'$regex': `.*${data0.number}.*`}
        }
        // 户名，模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }
        // 位置 _id
        if (data0.id_position) {
            data1.id_position = data0.id_position
        }
        // 户型 _id
        if (data0.id_sizetype) {
            data1.id_sizetype = data0.id_sizetype
        }
        // 业主手机号
        if (data0.owner_cellphone) {
            data1.owner_cellphone = data0.owner_cellphone
        }
        // 业主名称（姓名） 模糊匹配
        if (data0.owner_name) {
            data1.owner_name = {'$regex': `.*${data0.owner_name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.number
    // data.query.name
    // data.query.id_position
    // data.query.id_sizetype
    // data.query.owner_cellphone
    // data.query.owner_name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then(q => { // 查询修正
            //  排序
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
                    tblName: 'ly0d9property',
                    operator: 'find',
                    query: q,
                    sort: {number: 1},
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d9property',
                    operator: 'countDocuments',
                    query: q
                })
            ]).then(function (result) {
                let data = result [0].data ? result [0].data : [],
                    count = result [1].count

                // 分组找到每一物业所有服务类项目的最后一条缴费记录
                GQuery({
                    tblName: 'ly0d9b_goods',
                    operator: 'aggregate',
                    aggregate: [
                        {
                            $project: {
                                id_this: 1,
                                id_property: {$toString: '$id_property'},
                                id_goods: {$toString: '$id_goods'},
                                goods_name: 1,
                                method_text: 1,
                                price: 1,
                                from: 1,
                                to: 1,
                                amount: 1,
                                time: 1,
                                deal: 1,
                                dealnote: 1
                            }
                        },
                        {
                            $match: {
                                id_property: {
                                    $in: data.map(i => {
                                        return '' + i._id
                                    })
                                }
                            }
                        },
                        {$sort: {to: -1}},
                        {
                            $group: {
                                _id: {$concat: ['$id_property', ' ', '$id_goods']},
                                id_this: {$first: '$_id'},
                                id_property: {$first: '$id_property'},
                                goods_name: {$first: '$goods_name'},
                                method_text: {$first: '$method_text'},
                                price: {$first: '$price'},
                                from: {$first: '$from'},
                                to: {$first: '$to'},
                                amount: {$first: '$amount'},
                                time: {$first: '$time'},
                                deal: {$first: '$deal'},
                                dealnote: {$first: '$dealnote'}
                            }
                        }
                    ]
                }).then(result => {
                    let aggrGoods = result.data
                    // 分组找到每一物业所有资源类项目的最后一条缴费记录
                    GQuery({
                        tblName: 'ly0d9b_goods0',
                        operator: 'aggregate',
                        aggregate: [
                            {
                                $project: {
                                    id_this: 1,
                                    id_property: {$toString: '$id_property'},
                                    id_goods: {$toString: '$id_goods'},
                                    goods_name: 1,
                                    price: 1,
                                    count: 1,
                                    amount: 1,
                                    deal: 1,
                                    dealnote: 1,
                                    time: 1
                                }
                            },
                            {
                                $match: {
                                    id_property: {
                                        $in: data.map(i => {
                                            return '' + i._id
                                        })
                                    }
                                }
                            },
                            {$sort: {time: -1}},
                            {
                                $group: {
                                    _id: {$concat: ['$id_property', ' ', '$id_goods']},
                                    id_this: {$first: '$_id'},
                                    id_property: {$first: '$id_property'},
                                    goods_name: {$first: '$goods_name'},
                                    price: {$first: '$price'},
                                    count: {$first: '$count'},
                                    amount: {$first: '$amount'},
                                    deal: {$first: '$deal'},
                                    dealnote: {$first: '$dealnote'},
                                    time: {$first: '$time'}
                                }
                            }
                        ]
                    }).then(result => {
                        let aggrGoods0 = result.data

                        let data0 = data.map(dataI => {
                            let data0I = JSON.parse(JSON.stringify(dataI))

                            // 过滤每一物业对应的服务类项目缴费记录
                            let goods_data = aggrGoods.filter((pI) => {
                                return String(pI.id_property) === String(data0I._id)
                            })
                            // 记录级附加
                            if (goods_data && goods_data.length > 0) {
                                data0I.goods_data = goods_data
                            } else {
                                data0I.goods_data = null
                            }

                            // 过滤每一物业对应的资源类项目缴费记录
                            let goods0_data = aggrGoods0.filter((p0I) => {
                                return String(p0I.id_property) === String(data0I._id)
                            })
                            // 记录级附加
                            if (goods0_data && goods0_data.length > 0) {
                                data0I.goods0_data = goods0_data
                            } else {
                                data0I.goods0_data = null
                            }

                            return data0I
                        })

                        resolve({
                            data: data0,
                            count
                        })
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne (data) {
    // data._id

    return new Promise((resolve, reject) => {
        utils.id_business.id_property({
            id_property: data._id
        }).then(result=>{
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d9meterrecord',
            operator: 'deleteMany',
            query: {id_business: _id}
        }).then(() => {
            GQuery({
                tblName: 'ly0d9b_goods',
                operator: 'deleteMany',
                query: {id_business: _id}
            }).then(() => {
                GQuery({
                    tblName: 'ly0d9b_goods0',
                    operator: 'deleteMany',
                    query: {id_business: _id}
                }).then(() => {
                    GQuery({
                        tblName: 'ly0d9memo',
                        operator: 'deleteMany',
                        query: {id_business: _id}
                    }).then(() => {
                        GQuery({
                            tblName: 'ly0d9business',
                            operator: 'deleteOne',
                            query: {_id}
                        }).then(() => {
                            resolve({code: 0, message: '删除成功'})
                        })
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据（树形图）
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：物业单位id

    return new Promise((resolve, reject) => {
        ly0d9property.getPageData(data).then(result => {
            resolve({code: 0, message: "",
                data: {
                    arrUnit: result.arrUnit,
                    arrPosition: result.arrPosition,
                    arrSizetype: result.arrSizetype,
                    arrProperty: result.arrProperty
                }
            })
        })
    })
}

export default {
    find,
    findOne,
    deleteOne,
    getPageData,
    business_new: utils.id_business.business_new,
    business_cancel: utils.id_business.business_cancel
}
