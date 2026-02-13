<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'
import compD14d0 from './d0/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@孕产临床数据分析',
    menu: [
        {
            title: '数据采样',
            menu: [
                {
                    title: '个人信息名录',
                    component: compD14d0,
                },
            ],
        },
    ],
})
</script>
