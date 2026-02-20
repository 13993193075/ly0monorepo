<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive } from 'vue'

import compRestaurant from "./restaurant/Index.vue"
import compRestaurant0 from "./restaurant0/Index.vue"
import compDiningplace from "./diningplace/Index.vue"
import compGoodsgroup from "./goodsgroup/Index.vue"
import compGoods0group from "./goods0group/Index.vue"
import compTable from "./table/Index.vue"
import compGoods from "./goods/Index.vue"
import compGoodsThumb from "./goods-thumb/Index.vue"
import compGoods0 from "./goods0/Index.vue"
import compGoods0Thumb from "./goods0-thumb/Index.vue"
import compGoods1 from "./goods1/Index.vue"

import compBusiness0 from "./business0/Index.vue"
import compBusiness1 from "./business1/Index.vue"
import compBusiness2 from "./business2/Index.vue"
import compBusiness from "./business/Index.vue"

import compTablestatus0 from "./tablestatus0/Index.vue"
import compTablestatus from "./tablestatus/Index.vue"

import compEchart from "./echart/Index.vue"

const frameProps = reactive({
    title: "ly0 - 企业应用集成平台@餐馆",
    menu: [
        {
            title: "基础信息预置",
            menu: [
                {
                    title: "餐馆名称",
                    component: compRestaurant
                },
                {
                    title: "餐馆名称",
                    component: compRestaurant0
                },
                {
                    title: "餐位分区",
                    component: compDiningplace
                },
                {
                    title: "菜品分类",
                    component: compGoodsgroup
                },
                {
                    title: "配售商品分类",
                    component: compGoods0group
                },
                {
                    title: "餐位信息",
                    component: compTable
                },
                {
                    title: "菜品",
                    component: compGoods
                },
                {
                    title: "菜品 - 缩略图表",
                    component: compGoodsThumb
                },
                {
                    title: "配售商品",
                    component: compGoods0
                },
                {
                    title: "配售商品 - 缩略图表",
                    component: compGoods0Thumb
                },
                {
                    title: "损赔物品",
                    component: compGoods1
                }
            ]
        },
        {
            title: "订单记录",
            menu: [
                {
                    title: "预订",
                    component: compBusiness0
                },
                {
                    title: "用餐",
                    component: compBusiness1
                },
                {
                    title: "离开",
                    component: compBusiness2
                },
                {
                    title: "订单维护",
                    component: compBusiness
                }
            ]
        },
        {
            title: "餐位图",
            menu: [
                {
                    title: "预订情况",
                    component: compTablestatus0
                },
                {
                    title: "用餐",
                    component: compTablestatus
                }
            ]
        },
        {
            title: "电子图表",
            menu: [
                {
                    title: "时段应收",
                    component: compEchart
                }
            ]
        }
    ]
})
</script>
