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
      scopeThis.insertOne.dataBox.fieldsValue.price = Math.floor(
        scopeThis.insertOne.dataBox.fieldsValue.price0 * 100,
      )
      dataRequest
        .storpro({
          scopeThis,
          storproName: 'ly0d5.goods.insertOne',
          data: scopeThis.insertOne.dataBox.fieldsValue,
        })
        .then(() => {
          scopeThis.reload(scopeThis).then(() => {
            scopeThis.insertOne.formProps.popup.visible = false
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
  hdlPopup(scopeThis, restaurant, goodsgroup) {
    scopeThis.insertOne.dataBox.fieldsValue = JSON.parse(
      JSON.stringify(scopeThis.insertOne.dataBox.fieldsValueInit),
    )
    scopeThis.insertOne.dataBox.fieldsValue.id_restaurant = restaurant._id
    scopeThis.insertOne.dataBox.fieldsValue.restaurant_name = restaurant.name
    scopeThis.insertOne.dataBox.fieldsValue.id_goodsgroup =
      goodsgroup && goodsgroup._id ? goodsgroup._id : null
    scopeThis.insertOne.dataBox.fieldsValue.goodsgroup_text =
      goodsgroup && goodsgroup.text ? goodsgroup.text : ''
    scopeThis.insertOne.formProps.popup.visible = true
  },
}
