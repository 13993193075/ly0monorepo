// with-table数据模板

// 表格数据
// scopeThis.tableData.data
// scopeThis.tableData.total 查询总记录数
// scopeThis.tableProps 表格属性

// 表单数据，用于查询、新增一条记录、修改一条记录、详细信息等
// scopeThis.formData
// scopeThis.formProps 表单属性

// 查询初始化相关
// scopeThis.queryInit.formData 表单数据
// scopeThis.queryInit.sort 排序
// scopeThis.queryInit.pageSize 页记录数
// scopeThis.queryInit.currentPage 默认当前页号

// 当前查询相关
// scopeThis.query.formData 表单数据
// scopeThis.query.sort 排序
// scopeThis.query.pageSize 页记录数
// scopeThis.query.currentPage 默认当前页号

// 页面数据附加
// scopeThis.pgData.query 查询对象
// scopeThis.pgData.data

// 存储过程
// scopeThis.storpro.refresh 数据刷新
// scopeThis.storpro.getPgData 获取页面数据附加
// scopeThis.storpro.insertOne 新增一条记录
// scopeThis.storpro.updateOne 修改一条记录
// scopeThis.storpro.deleteOne 删除一条记录

// 查询表单
// scopeThis.find.formProps

// 新增一条记录
// scopeThis.insertOne.formData 表单数据初始值
// scopeThis.insertOne.formProps 表单属性

// 修改一条记录
// 表单数据继承行记录的值
// scopeThis.updateOne.formProps 表单属性

// 详细信息
// 表单数据继承行记录的值
// scopeThis.doc.formProps 表单属性

import { ElMessageBox, ElMessage } from 'element-plus'
import { request } from '@heartbeat-ly0/libs-js-depend'
import {unclassified as LibsJsUnclass} from '@heartbeat-ly0/libs-js'
const ly0request = request.ly0

// 数据刷新
const refresh = async ({scopeThis, noMessage}) => {
    scopeThis.tableProps.table.loading.visible = true
    const result = await ly0request.storpro({
        storproName: scopeThis.storpro.refresh,
        data: {
            query: scopeThis.query.formData,
            sort: scopeThis.query.sort,
            limit: scopeThis.query.pageSize,
            page: scopeThis.query.currentPage,
        },
        routerInstance: scopeThis.routerInstance || null
    })
    scopeThis.tableProps.table.loading.visible = false
    if(result.code === 0){
        LibsJsUnclass.deepClone.deepMerge(scopeThis.tableData, {
            data: result.data,
            total: result.total,
            sort: scopeThis.query.sort,
            pageSize: scopeThis.query.pageSize,
            currentPage: scopeThis.query.currentPage
        })
        if(!noMessage){
            ElMessage('数据已刷新')
        }
    }else{
        if(!noMessage){
            ElMessage('数据刷新错误')
        }
    }
    return {code: result.code, message: result.message}
}

// 数据重载
const reload = async ({scopeThis}) => {
    LibsJsUnclass.deepClone.replaceObject(
        scopeThis.query,
        JSON.parse(JSON.stringify(scopeThis.queryInit))
    )
    const result = await refresh({scopeThis, noMessage: true})
    ElMessage(result.code === 0 ? '数据已重载' : '数据重载错误')
}

// 页记录数改变
const pageSizeChange = async ({pageSize, scopeThis}) => {
    scopeThis.query.pageSize = pageSize
    scopeThis.query.currentPage = 1
    await refresh({scopeThis})
}

// 当前页码改变
const currentPageChange = async ({currentPage, scopeThis}) => {
    scopeThis.query.currentPage = currentPage
    await refresh({scopeThis})
}

// 获取页面数据附加
const getPgData = async ({scopeThis}) => {
    const result = await ly0request.storpro({
        storproName: scopeThis.storpro.getPgData,
        data: scopeThis.pgData && scopeThis.pgData.query ? scopeThis.pgData.query : null,
    })
    if(result.code === 0){
        LibsJsUnclass.deepClone.deepMerge(scopeThis.pgData, {data: result.data})
        ElMessage('已获取页面数据')
        return
    }
    ElMessage('获取页面数据错误')
}

// 初始化
const init = async ({scopeThis}) => {
    scopeThis.tableProps.table.hdlPageSizeChange = pageSizeChange
    scopeThis.tableProps.table.hdlCurrentPageChange = currentPageChange

    if(scopeThis.pgData) {
        await getPgData({scopeThis})
    }
    await reload({scopeThis})
}

