// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '货品名录',
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
          label: '库管单位',
          show: 'text',
          fieldName: 'unit_name',
          hdlVisible(scopeThis) {
            return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
          },
        },
        {
          label: '货品分类',
          show: 'text',
          fieldName: 'goodsgroup_text',
        },
        {
          label: '货品名称',
          show: 'text',
          fieldName: 'name',
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
