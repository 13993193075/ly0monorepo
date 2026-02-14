import {GQuery} from '../../main/GQuery.js'
import {GBT, blindboxes} from 'packages/ly0utils'
import {imageDomain} from "../../main/config.js";
import ImageSave from '../../main/image-save.js'

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 工作单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 工作组
        if (data0.id_group) {
            data1.id_group = data0.id_group
        }
        // 姓名，模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.id_group
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then(query => { // 查询修正
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
                    tblName: "ly0d10worker",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d10worker",
                    operator: "countDocuments",
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data.map(i=>{
                        return Object.assign(i, {
                            photo: imageDomain + i.photo
                        })
                    }),
                    count: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束（新增）
function dataRuleInsertOne(data) {
    return new Promise(function (resolve, reject) {
        // 不能提交
        if (!data.id_unit) {
            return resolve({code: 1, message: "工作单位：必选项"})
        }
        if (!data.id_group) {
            return resolve({code: 1, message: "工种：必选项"})
        }
        if (!data.idno) {
            return resolve({code: 1, message: "身份证号：必填项"})
        }
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        if (!data.sex_code) {
            return resolve({code: 1, message: "性别：必选项"})
        }
        if (!data.birthyear) {
            return resolve({code: 1, message: "出生年份：必填项"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code: 1, message: '手机号：格式错误'})
        }

        GQuery({
            tblName: "ly0d10worker",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "手机号重复"})
            }
            resolve({code: 0, message: "可以提交"})
        })
    })
}

// 内部模块：数据约束（修改）
function dataRuleUpdateOne(data) {
    return new Promise(function (resolve, reject) {
        // 不能提交
        if (!data.id_unit) {
            return resolve({code: 1, message: "工作单位：必选项"})
        }
        if (!data.id_group) {
            return resolve({code: 1, message: "工种：必选项"})
        }
        if (!data.idno) {
            return resolve({code: 1, message: "身份证号：必填项"})
        }
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        if (!data.sex_code) {
            return resolve({code: 1, message: "性别：必选项"})
        }
        if (!data.birthyear) {
            return resolve({code: 1, message: "出生年份：必填项"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code: 1, message: '手机号：格式错误'})
        }

        GQuery({
            tblName: "ly0d10worker",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                _id: {$ne: data._id},
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "手机号重复"})
            }

            resolve({code: 0, message: "可以提交"})
        })
    })
}


// 插入一条记录
function insertOne(data) {
    // data.id_unit
    // data.id_group
    // data.cellphone
    // data.idno
    // data.name
    // data.sex_code
    // data.birthyear
    // data.photo

    return new Promise((resolve, reject) => {
        dataRuleInsertOne(data).then(result => {
            // 提交约束
            if (result.code !== 0) {
                return resolve(result)
            }

            // 提交
            GQuery({
                tblName: "ly0d10unit",
                operator: "findOne",
                query: {
                    _id: data.id_unit
                }
            }).then(result=>{
                let objUnit = result.data
                GQuery({
                    tblName: "ly0d10group",
                    operator: "findOne",
                    query: {
                        _id: data.id_group
                    }
                }).then(result=>{
                    let objGroup = result.data
                    GQuery({
                        tblName: "ly0d10worker",
                        operator: "insertOne",
                        update: {
                            id_dataunit: objUnit.id_dataunit,
                            dataunit_name: objUnit.dataunit_name,
                            id_unit: objUnit._id,
                            unit_name: objUnit.name,
                            id_group: objGroup._id,
                            group_name: objGroup.name,
                            cellphone: data.cellphone,
                            idno: data.idno,
                            name: data.name,
                            sex_code: data.sex_code,
                            sex_text: GBT.gbt2261.find(i=>{
                                return i.code === data.sex_code
                            }).text,
                            birthyear: data.birthyear
                        }
                    }).then(result => {
                        let newId = result.dataNew._id

                        // 图片处理
                        ImageSave.imageAppend({
                            uploaded: data.photo,
                            dataunitId: data.id_dataunit,
                            tblName: "ly0d10worker",
                            fieldName: "photo",
                            dataId: newId
                        }).then(function (photo) {
                            GQuery({
                                tblName: "ly0d10worker",
                                operator: "updateOne",
                                query: {_id: newId},
                                update: {photo: photo ? photo : null}
                            }).then(() => {
                                resolve({code: 0, message: "新增成功",
                                    _id: newId
                                })
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

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d10worker",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    photo: imageDomain + result.data.photo
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_unit
    // data.id_group
    // data.cellphone
    // data.idno
    // data.name
    // data.sex_code
    // data.birthyear
    // data.photo

    return new Promise((resolve, reject) => {
        dataRuleUpdateOne(data).then(result => {
            // 提交约束
            if (result.code !== 0) {
                return resolve(result);
            }

            // 提交
            GQuery({
                tblName: "ly0d10worker",
                operator: "findOne",
                query: {_id: data._id}
            }).then(result => {
                let oldData = result.data

                // 图片处理
                ImageSave.imageUpdate({
                    uploaded: data.photo,
                    old: oldData.photo,
                    dataunitId: data.id_dataunit,
                    tblName: "ly0d10worker",
                    fieldName: "photo",
                    dataId: data._id
                }).then(function (photo) {
                    GQuery({
                        tblName: "ly0d10unit",
                        operator: "findOne",
                        query: {
                            _id: data.id_unit
                        }
                    }).then(result=>{
                        let objUnit = result.data
                        GQuery({
                            tblName: "ly0d10group",
                            operator: "findOne",
                            query: {
                                _id: data.id_group
                            }
                        }).then(result=>{
                            let objGroup = result.data
                            GQuery({
                                tblName: "ly0d10worker",
                                operator: "updateOne",
                                query: {_id: data._id},
                                update: {
                                    id_dataunit: objUnit.id_dataunit,
                                    dataunit_name: objUnit.dataunit_name,
                                    id_unit: objUnit._id,
                                    unit_name: objUnit.name,
                                    id_group: objGroup._id,
                                    group_name: objGroup.name,
                                    cellphone: data.cellphone,
                                    idno: data.idno,
                                    name: data.name,
                                    sex_code: data.sex_code,
                                    sex_text: GBT.gbt2261.find(i=>{
                                        return i.code === data.sex_code
                                    }).text,
                                    birthyear: data.birthyear,
                                    photo: photo ? photo : null
                                }
                            }).then(() => {
                                resolve({code: 0, message: "修改成功"})
                            })
                        })
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
            tblName: "ly0d10business",
            operator: "findOne",
            query: {id_worker: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d10business"})
            }
            GQuery({
                tblName: "ly0d10business0",
                operator: "findOne",
                query: {id_worker: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: "不能删除，存在关联信息：ly0d10business0"})
                }

                GQuery({
                    tblName: "ly0d10worker",
                    operator: "findOne",
                    query: {_id}
                }).then(result => {
                    ImageSave.imageDelete({url: result.data.photo}).then(function () {
                        GQuery({
                            tblName: "ly0d10worker",
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
    // data.id_unit 当前用户信息：工作单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        }

        GQuery({
            tblName: "ly0d10unit",
            operator: "find",
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: "ly0d10group",
                operator: "find",
                query: q0
            }).then(result => {
                let arrGroup = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrUnit,
                        arrGroup,
                        arrSex: GBT.gbt2261
                    }
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
    getPageData
}
