<template>
    <template v-if="Props.id_login">
        <el-dialog
            v-if="Props.popup.switch"
            v-model="Props.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="登录账号信息"
            width="1000px"
            :top="Props.popup.top"
            :destroy-on-close="true"
        >
            <compInfo :Props="Props"></compInfo>
        </el-dialog>
        <compInfo v-else :Props="Props"></compInfo>
    </template>
</template>

<style scoped></style>

<script setup>
import compInfo from './Info.vue'
const props = defineProps({
    Props: {
        type: Object,
        default: () => ({
            id_login: null,
            readOnly: true, // 是否只读
            destroy: false, // 是否允许注销登录账号
            popup: {
                switch: true,
                visible: false,
                title: '登录账号信息',
                top: '15vh'
            }
        })
    }
})
</script>
