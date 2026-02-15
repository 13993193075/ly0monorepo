<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compRecord from './record/Index.vue'
import compTestBusiSide from './test-business-side/Index.vue'
import compTestCash from './test-cash/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@支付记录',
    menu: [
        {
            title: '支付记录',
            menu: [
                {
                    title: '支付记录（维护）',
                    component: compRecord,
                },
            ],
        },
        {
            title: '交易端-测试',
            menu: [
                {
                    title: '支付记录',
                    component: compTestBusiSide,
                },
                {
                    title: '收银',
                    component: compTestCash,
                },
            ],
        },
    ],
})
</script>
