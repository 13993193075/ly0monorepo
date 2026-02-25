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
    <span class="label">省-市-县：</span>
    <span v-if="scopeThis.business.objBusiness.postal_gbt2260text" class="value">
        {{scopeThis.business.objBusiness.postal_gbt2260text || ''}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
    
    <span class="label">&nbsp;&nbsp;详细地址：</span>
    <span v-if="scopeThis.business.objBusiness.postal_address" class="value">
        {{scopeThis.business.objBusiness.postal_address || ''}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
    
    <span class="label">&nbsp;&nbsp;联系电话：</span>
    <span v-if="scopeThis.business.objBusiness.postal_tel" class="value">
        {{scopeThis.business.objBusiness.postal_tel || ''}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>
    
    <span class="label">&nbsp;&nbsp;联系人：</span>
    <span v-if="scopeThis.business.objBusiness.postal_name" class="value">
        {{scopeThis.business.objBusiness.postal_name}}
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
