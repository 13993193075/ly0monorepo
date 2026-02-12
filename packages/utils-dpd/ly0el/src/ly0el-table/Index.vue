<template>
    <el-dialog
        v-if="tableProps_box.popup.switch"
        v-model="tableProps_box.popup.visible"
        custom-class="code-template-dialog"
        :close-on-press-escape="true"
        append-to-body
        :title="tableProps_box.popup.title"
        :width="tableProps_box.popup.width"
        :top="tableProps_box.popup.top"
        :destroy-on-close="true"
    >
        <compTable v-model="tableData_box" :myProps="tableProps_box" :scopeThis="scopeThis_box"></compTable>
    </el-dialog>
    <compTable v-else v-model="tableData_box" :myProps="tableProps_box" :scopeThis="scopeThis_box"></compTable>
</template>

<style lang="scss" scoped></style>

<script setup>
import {reactive} from "vue"
import compTable from './Table.vue'
import ly0default from './default.js'
import {unclassified as LibsJsUnclass} from '@yoooloo42/blindboxes'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    }
})

// 顶层组件的props属性需做响应性包装，页面和js可以使用相同的命名
let tableData_box = reactive(LibsJsUnclass.deepClone.deepDefaults(props.modelValue, ly0default.modelValue))
const tableProps_box = reactive(LibsJsUnclass.deepClone.deepDefaults(props.myProps, ly0default.myProps))

const scopeThis_box = reactive(props.scopeThis)
</script>
