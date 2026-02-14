import {request} from 'packages/ly0libs'
let ly0session = request.ly0.ly0sessionLoad()

// 获取页面数据
async function getPgData({scopeThis}){
    const result = await request.ly0.storpro({
        storproName: 'ly0d4.roomstatus0.getPgData',
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

export default {
    getPgData,
    reload,
    collapseSwitch,
}
