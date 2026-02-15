<template>
  <div style="padding: 10px">
    <compImageList
      :scopeThis="scopeThis"
      :imageListProps="imageListProps"
      :dataBox="tableDataBox"
    ></compImageList>
    <compFormFind
      :scopeThis="scopeThis"
      :formProps="formProps.find"
      :dataBox="formDataBox.find"
    ></compFormFind>
    <compFormInsertOne
      :scopeThis="scopeThis"
      :formProps="formProps.insertOne"
      :dataBox="formDataBox.insertOne"
    ></compFormInsertOne>
    <compFormDoc
      :scopeThis="scopeThis"
      :formProps="formProps.doc"
      :dataBox="formDataBox.doc"
    ></compFormDoc>
    <compFormUpdateOne
      :scopeThis="scopeThis"
      :formProps="formProps.updateOne"
      :dataBox="formDataBox.updateOne"
    ></compFormUpdateOne>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// 组件
import compImageList from '../../../common/image-list/Index.vue'
import compForm from '../../../common/form/Index.vue'
// 数据表属性
import imageListProps from './imagelist-props.js'
// 数据盒子
import tableDataBox from '../../../common/table/with-table/table-databox.js'
// 表单属性
import formProps from './form-props.js'
// 数据盒子
import formDataBox from '../../../common/table/with-table/form-databox.js'
// 表单字段初始值
import fieldsValue_init from './fields-value-init.js'
// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'
// with-table补充句柄
import hdlsSupplement from './handles.js'
// 存储过程
import storpro from './storpro.js'

export default {
  components: {
    compImageList,
    compFormFind: compForm,
    compFormInsertOne: compForm,
    compFormDoc: compForm,
    compFormUpdateOne: compForm,
  },
  data: function () {
    return {
      scopeThis: this,
      imageListProps: imageListProps.getImageListProps(this),
      tableDataBox: tableDataBox.getTableDataBox(this),
      formProps: formProps.getFormProps(this),
      formDataBox: formDataBox.getFormDataBox(this),
      fieldsValue_init: fieldsValue_init.getFieldsValue_init(this),
      handles,
      hdlsSupplement,
      storpro: storpro.getStorpro(this),
      pageData: {
        queryBody: {
          id_dataunit: fieldsValue_init.ly0session.dataunit._id,
          id_unit: fieldsValue_init.ly0session.user.id_unit
            ? fieldsValue_init.ly0session.user.id_unit
            : null,
        },
        data: {
          arrUnit: [],
          arrPosition: [],
          arrPosition0: [],
          arrProperty: [],
          arrProperty0: [],
          arrMetername: [],
          arrMetername0: [],
        },
      },
      srcPrefix: fieldsValue_init.srcPrefix, // 图片src前缀
      upload: fieldsValue_init.upload, // 上传路径
    }
  },
  mounted() {
    this.handles.init(this) // 初始化
  },
}
</script>
