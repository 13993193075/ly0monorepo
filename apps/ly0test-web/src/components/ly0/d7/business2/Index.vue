<template>
  <div>
    <template v-if="!idBusiness.id_business">
      <compTable
        style="padding: 10px"
        :scopeThis="scopeThis"
        :tableProps="tableProps"
        :dataBox="tableDataBox"
      ></compTable>
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
      <compFormUpdateOne
        :scopeThis="scopeThis"
        :formProps="formProps.updateOne"
        :dataBox="formDataBox.updateOne"
      ></compFormUpdateOne>
    </template>
    <compIdBusiness v-else :scopeThis="scopeThis" :myProps="idBusiness"></compIdBusiness>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// 组件
import compTable from '../../../common/table/Index.vue'
import compForm from '../../../common/form/Index.vue'
import compIdBusiness from '../id_business/Index.vue'
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
import storpro from '../business/storpro.js'

export default {
  components: {
    compTable,
    compFormFind: compForm,
    compFormInsertOne: compForm,
    compFormUpdateOne: compForm,
    compIdBusiness,
  },
  data: function () {
    return {
      scopeThis: this,
      tableProps: tableProps.getTableProps(this),
      tableDataBox: tableDataBox.getTableDataBox(this),
      formProps: formProps.getFormProps(this),
      formDataBox: formDataBox.getFormDataBox(this),
      fieldsValue_init: fieldsValue_init.getFieldsValue_init(this),
      handles,
      storpro: storpro.getStorpro(this),
      pageData: {
        queryBody: {
          id_dataunit: fieldsValue_init.ly0session.dataunit._id,
          id_shop: fieldsValue_init.ly0session.user.id_shop
            ? fieldsValue_init.ly0session.user.id_shop
            : null,
        },
        data: {
          arrShop: [],
        },
      },
      idBusiness: {
        id_business: null,
        flow: true, // 流程化订单
        refreshAfterGoback: {
          // 返回后的刷新
          hdl: handles.reload,
          para: this,
        },
      },
    }
  },
  mounted() {
    this.handles.init(this) // 初始化
  },
}
</script>
