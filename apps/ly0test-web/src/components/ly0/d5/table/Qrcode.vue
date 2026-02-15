<template>
  <el-dialog
    v-model="scopeThis.qrcode.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    title="打印二维码"
    :width="'1200px'"
  >
    <div class="button-box">
      <el-button
        class="button"
        size="small"
        round
        @click="scopeThis.hdlsSupplement.qrcodePrint('printContent')"
        icon="Printer"
        >打印</el-button
      >
    </div>

    <div class="line"></div>

    <div class="print-content" id="printContent">
      <div class="qrcode-item" v-for="(item, index) in scopeThis.qrcode.data" :key="index">
        <qrcode-vue :value="item._id" :size="120" level="H" />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use 'qrcode';
</style>

<script>
import QrcodeVue from "apps/ly0test-web/src/components/ly0/d5/table/Qrcode.vue"
export default {
  props: ['scopeThis'],
  components: {QrcodeVue}
}
</script>
