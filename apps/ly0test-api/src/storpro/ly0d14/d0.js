import {GQuery} from '../../main/GQuery.js'
import {GBT} from '@yoooloo42/ly0utils'
import code from './code/index.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    // 数据采样时间
    if (data0.time_start || data0.time_end) {
        data1.time_create = {}
        if (data0.time_start) {
            data1.time_create.$gte = data0.time_start
        }
        if (data0.time_end) {
            data1.time_create.$lte = data0.time_end
        }
    }
    // 姓名 模糊匹配
    if (data0.f0name) {
        data1.f0name = {'$regex': `.*${data0.f0name}.*`}
    }
    // 出生日期
    if (data0.f0birthdate_start || data0.f0birthdate_end) {
        data1.f0birthdate = {}
        if (data0.f0birthdate_start) {
            data1.f0birthdate.$gte = data0.f0birthdate_start
        }
        if (data0.f0birthdate_end) {
            data1.f0birthdate.$lte = data0.f0birthdate_end
        }
    }
    // 身份证号码
    if (data0.f0idnumber) {
        data1.f0idnumber = data0.f0idnumber
    }
    // 民族
    if (data0.f0nation_code) {
        data1.f0nation_code = data0.f0nation_code
    }
    // 籍贯 左匹配
    let str = ""
    if (data0.f0nativeplace_code) {
        if (data0.f0nativeplace_code.endsWith("0000")) {
            str = data0.f0nativeplace_code.slice(0, 2)
            data1.f0nativeplace_code = {'$regex': `^${str}`}
        } else if (data0.f0nativeplace_code.endsWith("00")) {
            str = data0.f0nativeplace_code.slice(0, 4)
            data1.f0nativeplace_code = {'$regex': `^${str}`}
        } else {
            data1.f0nativeplace_code = data0.f0nativeplace_code
        }
    }
    // 文化程度
    if (data0.f0education_code) {
        data1.f0education_code = data0.f0education_code
    }
    // 职业
    if (data0.f0occupation_code) {
        data1.f0occupation_code = data0.f0occupation_code
    }
    // 医保
    if (data0.f0insurance_code) {
        data1.f0insurance_code = data0.f0insurance_code
    }
    // 家庭人均月收入
    if (data0.f0income_code) {
        data1.f0income_code = data0.f0income_code
    }
    // 家庭住址 左匹配
    str = ""
    if (data0.f0address_code) {
        if (data0.f0address_code.endsWith("0000")) {
            str = data0.f0address_code.slice(0, 2)
            data1.f0address_code = {'$regex': `^${str}`}
        } else if (data0.f0address_code.endsWith("00")) {
            str = data0.f0address_code.slice(0, 4)
            data1.f0address_code = {'$regex': `^${str}`}
        } else {
            data1.f0address_code = data0.f0address_code
        }
    }
    // 手机号
    if (data0.f0cellphone) {
        data1.f0cellphone = data0.f0cellphone
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.time_start
    // data.query.time_end
    // data.query.f0name
    // data.query.f0birthdate_start
    // data.query.f0birthdate_end
    // data.query.f0idnumber
    // data.query.f0nation_code
    // data.query.f0nativeplace_code
    // data.query.f0education_code
    // data.query.f0occupation_code
    // data.query.f0insurance_code
    // data.query.f0income_code
    // data.query.f0address_code
    // data.query.f0cellphone
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let q = queryRevise(data.query) // 查询修正
        // 排序
        let sort
        if (data.sort && data.sort.label && data.sort.order) {
            sort = {}
            if (data.sort.order === "ascending") {
                sort[data.sort.label] = 1
            } else if (data.sort.order === "descending") {
                sort[data.sort.label] = -1
            } else {
                sort[data.sort.label] = 1
            }
        } else {
            sort = {_id: -1}
        }

        Promise.all([
            GQuery({
                tblName: "ly0d14d0",
                operator: "find",
                query: q,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d14d0",
                operator: "countDocuments",
                query: q
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data,
                total: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule(data) {
    if (!data.f0name) {
        return {code: 1, message: "姓名：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 获取行政区划文本
function gbt2260text(code6){
    const o = code6 ? GBT.gbt2260code6.find(i=>{
        return i.code6 === code6
    }) : null
    if (o) {
        return o.text2 + '-' + o.text4 + '-' + o.text6
    }else{
        return ''
    }
}

// 插入一条记录
function insertOne(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.f0name
    // data.f0birthdate
    // data.f0idnumber
    // data.f0nation_code
    // data.f0nativeplace_code
    // data.f0education_code
    // data.f0occupation_code
    // data.f0insurance_code
    // data.f0income_code
    // data.f0address_code
    // data.f0cellphone

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            let gbt2260 = data.f0nativeplace_code ? GBT.gbt2260code6.find(i=>{
                return i.code6 === data.f0nativeplace_code
            }) : null
            GQuery({
                tblName: "ly0d14d0",
                operator: "insertOne",
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,

                    f0name: data.f0name,
                    f0birthdate: data.f0birthdate ? data.f0birthdate : null,
                    f0idnumber: data.f0idnumber ? data.f0idnumber : "",
                    f0nation_code: data.f0nation_code ? data.f0nation_code : "",
                    // 民族
                    f0nation: data.f0nation_code
                        ? GBT.gbt3304.find(i=>{
                            return i.code === data.f0nation_code
                        }).text
                        : "",
                    f0nativeplace_code: data.f0nativeplace_code ? data.f0nativeplace_code : "",
                    f0nativeplace: gbt2260text(data.f0nativeplace_code),
                    f0education_code: data.f0education_code ? data.f0education_code : "",
                    f0education: data.f0education_code
                        ? GBT.gbt4658.find(i=>{
                            return i.code === data.f0education_code
                        }).text
                        : "",
                    f0occupation_code: data.f0occupation_code ? data.f0occupation_code : "",
                    f0occupation: data.f0occupation_code
                        ? code.d14d0f0occupation.find(i=>{
                            return i.code === data.f0occupation_code
                        }).text
                        : "",
                    f0insurance_code: data.f0insurance_code ? data.f0insurance_code : "",
                    f0insurance: data.f0insurance_code
                        ? code.d14d0f0insurance.find(i=>{
                            return i.code === data.f0insurance_code
                        }).text
                        : "",
                    f0income_code: data.f0income_code ? data.f0income_code : "",
                    f0income: data.f0income_code
                        ? code.d14d0f0income.find(i=>{
                            return i.code === data.f0income_code
                        }).text
                        : "",
                    f0address_code: data.f0address_code ? data.f0address_code : "",
                    f0address: gbt2260text(data.f0address_code),
                    f0cellphone: data.f0cellphone ? data.f0cellphone : ""
                }
            }).then(result => {
                resolve({code: 0, message: "插入一条记录成功",
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 查询一条记录
function id_ly0d14d0(data) {
    // data.id_ly0d14d0

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d14d0",
            operator: "findOne",
            query: {_id: data.id_ly0d14d0}
        }).then(result => {
            let d0 = result.data

            GQuery({
                tblName: "ly0d14d1",
                operator: "find",
                query: {id_ly0d14d0: data.id_ly0d14d0}
            }).then(result => {
                let d1 = result.data;

                GQuery({
                    tblName: "ly0d14d2",
                    operator: "find",
                    query: {id_ly0d14d0: data.id_ly0d14d0}
                }).then(result => {
                    let d2 = result.data

                    GQuery({
                        tblName: "ly0d14d3",
                        operator: "find",
                        query: {id_ly0d14d0: data.id_ly0d14d0}
                    }).then(result => {
                        let d3 = result.data

                        GQuery({
                            tblName: "ly0d14d4",
                            operator: "findOne",
                            query: {id_ly0d14d0: data.id_ly0d14d0}
                        }).then(result => {
                            let d4 = result.data

                            GQuery({
                                tblName: "ly0d14d5",
                                operator: "findOne",
                                query: {id_ly0d14d0: data.id_ly0d14d0}
                            }).then(result => {
                                let d5 = result.data

                                GQuery({
                                    tblName: "ly0d14d6",
                                    operator: "find",
                                    query: {id_ly0d14d0: data.id_ly0d14d0}
                                }).then(result => {
                                    let d6 = result.data

                                    GQuery({
                                        tblName: "ly0d14d7",
                                        operator: "findOne",
                                        query: {id_ly0d14d0: data.id_ly0d14d0}
                                    }).then(result => {
                                        let d7 = result.data

                                        GQuery({
                                            tblName: "ly0d14d8",
                                            operator: "find",
                                            query: {id_ly0d14d0: data.id_ly0d14d0}
                                        }).then(result => {
                                            let d8 = result.data

                                            GQuery({
                                                tblName: "ly0d14d9",
                                                operator: "find",
                                                query: {id_ly0d14d0: data.id_ly0d14d0}
                                            }).then(result => {
                                                let d9 = result.data

                                                GQuery({
                                                    tblName: "ly0d14d10",
                                                    operator: "findOne",
                                                    query: {id_ly0d14d0: data.id_ly0d14d0}
                                                }).then(result => {
                                                    let d10 = result.data

                                                    let doc = JSON.parse(JSON.stringify(d0))
                                                    doc.appendix = {
                                                        d0,
                                                        d1,
                                                        d2,
                                                        d3,
                                                        d4: d4 ? d4 : {},
                                                        d5: d5 ? d5 : {},
                                                        d6,
                                                        d7: d7 ? d7 : {} ,
                                                        d8,
                                                        d9,
                                                        d10: d10 ? d10 : {}
                                                    }
                                                    resolve({code: 0, message: "",
                                                        doc
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.f0name
    // data.f0birthdate
    // data.f0idnumber
    // data.f0nation_code
    // data.f0nativeplace_code
    // data.f0education_code
    // data.f0occupation_code
    // data.f0insurance_code
    // data.f0income_code
    // data.f0address_code
    // data.f0cellphone

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data);
        if (message.code === 1) {
            return resolve(message);
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            GQuery({
                tblName: "ly0d14d0",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    time_update: thisTime,
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,

                    f0name: data.f0name,
                    f0birthdate: data.f0birthdate ? data.f0birthdate : null,
                    f0idnumber: data.f0idnumber ? data.f0idnumber : "",
                    f0nation_code: data.f0nation_code ? data.f0nation_code : "",
                    // 民族
                    f0nation: data.f0nation_code
                        ? GBT.gbt3304.find(i=>{
                            return i.code === data.f0nation_code
                        }).text
                        : "",
                    f0nativeplace_code: data.f0nativeplace_code ? data.f0nativeplace_code : "",
                    f0nativeplace: gbt2260text(data.f0nativeplace_code),
                    f0education_code: data.f0education_code ? data.f0education_code : "",
                    f0education: data.f0education_code
                        ? GBT.gbt4658.find(i=>{
                            return i.code === data.f0education_code
                        }).text
                        : "",
                    f0occupation_code: data.f0occupation_code ? data.f0occupation_code : "",
                    f0occupation: data.f0occupation_code
                        ? code.d14d0f0occupation.find(i=>{
                            return i.code === data.f0occupation_code
                        }).text
                        : "",
                    f0insurance_code: data.f0insurance_code ? data.f0insurance_code : "",
                    f0insurance: data.f0insurance_code
                        ? code.d14d0f0insurance.find(i=>{
                            return i.code === data.f0insurance_code
                        }).text
                        : "",
                    f0income_code: data.f0income_code ? data.f0income_code : "",
                    f0income: data.f0income_code
                        ? code.d14d0f0income.find(i=>{
                            return i.code === data.f0income_code
                        }).text
                        : "",
                    f0address_code: data.f0address_code ? data.f0address_code : "",
                    f0address: gbt2260text(data.f0address_code),
                    f0cellphone: data.f0cellphone ? data.f0cellphone : ""
                }
            }).then(() => {
                resolve({code: 0, message: "修改一条记录成功"})
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d14d1",
            operator: "deleteMany",
            query: {id_ly0d14d0: _id}
        }).then(() => {
            GQuery({
                tblName: "ly0d14d2",
                operator: "deleteMany",
                query: {id_ly0d14d0: _id}
            }).then(() => {
                GQuery({
                    tblName: "ly0d14d3",
                    operator: "deleteMany",
                    query: {id_ly0d14d0: _id}
                }).then(() => {
                    GQuery({
                        tblName: "ly0d14d4",
                        operator: "deleteMany",
                        query: {id_ly0d14d0: _id}
                    }).then(() => {
                        GQuery({
                            tblName: "ly0d14d5",
                            operator: "deleteMany",
                            query: {id_ly0d14d0: _id}
                        }).then(() => {
                            GQuery({
                                tblName: "ly0d14d6",
                                operator: "deleteMany",
                                query: {id_ly0d14d0: _id}
                            }).then(() => {
                                GQuery({
                                    tblName: "ly0d14d7",
                                    operator: "deleteMany",
                                    query: {id_ly0d14d0: _id}
                                }).then(() => {
                                    GQuery({
                                        tblName: "ly0d14d8",
                                        operator: "deleteMany",
                                        query: {id_ly0d14d0: _id}
                                    }).then(() => {
                                        GQuery({
                                            tblName: "ly0d14d9",
                                            operator: "deleteMany",
                                            query: {id_ly0d14d0: _id}
                                        }).then(() => {
                                            GQuery({
                                                tblName: "ly0d14d10",
                                                operator: "deleteMany",
                                                query: {id_ly0d14d0: _id}
                                            }).then(() => {
                                                GQuery({
                                                    tblName: "ly0d14d0",
                                                    operator: "deleteOne",
                                                    query: {_id}
                                                }).then(() => {
                                                    resolve({code: 0, message: "删除一条记录成功"})
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取页面渲染数据
function getPgData (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        resolve({code: 0, message: "",
            data: {
                gbt: {
                    gbt2261: GBT.gbt2261,
                    gbt3304: GBT.gbt3304,
                    gbt4658: GBT.gbt4658,
                },
                busiCode: code
            }
        })
    })
}

// 修改：配偶信息
function updateOneF1(data) {
    // data._id
    // data.f1name
    // data.f1birthdate
    // data.f1education_code
    // data.f1occupation_code
    // data.f1cellphone

    return new Promise(function (resolve, reject) {
        let thisTime = new Date();

        // 提交
        GQuery({
            tblName: "ly0d14d0",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                time_update: thisTime,
                f1name: data.f1name ? data.f1name : "",
                f1birthdate: data.f1birthdate ? data.f1birthdate : null,
                f1education_code: data.f1education_code ? data.f1education_code : "",
                f1education: data.f1education_code
                    ? GBT.gbt4658.find(i=>{
                        return i.code === data.f1education_code
                    }).text
                    : "",
                f1occupation_code: data.f1occupation_code ? data.f1occupation_code : "",
                f1occupation: data.f1occupation_code
                    ? code.d14d0f0occupation.find(i=>{
                        return i.code === data.f1occupation_code
                    }).text
                    : "",
                f1cellphone: data.f1cellphone ? data.f1cellphone : ""
            }
        }).then(() => {
            resolve({code: 0, message: "修改成功"})
        })
    })
}

// 修改：孕产信息
function updateOneF2(data) {
    // data._id
    // data.f2height
    // data.f2weight
    // data.f2pregnancies
    // data.f2births
    // data.f2menstruation_last
    // data.f2menstruation_first
    // data.f2menstruation_cycle_code
    // data.f2abnormal
    // data.f2abnormal0
    // data.f2abnormal1
    // data.f2abnormal2

    return new Promise(function (resolve, reject) {
        let thisTime = new Date()

        // 提交
        GQuery({
            tblName: "ly0d14d0",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                time_update: thisTime,
                f2height: data.f2height ? data.f2height : null,
                f2weight: data.f2weight ? data.f2weight : null,
                f2pregnancies: data.f2pregnancies ? data.f2pregnancies : null,
                f2births: data.f2births ? data.f2births : null,
                f2menstruation_last: data.f2menstruation_last ? data.f2menstruation_last : null,
                f2menstruation_first: data.f2menstruation_first ? data.f2menstruation_first : null,
                f2menstruation_cycle_code: data.f2menstruation_cycle_code ? data.f2menstruation_cycle_code : "",
                f2menstruation_cycle: data.f2menstruation_cycle_code
                    ? code.d14d0f2menstruation_cycle.find(i=>{
                        return i.code === data.f2menstruation_cycle_code
                    }).text
                    : "",

                f2abnormal: data.f2abnormal,
                f2abnormal0: !!data.f2abnormal0 ? data.f2abnormal0 : "",
                f2abnormal1: !!data.f2abnormal1 ? data.f2abnormal1 : null,
                f2abnormal2: !!data.f2abnormal2 ? data.f2abnormal2 : null
            }
        }).then(() => {
            resolve({code: 0, message: "修改成功"})
        })
    })
}

export default {
    find,
    insertOne,
    id_ly0d14d0,
    updateOne,
    deleteOne,
    getPgData,
    updateOneF1,
    updateOneF2
}
