// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getImageListProps(scopeThis) {
  return {
    titleLine: {
      text: '物业分区',
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
    imageFieldName: 'photo',
    // imageWidth: "160px",
    // imageHeight: "120px",

    // 下拉菜单
    dropdownMenu: [
      {
        label: '读表',
        icon: 'el-icon-odometer',
        handle(scopeThis, itemData) {},
      },
      {
        label: '详细',
        icon: 'el-icon-document',
        handle: handles.docPopup,
      },
      {
        label: '修改',
        icon: 'el-icon-edit',
        handle: handles.updateOnePopup,
      },
      {
        label: '删除',
        icon: 'el-icon-delete',
        handle: handles.deleteOneSubmit,
      },
    ],

    // 下标
    subscriptLabel: [
      // 本次抄表
      {
        show: 'expression',
        hdlExpression(scopeThis, itemData) {
          return '（' + itemData.metername + '）' + '本次抄表：' + itemData.readout
        },
      },
      // 本次抄表时间
      {
        show: 'expression',
        hdlExpression(scopeThis, itemData) {
          return scopeThis.hdlsSupplement.dateFormat.dateFormat(itemData.time)
        },
      },
      // 户号
      {
        show: 'expression',
        hdlExpression(scopeThis, itemData) {
          return (
            (scopeThis.pageData.data.arrUnit.length > 1 ? itemData.unit_name + ' / ' : '') +
            itemData.property_number
          )
        },
      },
    ],

    imageList: {},
  }
}

export default {
  getImageListProps,
}
