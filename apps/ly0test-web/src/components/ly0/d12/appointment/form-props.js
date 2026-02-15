import dateFormat from '../../../../utils/date-format.js'
function items(scopeThis, branch) {
  return [
    {
      inputType: 'select',
      label: '场所名称',
      fieldName: 'id_place',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPlace
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_place(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_place0(scopeThis, branch)
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
      },
    },
    {
      inputType: 'select',
      label: '房间位置',
      fieldName: 'id_position',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPosition0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_position(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_position0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '房间名称',
      fieldName: 'id_room',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrRoom0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_room(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_room0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '座位',
      fieldName: 'id_seat',
      item_fieldLabel: 'label_row_col',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrSeat0
      },
    },
    {
      inputType: 'input',
      label: '使用人手机号',
      fieldName: 'user_cellphone',
    },
    {
      inputType: 'input',
      label: '使用人姓名',
      fieldName: 'user_name',
    },
    {
      inputType: 'date-picker',
      label: '使用日期',
      fieldName: 'date',
      type: 'date',
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.setDay(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '使用时段',
      fieldName: 'id_day',
      item_fieldLabel: 'label_from_to',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrDay0
      },
    },
  ]
}

function getFormProps(scopeThis) {
  return {
    find: {
      popup: {
        visible: false,
        title: '查询',
      },
      cols: [
        {
          items: [
            {
              inputType: 'select',
              label: '场所名称',
              fieldName: 'id_place',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPlace
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_place(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_place0(scopeThis, 'find')
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
              },
            },
            {
              inputType: 'select',
              label: '房间位置',
              fieldName: 'id_position',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPosition0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_position(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_position0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '房间名称',
              fieldName: 'id_room',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrRoom0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_room(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_room0(scopeThis, 'find')
              },
            },
            {
              inputType: 'input',
              label: '使用人手机号',
              fieldName: 'user_cellphone',
            },
            {
              inputType: 'input',
              label: '使用人姓名',
              fieldName: 'user_name',
            },
            {
              inputType: 'date-picker',
              label: '使用日期 起',
              fieldName: 'date_start',
              type: 'date',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'date_end',
              type: 'date',
            },
          ],
        },
      ],
    },
    insertOne: {
      popup: {
        visible: false,
        title: '新增',
      },
      cols: [
        {
          items: items(scopeThis, 'insertOne'),
        },
      ],
    },
    doc: {
      popup: {
        visible: false,
        title: '详细',
      },
      cols: [
        {
          items: [
            {
              inputType: 'text',
              label: '场所名称',
              fieldName: 'place_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
              },
            },
            {
              inputType: 'text',
              label: '房间位置',
              fieldName: 'position_text',
            },
            {
              inputType: 'text',
              label: '房间名称',
              fieldName: 'room_name',
            },
            {
              inputType: 'expression',
              label: '座位',
              hdlExpression(scopeThis, fieldsValue) {
                return fieldsValue.seat_row + ',' + fieldsValue.seat_col
              },
            },
            {
              inputType: 'text',
              label: '使用人手机号',
              fieldName: 'user_cellphone',
            },
            {
              inputType: 'text',
              label: '使用人名称',
              fieldName: 'user_name',
            },
            {
              label: '使用日期',
              inputType: 'expression',
              hdlExpression(scopeThis, fieldsValue) {
                return dateFormat.dateFormat(fieldsValue.date, 'yyyy/MM/dd')
              },
            },
            {
              label: '使用时段',
              inputType: 'expression',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  fieldsValue.day_openfrom_hh +
                  ':' +
                  fieldsValue.day_openfrom_mm +
                  '-' +
                  fieldsValue.day_opento_hh +
                  ':' +
                  fieldsValue.day_opento_mm
                )
              },
            },
          ],
        },
      ],
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [
        {
          items: items(scopeThis, 'updateOne'),
        },
      ],
    },
  }
}

export default {
  getFormProps,
}
