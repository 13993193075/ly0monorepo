<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compUnit from './unit/Index.vue'
import compUnit0 from './unit0/Index.vue'
import compPosition from './position/Index.vue'
import compSizetype from './sizetype/Index.vue'
import compProperty from './property/Index.vue'
import compGoods from './goods/Index.vue'
import compGoods0 from './goods0/Index.vue'
import compMetername from './metername/Index.vue'
import compMeterrecord from './meterrecord/Index.vue'
import compBusiness from './business/Index.vue'
import compMonth from './month/Index.vue'
import compEchart from './echart/Index.vue'
import compReader from './reader/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@物业',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '物业单位',
                    component: compUnit,
                },
                {
                    title: '参数设置',
                    component: compUnit0,
                },
                {
                    title: '物业分区',
                    component: compPosition,
                },
                {
                    title: '户型',
                    component: compSizetype,
                },
                {
                    title: '物业信息',
                    component: compProperty,
                },
                {
                    title: '服务类收费项目',
                    component: compGoods,
                },
                {
                    title: '资源类收费项目',
                    component: compGoods0,
                },
                {
                    title: '抄表名称',
                    component: compMetername,
                },
            ],
        },
        {
            title: '日常业务',
            menu: [
                {
                    title: '抄表',
                    component: compMeterrecord,
                },
                {
                    title: '前台收费',
                    component: compBusiness,
                },
                {
                    title: '月报表',
                    component: compMonth,
                },
                {
                    title: '时段应收',
                    component: compEchart,
                },
            ],
        },
        {
            title: '用户管理',
            menu: [
                {
                    title: '抄表员',
                    component: compReader,
                },
            ],
        },
    ],
})
</script>
