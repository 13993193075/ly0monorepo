function items(branch) {
  return [
    {
      inputType: 'select',
      label: '停车场',
      fieldName: 'id_carpark',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrCarpark
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
      },
    },
    {
      inputType: 'input',
      label: '车位',
      fieldName: 'parking',
    },
    {
      inputType: 'input',
      label: '车牌',
      fieldName: 'carplate',
    },
    {
      inputType: 'date-picker',
      label: '有效期起始日期',
      fieldName: 'expiryfrom',
      type: 'date',
    },
    {
      inputType: 'date-picker',
      label: '有效期截止日期',
      fieldName: 'expiryto',
      type: 'date',
    },
    {
      inputType: 'switch',
      label: '同步有效期',
      fieldName: 'expiry',
      activeText: '是',
      inactiveText: '否',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#ee7405',
      hdlChange(scopeThis, value) {},
    },
    {
      inputType: 'input',
      label: '核收金额',
      fieldName: 'fee0',
      inputWidth: '150px',
    },
    {
      inputType: 'date-picker',
      label: '核收时间',
      fieldName: 'time',
    },
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'note',
      inputWidth: '300px',
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
              label: '停车场',
              fieldName: 'id_carpark',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrCarpark
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
            },
            {
              inputType: 'input',
              label: '车位',
              fieldName: 'parking',
            },
            {
              inputType: 'input',
              label: '车牌',
              fieldName: 'carplate',
            },
            {
              inputType: 'date-picker',
              label: '有效期截止日期 起',
              fieldName: 'expiryto_start',
              type: 'date',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'expiryto_end',
              type: 'date',
            },
            {
              inputType: 'date-picker',
              label: '核收时间 起',
              fieldName: 'time_start',
            },
            {
              inputType: 'date-picker',
              label: '止',
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
              label: '停车场',
              fieldName: 'carpark_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
            },
            {
              inputType: 'text',
              label: '车位',
              fieldName: 'parking',
            },
            {
              inputType: 'text',
              label: '车牌',
              fieldName: 'carplate',
            },
            {
              inputType: 'expression',
              label: '有效期',
              hdlExpression(scopeThis) {
                return (
                  scopeThis.hdlsSupplement.dateFormat.dateFormat(
                    scopeThis.formDataBox.doc.fieldsValue.expiryfrom,
                    'yyyy/MM/dd',
                  ) +
                  ' - ' +
                  scopeThis.hdlsSupplement.dateFormat.dateFormat(
                    scopeThis.formDataBox.doc.fieldsValue.expiryto,
                    'yyyy/MM/dd',
                  )
                )
              },
              inputWidth: '300px',
            },
            {
              inputType: 'expression',
              label: '核收金额',
              hdlExpression(scopeThis) {
                return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '核收时间',
              hdlExpression(scopeThis) {
                return scopeThis.hdlsSupplement.dateFormat.dateFormat(
                  scopeThis.formDataBox.doc.fieldsValue.time,
                )
              },
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '备注',
              fieldName: 'note',
              inputWidth: '300px',
            },
            {
              inputType: 'line',
            },
            {
              inputType: 'button-group',
              box: [
                {
                  box: [
                    {
                      text: '￥ 收银',
                      type: 'danger',
                      plain: true,
                      hdlClick(scopeThis) {
                        scopeThis.payment.id_business = scopeThis.formDataBox.doc.fieldsValue._id
                        scopeThis.payment.deal = scopeThis.formDataBox.doc.fieldsValue.fee
                        scopeThis.payment.wx_appid = scopeThis.formDataBox.doc.fieldsValue
                          .objCarpark.wx_appid
                          ? scopeThis.formDataBox.doc.fieldsValue.objCarpark.wx_appid
                          : ''
                        scopeThis.payment.wx_mchid = scopeThis.formDataBox.doc.fieldsValue
                          .objCarpark.wx_mchid
                          ? scopeThis.formDataBox.doc.fieldsValue.objCarpark.wx_mchid
                          : ''
                        scopeThis.payment.popup.visible = true
                        scopeThis.payment.readOnly = false
                      },
                    },
                  ],
                },
              ],
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
