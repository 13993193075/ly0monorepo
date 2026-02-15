function getTableProps(scopeThis) {
  return {
    menu: [
      {
        title: '查询',
        menu: [
          {
            title: '全部',
            handle(scopeThis) {
              scopeThis.handles.reloadAll(scopeThis)
            },
          },
          {
            title: '刷新',
            handle(scopeThis) {
              scopeThis.handles.reload(scopeThis)
            },
          },
          {
            title: '查询',
            handle(scopeThis) {
              scopeThis.handles.findPopup(scopeThis)
            },
          },
        ],
      },
      {
        title: '进出车登记',
        menu: [
          {
            title: '进车登记',
            handle(scopeThis) {
              scopeThis.hdlsSupplement.passinPopup(scopeThis)
            },
          },
          {
            title: '出车登记',
            handle(scopeThis) {
              scopeThis.hdlsSupplement.passoutPopup(scopeThis)
            },
          },
        ],
      },
    ],
    table: {
      hdlRowClick(scopeThis, inherit) {
        // 当某一行被点击时会触发该事件
        // inherit.row
        // inherit.column
        // inherit.event

        scopeThis.handles.docPopup(scopeThis, inherit.row)
      },
      cols: [
        {
          label: '停车场',
          show: 'text',
          fieldName: 'carpark_name',
          hdlVisible(scopeThis) {
            return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
          },
        },
        {
          label: '车牌',
          show: 'text',
          fieldName: 'carplate',
        },
        {
          label: '进入时间 - 离开时间',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              scopeThis.hdlsSupplement.dateFormat.dateFormat(row.timein) +
              ' - ' +
              scopeThis.hdlsSupplement.dateFormat.dateFormat(row.timeout)
            )
          },
        },
        {
          label: '核收金额',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return Math.floor(row.fee) / 100
          },
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
