// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '物业单位名称及参数设置',
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
          label: '物业单位编号',
          show: 'text',
          fieldName: '_id',
        },
        {
          label: '物业单位名称',
          show: 'text',
          fieldName: 'name',
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
          ],
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
