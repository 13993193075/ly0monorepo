<template>
    <div style="padding: 10px;">
        <compHelloWorld></compHelloWorld>
        <ly0el-menu :scopeThis="scopeThis" :myProps="testMenu.menuProps"></ly0el-menu>
        <compTable
          :scopeThis="scopeThis"
          :tableProps="testTable.tableProps"
          :dataBox="testTable.dataBox"
        ></compTable>
        <ly0form
          :scopeThis="scopeThis"
          :myProps="testForm.props"
          :dataBox="testForm.dataBox"
        ></ly0form>
    </div>
</template>

<script>
import compHelloWorld from './HelloWorld.vue'
import testMenu from './test-menu.js'
import compTable from './table/Index.vue'
import testTable from './table/test.js'
import testForm from './form/test.js'

export default {
  components: {
    compHelloWorld,
    compTable
  },
  data() {
    return {
      scopeThis: this,
      testMenu,
      testTable,
      testForm,
    }
  },
  mounted() {
    this.testTable.dataBox.request.handle(this)
  },
}
</script>

<style scoped></style>
