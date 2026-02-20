<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'

import compPlace from './place/Index.vue'
import compPlace0 from './place0/Index.vue'
import compPosition from './position/Index.vue'
import compStudent from './student/Index.vue'
import compRoom from './room/Index.vue'
import compDay from './day/Index.vue'
import compAppointment from './appointment/Index.vue'
import compEchart from './echart/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@座位',
    menu: [
        {
            title: '基础信息预置',
            menu: [
                {
                    title: '场所信息',
                    component: compPlace,
                },
                {
                    title: '参数设置',
                    component: compPlace0,
                },
                {
                    title: '房间位置',
                    component: compPosition,
                },
                {
                    title: '房间信息',
                    component: compRoom,
                },
                {
                    title: '开放时段',
                    component: compDay,
                },
            ],
        },
        {
            title: '预约记录',
            menu: [
                {
                    title: '预约记录',
                    component: compAppointment,
                },
                {
                    title: '热力图',
                    component: compEchart,
                },
            ],
        },
        {
            title: '用户管理',
            menu: [
                {
                    title: '学生信息',
                    component: compStudent,
                },
            ],
        },
    ],
})
</script>
