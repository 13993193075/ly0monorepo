<template>
  <div v-if="arrTable.length > 0">
    <div class="tableno-box" v-for="(table, index) in arrTable" :key="index">
      <el-dropdown trigger="click" @command="hdlDropdown">
        <div :class="hdlGetTablenoClass(table)">
          <span>{{ table.tableno }}</span>
          <br />
          <span>{{ table.goods_name }}</span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-if="table.status_code === '1'"
            icon="el-icon-document-add"
            :command="{ hdl: 'newBusiness', table }"
          >
            <span>用餐登记 - 发生新订单</span>
          </el-dropdown-item>
          <el-dropdown-item
            v-if="table.status_code === '2' && table.id_business"
            icon="el-icon-document"
            :command="{ hdl: 'idBusiness', table }"
          >
            <span>查看订单信息</span>
          </el-dropdown-item>
          <el-dropdown-item
            v-if="table.status_code !== '2' || !table.id_business"
            icon="el-icon-setting"
            :command="{ hdl: 'setStatus', table }"
          >
            <span>修改餐位状态</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script>
export default {
  props: ['scopeThis', 'arrTable'],
  methods: {
    hdlDropdown(command) {
      this.scopeThis.focus = JSON.parse(JSON.stringify(command.table))
      // 发生新订单
      if (command.hdl === 'newBusiness') {
        // 避免重复
        this.scopeThis.arrNewBTable = this.scopeThis.arrNewBTable.filter((i) => {
          return i._id !== this.scopeThis.focus._id
        })
        this.scopeThis.arrNewBTable.push(this.scopeThis.focus)

        this.scopeThis.newBusiness.dataBox.fieldsValue = JSON.parse(
          JSON.stringify(this.scopeThis.newBusiness.dataBox.fieldsValueInit),
        )
        this.scopeThis.newBusiness.dataBox.fieldsValue.id_restaurant =
          this.scopeThis.focus.id_restaurant
        this.scopeThis.newBusiness.dataBox.fieldsValue.time = new Date()
        this.scopeThis.newBusiness.formProps.popup.title =
          '用餐登记 - 发生新订单，已选餐位数（桌数）：' + this.scopeThis.arrNewBTable.length
        this.scopeThis.newBusiness.formProps.popup.visible = true
        // 查看订单信息
      } else if (command.hdl === 'idBusiness') {
        this.scopeThis.idBusiness.id_business = this.scopeThis.focus.id_business
        // 修改房态
      } else if (command.hdl === 'setStatus') {
        this.scopeThis.setStatus.dataBox.fieldsValue = JSON.parse(
          JSON.stringify(this.scopeThis.setStatus.dataBox.fieldsValueInit),
        )
        this.scopeThis.setStatus.dataBox.fieldsValue.id_table = this.scopeThis.focus._id
        this.scopeThis.setStatus.formProps.popup.title =
          '修改餐位状态 - 餐位：' + this.scopeThis.focus.tableno
        this.scopeThis.setStatus.formProps.popup.visible = true
      }
    },
    hdlGetTablenoClass(table) {
      let tablenoClass = 'tableno'
      if (
        (this.scopeThis.focus && table._id === this.scopeThis.focus._id) ||
        (table.id_business &&
          this.scopeThis.focus &&
          table.id_business === this.scopeThis.focus.id_business)
      ) {
        tablenoClass = tablenoClass + ' ' + 'tableno-border-focus'
      } else {
        tablenoClass = tablenoClass + ' ' + 'tableno-border'
      }
      tablenoClass = tablenoClass + ' ' + 'status' + table.status_code
      return tablenoClass
    },
  },
}
</script>
