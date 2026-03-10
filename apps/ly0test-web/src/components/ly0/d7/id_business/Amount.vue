<script setup>
import { reactive } from 'vue'

const props = defineProps(['scopeThis'])

const para = reactive({
    nullValue: '[无信息]'
})
</script>

<template>
    <div>
        <span class="label">计费：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount) / 100}}</span>

        <span class="label">&nbsp;&nbsp;核收：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.deal) / 100}}</span>

        <span class="label">&nbsp;&nbsp;备注：</span>
        <span v-if="scopeThis.business.objBusiness.dealnote" class="value">
            {{scopeThis.business.objBusiness.dealnote}}
        </span>
        <span v-else class="null-value">{{para.nullValue}}</span>
    </div>
    <el-divider content-position="left">计费明细</el-divider>
    <div>
        <span class="label">房费：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount_b_goods) / 100}}</span>

        <span class="label">&nbsp;&nbsp;配售：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount_b_goods0) / 100}}</span>

        <span class="label">&nbsp;&nbsp;损赔：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount_b_goods1) / 100}}</span>

        <span class="label">&nbsp;&nbsp;挂账：</span>
        <span class="value">{{Math.floor(scopeThis.business.objBusiness.amount_bill) / 100}}</span>
    </div>
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
