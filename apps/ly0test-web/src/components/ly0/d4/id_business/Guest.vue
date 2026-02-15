<script setup>
import {blindboxes} from 'packages/ly0utils/src/index.js'
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrGuest.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrGuest" :key="index">
            <div>{{
                item.name + '/' +
                item.sex_text + '/' +
                (item.roomno || '-')
            }}</div>
            <div>
                <span class="checkin">{{blindboxes.dateFormat.dateFormat(item.checkin)}}</span>
                <span>&nbsp;-&nbsp;</span>
                <span class="checkin">{{blindboxes.dateFormat.dateFormat(item.checkout)}}</span>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.null-value-box {
    text-align: center;
}
.null-value {
    color: #666666;
}
.checkin {
    color: #0000ff;
}
</style>
