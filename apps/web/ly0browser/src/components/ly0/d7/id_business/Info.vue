<template>
  <div v-if="!!business">
    <div class="field-row">
      <span class="field-label">订单编号：</span>
      <span class="field-value">{{ business.objBusiness._id }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">订单状态：</span>
      <span class="field-value">{{ business.objBusiness.status_text }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">交易时间：</span>
      <span class="field-value">{{
        dateFormat.dateFormat(scopeThis.business.objBusiness.time)
      }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">客户手机号：</span>
      <span class="field-value">{{ business.objBusiness.client_cellphone }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">客户名称：</span>
      <span class="field-value">{{ business.objBusiness.client_name }}</span>
    </div>
    <div class="field-row">
      <span class="field-label">商城用户id：</span>
      <span class="field-value">{{
        business.objBusiness.id_guest ? business.objBusiness.id_guest : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
    </div>
    <div class="field-row">
      <span style="color: #009e94">-- 邮寄地址 --</span>
    </div>
    <div class="field-row">
      <span class="field-label">省-市-县：</span>
      <span class="field-value">{{
        business.objBusiness.postal_gbt2260text ? business.objBusiness.postal_gbt2260text : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">详细地址：</span>
      <span class="field-value">{{
        business.objBusiness.postal_address ? business.objBusiness.postal_address : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">联系电话：</span>
      <span class="field-value">{{
        business.objBusiness.postal_tel ? business.objBusiness.postal_tel : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
      <span class="field-label">联系人：</span>
      <span class="field-value">{{
        business.objBusiness.postal_name ? business.objBusiness.postal_name : ''
      }}</span>
      <span>&nbsp;&nbsp;</span>
    </div>
  </div>
</template>

<style scoped>
@use './info.scss';
</style>

<script>
import dateFormat from '../../../../utils/date-format.js'
export default {
  props: ['scopeThis'],
  data() {
    return {
      dateFormat,
      business: null,
    }
  },
  mounted() {
    this.business = this.scopeThis.business
  },
}
</script>
