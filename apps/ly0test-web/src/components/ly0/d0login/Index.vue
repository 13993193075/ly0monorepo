<template>
    <el-dialog
        v-if="myProps && myProps.popup"
        v-model="myProps.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="myProps.popup.title ? myProps.popup.title : ''"
        :width="myProps.popup.width ? myProps.popup.width : '1000px'"
        :top="myProps.popup.top ? myProps.popup.top : '15vh'"
        :destroy-on-close="true"
    >
        <compIndex0 :myProps="myProps"></compIndex0>
    </el-dialog>
    <compIndex0 v-else :myProps="myProps"></compIndex0>
</template>

<style lang="scss" scoped></style>

<script setup>
import compIndex0 from './Index0.vue'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({})
    }
})
</script>
