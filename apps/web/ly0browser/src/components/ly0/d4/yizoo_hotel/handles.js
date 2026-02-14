import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
let ly0session = request.ly0.ly0sessionLoad()

// 初始化
async function get({scopeThis}) {
    try {
        await ElMessageBox.confirm('初始化将清除所有记录，并重置旅店信息', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
        const result = await request.ly0.storpro({
            storproName: 'ly0d4.yizoo_hotel.get',
            data: { id_dataunit: ly0session.dataunit._id },
        })
        scopeThis.data = result.data
        ElMessage('已初始化并重置')
    } catch (err) {
        ElMessage({ type: 'info', message: '取消初始化' })
    }
}

// 刷新
async function findAll({scopeThis}) {
    const result = await request.ly0.storpro({
        storproName: 'ly0d4.yizoo_hotel.findAll',
        data: { id_dataunit: ly0session.dataunit._id },
    })
    scopeThis.data = result.data
    ElMessage('已刷新')
}

// 获取最新令牌
async function req({scopeThis, _id}) {
    ElMessage('正在向门锁伺服器发送请求')
    const result = await request.ly0.storpro({
        storproName: 'ly0d4.yizoo_hotel.req',
        data: { _id },
    })
    ElMessage(result.message)
    await findAll({scopeThis})
}

// 修改：弹出窗口
function updateOnePopup({scopeThis, item}) {
    scopeThis.updateOne.formData._id = item._id
    scopeThis.updateOne.formData.url = item.url
    scopeThis.updateOne.formData.accountname = item.accountname
    scopeThis.updateOne.formData.password = item.password
    scopeThis.updateOne.formProps.popup.visible = true
}

// 修改：提交
async function updateOneSubmit({scopeThis}) {
    const result = await request.ly0.storpro({
        storproName: 'ly0d4.yizoo_hotel.updateOne',
        data: scopeThis.updateOne.formData,
    })
    try{
        await ElMessageBox.alert(result.message, '提示', {
            confirmButtonText: '确认'
        })
        if (result.code === 0) {
            await findAll({scopeThis})
            // 关闭弹窗
            scopeThis.updateOne.formProps.popup.visible = false
        }
    }catch(err){
        console.log(err)
    }

}

export default {
    get,
    findAll,
    req,
    updateOnePopup,
    updateOneSubmit,
}
