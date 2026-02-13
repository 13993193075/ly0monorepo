// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '物业信息',
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
          label: '物业单位/分区',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            let unit = scopeThis.pageData.data.arrUnit.length > 1 ? row.unit_name : ''
            let position = row.position_text ? row.position_text : ''

            if (unit && position) {
              return unit + '/' + position
            } else if (!unit && !position) {
              return ''
            } else if (unit) {
              return unit
            } else if (position) {
              return position
            }
          },
        },
        {
          label: '户号/户名',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (row.number ? row.number : '-') + '/' + (row.name ? row.name : '-')
          },
        },
        {
          label: '业主手机号/名称',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              (row.owner_cellphone ? row.owner_cellphone : '-') +
              '/' +
              (row.owner_name ? row.owner_name : '-')
            )
          },
        },
        {
          label: '户型/计费面积',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (row.sizetype_name ? row.sizetype_name : '-') + '/' + (row.area ? row.area : '-')
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
