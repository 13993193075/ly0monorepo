// 数据表（table）属性
// scopeThis.tableProps
// 数据盒子
// scopeThis.tableDataBox

// 表单（form）属性
// scopeThis.formProps.find
// scopeThis.formProps.insertOne
// scopeThis.formProps.doc
// scopeThis.formProps.updateOne
// 数据盒子
// scopeThis.formDataBox.find
// scopeThis.formDataBox.insertOne
// scopeThis.formDataBox.doc
// scopeThis.formDataBox.updateOne

// 字段初始值
// scopeThis.fieldsValue_init.find
// scopeThis.fieldsValue_init.insertOne

// 标准句柄
// scopeThis.handles
// 补充句柄
// scopeThis.hdlsSupplement.findPopupBefore // 查询窗口弹出前的处理
// scopeThis.hdlsSupplement.findSubmitBefore // 查询提交前的处理
// scopeThis.hdlsSupplement.findSubmitAfter // 查询提交后的处理
// scopeThis.hdlsSupplement.insertOnePopupBefore // 新增窗口弹出前的处理
// scopeThis.hdlsSupplement.insertOneSubmitBefore // 新增提交前的处理
// scopeThis.hdlsSupplement.insertOneSubmitAfter // 新增提交后的处理
// scopeThis.hdlsSupplement.docPopupBefore // 详细窗口弹出前的处理
// scopeThis.hdlsSupplement.updateOnePopupBefore // 修改窗口弹出前的处理
// scopeThis.hdlsSupplement.updateOneSubmitBefore // 修改提交前的处理
// scopeThis.hdlsSupplement.updateOneSubmitAfter // 修改提交后的处理
// scopeThis.hdlsSupplement.deleteOneSubmitBefore // 删除提交前的处理
// scopeThis.hdlsSupplement.deleteOneSubmitAfter // 删除提交后的处理

// 存储过程
// scopeThis.storpro.storpro // 执行存储过程
// scopeThis.storpro.storproNames // 需要用到的存储过程名
// scopeThis.storpro.storproNames.find
// scopeThis.storpro.storproNames.insertOne
// scopeThis.storpro.storproNames.findOne
// scopeThis.storpro.storproNames.updateOne
// scopeThis.storpro.storproNames.deleteOne

import {unclassified as beanUnclass} from '@yoooloo42/bean'

// 获取页面渲染数据
function getPageData(scopeThis){
    return new Promise((resolve, reject)=>{
        scopeThis.storpro.storpro({
            scopeThis,
            storproName: scopeThis.storpro.storproNames.getPageData,
            data: scopeThis.pageData.queryBody ? scopeThis.pageData.queryBody : null
        }).then(result=>{
            scopeThis.pageData.data = Object.assign(scopeThis.pageData.data, result.data)
            resolve()
        })
    })
}

function init0(scopeThis){
    // 图片与上传
    if(scopeThis.srcPrefix){
        scopeThis.tableDataBox.srcPrefix = scopeThis.srcPrefix
    }
    if(scopeThis.upload){
        scopeThis.tableDataBox.upload = scopeThis.upload
    }
    if(scopeThis.upload_carplate){
    }
    // 表单属性重置
    if(scopeThis.formProps && scopeThis.formProps.find && scopeThis.formProps.find.popup){
        scopeThis.formProps.find.popup.visible = false
    }
    if(scopeThis.formProps && scopeThis.formProps.insertOne && scopeThis.formProps.insertOne.popup){
        scopeThis.formProps.insertOne.popup.visible = false
    }
    if(scopeThis.formProps && scopeThis.formProps.doc && scopeThis.formProps.doc.popup){
        scopeThis.formProps.doc.popup.visible = false
    }
    if(scopeThis.formProps && scopeThis.formProps.updateOne && scopeThis.formProps.updateOne.popup){
        scopeThis.formProps.updateOne.popup.visible = false
    }
}

function init(scopeThis){
    return new Promise((resolve, reject)=>{
        init0(scopeThis)

        // 数据表请求
        reloadAll(scopeThis).then(()=>{
            if(scopeThis.pageData && scopeThis.pageData.data){
                // 获取页面渲染数据
                getPageData(scopeThis).then(()=>{
                    resolve()
                })
            }else{
                resolve()
            }
        })
    })
}

