// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '配售商品',
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
          label: '餐馆',
          show: 'text',
          fieldName: 'restaurant_name',
          hdlVisible(scopeThis) {
            return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
          },
        },
        {
          label: '商品分类',
          show: 'text',
          fieldName: 'goodsgroup_text',
        },
        {
          label: '商品名称/单价',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.name + '/' + Math.floor(row.price) / 100
          },
        },
        {
          label: '照片',
          show: 'image',
          fieldName: 'thumb',
          imageWidth: '80px',
          imageHeight: '60px',
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
