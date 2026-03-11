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

    <span class="label">&nbsp;&nbsp;交易时间：</span>
    <span class="value">{{para.dateFormat(scopeThis.business.objBusiness.time)}}</span>

    <span class="label">&nbsp;&nbsp;商品计数：</span>
    <span v-if="scopeThis.business.objBusiness.count" class="value">
        {{scopeThis.business.objBusiness.peoples}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
    
    <span class="label">&nbsp;&nbsp;计费：</span>
    <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount) / 100}}</span>
    
    <span class="label">&nbsp;&nbsp;核收：</span>
    <span class="value">{{Math.floor(scopeThis.business.objBusiness.deal) / 100}}</span>
    
    <span class="label">&nbsp;&nbsp;备注：</span>
    <span v-if="scopeThis.business.objBusiness.dealnote" class="value">
            {{scopeThis.business.objBusiness.dealnote}}
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
