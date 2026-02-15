// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'
// 日期格式
import dateFormat from '../../../../utils/date-format.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '客户工单记录 - 取消',
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
          ],
        },
      ],
    },
    table: {
      cols: [
        {
          label: '工单编号',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            if (scopeThis.pageData.data.arrUnit.length > 1) {
              return row.unit_name + '/' + row._id
            } else {
              return row._id
            }
          },
        },
        {
          label: '客户信息',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.client_name + ' ' + row.client_cellphone
          },
        },
        {
          label: '下单时间',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return dateFormat.dateFormat(row.time)
          },
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
            {
              text: '工单详细',
              hdlClick(scopeThis, row) {
                scopeThis.idBusiness.id_business = row._id
              },
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