// 全部
function reloadAll(scopeThis){
    return new Promise((resolve, reject)=>{
        scopeThis.formDataBox.find.fieldsValue = JSON.parse(JSON.stringify(scopeThis.fieldsValue_init.find))
        scopeThis.tableDataBox.request.query.currentPage = 1
        findSubmit(scopeThis).then(()=>{
            // scopeThis.$message("已查询：全部")
            resolve()
        })
    })
}

// 刷新
function reload(scopeThis){
    return new Promise((resolve, reject)=>{
        findSubmit(scopeThis).then(()=>{
            // scopeThis.$message("已刷新")
            resolve()
        })
    })
}

// 查询：弹出窗口
function findPopup(scopeThis){
    return new Promise((resolve, reject)=>{
        // 异步缓存
        let arrPromise = []
        // 查询项目预置
        scopeThis.formDataBox.find.fieldsValue = scopeThis.fieldsValue_init && scopeThis.fieldsValue_init.find
            ? JSON.parse(JSON.stringify(scopeThis.fieldsValue_init.find))
            : {}
        // 查询窗口弹出前的处理
        if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.findPopupBefore){
            let result = scopeThis.hdlsSupplement.findPopupBefore(scopeThis)
            if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                arrPromise.push(result)
            }
        }
        // 异步执行
        Promise.all(arrPromise).then(()=>{
            scopeThis.formProps.find.popup.visible = true // 弹出窗口
            resolve()
        })
    })
}

// 查询：提交
function findSubmit(scopeThis){
    return new Promise((resolve, reject)=>{
        // 异步缓存
        let arrPromise = []
        // 关闭窗口
        if(scopeThis.formProps && scopeThis.formProps.find){
            scopeThis.formProps.find.popup.visible = false
        }
        // 打开进度条
        scopeThis.tableDataBox.request.loading = true;
        // 查询提交前的处理
        if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.findSubmitBefore){
            let result = scopeThis.hdlsSupplement.findSubmitBefore(scopeThis)
            if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                arrPromise.push(result)
            }
        }
        // 异步执行
        Promise.all(arrPromise).then(()=>{
            scopeThis.storpro.storpro({
                scopeThis,
                storproName: scopeThis.storpro.storproNames.find,
                data: {
                    query: scopeThis.formDataBox.find.fieldsValue,
                    limit: scopeThis.tableDataBox.request.query.pageSize,
                    page: scopeThis.tableDataBox.request.query.currentPage,
                    sort: scopeThis.tableDataBox.request.query.sort
                }
            }).then(result=>{
                scopeThis.tableDataBox.data = result.data
                scopeThis.tableDataBox.total = result.count
                // 异步缓存
                let arrPromise0 = []
                // 查询提交后的处理
                if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.findSubmitAfter){
                    let result = scopeThis.hdlsSupplement.findSubmitAfter(scopeThis)
                    if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                        arrPromise0.push(result)
                    }
                }
                // 异步执行
                Promise.all(arrPromise0).then(()=>{
                    // 关闭进度条
                    resolve()
                    setTimeout(()=>{
                        scopeThis.tableDataBox.request.loading = false
                    }, 100)
                })
            })
        })
    })
}
function findSubmit_withMessage(scopeThis){
    findSubmit(scopeThis).then(()=>{
        scopeThis.$message("已查询")
    })
}

// 新增：弹出窗口
function insertOnePopup(scopeThis){
    return new Promise((resolve, reject)=>{
        // 图片与上传
        scopeThis.formDataBox.insertOne.srcPrefix = scopeThis.srcPrefix ? scopeThis.srcPrefix : null
        scopeThis.formDataBox.insertOne.upload = scopeThis.upload ? scopeThis.upload : null
        scopeThis.formDataBox.insertOne.upload_carplate = scopeThis.upload_carplate ? scopeThis.upload_carplate : null
        // 异步缓存
        let arrPromise = []
        // 新增项目预置
        scopeThis.formDataBox.insertOne.fieldsValue = scopeThis.fieldsValue_init && scopeThis.fieldsValue_init.insertOne
            ? JSON.parse(JSON.stringify(scopeThis.fieldsValue_init.insertOne))
            : {}
        // 新增窗口弹出前的处理
        if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.insertOnePopupBefore){
            let result = scopeThis.hdlsSupplement.insertOnePopupBefore(scopeThis)
            if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                arrPromise.push(result)
            }
        }
        // 异步执行
        Promise.all(arrPromise).then(()=>{
            scopeThis.formProps.insertOne.popup.visible = true // 弹出窗口
            resolve()
        })
    })
}

