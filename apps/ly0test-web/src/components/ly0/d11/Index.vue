<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'

import compCarpark from './carpark/Index.vue'
import compCarpark0 from './carpark0/Index.vue'
import compPricing from './pricing/Index.vue'
import compSelf from './self/Index.vue'
import compCarwithin from './carwithin/Index.vue'
import compCarwithin_rec from './carwithin_rec/Index.vue'

import compCarpassin from './carpassin/Index.vue'
import compCarPassin0 from './carpassin0/Index.vue'

import compEchart0 from './echart0/Index.vue'
import compEchart from './echart/Index.vue'

import compWarden from './warden/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@停车',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '停车场信息',
                    component: compCarpark,
                },
                {
                    title: '参数设置',
                    component: compCarpark0,
                },
                {
                    title: '临时车计费项目',
                    component: compPricing,
                },
                {
                    title: '长期车自助缴费项目',
                    component: compSelf,
                },
                {
                    title: '长期车',
                    component: compCarwithin,
                },
                {
                    title: '缴费记录',
                    component: compCarwithin_rec,
                },
            ],
        },
        {
            title: '进车记录',
            menu: [
                {
                    title: '信息维护',
                    component: compCarpassin,
                },
                {
                    title: '进出车登记',
                    component: compCarPassin0,
                },
            ],
        },
        {
            title: '时段应收',
            menu: [
                {
                    title: '长期车',
                    component: compEchart0,
                },
                {
                    title: '临时停车',
                    component: compEchart,
                },
            ],
        },
        {
            title: '用户管理',
            menu: [
                {
                    title: '停车场管理员',
                    component: compWarden,
                },
            ],
        },
    ],
})
</script>
