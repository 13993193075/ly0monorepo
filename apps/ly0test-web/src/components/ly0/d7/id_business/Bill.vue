<script setup>
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrBill.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrBill" :key="index">
            <div>
                <span class="value-amount">[{{Math.floor(item.amount) / 100}}]</span>
                <span class="value-note">{{item.note}}</span>
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
.value-amount {
    color: #666666;
}
.value-note {
    color: #0000ff;
}
</style>
