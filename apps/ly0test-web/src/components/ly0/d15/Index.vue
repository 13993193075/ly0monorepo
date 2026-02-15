<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../frame/frame/Index.vue'
import compD15class from './class/Index.vue'
import compD15lession from './lession/Index.vue'
import compD15student from './student/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@网课',
    menu: [
        {
            title: '课程管理',
            menu: [
                {
                    title: '课程信息',
                    component: compD15class,
                },
                {
                    title: '课件信息',
                    component: compD15lession,
                },
            ],
        },
        {
            title: '用户管理',
            menu: [
                {
                    title: '学员信息',
                    component: compD15student,
                },
            ],
        },
    ],
})
</script>
