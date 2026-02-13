<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compHotel from './hotel/Index.vue'
import compHotel0 from './hotel0/Index.vue'
import compBooktype from './booktype/Index.vue'
import compRoomplace from './roomplace/Index.vue'
import compGoods from './goods/Index.vue'
import compPrice from './price/Index.vue'
import compGoods0 from './goods0/Index.vue'
import compGoods1 from './goods1/Index.vue'
import compRoom from './room/Index.vue'

import compBusiness from './business/Index.vue'
import compRoomStatus from './roomstatus/Index.vue'
import compRoomStatus0 from './roomstatus0/Index.vue'

import compEchart0 from './echart0/Index.vue'
import compEchart1 from './echart1/Index.vue'
import compEchart from './echart/Index.vue'
import compMonth from './month/Index.vue'

import compAttendant from './attendant/Index.vue'

import compYizooHotel from './yizoo_hotel/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@旅店',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '旅店名称',
                    component: compHotel,
                },
                {
                    title: '旅店名称',
                    component: compHotel0,
                },
                {
                    title: '预订类型',
                    component: compBooktype,
                },
                {
                    title: '客房分区',
                    component: compRoomplace,
                },
                {
                    title: '房型名称',
                    component: compGoods,
                },
                {
                    title: '房型标价',
                    component: compPrice,
                },
                {
                    title: '配售商品',
                    component: compGoods0,
                },
                {
                    title: '损赔物品',
                    component: compGoods1,
                },
                {
                    title: '客房信息',
                    component: compRoom,
                },
            ],
        },
        {
            title: '前台日常',
            menu: [
                {
                    title: '订单维护',
                    component: compBusiness,
                },
                {
                    title: '房态图 - 预订情况',
                    component: compRoomStatus0,
                },
                {
                    title: '房态图 - 入住登记',
                    component: compRoomStatus,
                },
            ],
        },
        {
            title: '电子图表',
            menu: [
                {
                    title: '资源销售比对分析',
                    component: compEchart0,
                },
                {
                    title: '销售态势分析',
                    component: compEchart1,
                },
                {
                    title: '时段应收统计',
                    component: compEchart,
                },
                {
                    title: '月报表',
                    component: compMonth,
                },
            ],
        },
        {
            title: '用户管理',
            menu: [
                {
                    title: '楼层服务员',
                    component: compAttendant,
                },
            ],
        },
        {
            title: '门锁系统.yizoo',
            menu: [
                {
                    title: '注册信息',
                    component: compYizooHotel,
                },
                {
                    title: '房间/门锁信息',
                    component: null,
                },
            ],
        },
    ],
})
</script>
