<template><div>
  <el-dialog
    v-if="tableProps.popup"
    v-model="tableProps.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    :title="tableProps.popup.title ? tableProps.popup.title : ''"
    :width="style.popup(tableProps).width"
    :top="style.popup(tableProps).top"
    :destroy-on-close="true"
  >
    <compTable :scopeThis="scopeThis" :tableProps="tableProps" :dataBox="dataBox"></compTable>
  </el-dialog>
  <compTable v-else :scopeThis="scopeThis" :tableProps="tableProps" :dataBox="dataBox"></compTable>
</div></template>

<style lang="scss" scoped></style>

<script>
import compTable from './Table.vue'
import style from './style.js'

export default {
  props: ['scopeThis', 'tableProps', 'dataBox'],
  components: { compTable },
  data() {
    return {
      style,
    }
  },
}
</script>
