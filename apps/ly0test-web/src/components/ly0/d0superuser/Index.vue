<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'

import compDataunit from './dataunit/Index.vue'
import compGroup from './group/Index.vue'
import compUser from './user/Index.vue'
import compUserMyDataunit from './user-my-dataunit/Index.vue'

import compUploadClear from './upload-clear/Index.vue'
import compSyslog from './syslog/Index.vue'
import compSyslogMyDataunit from './syslog-my-dataunit/Index.vue'

import compAnnual from './annual/Index.vue'
import compAnnualMy from './annual-my/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@超级用户',
    menu: [
        {
            title: '用户管理',
            menu: [
                {
                    title: '数据单元',
                    component: compDataunit,
                },
                {
                    title: '用户组',
                    component: compGroup,
                },
                {
                    title: '用户信息',
                    component: compUser,
                },
                {
                    title: '用户信息 - myDataunit',
                    component: compUserMyDataunit,
                },
            ],
        },
        {
            title: '系统维护',
            menu: [
                {
                    title: '文件上传垃圾清理',
                    component: compUploadClear,
                },
                {
                    title: '系统日志',
                    component: compSyslog,
                },
                {
                    title: '系统日志 - myDataunit',
                    component: compSyslogMyDataunit,
                },
            ],
        },
        {
            title: '系统年费',
            menu: [
                {
                    title: '年费记录',
                    component: compAnnual,
                },
                {
                    title: '我的年费',
                    component: compAnnualMy,
                },
            ],
        },
    ],
})
</script>
