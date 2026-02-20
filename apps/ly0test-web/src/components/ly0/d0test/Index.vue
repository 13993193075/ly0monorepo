<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compFirst from './first/Index.vue'
import compBusicomp from './busicomp/Index.vue'
import compApp from './app/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@测试中心',
    menu: [
        {
            title: '测试导航',
            menu: [
                {
                    title: '初始化',
                    component: compFirst,
                },
                {
                    title: '业务构件',
                    component: compBusicomp,
                },
                {
                    title: '应用',
                    component: compApp,
                },
            ],
        },
    ],
})
</script>
