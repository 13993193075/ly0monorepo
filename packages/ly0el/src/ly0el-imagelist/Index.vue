<template>
    <div>
        <el-dialog
            v-if="props_box.popup.switch"
            v-model="props_box.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            :title="props_box.popup.title"
            :width="props_box.popup.width"
            :top="props_box.popup.top"
            :destroy-on-close="true"
        >
            <compImageList :v-model="data_box" :myProps="props_box" :scopeThis="scopeThis_box"></compImageList>
        </el-dialog>
        <compImageList v-else :v-model="data_box" :myProps="props_box" :scopeThis="scopeThis_box"></compImageList>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import {reactive} from "vue"
import compImageList from './ImageList.vue'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
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
let data_box = reactive(ly0utils.deepClone.deepDefaults(props.modelValue, ly0default.modelValue))
const props_box = reactive(ly0utils.deepClone.deepDefaults(props.myProps, ly0default.myProps))
const scopeThis_box = reactive(props.scopeThis)
</script>
