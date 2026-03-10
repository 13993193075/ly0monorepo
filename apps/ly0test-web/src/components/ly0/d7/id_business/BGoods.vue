<script setup>
import {utils as ly0utils} from '@yoooloo42/ly0utils'
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrBGoods.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrBGoods" :key="index">
            <div>
                <span class="value-roomno">{{
                    item.roomno + "/" + item.goods_name + "/" + item.price_name + ': ' + Math.floor(item.price) / 100
                }}</span>
                <span class="value-status">&nbsp;&nbsp;{{item.status_text}}</span>
            </div>
            <div>
                <span class="value-status">{{
                    ly0utils.dateFormat.dateFormat(item.checkin) + " - " +
                    ly0utils.dateFormat.dateFormat(item.checkout)
                }}</span>
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
.value-roomno {
    color: #0000ff;
}
.value-status {
    color: #666666;
}
</style>
