<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'

import compUnit from './unit/Index.vue'
import compUnit0 from './unit0/Index.vue'
import compGroup from './group/Index.vue'
import compWorker from './worker/Index.vue'
import compBusiness from './business/Index.vue'
import compBusiness_0 from './business-0/Index.vue'
import compBusiness_1 from './business-1/Index.vue'
import compBusiness_2 from './business-2/Index.vue'
import compBusiness0 from './business0/Index.vue'
import compBusiness0_0 from './business0-0/Index.vue'
import compBusiness0_1 from './business0-1/Index.vue'
import compBusiness0_2 from './business0-2/Index.vue'
import compEchart from './echart/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@工单',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '工作单位',
                    component: compUnit,
                },
                {
                    title: '参数设置',
                    component: compUnit0,
                },
                {
                    title: '工作组',
                    component: compGroup,
                },
                {
                    title: '工作人员',
                    component: compWorker,
                },
            ],
        },
        {
            title: '客户工单管理',
            menu: [
                {
                    title: '数据维护',
                    component: compBusiness,
                },
                {
                    title: '下单',
                    component: compBusiness_0,
                },
                {
                    title: '完工',
                    component: compBusiness_1,
                },
                {
                    title: '取消',
                    component: compBusiness_2,
                },
            ],
        },
        {
            title: '巡检工单管理',
            menu: [
                {
                    title: '数据维护',
                    component: compBusiness0,
                },
                {
                    title: '下单',
                    component: compBusiness0_0,
                },
                {
                    title: '完工',
                    component: compBusiness0_1,
                },
                {
                    title: '取消',
                    component: compBusiness0_2,
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
    ],
})
</script>
