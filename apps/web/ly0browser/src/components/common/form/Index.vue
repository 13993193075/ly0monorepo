<template>
  <div>
    <el-dialog
      v-if="formProps.popup"
      v-model="formProps.popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      :title="formProps.popup.title ? formProps.popup.title : ''"
      :width="style.popup(formProps).width"
      :top="style.popup(formProps).top"
      :destroy-on-close="true"
    >
      <compForm :scopeThis="scopeThis" :formProps="formProps" :dataBox="dataBox"></compForm>
    </el-dialog>
    <compForm v-else :scopeThis="scopeThis" :formProps="formProps" :dataBox="dataBox"></compForm>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import compForm from './Form.vue'
import style from './style.js'

export default {
  props: ['scopeThis', 'formProps', 'dataBox'],
  components: { compForm },
  data() {
    return {
      style,
    }
  },
}
</script>
