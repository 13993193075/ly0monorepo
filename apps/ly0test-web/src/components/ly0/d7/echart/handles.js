import { request as ly0request } from '@yoooloo42/ly0browser'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import * as echarts from 'echarts'
import {ElMessage} from 'element-plus'
const ly0session = ly0request.ly0.ly0sessionLoad()
const dateFormat = ly0utils.dateFormat.dateFormat

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
    const result = await getData({scopeThis})
    scopeThis.data = result.data
    dateReset({scopeThis})
    showEcharts({scopeThis})
    ElMessage('已重置')
}

// 刷新
async function reload({scopeThis}) {
    const result = await getData({scopeThis})
    scopeThis.data = result.data
    showEcharts({scopeThis})
    ElMessage('已刷新')
}

// 获取数据
async function getData({scopeThis}) {
    return await ly0request.ly0.storpro({
        storproName: 'ly0d7.echart.echart',
        data: {
            id_dataunit: ly0session.dataunit._id,
            id_shop: ly0session.user.id_shop || null,
        },
    })
}

// 视图
function showEcharts ({scopeThis}) {
    // 初始化 ECharts 渲染参数
    let option_legend_data = [ // 顶部色标示意
            '应收',
            '核收'
        ],
        option_xAxis_data = [], // x轴项目设置（时段）
        option_series = []; // 统计数据展示（柱形图）

    for (let iShop = 0; iShop < scopeThis.data.shop.length; iShop++) {
        option_xAxis_data = [];

        // let barWidth = 100
        option_series = [
            {
                name: '应收',
                type: 'bar',
                // barWidth,
                data: [],
                dataCode: 'Amount'
            },
            {
                name: '核收',
                type: 'bar',
                // barWidth,
                data: [],
                dataCode: 'Deal'
            }
        ]

        for (let iDate = 0; iDate < scopeThis.arrDate.length; iDate++) {
            let amount = 0,
                deal = 0

            option_xAxis_data.push(
                (scopeThis.arrDate [iDate].dateFrom ? dateFormat(scopeThis.arrDate [iDate].dateFrom, 'yyyy/M/d') : '-') +
                ' ' + '至' + ' ' +
                (scopeThis.arrDate [iDate].dateTo ? dateFormat(scopeThis.arrDate [iDate].dateTo, 'yyyy/M/d') : '-')
            )

            const fromTime = scopeThis.arrDate [iDate].dateFrom ? new Date(scopeThis.arrDate [iDate].dateFrom).getTime() : -Infinity;
            const toTime = scopeThis.arrDate [iDate].dateTo ? new Date(scopeThis.arrDate [iDate].dateTo).getTime() : Infinity;
            let dataFilter = scopeThis.data.business.filter(i=>{
                // 时段排除
                if (fromTime > new Date(i.time).getTime()) {
                    return false
                }
                if (toTime < new Date(i.time).getTime()) {
                    return false
                }

                // 商店排除
                if (String(scopeThis.data.shop [iShop]._id) !== String(i.id_shop)) {
                    return false
                }

                return true
            })

            amount = Math.floor([0].concat(dataFilter).reduce(function (sum, i) {
                return sum + i.amount
            })) / 100
            deal = Math.floor([0].concat(dataFilter).reduce(function (sum, i) {
                return sum + i.deal
            })) / 100

            option_series[0].data.push(amount)
            option_series[1].data.push(deal)
        }

        // 执行渲染
        let option = {
            /*
            color: [ // 自定义色标
                '#001122',
                '#334455',
                '#667788',
                '#99AABB',
                '#CCDDEE',
                '#FF0011',
                '#223344',
                '#556677',
                '#889900',
                '#112233'
            ],
            */
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                /*
                formatter (params) { // 自定义鼠标浮窗（数据标示）
                    let return0 = params [0].axisValueLabel
                    return0 = return0 + '<div style=\'height:1px; background-color: #878787\'></div>'

                    for (let i = 0; i < params.length; i++) {
                        return0 = return0 +
                            '<div style = \'display:inline-block; width:10px; height:10px; background-color:' + params [i].color + '\'></div>' +
                            '&nbsp;' + params [i].seriesName + ': ' + params [i].data
                        return0 = return0 + '<br>'
                    }
                    return return0
                }
                */
            },
            legend: {
                data: option_legend_data
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: option_xAxis_data,
                axisLabel: {
                    interval: 0,
                    rotate: 15
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: option_series
        }

        setTimeout(function () {
            // 确保 DOM 已挂载
            const chartDom = document.getElementById('echarts-show' + iShop);
            if (chartDom) {
                // 建议：如果已经 init 过，应该：
                let myChart = echarts.getInstanceByDom(chartDom)
                if(!myChart) {
                    myChart = echarts.init(chartDom);
                }
                myChart.setOption(option);
            }
        }, 200)
    }
}

export default (function () {
    return {
        dateReset,
        reset,
        reload,
        getData,
        showEcharts,
        dateFormat
    }
})()