// 弹出 - 查询
const popupFind = async ({scopeThis}) => {
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formData, scopeThis.query.formData)
    scopeThis.tableData.sort = JSON.parse(JSON.stringify(scopeThis.query.sort))
    scopeThis.tableData.pageSize = scopeThis.query.pageSize
    scopeThis.tableData.currentPage = scopeThis.query.currentPage
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formProps, scopeThis.find.formProps)
    // 弹出窗口
    LibsJsUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 新增一条记录
const popupInsertOne = async ({scopeThis}) => {
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formData, scopeThis.insertOne.formData)
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formProps, scopeThis.insertOne.formProps)
    // 弹出窗口
    LibsJsUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 修改一条记录
const popupUpdateOne = async ({scopeThis, row}) => {
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formData, row) // 继承行记录的值
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formProps, scopeThis.updateOne.formProps)
    // 弹出窗口
    LibsJsUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 详细信息
const popupDoc = async ({scopeThis, row}) => {
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formData, row) // 继承行记录的值
    LibsJsUnclass.deepClone.replaceObject(scopeThis.formProps, scopeThis.doc.formProps)
    // 弹出窗口
    LibsJsUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 提交 - 查询
const submitFind = async ({scopeThis}) => {
    LibsJsUnclass.deepClone.replaceObject(scopeThis.query.formData, scopeThis.formData)
    scopeThis.query.sort = JSON.parse(JSON.stringify(scopeThis.tableData.sort))
    scopeThis.query.pageSize = scopeThis.tableData.pageSize
    scopeThis.query.currentPage = scopeThis.tableData.currentPage
    const result = await refresh({scopeThis})
    if(result.code === 0){
        // 关闭表单窗口
        scopeThis.formProps.popup.visible = false
        ElMessage('查询已提交并刷新数据')
    }else{
        ElMessage('查询错误')
    }
}

// 提交 - 新增一条记录
const submitInsertOne = async ({scopeThis}) => {
    try{
        await ElMessageBox.confirm('新增一条记录, 提交?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.insertOne,
            data: scopeThis.formData,
            routerInstance: scopeThis.routerInstance || null
        })
        if(result.code === 0){
            // 关闭表单窗口
            scopeThis.formProps.popup.visible = false
            ElMessage('新增一条记录成功')

            scopeThis.query.formData = {
                _id: result._id
            }
            scopeThis.query.currentPage = 1
            await refresh({scopeThis})
        }else{
            if(result.message){
                ElMessage(result.message)
            }else{
                ElMessage('新增一条记录失败')
            }
        }
    }catch(error){
        ElMessage('已取消')
    }
}

// 提交 - 修改一条记录
const submitUpdateOne = async ({scopeThis}) => {
    try{
        await ElMessageBox.confirm('修改一条记录, 提交?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.updateOne,
            data: scopeThis.formData,
            routerInstance: scopeThis.routerInstance || null
        })
        if(result.code === 0){
            // 关闭表单窗口
            scopeThis.formProps.popup.visible = false
            ElMessage('修改一条记录成功')
            await refresh({scopeThis})
        }else{
            if(result.message){
                ElMessage(result.message)
            }else{
                ElMessage('修改一条记录失败')
            }
        }
    }catch(error){
        ElMessage('已取消')
    }
}

// 提交 - 删除一条记录
const submitDeleteOne = async ({scopeThis, row}) => {
    try{
        await ElMessageBox.confirm('删除一条记录, 提交?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.deleteOne,
            data: row, // 继承行记录的值
            routerInstance: scopeThis.routerInstance || null
        })
        if(result.code === 0){
            ElMessage('删除一条记录成功')
            await refresh({scopeThis})
        }else{
            if(result.message){
                ElMessage(result.message)
            }else{
                ElMessage('删除一条记录失败')
            }
        }
    }catch(error){
        ElMessage('已取消')
    }
}

export default {
    refresh,
    reload,
    pageSizeChange,
    currentPageChange,
    getPgData,
    init,
    popupFind,
    popupInsertOne,
    popupUpdateOne,
    popupDoc,
    submitFind,
    submitInsertOne,
    submitUpdateOne,
    submitDeleteOne
}
