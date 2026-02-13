import {request, FileSaver} from '@yoooloo42/ihavebacking'
import {ElMessage} from 'element-plus'

// 获取报表数据
async function getReportData({scopeThis}) {
    ElMessage('开始统计')
    scopeThis.loading = true
    scopeThis.loadingText = '正在统计中，可能需要较长时间，请稍候'

    const result = await request.ly0.storpro({
        storproName: 'ly0d4.report.month',
        data: {
            id_dataunit: request.ly0.ly0sessionLoad().dataunit._id,
            timeFrom: scopeThis.reqData.timeFrom,
            timeTo: scopeThis.reqData.timeTo,
        },
    })
    scopeThis.reportData = JSON.parse(JSON.stringify(result.data))
    scopeThis.loading = false
    scopeThis.loadingText = ''
    ElMessage('统计完成')
}

// 生成excel文件
function excel({scopeThis}){
    const filename = scopeThis.reportData.title // 文件名
    const header = ['收费项目', '期间应收', '实际核收']
    const keys = ['itemName', 'amount', 'deal']
    let json = []
    for(let i = 0; i < scopeThis.reportData.hotel.length; i++){
        let itemHotel = scopeThis.reportData.hotel[i]
        json.push({
            itemName: '[' + itemHotel.name + '] 合计',
            amount: Math.floor(itemHotel.count_amount)/100,
            deal: Math.floor(itemHotel.count_deal)/100
        })
        const arrGoods = scopeThis.reportData.goods.filter(iGoods=>{return iGoods.id_hotel === itemHotel._id})
        for(let j = 0; j < arrGoods.length; j++){
            let itemGoods = arrGoods[j]
            json.push({
                itemName: itemGoods.name,
                amount: Math.floor(itemGoods.count_amount)/100
            })
        }
    }
    FileSaver.jsonToExcel({json, header, keys, filename})
}

export default {
    getReportData,
    excel,
}
