<template>
  <div style="padding: 10px">
    <compTable :scopeThis="scopeThis" :tableProps="tableProps" :dataBox="tableDataBox"></compTable>
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
import compTable from '../../../common/table/index.vue'
import compForm from '../../../common/form/index.vue'
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
    compFormInsertOne: compForm,
    compFormDoc: compForm,
    compFormUpdateOne: compForm,
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
          id_place: fieldsValue_init.ly0session.user.id_place
            ? fieldsValue_init.ly0session.user.id_place
            : null,
        },
        data: {
          arrPlace: [], // 场所名称
          arrPosition: [], // 房间位置
          arrPosition0: [],
          arrRoom: [], // 房间名称
          arrRoom0: [],
          arrSeat: [], // 座位
          arrSeat0: [],
          arrDay: [], // 时段
          arrDay0: [],
        },
      },
    }
  },
  mounted() {
    this.handles.init(this).then(() => {
      this.pageData.data.arrSeat.forEach((i) => {
        i.label_row_col = i.row + ',' + i.col
      })
      this.pageData.data.arrDay.forEach((i) => {
        i.label_from_to =
          i.openfrom_hh + ':' + i.openfrom_mm + ' - ' + i.opento_hh + ':' + i.opento_mm
      })
    })
  },
}
</script>