// 新增：提交
function insertOneSubmit(scopeThis){
    return new Promise((resolve, reject)=>{
        // 异步缓存
        let arrPromise = []
        // 新增提交前的处理
        if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.insertOneSubmitBefore){
            let result = scopeThis.hdlsSupplement.insertOneSubmitBefore(scopeThis)
            if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                arrPromise.push(result)
            }
        }
        // 异步执行
        Promise.all(arrPromise).then(()=>{
            scopeThis.storpro.storpro({
                scopeThis,
                storproName: scopeThis.storpro.storproNames.insertOne,
                data: scopeThis.formDataBox.insertOne.fieldsValue
            }).then(result=>{
                scopeThis.$alert(result.message, '提示', {
                    confirmButtonText: '确认',
                    callback: ()=>{
                        if(result.code === 0){
                            // 异步缓存
                            let arrPromise0 = []
                            // 新增提交后的处理
                            if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.insertOneSubmitAfter){
                                let result = scopeThis.hdlsSupplement.insertOneSubmitAfter(scopeThis)
                                if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                                    arrPromise0.push(result)
                                }
                            }
                            // 异步执行
                            Promise.all(arrPromise0).then(()=>{
                                // 重置查询条件，查询新记录
                                scopeThis.formDataBox.find.fieldsValue = {_id: result._id}
                                scopeThis.tableDataBox.request.query.currentPage = 1
                                findSubmit(scopeThis).then(()=>{
                                    // 关闭窗口
                                    scopeThis.formProps.insertOne.popup.visible = false
                                    resolve()
                                })
                            })
                        }
                    }
                })
            })
        })
    })
}

// _id查询：提交
function findOneSubmit(scopeThis, row){
    // row._id

    return new Promise((resolve, reject)=>{
        scopeThis.storpro.storpro({
            scopeThis,
            storproName: scopeThis.storpro.storproNames.findOne,
            data: {_id: row._id}
        }).then(result=>{
            resolve(result)
        })
    })
}

// 详细：弹出窗口
function docPopup(scopeThis, row){
    // row._id

    return new Promise((resolve, reject)=>{
        findOneSubmit(scopeThis, row).then(result=>{
            // 图片与上传
            scopeThis.formDataBox.doc.srcPrefix = scopeThis.srcPrefix ? scopeThis.srcPrefix : null
            // 详细项目预置
            scopeThis.formDataBox.doc.fieldsValue = scopeThis.fieldsValue_init && scopeThis.fieldsValue_init.doc
                ? JSON.parse(JSON.stringify(scopeThis.fieldsValue_init.doc))
                : {}
            scopeThis.formDataBox.doc.fieldsValue = Object.assign(scopeThis.formDataBox.doc.fieldsValue, result.doc)
            // 异步缓存
            let arrPromise = []
            // 详细窗口弹出前的处理
            if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.docPopupBefore){
                let result = scopeThis.hdlsSupplement.docPopupBefore(scopeThis)
                if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                    arrPromise.push(result)
                }
            }
            // 异步执行
            Promise.all(arrPromise).then(()=>{
                scopeThis.formProps.doc.popup.visible = true // 弹出窗口
                resolve()
            })
        })
    })
}

