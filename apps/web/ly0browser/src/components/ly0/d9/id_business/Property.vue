<template>
  <div v-if="!!scopeThis.business">
    <div class="field-row">
      <span class="field-label">物业单位：</span>
      <span class="field-value">{{ scopeThis.business.objProperty.unit_name }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">物业分区：</span>
      <span class="field-value">{{
        scopeThis.business.objProperty.position_text
          ? scopeThis.business.objProperty.position_text
          : ''
      }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">户号：</span>
      <span class="field-value">{{ scopeThis.business.objProperty.number }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">户名：</span>
      <span class="field-value">{{
        scopeThis.business.objProperty.name ? scopeThis.business.objProperty.name : ''
      }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">业主手机号：</span>
      <span class="field-value">{{
        scopeThis.business.objProperty.owner_cellphone
          ? scopeThis.business.objProperty.owner_cellphone
          : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">名称（姓名）：</span>
      <span class="field-value">{{
        scopeThis.business.objProperty.owner_name ? scopeThis.business.objProperty.owner_name : ''
      }}</span>
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
