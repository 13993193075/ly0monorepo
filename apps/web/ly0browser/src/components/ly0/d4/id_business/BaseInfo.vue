<script setup>
import {blindboxes} from 'packages/ly0utils'
import { reactive } from 'vue'
const props = defineProps(['scopeThis'])

const para = reactive({
    dateFormat: blindboxes.dateFormat.dateFormat,
    nullValue: '[无信息]'
})
</script>

<template>
    <span class="label">订单编号：</span>
    <span class="value">{{scopeThis.business.objBusiness._id}}</span>

    <span class="label">&nbsp;&nbsp;订单状态：</span>
    <span class="value">{{scopeThis.business.objBusiness.status_text}}</span>

    <span class="label">&nbsp;&nbsp;订单手机号：</span>
    <span class="value">{{scopeThis.business.objBusiness.cellphone}}</span>

    <span class="label">&nbsp;&nbsp;入住时间：</span>
    <span class="value">{{para.dateFormat(scopeThis.business.objBusiness.checkin)}}</span>

    <span class="label">&nbsp;&nbsp;离开时间：</span>
    <span class="value">{{para.dateFormat(scopeThis.business.objBusiness.checkout)}}</span>

    <span class="label">&nbsp;&nbsp;入住人数：</span>
    <span v-if="scopeThis.business.objBusiness.peoples" class="value">
        {{scopeThis.business.objBusiness.peoples}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

    <span class="label">&nbsp;&nbsp;所需客房数：</span>
    <span v-if="scopeThis.business.objBusiness.rooms" class="value">
        {{scopeThis.business.objBusiness.rooms}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

    <span class="label">&nbsp;&nbsp;预订类型：</span>
    <span v-if="scopeThis.business.objBusiness.booktype_text" class="value">
        {{scopeThis.business.objBusiness.booktype_text}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

    <span class="label">&nbsp;&nbsp;预订时间：</span>
    <span v-if="scopeThis.business.objBusiness.booktime" class="value">
        {{para.dateFormat(scopeThis.business.objBusiness.booktime) || '[无信息]'}}
    </span>
    <span v-else class="null-value">{{para.nullValue}}</span>

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
