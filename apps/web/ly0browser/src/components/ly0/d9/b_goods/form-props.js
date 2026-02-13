import dateFormat from '../../../../utils/date-format.js'
import dataRequest from '../../../../utils/data-request.js'
function items(branch) {
  return [
    {
      inputType: 'select',
      label: '项目名称',
      fieldName: 'id_goods',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoods
      },
      hdlChange(scopeThis, value) {
        let objGoods = scopeThis.pageData.data.arrGoods.find((i) => {
          return i._id === value
        })
        scopeThis.formDataBox[branch].fieldsValue.method_code = objGoods.method_code
        scopeThis.formDataBox[branch].fieldsValue.method_text = objGoods.method_text
        scopeThis.formDataBox[branch].fieldsValue.price = objGoods.price
      },
    },
    {
      inputType: 'text',
      label: '计费方法',
      fieldName: 'method_text',
    },
    {
      inputType: 'expression',
      label: '单价',
      hdlExpression(scopeThis, fieldsValue) {
        return Math.floor(fieldsValue.price) / 100
      },
      inputWidth: '150px',
    },
    {
      inputType: 'date-picker',
      label: '有效期 起',
      fieldName: 'from',
      type: 'date',
    },
    {
      inputType: 'date-picker',
      label: '止',
      fieldName: 'to',
      type: 'date',
    },
    {
      inputType: 'expression',
      label: '✔ 计费',
      hdlExpression(scopeThis, fieldsValue) {
        return Math.floor(fieldsValue.amount) / 100
      },
      inputWidth: '150px',
      hdlLabelClick(scopeThis, fieldsValue) {
        dataRequest
          .storpro({
            storproName: 'ly0d9b_goods.amount',
            data: {
              price: scopeThis.formDataBox[branch].fieldsValue.price,
              method: scopeThis.formDataBox[branch].fieldsValue.method_code,
              area: scopeThis.pageData.data.objProperty.area,
              from: scopeThis.formDataBox[branch].fieldsValue.from,
              to: scopeThis.formDataBox[branch].fieldsValue.to,
            },
          })
          .then((result) => {
            scopeThis.formDataBox[branch].fieldsValue.amount = result.data.amount
            scopeThis.formDataBox[branch].fieldsValue.deal0 =
              Math.floor(scopeThis.formDataBox[branch].fieldsValue.amount) / 100
          })
      },
      labelStyle: 'color: blue; text-decoration: underline;',
    },
    {
      inputType: 'input',
      label: '核收',
      fieldName: 'deal0',
      inputWidth: '150px',
    },
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'dealnote',
      inputWidth: '250px',
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
              label: '项目名称',
              fieldName: 'id_goods',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoods
              },
            },
            {
              label: '有效期截止日期 起',
              inputType: 'datePicker',
              fieldName: 'to_start',
              type: 'date',
            },
            {
              label: '止',
              inputType: 'datePicker',
              fieldName: 'to_end',
              type: 'date',
            },
            {
              label: '计费时间：起',
              inputType: 'datePicker',
              fieldName: 'time_start',
            },
            {
              label: '止',
              inputType: 'datePicker',
              fieldName: 'time_end',
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
      cols: [{ items: items('insertOne') }],
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
              label: '项目名称',
              fieldName: 'goods_name',
            },
            {
              inputType: 'text',
              label: '计费方法',
              fieldName: 'method_text',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.price) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '有效期',
              fieldName: 'count',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  dateFormat.dateFormat(fieldsValue.from, 'yyyy/MM/dd') + ' - ' +
                  dateFormat.dateFormat(fieldsValue.to, 'yyyy/MM/dd')
                )
              },
            },
            {
              inputType: 'expression',
              label: '计费',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.amount) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '核收',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.deal) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '时间',
              hdlExpression(scopeThis, fieldsValue) {
                return dateFormat.dateFormat(fieldsValue.time)
              },
            },
            {
              inputType: 'text',
              label: '备忘',
              fieldName: 'dealnote',
              inputWidth: '250px',
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
      cols: [{ items: items('updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
