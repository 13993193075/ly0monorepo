<template>
  <div v-if="!!business">
    <div class="field-row">
      <span class="field-label">工单编号：</span>
      <span class="field-value">{{ business.objBusiness._id }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">工单状态：</span>
      <span class="field-value">{{ business.objBusiness.status_text }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">客户名称：</span>
      <span class="field-value">{{ business.objBusiness.client_name }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">手机号：</span>
      <span class="field-value">{{ business.objBusiness.client_cellphone }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">下单内容：</span>
      <span class="field-value">{{ business.objBusiness.order }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">下单时间：</span>
      <span class="field-value">{{
        material.dateFormat.dateFormat(business.objBusiness.time)
      }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">核收：</span>
      <span class="field-value">{{ Math.floor(business.objBusiness.deal) / 100 }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">备注：</span>
      <span class="field-value">{{ business.objBusiness.dealnote }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">工作组：</span>
      <span class="field-value">{{ business.objBusiness.group_name }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">工作人员姓名：</span>
      <span class="field-value">{{ business.objBusiness.worker_name }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">身份证号码：</span>
      <span class="field-value">{{ business.objBusiness.worker_idno }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">手机号：</span>
      <span class="field-value">{{ business.objBusiness.worker_cellphone }}</span>
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
