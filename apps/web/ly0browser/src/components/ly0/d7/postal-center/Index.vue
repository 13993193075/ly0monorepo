<template>
  <div style="padding: 10px">
    <compTable :scopeThis="scopeThis" :tableProps="tableProps" :dataBox="tableDataBox"></compTable>
    <compFormFind
      :scopeThis="scopeThis"
      :formProps="formProps.find"
      :dataBox="formDataBox.find"
    ></compFormFind>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import dataRequst from '../../../../utils/data-request.js'
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
// with-table补充句柄
import hdlsSupplement from './handles.js'
// 存储过程
import storpro from './storpro.js'

export default {
  components: {
    compTable,
    compFormFind: compForm,
  },
  data: function () {
    return {
      scopeThis: this,
      ly0session: null,
      tableProps: tableProps.getTableProps(this),
      tableDataBox: tableDataBox.getTableDataBox(this),
      formProps: formProps.getFormProps(this),
      formDataBox: formDataBox.getFormDataBox(this),
      fieldsValue_init: fieldsValue_init.getFieldsValue_init(this),
      handles,
      hdlsSupplement,
      storpro: storpro.getStorpro(this),
      pageData: {
        queryBody: null,
        data: {
          codePostalStatus: [],
        },
      },
      srcPrefix: dataRequst.srcPrefix, // 图片src前缀
      upload: dataRequst.upload, // 上传路径
    }
  },
  mounted() {
    this.ly0session = dataRequst.ly0sessionLoad()
    // 数据单元初始化
    this.fieldsValue_init.find.id_dataunit = this.ly0session.dataunit._id
    this.handles.init(this)
  },
}
</script>
