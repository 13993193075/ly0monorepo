// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '房间信息',
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
          label: '房间位置',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            let place = scopeThis.pageData.data.arrPlace.length > 1 ? row.place_name : ''
            let position = row.position_text ? row.position_text : ''
            if (!place && !position) {
              return ''
            } else if (!place) {
              return position
            } else if (!position) {
              return place
            } else {
              return place + '/' + position
            }
          },
        },
        {
          label: '房间名称',
          show: 'text',
          fieldName: 'name',
        },
        {
          label: '行数/列数',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.rows + '/' + row.cols
          },
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
            {
              text: '详细',
              hdlClick(scopeThis, row) {
                scopeThis.doc.hdlReload(scopeThis, row._id)
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
