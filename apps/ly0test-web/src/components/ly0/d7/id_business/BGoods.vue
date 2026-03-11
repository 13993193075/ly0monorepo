<script setup>
const props = defineProps(['scopeThis'])
</script>

<template>
    <div v-if="scopeThis.business.arrBGoods.length === 0" class="null-value-box">
        <span class="null-value">[无记录]</span>
    </div>
    <div v-else>
        <template v-for="(item, index) in scopeThis.business.arrBGoods" :key="index">
            <div>
                <span class="value-name-price">{{item.name + '[' + (item.price_name || '单价') + ': ' + (Math.floor(item.price) / 100) + ']'}}</span>
                <span class="value-count">{{item.count}}</span>
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
.value-name-price {
    color: #0000ff;
}
.value-count {
    color: #666666;
}
</style>
