<script setup>
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import { reactive } from 'vue'
const props = defineProps(['scopeThis'])

const para = reactive({
    dateFormat: ly0utils.dateFormat.dateFormat,
    nullValue: '[无信息]'
})
</script>

<template>
    <span class="label">订单编号：</span>
    <span class="value">{{scopeThis.business.objBusiness._id}}</span>

    <span class="label">&nbsp;&nbsp;订单状态：</span>
    <span class="value">{{scopeThis.business.objBusiness.status_text}}</span>
    
    <span class="label">&nbsp;&nbsp;交易时间：</span>
    <span class="value">{{para.dateFormat(scopeThis.business.objBusiness.checkin)}}</span>

    <span class="label">&nbsp;&nbsp;客户名称：</span>
    <span v-if="scopeThis.business.objBusiness.client_name" class="value">
        {{scopeThis.business.objBusiness.client_name}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

    <span class="label">&nbsp;&nbsp;客户手机号：</span>
    <span v-if="scopeThis.business.objBusiness.client_cellphone" class="value">
        {{scopeThis.business.objBusiness.client_cellphone}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

    <span class="label">&nbsp;&nbsp;预订说明：</span>
    <span v-if="scopeThis.business.objBusiness.booknote" class="value">
        {{scopeThis.business.objBusiness.booknote}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
    
    <span class="label">商城用户id：</span>
    <span v-if="scopeThis.business.objBusiness.id_guest" class="value">
        {{scopeThis.business.objBusiness.id_guest || ''}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
</template>

<style scoped lang="scss">
.label {
    color: #2f0101;
}
.value {
    color: #0000FF;
}
.null-value {
    color: #666666;
}
</style>
