<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'
import compD3gbt2260code4 from './gbt2260code4/Index.vue'
import compD3gbt2260code6 from './gbt2260code6/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@国标代码',
    menu: [
        {
            title: '国标代码',
            menu: [
                {
                    title: '行政区划编码 - 市级',
                    component: compD3gbt2260code4,
                },
                {
                    title: '行政区划编码 - 县级',
                    component: compD3gbt2260code6,
                },
            ],
        },
    ],
})
</script>
