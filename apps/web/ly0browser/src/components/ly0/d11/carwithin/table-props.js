// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '长期车',
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
          label: '车位',
          show: 'text',
          fieldName: 'parking',
        },
        {
          label: '车牌/车主手机号',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.carplate + '/' + (row.cellphone ? row.cellphone : '-')
          },
        },
        {
          label: '有效期',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              scopeThis.hdlsSupplement.dateFormat.dateFormat(row.expiryfrom, 'yyyy/MM/dd') +
              ' - ' +
              scopeThis.hdlsSupplement.dateFormat.dateFormat(row.expiryto, 'yyyy/MM/dd')
            )
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
