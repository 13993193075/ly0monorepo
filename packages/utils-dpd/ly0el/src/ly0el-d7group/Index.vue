<template>
    <div @click="hdl.popup">
        <table>
            <tbody>
                <tr v-if="!modelValue_box || modelValue_box.length === 0">
                    <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                    <td>[未分类]</td>
                </tr>
                <tr v-else>
                    <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                    <td>
                        <template v-for="(item, index) in modelValue_box">
                            <template v-if="!!item">
                                <div :style="style.modelValue_box.item">{{ item }}</div>
                            </template>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="商品分类"
            width="800px"
            :destroy-on-close="true"
        >
            <table style="width: 100%">
                <tbody>
                    <tr>
                        <td>
                            <template v-for="(item, index) in popup.formData" :key="index">
                                <div :style="style.popup.item">
                                    <el-input :style="style.popup.input" v-model="popup.formData[index]"></el-input>
                                    <el-button
                                        :style="style.popup.delete"
                                        type="danger"
                                        circle
                                        size="small"
                                        @click="hdl.delete(index)"
                                    ><el-icon><Delete></Delete></el-icon></el-button>
                                </div>
                            </template>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="width: 50px">
                            <el-button
                                type="primary"
                                circle
                                size="small"
                                style="margin-top: 20px"
                                @click="hdl.append"
                            >
                                <el-icon><Plus></Plus></el-icon>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div :style="style.line"></div>
            <div>
                <el-button type="danger" plain @click="hdl.submit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {reactive} from "vue";

// 遵循 Vue 3 v-model 规范，使用 modelValue
const props = defineProps({
    // modelValue: 外部 v-model 绑定的值
    modelValue: {
        type: Array,
        default: () => []
    },
    myProps: {
        type: Object,
        default: () => ({
            readOnly: {
                type: Boolean,
                default: false
            }
        })
    }
    
});
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['update:modelValue', 'change'])

const modelValue_box = reactive(props.modelValue ?? [])
const popup = reactive({
    visible: false,
    formData: []
})

const hdl = {
    // 弹出编辑窗口
    popup() {
        if (props.myProps.readOnly) {
            return
        }
        popup.formData = JSON.parse(JSON.stringify(modelValue_box))
        popup.visible = true
    },
    append() {
        popup.formData.push('')
    },
    delete(index) {
        popup.formData.splice(index, 1)
    },
    submit() {
        // 这里不能使用JSON.parse(JSON.stringify())，否则会切断modelValue_box的响应性
        modelValue_box.splice(0, modelValue_box.length, ...popup.formData)
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", modelValue_box)
        popup.visible = false
    }
}

const style = reactive({
    modelValue_box: {
        item: {
            display: 'inline-block',
            margin: '10px',
            padding: '10px',
            'background-color': '#a6a6a6',
            'border-radius': '5px',
            color: 'white'
        }
    },
    popup: {
        item: {
            display: 'inline-block',
            margin: '10px',
            padding: '10px',
            'background-color': '#a6a6a6',
            'border-radius': '5px'
        },
        input: {
            width: '200px'
        },
        delete: {
            'margin-left': '10px'
        }
    },
    line: {
        height: '1px',
        'background-color': '#6a6a6a',
        'margin-top': '10px',
        'margin-bottom': '10px'
    }
})
</script>
