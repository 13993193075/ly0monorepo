import {ly0request} from '@yoooloo42/ly0browser/ly0request'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {ElMessage} from 'element-plus'
const ly0session = ly0request.ly0sessionLoad()
const dateFormat = ly0utils.dateFormat.dateFormat
const days = ly0utils.dateFormat.days

// 全部展开
function collapseAll({scopeThis}) {
    scopeThis.collapseOpen = []
    scopeThis.data.hotel.forEach((hotel, iHotel) => {
        scopeThis.collapseOpen.push('hotel.' + hotel._id)
        scopeThis.arrDate.forEach((d, iDate) => {
            scopeThis.collapseOpen.push('hotel.' + hotel._id + '-date.' + iDate)
            scopeThis.data.booktype.forEach((booktype, iBooktype) => {
                scopeThis.collapseOpen.push(
                    'hotel.' + hotel._id + '-date.' + iDate + '-booktype.' + booktype._id,
                )
            })
            scopeThis.collapseOpen.push('hotel.' + hotel._id + '-date.' + iDate + '-booktype.unknown')
        })
    })
}

// 时段重置：统计当月
function dateReset({scopeThis}) {
    const thisDate = new Date()
    const dateTo = new Date(thisDate)
    dateTo.setHours(23, 59, 59, 999)
    const dateFrom = new Date(thisDate.setDate(1))
    dateFrom.setHours(0,0,0,0)
    scopeThis.arrDate = [
        {
            dateFrom,
            dateTo,
        },
    ]
}

// 重置
async function reset({scopeThis}) {
    await getData({scopeThis})
    dateReset({scopeThis})
    scopeThis.hdlDatashow.dataShow({scopeThis})
    ElMessage('已重置')
}

//刷新
async function reload({scopeThis}) {
    await getData({scopeThis})
    scopeThis.hdlDatashow.dataShow({scopeThis})
    ElMessage('已刷新')
}

// 获取数据
async function getData({scopeThis}) {
    const result = await ly0request.storpro({
        storproName: 'ly0d4.echart.echart0',
        data: {
            id_dataunit: ly0session.dataunit._id,
            id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        },
    })
    // 后台获取的数据源
    scopeThis.data = Object.assign(scopeThis.data, result.data)
    // 展开全部面板
    collapseAll({scopeThis})
}

export default {
    collapseAll,
    dateReset,
    reset,
    reload,
    getData,
    dateFormat,
    days,
}
