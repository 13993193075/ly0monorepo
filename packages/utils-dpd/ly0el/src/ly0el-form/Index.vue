<template>
    <el-dialog
        v-if="formProps_box.popup.switch"
        v-model="formProps_box.popup.visible"
        custom-class="code-template-dialog"
        :close-on-press-escape="true"
        append-to-body
        :title="formProps_box.popup.title"
        :width="formProps_box.popup.width"
        :top="formProps_box.popup.top"
        :destroy-on-close="true"
    >
        <compForm v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box"></compForm>
    </el-dialog>
    <compForm v-else v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box"></compForm>
</template>

<style lang="scss" scoped></style>

<script setup>
import {reactive} from "vue";
import {unclassified as LibsJsUnclass} from '@yoooloo42/blindboxes'
import compForm from './Form.vue'
import ly0default from './default.js'

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
let formData_box = reactive(props.modelValue)
const formProps_box = reactive(LibsJsUnclass.deepClone.deepDefaults(props.myProps, ly0default.myProps))
const scopeThis_box = reactive(props.scopeThis)
</script>
