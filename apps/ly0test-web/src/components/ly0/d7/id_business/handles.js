import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
// 页面初始化
async function init({scopeThis}){
    const result = await ly0request.ly0.storpro({
        storproName: 'ly0d7.id_business.id_business',
        data: {
            id_business: scopeThis.id_business,
        }
    })
    scopeThis.business = result.business
}

// 面板操作
const panel = {
    closeAll({scopeThis}) {
        scopeThis.panel.open.baseInfo = []
        scopeThis.panel.open.bGoods = []
        scopeThis.panel.open.memo = []
    },
    openAll({scopeThis}) {
        scopeThis.panel.open.baseInfo = ['0']
        scopeThis.panel.open.bGoods = ['0']
        scopeThis.panel.open.memo = ['0']
    }
}

// 订单状态
const businessStatus = {
    trading: async function ({scopeThis}) {
        try{
            await ElMessageBox.confirm('订单状态：交易中?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d7.id_business.trading',
                data: { id_business: scopeThis.id_business },
            })
            ElMessage(result.message)
            await init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }catch(err){
            ElMessage({ type: 'info', message: '取消操作' })
        }
    },
    traded: async function ({scopeThis}) {
        try{
            await ElMessageBox.confirm('订单状态：交易完成?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d4.id_business.traded',
                data: { id_business: scopeThis.id_business },
            })
            ElMessage(result.message)
            await init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }catch(err){
            ElMessage({ type: 'info', message: '取消操作' })
        }
    }
}

// 弹窗关闭
const setClosed = {
    b_goods: async function({scopeThis}) {
        scopeThis.set_b_goods.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.baseInfo = ['0']
        scopeThis.panel.open.bGoods = ['0']
    },
    memo: async function({scopeThis}) {
        scopeThis.set_memo.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.memo = ['0']
    }
}

export default {
    init,
    panel,
    businessStatus,
    setClosed
}
