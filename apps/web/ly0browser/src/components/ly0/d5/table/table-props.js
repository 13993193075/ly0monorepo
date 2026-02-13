// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '餐位信息',
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
        {
          buttonSize: 'small',
          box: [
            {
              text: '选中打印：二维码',
              round: true,
              icon: 'Printer',
              hdlClick(scopeThis) {
                scopeThis.hdlsSupplement.qrcodePopup(scopeThis)
              },
            },
            {
              text: '小程序码',
              round: true,
              hdlClick(scopeThis) {
                scopeThis.hdlsSupplement.wxacodePopup(scopeThis)
              },
            },
          ],
        },
      ],
    },
    table: {
      selection: { yes: true },
      hdlSelectionChange(scopeThis, inherit) {
        // 获取选中的多记录数组
        scopeThis.arrSelection = inherit.selection
      },
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
          label: '餐位分区',
          show: 'text',
          fieldName: 'diningplace_text',
        },
        {
          label: '餐位（桌号）',
          show: 'text',
          fieldName: 'tableno',
        },
        {
          label: '使用状态',
          show: 'text',
          fieldName: 'status_code',
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
