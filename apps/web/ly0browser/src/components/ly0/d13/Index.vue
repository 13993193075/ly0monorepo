<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'

import compD13d0class from './d0class/Index.vue'
import compD13d0url from './d0url/Index.vue'
import compD13d0download from './d0download/Index.vue'
import compD13d1help from './d1help/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@教材下载中心/用户支持中心',
    menu: [
        {
            title: '教材下载中心',
            menu: [
                {
                    title: '教材分类',
                    component: compD13d0class,
                },
                {
                    title: '资源清单',
                    component: compD13d0url,
                },
                {
                    title: '下载中心',
                    component: compD13d0download,
                },
            ],
        },
        {
            title: '用户支持中心',
            menu: [
                {
                    title: '上传附件',
                    component: compD13d1help,
                },
            ],
        },
    ],
})
</script>
