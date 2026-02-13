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
    <compLoginInfo
      v-if="!!loginInfo.myProps.popup.visible"
      :id_login="loginInfo.id_login"
      :myProps="loginInfo.myProps"
      :result="loginInfo.result"
    ></compLoginInfo>
    <compNewLogin
      v-if="!!newLogin.formProps.popup.visible"
      :scopeThis="scopeThis"
      :formProps="newLogin.formProps"
      :dataBox="newLogin.dataBox"
    ></compNewLogin>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// 组件
import compTable from '../../../common/table/Index.vue'
import compForm from '../../../common/form/Index.vue'
import compLoginInfo from '../../frame/header/id_login/Index.vue'
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
// 账号信息
import loginInfo from '../../d0superuser/user/login-info.js'
// 注册新账号
import newLogin from '../../d0superuser/user/new-login.js'
//
import hdlLogin from '../../d0superuser/user/hdl-login.js'

export default {
  components: {
    compTable,
    compFormFind: compForm,
    compFormInsertOne: compForm,
    compFormDoc: compForm,
    compFormUpdateOne: compForm,
    compLoginInfo,
    compNewLogin: compForm,
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

      // 登录账号相关
      loginInfo,
      newLogin,
      hdlLogin,
      usertbl: 'ly0d15student',
    }
  },
  mounted() {
    this.handles.init(this) // 初始化
  },
  computed: {
    loginInfoClosed() {
      return this.loginInfo.myProps.popup.visible
    },
  },
  watch: {
    loginInfoClosed(valNew, valOld) {
      if (!valNew) {
        if (!!this.loginInfo.result.destroy) {
          this.hdlLogin.id_loginSetNull(this, this.loginInfo.id_user, this.usertbl).then(() => {
            this.handles.reload(this)
          })
        }
      }
    },
  },
}
</script>
