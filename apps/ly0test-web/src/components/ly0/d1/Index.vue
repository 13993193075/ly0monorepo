<template>
    <ly0el-frame :myProps="frameProps"></ly0el-frame>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compD0appid from './d0appid/Index.vue'
import compD0mchid from './d0mchid/Index.vue'
import compD1ukey from './d1ukey/Index.vue'
import compD1printer from './d1printer/Index.vue'

const frameProps = reactive({
    title: 'ly0 - 企业应用集成平台@第三方接口库',
    menu: [
        {
            title: '微信开放平台',
            menu: [
                {
                    title: '应用凭据',
                    component: compD0appid,
                },
                {
                    title: '商户号',
                    component: compD0mchid,
                },
            ],
        },
        {
            title: '飞鹅云打印',
            menu: [
                {
                    title: '开发者账号',
                    component: compD1ukey,
                },
                {
                    title: '打印机列表',
                    component: compD1printer,
                },
            ],
        },
    ],
})
</script>
