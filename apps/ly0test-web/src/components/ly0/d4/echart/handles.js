import {request} from 'packages/ly0libs/src/index.js'
import {blindboxes} from 'packages/ly0utils/src/index.js'
import * as echarts from 'echarts'
import {ElMessage} from 'element-plus'
const ly0session = request.ly0.ly0sessionLoad()
const dateFormat = blindboxes.dateFormat.dateFormat

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
    return await request.ly0.storpro({
        storproName: 'ly0d4.echart.echart',
        data: {
            id_dataunit: ly0session.dataunit._id,
            id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        },
    })
}

// 视图
function showEcharts({ scopeThis }) {
    const { data, arrDate } = scopeThis;
    const legendData = ['客房收入', '配售商品', '损赔物品', '消费挂账', '应收合计', '实际核收'];

    data.hotel.forEach((hotel, iHotel) => {
        const xAxisData = [];
        // 初始化 series 结构
        const series = [
            { name: '客房收入', type: 'bar', stack: '应收合计', data: [], dataCode: 'amount_goods' },
            { name: '配售商品', type: 'bar', stack: '应收合计', data: [], dataCode: 'amount_goods0' },
            { name: '损赔物品', type: 'bar', stack: '应收合计', data: [], dataCode: 'amount_goods1' },
            { name: '消费挂账', type: 'bar', stack: '应收合计', data: [], dataCode: 'amount_bill' },
            { name: '应收合计', type: 'bar', data: [], dataCode: 'amount' },
            { name: '实际核收', type: 'bar', data: [], dataCode: 'deal' }
        ];

        arrDate.forEach(dateRange => {
            // 1. 生成 X 轴标签
            const label = `${dateRange.dateFrom ? dateFormat(dateRange.dateFrom, 'yyyy/M/d') : '-'} 至 ${dateRange.dateTo ? dateFormat(dateRange.dateTo, 'yyyy/M/d') : '-'}`;
            xAxisData.push(label);

            // 2. 一次性过滤数据 (减少 Date 对象创建)
            const fromTime = dateRange.dateFrom ? new Date(dateRange.dateFrom).getTime() : -Infinity;
            const toTime = dateRange.dateTo ? new Date(dateRange.dateTo).getTime() : Infinity;
            const hotelId = String(hotel._id);

            const filtered = data.business.filter(item => {
                const checkinTime = new Date(item.checkin).getTime();
                return String(item.id_hotel) === hotelId &&
                    checkinTime >= fromTime &&
                    checkinTime <= toTime
            })

            // 3. 一次 reduce 计算所有指标 (极致性能优化)
            const totals = filtered.reduce((acc, curr) => {
                acc.amount_goods += (curr.amount_goods || 0);
                acc.amount_goods0 += (curr.amount_goods0 || 0);
                acc.amount_goods1 += (curr.amount_goods1 || 0);
                acc.amount_bill += (curr.amount_bill || 0);
                acc.amount += (curr.amount || 0);
                acc.deal += (curr.deal || 0);
                return acc;
            }, { amount_goods: 0, amount_goods0: 0, amount_goods1: 0, amount_bill: 0, amount: 0, deal: 0 });

            // 4. 填充数据 (假设原始数据是分，/100 得到元)
            series[0].data.push(totals.amount_goods / 100);
            series[1].data.push(totals.amount_goods0 / 100);
            series[2].data.push(totals.amount_goods1 / 100);
            series[3].data.push(totals.amount_bill / 100);
            series[4].data.push(totals.amount / 100);
            series[5].data.push(totals.deal / 100);
        });

        // 5. 渲染
        const option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: legendData },
            xAxis: [{ type: 'category', data: xAxisData, axisLabel: { interval: 0, rotate: 15 } }],
            yAxis: [{ type: 'value' }],
            series: series
        };

        setTimeout(function () {
            // 确保 DOM 已挂载
            const chartDom = document.getElementById('echarts-show' + iHotel);
            if (chartDom) {
                // 建议：如果已经 init 过，应该：
                let myChart = echarts.getInstanceByDom(chartDom)
                if(!myChart) {
                    myChart = echarts.init(chartDom);
                }
                myChart.setOption(option);
            }
        }, 200)
    });
}

export default {
    dateReset,
    reset,
    reload,
    getData,
    showEcharts,
    dateFormat,
}
