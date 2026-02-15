function cols(branch) {
  return [
    {
      items: [
        {
          inputType: 'collapse',
          activeNames: [0, 1, 2],
          items: [
            {
              title: '车辆进入',
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
                  hdlChange(scopeThis) {
                    scopeThis.hdlsSupplement.cascade.id_carpark(scopeThis, branch)
                    scopeThis.hdlsSupplement.cascade.id_carpark0(scopeThis, branch)
                  },
                },
                {
                  inputType: 'input',
                  label: '车牌',
                  fieldName: 'carplate',
                },
                {
                  inputType: 'date-picker',
                  label: '进入时间',
                  fieldName: 'timein',
                },
                {
                  inputType: 'date-picker',
                  label: '离开时间',
                  fieldName: 'timeout',
                },
                {
                  inputType: 'button-group',
                  box: [
                    {
                      box: [
                        {
                          text: '车牌查询/计费',
                          size: 'mini',
                          type: 'primary',
                          plain: true,
                          icon: 'el-icon-search',
                          hdlClick(scopeThis) {
                            scopeThis.hdlsSupplement.cf(scopeThis, branch)
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: '长期车',
              items: [
                {
                  inputType: 'switch',
                  label: '长期车',
                  fieldName: 'carwithin',
                  activeText: '是',
                  inactiveText: '否',
                  activeValue: true,
                  inactiveValue: false,
                  activeColor: '#ee7405',
                },
                {
                  inputType: 'date-picker',
                  label: '有效期 起',
                  fieldName: 'expiryfrom',
                  type: 'date',
                },
                {
                  inputType: 'date-picker',
                  label: '止',
                  fieldName: 'expiryfrom',
                  type: 'date',
                },
              ],
            },
            {
              title: '计费',
              items: [
                {
                  inputType: 'select',
                  label: '计费项目',
                  fieldName: 'id_pricing',
                  item_fieldLabel: 'name',
                  item_fieldValue: '_id',
                  hdlGetItems(scopeThis) {
                    return scopeThis.pageData.data.arrPricing0
                  },
                },
                {
                  inputType: 'input',
                  label: '计费',
                  fieldName: 'price0',
                  inputWidth: '150px',
                },
                {
                  inputType: 'input',
                  label: '核收',
                  fieldName: 'fee0',
                  inputWidth: '150px',
                },
                {
                  inputType: 'input',
                  label: '备注',
                  fieldName: 'note',
                  inputWidth: '250px',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      items: [
        {
          inputType: 'collapse',
          activeNames: [0, 1],
          items: [
            {
              title: '进入截图',
              items: [
                {
                  inputType: 'upload-carplate',
                  fieldName: 'picturein',
                  carplate: 'carplate',
                  avatar: {
                    width: '400px',
                    height: '300px',
                  },
                },
              ],
            },
            {
              title: '离开截图',
              items: [
                {
                  inputType: 'upload-carplate',
                  fieldName: 'pictureout',
                  carplate: 'carplate',
                  avatar: {
                    width: '400px',
                    height: '300px',
                  },
                },
              ],
            },
          ],
        },
      ],
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
              label: '车牌',
              fieldName: 'carplate',
            },
            {
              inputType: 'date-picker',
              label: '进入时间 起',
              fieldName: 'timein_start',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'timein_end',
            },
            {
              inputType: 'date-picker',
              label: '离开时间 起',
              fieldName: 'timeout_start',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'timeout_end',
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
      cols: cols('insertOne'),
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
              inputType: 'collapse',
              activeNames: [0, 1, 2],
              items: [
                {
                  title: '车辆进入',
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
                      label: '车牌',
                      fieldName: 'carplate',
                    },
                    {
                      inputType: 'expression',
                      label: '进入时间',
                      hdlExpression(scopeThis, fieldsValue) {
                        return scopeThis.hdlsSupplement.dateFormat.dateFormat(fieldsValue.timein)
                      },
                    },
                    {
                      inputType: 'expression',
                      label: '离开时间',
                      hdlExpression(scopeThis, fieldsValue) {
                        return scopeThis.hdlsSupplement.dateFormat.dateFormat(fieldsValue.timeout)
                      },
                    },
                  ],
                },
                {
                  title: '长期车',
                  items: [
                    {
                      inputType: 'expression',
                      label: '长期车',
                      hdlExpression(scopeThis, fieldsValue) {
                        return !!fieldsValue.carwithin ? '是' : '否'
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'expression',
                      label: '有效期',
                      hdlExpression(scopeThis, fieldsValue) {
                        return (
                          scopeThis.hdlsSupplement.dateFormat.dateFormat(
                            fieldsValue.expiryfrom,
                            'yyyy/MM/dd',
                          ) +
                          ' - ' +
                          scopeThis.hdlsSupplement.dateFormat.dateFormat(
                            fieldsValue.expiryto,
                            'yyyy/MM/dd',
                          )
                        )
                      },
                      inputWidth: '250px',
                    },
                  ],
                },
                {
                  title: '计费',
                  items: [
                    {
                      inputType: 'text',
                      label: '计费项目',
                      fieldName: 'pricing_name',
                    },
                    {
                      inputType: 'expression',
                      label: '计费',
                      hdlExpression(scopeThis, fieldsValue) {
                        return Math.floor(fieldsValue.price) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'expression',
                      label: '核收',
                      hdlExpression(scopeThis, fieldsValue) {
                        return Math.floor(fieldsValue.fee) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '备注',
                      fieldName: 'note',
                      inputWidth: '250px',
                    },
                    {
                      inputType: 'button-group',
                      box: [
                        {
                          box: [
                            {
                              text: '￥ 收银',
                              size: 'mini',
                              type: 'primary',
                              plain: true,
                              hdlClick(scopeThis) {
                                scopeThis.payment.id_business =
                                  scopeThis.formDataBox.doc.fieldsValue._id
                                scopeThis.payment.deal = scopeThis.formDataBox.doc.fieldsValue.fee
                                scopeThis.payment.wx_appid = scopeThis.formDataBox.doc.fieldsValue
                                  .appendix.objCarpark.wx_appid
                                  ? scopeThis.formDataBox.doc.fieldsValue.appendix.objCarpark
                                      .wx_appid
                                  : ''
                                scopeThis.payment.wx_mchid = scopeThis.formDataBox.doc.fieldsValue
                                  .appendix.objCarpark.wx_mchid
                                  ? scopeThis.formDataBox.doc.fieldsValue.appendix.objCarpark
                                      .wx_mchid
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
          ],
        },
        {
          items: [
            {
              inputType: 'collapse',
              activeNames: [0, 1],
              items: [
                {
                  title: '进入截图',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'picturein',
                    },
                  ],
                },
                {
                  title: '离开截图',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'pictureout',
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
      cols: cols('updateOne'),
    },
  }
}

export default {
  getFormProps,
}
