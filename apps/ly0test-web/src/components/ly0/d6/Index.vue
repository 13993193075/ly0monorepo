<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compD0staticres from './d0staticres/Index.vue'
import compD0upload from './d0upload/Index.vue'
import compD0approval from './d0approval/Index.vue'
import compD0publish from './d0publish/Index.vue'
import compD0dlstation from './d0dlstation/Index.vue'

import compD1draft from './d1draft/Index.vue'
import compD1approval from './d1approval/Index.vue'
import compD1publish from './d1publish/Index.vue'
import compD1intnoti from './d1intnoti/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@下载中心/内部通知',
    menu: [
        {
            title: '下载中心',
            menu: [
                {
                    title: '静态资源管理',
                    component: compD0staticres,
                },
                {
                    title: '上传',
                    component: compD0upload,
                },
                {
                    title: '审核',
                    component: compD0approval,
                },
                {
                    title: '发布',
                    component: compD0publish,
                },
                {
                    title: '下载中心',
                    component: compD0dlstation,
                },
            ],
        },
        {
            title: '内部通知',
            menu: [
                {
                    title: '拟稿',
                    component: compD1draft,
                },
                {
                    title: '审核',
                    component: compD1approval,
                },
                {
                    title: '发布',
                    component: compD1publish,
                },
                {
                    title: '预览',
                    component: compD1intnoti,
                },
            ],
        },
    ],
})
</script>
