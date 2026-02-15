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
              label: '库管单位',
              fieldName: 'id_unit',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrUnit
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.unit(scopeThis, value)
              },
            },
            {
              inputType: 'select',
              label: '货品分类',
              fieldName: 'id_goodsgroup',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsgroup0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.goodsgroup(scopeThis, value)
              },
            },
            {
              inputType: 'select',
              label: '货品',
              fieldName: '_id',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoods0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.goods(scopeThis, value)
              },
            },
            {
              inputType: 'input',
              label: '模糊查找：货品名称',
              fieldName: 'name',
            },
            {
              inputType: 'date-picker',
              label: '统计时间 起',
              fieldName: 'time_start',
              type: 'datetime',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'time_end',
              type: 'datetime',
            },
            {
              inputType: 'select',
              label: '货品来源',
              fieldName: 'id_goodsfrom',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsfrom0
              },
            },
            {
              inputType: 'select',
              label: '货品去向',
              fieldName: 'id_goodsto',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsto0
              },
            },
          ],
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
              label: '库管单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
              },
            },
            {
              inputType: 'text',
              label: '货品分类',
              fieldName: 'goodsgroup_text',
            },
            {
              inputType: 'text',
              label: '货品名称',
              fieldName: 'name',
            },
            {
              inputType: 'expression',
              label: '期初库存/期末库存/期间增减',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  fieldsValue.stock_start +
                  '/' +
                  fieldsValue.stock_end +
                  '/' +
                  (fieldsValue.stock_end - fieldsValue.stock_start)
                )
              },
            },
            {
              inputType: 'expression',
              label: '期间采购/入库/合计',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  fieldsValue.count0purchase +
                  '/' +
                  fieldsValue.count0goodsin +
                  '/' +
                  (fieldsValue.count0purchase + fieldsValue.count0goodsin)
                )
              },
            },
            {
              inputType: 'expression',
              label: '期间出库/销售/核销/合计',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  fieldsValue.count1goodsout +
                  '/' +
                  fieldsValue.count1sale +
                  '/' +
                  fieldsValue.count1loss +
                  '/' +
                  (+fieldsValue.count1goodsout + +fieldsValue.count1sale + +fieldsValue.count1loss)
                )
              },
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '照片',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'thumb',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
}

export default {
  getFormProps,
}
