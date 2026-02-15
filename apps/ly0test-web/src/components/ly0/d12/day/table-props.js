// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '开放时段',
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
          label: '场所名称',
          show: 'text',
          fieldName: 'place_name',
          hdlVisible(scopeThis) {
            return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
          },
        },
        {
          label: '星期几',
          show: 'text',
          fieldName: 'day',
        },
        {
          label: '开放时段',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              row.openfrom_hh + ':' + row.openfrom_mm + ' - ' + row.opento_hh + ':' + row.opento_mm
            )
          },
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
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
