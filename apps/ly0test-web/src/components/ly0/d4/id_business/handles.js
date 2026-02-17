import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
// 页面初始化
async function init({scopeThis}){
    const result = await ly0request.ly0.storpro({
        storproName: 'ly0d4.id_business.id_business',
        data: {
            id_business: scopeThis.id_business,
        }
    })
    scopeThis.business = result.business
    scopeThis.pgData = result.pgData
}

// 面板操作
const panel = {
    closeAll({scopeThis}) {
        scopeThis.panel.open.baseInfo = []
        scopeThis.panel.open.salebook = []
        scopeThis.panel.open.bGoods = []
        scopeThis.panel.open.bGoods0 = []
        scopeThis.panel.open.bGoods1 = []
        scopeThis.panel.open.bill = []
        scopeThis.panel.open.amount = []
        scopeThis.panel.open.guest = []
        scopeThis.panel.open.memo = []
    },
    openAll({scopeThis}) {
        scopeThis.panel.open.baseInfo = ['0']
        scopeThis.panel.open.salebook = ['0']
        scopeThis.panel.open.bGoods = ['0']
        scopeThis.panel.open.bGoods0 = ['0']
        scopeThis.panel.open.bGoods1 = ['0']
        scopeThis.panel.open.bill = ['0']
        scopeThis.panel.open.amount = ['0']
        scopeThis.panel.open.guest = ['0']
        scopeThis.panel.open.memo = ['0']
    }
}

// 订单状态
const businessStatus = {
    book: async function ({scopeThis}) {
        try{
            await ElMessageBox.confirm('订单状态：预订?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d4.id_business.book',
                data: { id_business: scopeThis.id_business },
            })
            ElMessage(result.message)
            await init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }catch(err){
            ElMessage({ type: 'info', message: '取消操作' })
        }
    },
    arrive: async function ({scopeThis}) {
        try{
            await ElMessageBox.confirm('订单状态：入住?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d4.id_business.arrive',
                data: { id_business: scopeThis.id_business },
            })
            ElMessage(result.message)
            await init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }catch(err){
            ElMessage({ type: 'info', message: '取消操作' })
        }
    },
    leave: async function ({scopeThis}) {
        try{
            await ElMessageBox.confirm('订单状态：离开?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d4.id_business.leave',
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
    salebook: async function({scopeThis}) {
        scopeThis.set_salebook.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.salebook = ['0']
        scopeThis.panel.open.bGoods = ['0']
        scopeThis.panel.open.amount = ['0']
    },
    b_goods: async function({scopeThis}) {
        scopeThis.set_b_goods.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.bGoods = ['0']
        scopeThis.panel.open.salebook = ['0']
        scopeThis.panel.open.amount = ['0']
    },
    b_goods0: async function({scopeThis}) {
        scopeThis.set_b_goods0.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.bGoods0 = ['0']
        scopeThis.panel.open.amount = ['0']
    },
    b_goods1: async function({scopeThis}) {
        scopeThis.set_b_goods1.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.bGoods1 = ['0']
        scopeThis.panel.open.amount = ['0']
    },
    bill: async function({scopeThis}) {
        scopeThis.set_bill.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.bill = ['0']
        scopeThis.panel.open.amount = ['0']
    },
    guest: async function({scopeThis}) {
        scopeThis.set_guest.id_business = null
        await init({scopeThis})
        scopeThis.panel.open.guest = ['0']
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
