import dataRequest from '../../../../utils/data-request.js'
const fieldsValueInit = {
  _id: null,
  id_restaurant: null,
  restaurant_name: '',
  id_goodsgroup: null,
  goodsgroup_text: '',
  name: '',
  price: 0,
  price0: 0,
  thumb: '',
  recommend: false,
}

export default {
  dataBox: {
    fieldsValueInit,
    fieldsValue: JSON.parse(JSON.stringify(fieldsValueInit)),
    hdlSubmit(scopeThis) {
      scopeThis.updateOne.dataBox.fieldsValue.price = Math.floor(
        scopeThis.updateOne.dataBox.fieldsValue.price0 * 100,
      )
      dataRequest
        .storpro({
          scopeThis,
          storproName: 'ly0d5.goods.updateOne',
          data: scopeThis.updateOne.dataBox.fieldsValue,
        })
        .then(() => {
          scopeThis.reload(scopeThis).then(() => {
            scopeThis.updateOne.formProps.popup.visible = false
          })
        })
    },
    srcPrefix: dataRequest.srcPrefix, // 图片资源前缀
    upload: dataRequest.upload, // 图片上传地址
  },
  formProps: {
    popup: {
      visible: false,
      title: '新增',
    },
    cols: [
      {
        items: [
          {
            inputType: 'text',
            label: '餐馆',
            fieldName: 'restaurant_name',
          },
          {
            inputType: 'text',
            label: '菜品分类',
            fieldName: 'goodsgroup_text',
          },
          {
            inputType: 'input',
            label: '菜品名称',
            fieldName: 'name',
          },
          {
            inputType: 'input',
            label: '单价',
            fieldName: 'price0',
            inputWidth: '150px',
          },
          {
            inputType: 'switch',
            label: '推荐',
            fieldName: 'recommend',
            activeText: '是',
            inactiveText: '否',
            activeColor: '#ff640a',
          },
          {
            inputType: 'collapse',
            items: [
              {
                title: '照片上传',
                items: [
                  {
                    inputType: 'upload-avatar',
                    fieldName: 'thumb',
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
    ],
  },
  hdlPopup(scopeThis) {
    scopeThis.updateOne.dataBox.fieldsValue = Object.assign(
      scopeThis.updateOne.dataBox.fieldsValueInit,
      scopeThis.focus,
    )
    scopeThis.updateOne.dataBox.fieldsValue.price0 =
      Math.floor(scopeThis.updateOne.dataBox.fieldsValue.price) / 100
    scopeThis.updateOne.formProps.popup.visible = true
  },
}
