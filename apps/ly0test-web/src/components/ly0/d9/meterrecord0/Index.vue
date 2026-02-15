<template>
  <div style="padding: 10px">
    <compTable :scopeThis="scopeThis0" :tableProps="tableProps" :dataBox="tableDataBox"></compTable>
    <compFormFind
      :scopeThis="scopeThis0"
      :formProps="formProps.find"
      :dataBox="formDataBox.find"
    ></compFormFind>
    <compFormInsertOne
      :scopeThis="scopeThis0"
      :formProps="formProps.insertOne"
      :dataBox="formDataBox.insertOne"
    ></compFormInsertOne>
    <compFormDoc
      :scopeThis="scopeThis0"
      :formProps="formProps.doc"
      :dataBox="formDataBox.doc"
    ></compFormDoc>
    <compFormUpdateOne
      :scopeThis="scopeThis0"
      :formProps="formProps.updateOne"
      :dataBox="formDataBox.updateOne"
    ></compFormUpdateOne>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// 组件
import compTable from '../../../common/table/Index.vue'
import compForm from '../../../common/form/Index.vue'
// 数据表属性
import tableProps from './table-props.js'
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
// 存储过程
import storpro from './storpro.js'

export default {
  props: ['scopeThis'],
  components: {
    compTable,
    compFormFind: compForm,
    compFormInsertOne: compForm,
    compFormDoc: compForm,
    compFormUpdateOne: compForm,
  },
  data: function () {
    return {
      scopeThis0: this,
      tableProps: tableProps.getTableProps(this),
      tableDataBox: tableDataBox.getTableDataBox(this),
      formProps: formProps.getFormProps(this),
      formDataBox: formDataBox.getFormDataBox(this),
      fieldsValue_init: fieldsValue_init.getFieldsValue_init(this),
      handles,
      storpro: storpro.getStorpro(this),
      pageData: {
        queryBody: {
          id_property: this.scopeThis.business.objProperty._id,
        },
        data: {
          arrMetername: [],
        },
      },
      srcPrefix: fieldsValue_init.srcPrefix, // 图片src前缀
      upload: fieldsValue_init.upload, // 上传路径
    }
  },
  mounted() {
    // 初始化
    this.handles.init(this).then(() => {})
  },
}
</script>