// 修改：弹出窗口
function updateOnePopup(scopeThis, row){
    // row._id

    return new Promise((resolve, reject)=>{
        findOneSubmit(scopeThis, row).then(result=>{
            // 图片与上传
            scopeThis.formDataBox.updateOne.srcPrefix = scopeThis.srcPrefix ? scopeThis.srcPrefix : null
            scopeThis.formDataBox.updateOne.upload = scopeThis.upload ? scopeThis.upload : null
            scopeThis.formDataBox.updateOne.upload_carplate = scopeThis.upload_carplate ? scopeThis.upload_carplate : null
            // 修改项目预置
            scopeThis.formDataBox.updateOne.fieldsValue = scopeThis.fieldsValue_init && scopeThis.fieldsValue_init.updateOne
                ? JSON.parse(JSON.stringify(scopeThis.fieldsValue_init.updateOne))
                : {}
            scopeThis.formDataBox.updateOne.fieldsValue = Object.assign(scopeThis.formDataBox.updateOne.fieldsValue, result.doc)
            // 异步缓存
            let arrPromise = []
            // 修改窗口弹出前的处理
            if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.updateOnePopupBefore){
                let result = scopeThis.hdlsSupplement.updateOnePopupBefore(scopeThis)
                if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                    arrPromise.push(result)
                }
            }
            // 异步执行
            Promise.all(arrPromise).then(()=>{
                scopeThis.formProps.updateOne.popup.visible = true // 弹出窗口
                resolve()
            })
        })
    })
}

// 修改：提交
function updateOneSubmit(scopeThis){
    return new Promise((resolve, reject)=>{
        // 异步缓存
        let arrPromise = []
        // 修改提交前的处理
        if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.updateOneSubmitBefore){
            let result = scopeThis.hdlsSupplement.updateOneSubmitBefore(scopeThis)
            if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                arrPromise.push(result)
            }
        }
        // 异步执行
        Promise.all(arrPromise).then(()=>{
            scopeThis.storpro.storpro({
                scopeThis,
                storproName: scopeThis.storpro.storproNames.updateOne,
                data: scopeThis.formDataBox.updateOne.fieldsValue
            }).then(result=>{
                scopeThis.$alert(result.message, '提示', {
                    confirmButtonText: '确认',
                    callback: ()=>{
                        if(result.code === 0){
                            // 异步缓存
                            let arrPromise0 = []
                            // 修改提交后的处理
                            if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.updateOneSubmitAfter){
                                let result = scopeThis.hdlsSupplement.updateOneSubmitAfter(scopeThis)
                                if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                                    arrPromise0.push(result)
                                }
                            }
                            // 异步执行
                            Promise.all(arrPromise0).then(()=>{
                                // 刷新
                                findSubmit(scopeThis).then(()=>{
                                    // 关闭窗口
                                    scopeThis.formProps.updateOne.popup.visible = false
                                    resolve()
                                })
                            })
                        }
                    }
                })
            })
        })
    })
}

// 删除：提交
function deleteOneSubmit(scopeThis, row){
    // row._id

    return new Promise((resolve, reject)=>{
        scopeThis.$confirm('删除?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            scopeThis.storpro.storpro({
                scopeThis,
                storproName: scopeThis.storpro.storproNames.deleteOne,
                data: {_id: row._id}
            }).then(result=>{
                scopeThis.$message(result.message)
                if(result.code !== 0){
                    return resolve()
                }
                // 异步缓存
                let arrPromise0 = []
                // 删除提交后的处理
                if(scopeThis.hdlsSupplement && scopeThis.hdlsSupplement.deleteOneSubmitAfter){
                    let result = scopeThis.hdlsSupplement.deleteOneSubmitAfter(scopeThis)
                    if(beanUnclass.deepClone.typeOfValue(result) === "promise"){
                        arrPromise0.push(result)
                    }
                }
                // 异步执行
                Promise.all(arrPromise0).then(()=>{
                    // 刷新
                    findSubmit(scopeThis).then(()=>{
                        scopeThis.$message("已删除")
                        resolve()
                    })
                })
            })
        }).catch(()=>{
            scopeThis.$message({type: 'info', message: '取消删除'})
            resolve()
        })
    })
}

export default{
    getPageData,
    init,
    reloadAll,
    reload,
    findPopup,
    findSubmit,
    findSubmit_withMessage,
    insertOnePopup,
    insertOneSubmit,
    findOneSubmit,
    docPopup,
    updateOnePopup,
    updateOneSubmit,
    deleteOneSubmit
}
