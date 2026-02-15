<template>
  <div v-if="!!business">
    <div class="field-row">
      <span class="field-label-amount">计费：</span>
      <span class="field-value-amount">{{ Math.floor(business.objBusiness.amount) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label-amount">核收：</span>
      <span class="field-value-amount">{{ Math.floor(business.objBusiness.deal) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">备注：</span>
      <span class="field-value">{{ business.objBusiness.dealnote }}</span>
    </div>
  </div>
</template>

<style scoped>
@use './amount.scss';
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
