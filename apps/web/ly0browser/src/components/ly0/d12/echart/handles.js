import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()
import dateFormat from '../../../../utils/date-format.js'
import * as echarts from "echarts"

// 重置
function reset(scopeThis) {
  getData(scopeThis).then(function (result) {
    scopeThis.data = result.data
    scopeThis.find.pageData.arrPlace = JSON.parse(JSON.stringify(result.data.place))
    scopeThis.find.pageData.arrPosition = JSON.parse(JSON.stringify(result.data.position))
    scopeThis.find.pageData.arrPosition0 = []
    scopeThis.find.pageData.arrRoom = JSON.parse(JSON.stringify(result.data.room))
    scopeThis.find.pageData.arrRoom0 = []
    scopeThis.find.pageData.arrDate = [
      {
        dateFrom: null,
        dateTo: null,
      },
    ]

    showEcharts(scopeThis)
    scopeThis.$message('已重置')
  })
}

// 刷新
function reload(scopeThis) {
  getData(scopeThis).then(function (result) {
    scopeThis.data = result.data
    scopeThis.find.pageData.arrPlace = JSON.parse(JSON.stringify(result.data.place))
    scopeThis.find.pageData.arrPosition = JSON.parse(JSON.stringify(result.data.position))
    scopeThis.find.pageData.arrRoom = JSON.parse(JSON.stringify(result.data.room))

    showEcharts(scopeThis)
    scopeThis.$message('已刷新')
  })
}

// 获取数据
function getData(scopeThis) {
  return new Promise(function (resolve, reject) {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d12.echart.echart',
        data: {
          id_dataunit: ly0session.dataunit._id,
          id_place: ly0session.user.id_place ? ly0session.user.id_place : null,
        },
      })
      .then((result) => {
        resolve(result)
      })
  })
}

// 视图
function showEcharts(scopeThis) {
  //初始化 ECharts 渲染参数
  let data = scopeThis.data.appointment,
    arrDate =
      scopeThis.find.pageData.arrDate.length > 0
        ? JSON.parse(JSON.stringify(scopeThis.find.pageData.arrDate))
        : [
            {
              dateFrom: null,
              dateTo: null,
            },
          ],
    arrRoom =
      scopeThis.find.pageData.arrRoom0.length > 0
        ? JSON.parse(JSON.stringify(scopeThis.find.pageData.arrRoom0))
        : JSON.parse(JSON.stringify(scopeThis.find.pageData.arrRoom))

  arrRoom = arrRoom.splice(0, 20) //最大显示条目数

  let option_xAxis_data = [],
    option_yAxis_data = [],
    option_series_data = []

  option_xAxis_data = arrRoom.map(function (i) {
    return i.name
  })
  option_yAxis_data = arrDate.map(function (i) {
    return (
      (i.dateFrom ? dateFormat.dateFormat(i.dateFrom, 'yyyy-M-d') : '-') +
      ' ' +
      '至' +
      ' ' +
      (i.dateTo ? dateFormat.dateFormat(i.dateTo, 'yyyy-M-d') : '-')
    )
  })

  for (let iY = 0; iY < arrDate.length; iY++) {
    for (let iX = 0; iX < arrRoom.length; iX++) {
      let count = [0]
        .concat(
          data.filter(function (i) {
            let d = new Date(new Date(i.date).toDateString()),
              d0 = arrDate[iY].dateFrom
                ? new Date(new Date(arrDate[iY].dateFrom).toDateString())
                : null,
              d1 = arrDate[iY].dateTo ? new Date(new Date(arrDate[iY].dateTo).toDateString()) : null

            return i.id_room === arrRoom[iX]._id && (d0 ? d >= d0 : true) && (d1 ? d <= d1 : true)
          }),
        )
        .reduce(function (total, i) {
          return total + 1
        })
      option_series_data.push([iY, iX, count])
    }
  }

  option_series_data = option_series_data.map(function (item) {
    return [item[1], item[0], item[2] || '-']
  })
  //End 初始化 ECharts 渲染参数

  //ECharts 渲染
  let app = echarts.init(document.getElementById('echartsShow')) //绑定 ECharts 容器

  let option = {
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: option_xAxis_data, //x 轴：房间
      splitArea: {
        show: true,
      },
      axisLabel: {
        interval: 0,
        rotate: 15,
      },
    },
    yAxis: {
      type: 'category',
      data: option_yAxis_data, //y 轴：时段

      splitArea: {
        show: true,
      },
      axisLabel: {
        interval: 0,
        rotate: 15,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: '人数',
        type: 'heatmap',
        data: option_series_data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  app.setOption(option) //执行渲染
  //End ECharts 渲染

  scopeThis.$forceUpdate()
}

export default (function () {
  return {
    reset,
    reload,
    getData,
    showEcharts,
    dateFormat: dateFormat.dateFormat,
  }
})()
