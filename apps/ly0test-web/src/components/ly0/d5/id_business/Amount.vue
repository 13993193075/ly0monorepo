<template>
  <div v-if="!!business">
    <div class="field-row">
      <span class="field-label">计费合计：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.amount) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">菜金：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.amount_b_goods) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">配售：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.amount_b_goods0) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">损赔：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.amount_b_goods1) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
    </div>
    <div class="field-row">
      <span class="field-label">核收：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.deal) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">备注：</span>
      <span class="field-value">{{ business.objBusiness.dealnote }}</span>
    </div>
  </div>
</template>

<style scoped>
@use './info.scss';
</style>

<script>
export default {
  props: ['scopeThis'],
  data() {
    return {
      business: null,
    }
  },
  mounted() {
    this.business = this.scopeThis.business
  },
}
</script>
