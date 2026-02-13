<template>
  <div style="padding: 10px">
    <compTable :scopeThis="scopeThis" :tableProps="tableProps" :dataBox="tableDataBox"></compTable>
    <compFormFind
      :scopeThis="scopeThis"
      :formProps="formProps.find"
      :dataBox="formDataBox.find"
    ></compFormFind>
    <compFormDoc
      :scopeThis="scopeThis"
      :formProps="formProps.doc"
      :dataBox="formDataBox.doc"
    ></compFormDoc>
    <compFormPassin
      :scopeThis="scopeThis"
      :formProps="formProps.passin"
      :dataBox="formDataBox.passin"
    ></compFormPassin>
    <compFormPassout
      :scopeThis="scopeThis"
      :formProps="formProps.passout"
      :dataBox="formDataBox.passout"
    ></compFormPassout>
    <compPayment
      v-if="!!payment.id_business"
      :scopeThis="scopeThis"
      :myProps="payment"
    ></compPayment>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// 组件
import compTable from '../../../common/table/index.vue'
import compForm from '../../../common/form/index.vue'
import compPayment from '@/components/ly0/d2/test-business-side/index.vue'
// 数据表属性
import tableProps from './table-props.js'
// 数据盒子
import tableDataBox from '../../../common/table/with-table/table-databox.js'
// 表单属性
import formProps from './form-props.js'
// 数据盒子
import formDataBox from './form-databox.js'
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
    compFormDoc: compForm,
    compFormPassin: compForm,
    compFormPassout: compForm,
    compPayment,
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
      hdlsSupplement,
      storpro: storpro.getStorpro(this),
      pageData: {
        queryBody: {
          id_dataunit: fieldsValue_init.ly0session.dataunit._id,
          id_carpark: fieldsValue_init.ly0session.user.id_carpark
            ? fieldsValue_init.ly0session.user.id_carpark
            : null,
        },
        data: {
          arrCarpark: [],
          arrPricing: [],
          arrPricing0: [],
        },
      },
      payment: {
        id_business: null,
        businesstype_code: 'ly0d11carpassin',
        deal: 0,
        wx_appid: '',
        wx_mchid: '',
        popup: {
          visible: false,
        },
        readOnly: false,
      },
      srcPrefix: fieldsValue_init.srcPrefix, // 图片src前缀
      upload: fieldsValue_init.upload, // 上传路径
      upload_carplate: fieldsValue_init.upload_carplate,
    }
  },
  mounted() {
    // 初始化
    this.hdlsSupplement.init(this).then(() => {})
  },
}
</script>
