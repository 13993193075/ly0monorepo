// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '前台收费',
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
      hdlRowClick(scopeThis, inherit) {
        // 当某一行被点击时会触发该事件
        // inherit.row
        // inherit.column
        // inherit.event

        scopeThis.idBusiness.id_property = inherit.row._id
      },
      cols: [
        {
          label: '户号',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              '位置：' +
              (scopeThis.pageData.data.arrUnit.length > 1 ? row.unit_name + '/' : '') +
              (row.position_text ? row.position_text : '-') +
              '\n' +
              '户号/计费面积：' +
              (row.number ? row.number : '-') +
              '/' +
              (row.area ? row.area : '-') +
              '\n' +
              '业主信息：' +
              (row.owner_cellphone ? row.owner_cellphone : '-') +
              '/' +
              (row.owner_name ? row.owner_name : '-')
            )
          },
        },
        {
          label: '最新收费记录（服务类）',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            let str = ''
            if (row.goods_data && row.goods_data.length > 0) {
              for (let i = 0; i < row.goods_data.length; i++) {
                str =
                  (!!str ? str + '\n' : '') +
                  row.goods_data[i].goods_name +
                  ' | 有效期至：' +
                  dateFormat.dateFormat(row.goods_data[i].to, 'yyyy/MM/dd') +
                  ' | ' +
                  (!row.goods_data[i].clear ? '未清账' : '已清账')
              }
            }
            return str
          },
        },
        {
          label: '最新收费记录（资源类）',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            let str = ''
            if (row.goods0_data && row.goods0_data.length > 0) {
              for (let i = 0; i < row.goods0_data.length; i++) {
                str =
                  (!!str ? str + '\n' : '') +
                  row.goods0_data[i].goods_name +
                  ' | 数量：' +
                  row.goods0_data[i].count +
                  ' | ' +
                  dateFormat.dateFormat(row.goods0_data[i].time) +
                  ' | ' +
                  (!row.goods0_data[i].clear ? '未清账' : '已清账')
              }
            }
            return str
          },
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
