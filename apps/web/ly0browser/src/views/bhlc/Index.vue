<template>
    <compIndex :frameProps="frameProps"></compIndex>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive } from 'vue'
import compIndex from '../../components/ly0/frame/frame/Index.vue'

import compShop0 from "../../components/ly0/d7/shop0/Index.vue"
import compGoods from "../../components/ly0/d7/goods/Index.vue"
import compPostalCenter from "../../components/ly0/d7/postal-center/Index.vue"
import compGuest from "../../components/ly0/d7/guest/Index.vue"
import compD0user from "../../components/ly0/d0superuser/user-my-dataunit/Index.vue"

const frameProps = reactive({
    title: "博汇陇创@商城后台管理",
    menu: [
        {
            title: "商城后台管理",
            menu: [
                {
                    title: "商店名称",
                    component: compShop0
                },
                {
                    title: "商品名录",
                    component: compGoods
                },
                {
                    title: "邮件分拣中心",
                    component: compPostalCenter
                }
            ]
        },
        {
            title: "用户管理",
            menu: [
                {
                    title: "用户管理",
                    component: compD0user
                },
                {
                    title: "商城访客信息",
                    component: compGuest
                }
            ]
        }
    ]
})
</script>
