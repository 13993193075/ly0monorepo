// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '进车记录 - 信息维护',
    },
    topButtonGroups: {
      box: [
        {
          box: [
            {
              text: '全部',
              hdlClick: handles.reloadAll,
            },
            {
              text: '刷新',
              hdlClick: handles.reload,
            },
            {
              text: '查询',
              hdlClick: handles.findPopup,
            },
            {
              text: '新增',
              hdlClick: handles.insertOnePopup,
            },
          ],
        },
      ],
    },
    table: {
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
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
            {
              text: '详细',
              hdlClick: handles.docPopup,
            },
            {
              text: '修改',
              hdlClick: handles.updateOnePopup,
            },
            {
              text: '删除',
              hdlClick: handles.deleteOneSubmit,
              style: 'background-color:#ff640a; color:#ffffff;',
            },
          ],
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
