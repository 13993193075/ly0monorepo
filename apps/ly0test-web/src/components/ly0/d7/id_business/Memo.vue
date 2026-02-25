<script setup>
import {utils as ly0utils} from '@yoooloo42/ly0utils'
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrMemo.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrMemo" :key="index">
            <div>
                <span class="value-time">[{{ly0utils.dateFormat.dateFormat(item.time)}}]</span>
                <span class="value-memo">{{item.memo}}</span>
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
.value-time {
    color: #666666;
}
.value-memo {
    color: #0000ff;
}
</style>
