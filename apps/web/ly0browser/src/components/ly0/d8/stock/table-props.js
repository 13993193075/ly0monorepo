// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    // 置顶菜单
    menu: [
      {
        title: '查询',
        menu: [
          {
            title: '全部',
            handle: handles.reloadAll,
          },
          {
            title: '刷新',
            handle: handles.reload,
          },
          {
            title: '查询',
            handle: handles.findPopup,
          },
        ],
      },
      {
        title: '打印',
        menu: [
          {
            title: '打印',
            handle(scopeThis) {
              scopeThis.ly0$internalShell['table'].hdlPrint()
            },
          },
          {
            title: '下载Excel',
            handle(scopeThis) {
              scopeThis.ly0$internalShell['table'].hdlSaveToExcel()
            },
          },
          {
            title: '选择列',
            handle(scopeThis) {
              scopeThis.ly0$internalShell['table'].hdlColPick()
            },
          },
        ],
      },
    ],
    titleLine: {
      text: '期间库存盘点表',
    },
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
          label: '库管单位',
          show: 'text',
          fieldName: 'unit_name',
          hdlVisible(scopeThis) {
            return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
          },
        },
        {
          label: '货品分类/名称',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (row.goodsgroup_text ? row.goodsgroup_text : '-') + '/' + row.name
          },
        },
        {
          label: '期初库存/期末库存/期间增减',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.stock_start + '/' + row.stock_end + '/' + (row.stock_end - row.stock_start)
          },
        },
        {
          label: '期间采购/入库/合计',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              row.count0purchase +
              '/' +
              row.count0goodsin +
              '/' +
              (row.count0purchase + row.count0goodsin)
            )
          },
        },
        {
          label: '期间出库/销售/核销/合计',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              row.count1goodsout +
              '/' +
              row.count1sale +
              '/' +
              row.count1loss +
              '/' +
              (+row.count1goodsout + +row.count1sale + +row.count1loss)
            )
          },
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
