// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '库管单位名称',
    },
    topButtonGroups: {
      box: [
        {
          box: [
            {
              text: '刷新',
              hdlClick: handles.reload,
            },
          ],
        },
      ],
    },
    table: {
      cols: [
        {
          label: '库管单位名称',
          show: 'text',
          fieldName: 'name',
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
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
