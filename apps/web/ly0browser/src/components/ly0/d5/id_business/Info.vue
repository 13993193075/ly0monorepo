<template>
  <div v-if="!!business">
    <div class="field-row">
      <span class="field-label">订单编号：</span>
      <span class="field-value">{{ business.objBusiness._id }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">订单状态：</span>
      <span class="field-value">{{ business.objBusiness.status_text }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">用餐时间：</span>
      <span class="field-value">{{
        dateFormat.dateFormat(scopeThis.business.objBusiness.time)
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">用餐人数：</span>
      <span class="field-value">{{ business.objBusiness.peoples }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">客户手机号：</span>
      <span class="field-value">{{ business.objBusiness.client_cellphone }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">客户名称：</span>
      <span class="field-value">{{ business.objBusiness.client_name }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">预订时间：</span>
      <span class="field-value">{{
        dateFormat.dateFormat(business.objBusiness.booktime)
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">预订说明：</span>
      <span class="field-value">{{ business.objBusiness.booknote }}</span>
    </div>
  </div>
</template>

<style scoped>
@use './info.scss';
</style>

<script>
import dateFormat from "../../../../utils/date-format.js"
export default {
  props: ['scopeThis'],
  data() {
    return {
      business: null,
      dateFormat
    }
  },
  mounted() {
    this.business = this.scopeThis.business
  },
}
</script>
