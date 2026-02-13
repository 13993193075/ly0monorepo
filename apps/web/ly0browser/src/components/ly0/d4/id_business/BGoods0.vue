<script setup>
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrBGoods0.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrBGoods0" :key="index">
            <div>
                <span class="value-name">{{item.name}}</span>
                <span class="value-price-count">[{{(Math.floor(item.price) / 100) + '/' + item.count}}]</span>
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
.value-name {
    color: #0000ff;
}
.value-price-count {
    color: #666666;
}
</style>
