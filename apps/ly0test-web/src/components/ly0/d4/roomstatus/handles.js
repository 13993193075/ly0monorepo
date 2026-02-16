import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
const ly0session = ly0request.ly0request.ly0sessionLoad()

// 获取页面数据
async function getPgData({scopeThis}) {
    const result = await ly0request.ly0request.storpro({
        storproName: 'ly0d4.roomstatus.getPgData',
        data: {
            id_dataunit: ly0session.dataunit._id,
            id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        },
      })
    scopeThis.pgData = Object.assign(scopeThis.pgData, result.data)
}

// 页面重载
async function reload({scopeThis}) {
    await getPgData({scopeThis})
    scopeThis.collapseOpen = []
    if (scopeThis.collapseSwitch) {
        // 全部展开
        for (let i = 0; i < scopeThis.pgData.arrHotel.length; i++) {
            scopeThis.collapseOpen.push(i)
        }
    }
    scopeThis.keyComp.place++ // 重载place组件
}

// 刷新并打开/关闭面板
async function collapseSwitch({scopeThis, open}) {
    scopeThis.collapseSwitch = open
    await reload({scopeThis})
}

// 入住登记 - 发生新订单
async function newBusinessSubmit({scopeThis}) {
    const result = await ly0request.ly0request.storpro({
        storproName: 'ly0d4.roomstatus.newBusiness',
        data: Object.assign(scopeThis.newBusiness.formData, {
            arrRoom: scopeThis.arrRoomChecked,
        }),
    })
    ElMessage(result.message)
    if (result.code !== 0) {
        return
    }

    // 焦点订单及房态信息附加
    scopeThis.focus.id_business = result.id_business
    scopeThis.focus.status_code = '2'
    scopeThis.focus.status_text = '入住'
    // 清空选中房号数组
    scopeThis.arrRoomChecked = []
    // 关闭窗口
    scopeThis.newBusiness.formProps.popup.visible = false
    // 刷新页面
    await reload({scopeThis})
    // 打开订单详细
    scopeThis.id_business = scopeThis.focus.id_business
}

// 修改房态
async function setStatusSubmit({scopeThis, formData}) {
    if (
        (scopeThis.focus.status_code === '2' ||
        scopeThis.focus.status_code === '3' ||
        scopeThis.focus.status_code === '4') &&
        (formData.status_code === '1' ||
            formData.status_code === '0')
    ) {
        try{
            await ElMessageBox.confirm(
                '设置为' +
                (formData.status_code === '1' ? '空房' : '维修') +
                '后，将删除订单与客房信息的关联?',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                },
            )
            await setStatusSubmit0({scopeThis, formData})
        }catch (err) {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        }
    } else {
        await setStatusSubmit0({scopeThis, formData})
    }
}
async function setStatusSubmit0({scopeThis, formData}) {
    const result = await ly0request.ly0request.storpro({
        storproName: 'ly0d4.roomstatus.setStatus',
        data: {
            id_room: scopeThis.focus._id,
            status_code: formData.status_code,
        },
    })
    ElMessage(result.message)
    if (result.code !== 0) {
        return
    }

    scopeThis.focus.status_code = formData.status_code
    scopeThis.focus.id_business = null
    // 清空选房记录
    scopeThis.arrRoomChecked = []
    // 关闭窗口
    scopeThis.formProps.popup.visible = false
    // 刷新页面
    await reload({scopeThis})
}

export default {
    getPgData,
    reload,
    collapseSwitch,
    newBusinessSubmit,
    setStatusSubmit,
}
