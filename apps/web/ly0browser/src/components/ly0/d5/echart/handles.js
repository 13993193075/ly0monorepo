import dataRequest from '../../../../utils/data-request.js'
import dateFormat from '../../../../utils/date-format.js'
const ly0session = dataRequest.ly0sessionLoad()
import * as echarts from "echarts"

//时段重置：统计当月
function dateReset(scopeThis) {
  let thisDate = new Date()
  let dateTo = new Date(thisDate)
  let dateFrom = new Date(thisDate.setDate(1))
  scopeThis.arrDate = [
    {
      dateFrom,
      dateTo,
    },
  ]
}

//重置
function reset(scopeThis) {
  return new Promise((resolve, reject) => {
    getData(scopeThis).then(function (result) {
      scopeThis.data = result.data
      dateReset(scopeThis)
      showEcharts(scopeThis)
      scopeThis.$message('已重置')
      resolve()
    })
  })
}

//刷新
function reload(scopeThis) {
  return new Promise((resolve, reject) => {
    getData(scopeThis).then(function (result) {
      scopeThis.data = result.data
      showEcharts(scopeThis)
      scopeThis.$message('已刷新')
      resolve()
    })
  })
}

//获取数据
function getData(scopeThis) {
  return new Promise(function (resolve, reject) {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d5.echart.echart',
        data: {
          id_dataunit: ly0session.dataunit._id,
          id_restaurant: ly0session.user.id_restaurant ? ly0session.user.id_restaurant : null,
        },
      })
      .then((result) => {
        resolve(result)
      })
  })
}

//视图
function showEcharts(scopeThis) {
  //初始化 ECharts 渲染参数
  let option_legend_data = [
      //顶部色标示意
      '菜品销售',
      '配售商品',
      '损赔物品',
      '应收合计',
      '实际核收',
    ],
    option_xAxis_data = [], //x轴项目设置（时段）
    option_series = [] //统计数据展示（柱形图）

  for (let iRestaurant = 0; iRestaurant < scopeThis.data.restaurant.length; iRestaurant++) {
    option_xAxis_data = []

    //let barWidth = 100
    option_series = [
      {
        name: '菜品销售',
        type: 'bar',
        //barWidth,
        stack: '应收合计',
        data: [],
        dataCode: 'AmountGoods',
      },
      {
        name: '配售商品',
        type: 'bar',
        //barWidth,
        stack: '应收合计',
        data: [],
        dataCode: 'AmountGoods0',
      },
      {
        name: '损赔物品',
        type: 'bar',
        //barWidth,
        stack: '应收合计',
        data: [],
        dataCode: 'AmountGoods1',
      },
      {
        name: '应收合计',
        type: 'bar',
        //barWidth,
        data: [],
        dataCode: 'Amount',
      },
      {
        name: '实际核收',
        type: 'bar',
        //barWidth,
        data: [],
        dataCode: 'Deal',
      },
    ]

    for (let iDate = 0; iDate < scopeThis.arrDate.length; iDate++) {
      let amountGoods = 0,
        amountGoods0 = 0,
        amountGoods1 = 0,
        amount = 0,
        deal = 0

      option_xAxis_data.push(
        (scopeThis.arrDate[iDate].dateFrom
          ? dateFormat.dateFormat(scopeThis.arrDate[iDate].dateFrom, 'yyyy/M/d')
          : '-') +
          ' ' +
          '至' +
          ' ' +
          (scopeThis.arrDate[iDate].dateTo
            ? dateFormat.dateFormat(scopeThis.arrDate[iDate].dateTo, 'yyyy/M/d')
            : '-'),
      )

      let dataFilter = scopeThis.data.business.filter(function (i) {
        //时段排除
        if (
          scopeThis.arrDate[iDate].dateFrom &&
          new Date(scopeThis.arrDate[iDate].dateFrom) > new Date(i.checkin)
        ) {
          return false
        }
        if (
          scopeThis.arrDate[iDate].dateTo &&
          new Date(scopeThis.arrDate[iDate].dateTo) < new Date(i.checkin)
        ) {
          return false
        }

        //餐馆排除
        if (scopeThis.data.restaurant[iRestaurant]._id !== i.id_restaurant) {
          return false
        }

        return true
      })

      amountGoods =
        Math.floor(
          [0].concat(dataFilter).reduce(function (sum, i) {
            return sum + i.amount_goods
          }),
        ) / 100
      amountGoods0 =
        Math.floor(
          [0].concat(dataFilter).reduce(function (sum, i) {
            return sum + i.amount_goods0
          }),
        ) / 100
      amountGoods1 =
        Math.floor(
          [0].concat(dataFilter).reduce(function (sum, i) {
            return sum + i.amount_goods1
          }),
        ) / 100
      amount =
        Math.floor(
          [0].concat(dataFilter).reduce(function (sum, i) {
            return sum + i.amount
          }),
        ) / 100
      deal =
        Math.floor(
          [0].concat(dataFilter).reduce(function (sum, i) {
            return sum + i.deal
          }),
        ) / 100

      option_series[0].data.push(amountGoods)
      option_series[1].data.push(amountGoods0)
      option_series[2].data.push(amountGoods1)
      option_series[3].data.push(amount)
      option_series[4].data.push(deal)
    }

    //执行渲染
    let option = {
      /*
            color: [ //自定义色标
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
        axisPointer: {
          //坐标轴指示器，坐标轴触发有效
          type: 'shadow', //默认为直线，可选为：'line' | 'shadow'
        },
        /*
                formatter (params) { //自定义鼠标浮窗（数据标示）
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
        data: option_legend_data,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: option_xAxis_data,
          axisLabel: {
            interval: 0,
            rotate: 15,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: option_series,
    }
    setTimeout(function () {
      let app = echarts.init(document.getElementById('echarts-show' + iRestaurant))
      app.setOption(option)
    }, 200)
  }

  scopeThis.$forceUpdate()
}

export default (function () {
  return {
    dateReset,
    reset,
    reload,
    getData,
    showEcharts,
    dateFormat: dateFormat.dateFormat,
  }
})()
