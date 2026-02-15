// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'
//
import dateFormat from '../../../../utils/date-format.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '预约记录',
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
          fieldName: 'room_name',
        },
        {
          label: '座位',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.seat_row + ',' + row.seat_col
          },
        },
        {
          label: '使用人',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return row.user_cellphone + '/' + row.user_name
          },
        },
        {
          label: '使用时间',
          show: 'expression',
          hdlExpression(scopeThis, row) {
            return (
              dateFormat.dateFormat(row.date, 'yyyy/MM/dd') + ' ' +
              row.day_openfrom_hh + ':' +
              row.day_openfrom_mm + '-' +
              row.day_opento_hh + ':' +
              row.day_opento_mm
            )
          },
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
