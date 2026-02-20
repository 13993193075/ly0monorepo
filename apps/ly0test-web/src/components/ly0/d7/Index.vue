<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'

import compShop from './shop/Index.vue'
import compShop0 from './shop0/Index.vue'
import compDecode from './decode/Index.vue'
import compGoods from './goods/Index.vue'
import compGroupData from './group-data/Index.vue'
import compBusiness1 from './business1/Index.vue'
import compBusiness2 from './business2/Index.vue'
import compBusiness from './business/Index.vue'
import compEchart from './echart/Index.vue'
import compGuest from './guest/Index.vue'
import compPostalCenter from './postal-center/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@商店',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '商店',
                    component: compShop,
                },
                {
                    title: '参数设置',
                    component: compShop0,
                },
                {
                    title: '商品解码',
                    component: compDecode,
                },
                {
                    title: '商品名录',
                    component: compGoods,
                },
                {
                    title: '商品分类名称',
                    component: compGroupData,
                },
            ],
        },
        {
            title: '订单记录',
            menu: [
                {
                    title: '交易中',
                    component: compBusiness1,
                },
                {
                    title: '交易完成',
                    component: compBusiness2,
                },
                {
                    title: '订单维护',
                    component: compBusiness,
                },
            ],
        },
        {
            title: '电子图表',
            menu: [
                {
                    title: '时段应收',
                    component: compEchart,
                },
            ],
        },
        {
            title: '商城后台',
            menu: [
                {
                    title: '商城访客信息',
                    component: compGuest,
                },
                {
                    title: '邮件分拣中心',
                    component: compPostalCenter,
                },
            ],
        },
    ],
})
</script>
