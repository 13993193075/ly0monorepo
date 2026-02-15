<template>
  <div v-if="!!scopeThis.business">
    <div class="field-row">
      <span class="field-label">收费单号：</span>
      <span class="field-value">{{
        scopeThis.business.objProperty.id_business
          ? scopeThis.business.objProperty.id_business
          : '未制单'
      }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">服务类项目计费：</span>
      <span class="field-value">{{
        Math.floor(scopeThis.business.objBusiness.amount_goods) / 100
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">资源类项目计费：</span>
      <span class="field-value">{{
        Math.floor(scopeThis.business.objBusiness.amount_goods0) / 100
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">合计：</span>
      <span class="field-value">{{ Math.floor(scopeThis.business.objBusiness.amount) / 100 }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">服务类项目核收：</span>
      <span class="field-value">{{
        Math.floor(scopeThis.business.objBusiness.deal_goods) / 100
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">资源类项目核收：</span>
      <span class="field-value">{{
        Math.floor(scopeThis.business.objBusiness.deal_goods0) / 100
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">合计：</span>
      <span class="field-value">{{ Math.floor(scopeThis.business.objBusiness.deal) / 100 }}</span>
    </div>
  </div>
</template>

<style scoped>
@use './property.scss';
</style>

<script>
export default {
  props: ['scopeThis'],
}
</script>
