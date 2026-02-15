<template>
  <el-dialog
    v-model="scopeThis.wxacode.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    title="打印小程序码"
    :width="'1200px'"
  >
    <div class="button-box">
      <el-button
        class="button"
        size="small"
        round
        @click="scopeThis.hdlsSupplement.qrcodePrint('printContent0')"
        icon="Printer"
        >打印</el-button
      >
    </div>

    <div class="line"></div>

    <div class="print-content" id="printContent0">
      <div class="qrcode-item" v-for="(item, index) in scopeThis.wxacode.data" :key="index">
        <img class="qrcode" :id="'wxacode.' + item._id" />
        <div class="label">{{ item.tableno }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use 'qrcode';
</style>

<script>
export default {
  props: ['scopeThis'],
}
</script>
