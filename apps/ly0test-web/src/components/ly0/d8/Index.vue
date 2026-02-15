<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compUnit from './unit/Index.vue'
import compUnit0 from './unit0/Index.vue'
import compGoodsgroup from './goodsgroup/Index.vue'
import compGoodsfrom from './goodsfrom/Index.vue'
import compGoodsto from './goodsto/Index.vue'
import compGoods from './goods/Index.vue'

import compD8purchase from './purchase/Index.vue'
import compGoodsin from './goodsin/Index.vue'
import compGoodsout from './goodsout/Index.vue'
import compSale from './sale/Index.vue'
import compLoss from './loss/Index.vue'
import compStock from './stock/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@库存',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '库管单位',
                    component: compUnit,
                },
                {
                    title: '参数设置',
                    component: compUnit0,
                },
                {
                    title: '货品分类',
                    component: compGoodsgroup,
                },
                {
                    title: '货品来源',
                    component: compGoodsfrom,
                },
                {
                    title: '货品去向',
                    component: compGoodsto,
                },
                {
                    title: '货品名录',
                    component: compGoods,
                },
            ],
        },
        {
            title: '入出库管理',
            menu: [
                {
                    title: '采购记录',
                    component: compD8purchase,
                },
                {
                    title: '入库记录',
                    component: compGoodsin,
                },
                {
                    title: '出库记录',
                    component: compGoodsout,
                },
                {
                    title: '销售记录',
                    component: compSale,
                },
                {
                    title: '核销登记',
                    component: compLoss,
                },
                {
                    title: '期间库存盘点表',
                    component: compStock,
                },
            ],
        },
    ],
})
</script>
