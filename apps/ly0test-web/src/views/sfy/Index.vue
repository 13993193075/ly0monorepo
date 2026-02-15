<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../../components/ly0/frame/frame/Index.vue'
import compD14d0 from '../../components/ly0/d14/d14d0/Index.vue'
import compD0user from "../../components/ly0/d0superuser/user-my-dataunit/Index.vue"

const frameProps = reactive({
    title: "甘肃省妇幼保健院 - 孕产临床数据分析平台",
    menu: [
        {
            title: "数据采样",
            menu: [
                {
                    title: "个人信息名录",
                    component: compD14d0
                }
            ]
        },
        {
            title: "用户管理",
            menu: [
                {
                    title: "用户管理",
                    component: compD0user
                }
            ]
        }
    ]
})
</script>
