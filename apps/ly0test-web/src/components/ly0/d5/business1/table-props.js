// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'
// 日期格式
import dateFormat from '../../../../utils/date-format.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '订单记录 - 用餐',
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
          label: '订单编号',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            if (scopeThis.pageData.data.arrRestaurant.length > 1) {
              return row.restaurant_name + '/' + row._id
            } else {
              return row._id
            }
          },
        },
        {
          label: '用餐时间/用餐人数',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return dateFormat.dateFormat(row.time) + '/' + row.peoples
          },
        },
        {
          label: '客户信息',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              (row.client_cellphone ? row.client_cellphone : '-') +
              '/' +
              (row.client_name ? row.client_name : '-')
            )
          },
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
            {
              text: '订单详细',
              hdlClick(scopeThis, row) {
                scopeThis.idBusiness.id_business = row._id
              },
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
