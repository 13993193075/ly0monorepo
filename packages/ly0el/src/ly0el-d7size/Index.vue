<template><div @click="hdl.popup">
    <table>
        <tbody>
            <tr v-if="!modelValue_box || modelValue_box.length === 0">
                <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                <td>[未设置规格]</td>
            </tr>
            <tr v-for="(item, index) in modelValue_box">
                <td><el-icon v-if="!myProps.readOnly && index === 0" :size="16" color="blue"><Edit /></el-icon></td>
                <td>
                    <span v-if="!!item.name">{{ item.name }}</span>
                    <span v-else :style="style.modelValue_box.nameEmpty">[未设置规格名称]</span>
                    <span v-if="!!item.size" :style="style.modelValue_box.size">{{ item.size }}</span>
                    <span v-else :style="style.modelValue_box.sizeEmpty">[未设置规格内容]</span>
                    <img v-if="!!item.new" :style="style.modelValue_box.new" src="./new.png" />
                </td>
            </tr>
        </tbody>
    </table>
    <el-dialog
        v-model="popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        title="商品规格"
        width="800px"
        :destroy-on-close="true"
    >
        <table style="width: 100%">
        <tbody>
            <tr>
                <th>规格名称</th>
                <th>规格内容</th>
                <th>上新标注</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in popup.formData">
                <td><el-input :style="style.popup.name" v-model="item.name"></el-input></td>
                <td><el-input :style="style.popup.size" v-model="item.size"></el-input></td>
                <td>
                    <el-switch
                        v-model="item.new"
                        active-text="是"
                        inactive-text="否"
                        :active-value="true"
                        :inactive-value="false"
                    ></el-switch>
                </td>
                <td>
                    <el-button
                        type="danger"
                        circle
                        size="small"
                        @click="hdl.delete(index)"
                    ><el-icon><Delete /></el-icon></el-button>
                </td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td>
                    <el-button
                        type="primary"
                        circle
                        size="small"
                        style="margin-top: 20px"
                        @click="hdl.append"
                    ><el-icon><Plus /></el-icon></el-button>
                </td>
            </tr>
        </tbody>
        </table>
        <div :style="style.line"></div>
        <div>
            <el-button type="danger" plain @click="hdl.submit">确认</el-button>
        </div>
    </el-dialog>
</div></template>

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
    popup() {
        if (props.myProps.readOnly) {
            return
        }
        popup.formData = JSON.parse(JSON.stringify(modelValue_box))
        popup.visible = true
    },
    append() {
        popup.formData.push({
            name: '',
            size: '',
            new: false,
        })
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
        nameEmpty: {
            color: '#919191'
        },
        size: {
            'margin-left': '10px',
            color: 'blue'
        },
        sizeEmpty: {
            color: '#919191'
        },
        new: {
            'margin-left': '10px',
            width: '32px',
            height: '32px'
        }
    },
    popup: {
        name: {
            width: '200px',
        },
        size: {
            width: '300px'
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
