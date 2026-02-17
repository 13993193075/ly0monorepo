<template>
    <div @click="hdl.popup">
        <table>
            <tbody>
                <tr v-if="!modelValue_box || modelValue_box.length === 0">
                    <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                    <td>[未设置更多邮寄地址]</td>
                </tr>
                <template v-else>
                    <tr v-for="(item, index) in modelValue_box" :key="index">
                        <td><el-icon v-if="!myProps.readOnly && index === 0" :size="16" color="blue"><Edit /></el-icon></td>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td :style="style.modelValue_box.label">国内行政区划</td>
                                    <td :style="style.modelValue_box.value">{{ item.gbt2260text }}</td>
                                </tr>
                                <tr>
                                    <td :style="style.modelValue_box.label">详细地址</td>
                                    <td :style="style.modelValue_box.value">{{ item.address }}</td>
                                </tr>
                                <tr>
                                    <td :style="style.modelValue_box.label">联系电话</td>
                                    <td :style="style.modelValue_box.value">{{ item.tel }}</td>
                                </tr>
                                <tr>
                                    <td :style="style.modelValue_box.label">联系人</td>
                                    <td :style="style.modelValue_box.value">{{ item.name }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </template>
                
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="邮寄地址"
            width="1240px"
            :destroy-on-close="true"
        >
        <table style="width: 100%">
            <tbody>
                <tr>
                    <th>国内行政区划</th>
                    <th>详细地址</th>
                    <th>联系电话</th>
                    <th>联系人</th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in popup.formData" :key="index">
                    <!-- 左对齐，使用<td> -->
                    <td>
                        <ly0gbt2260
                            v-model="item.gbt2260code"
                            :myProps="{ readonly: true }"
                        ></ly0gbt2260>
                    </td>
                    <!-- 居中对齐，使用<th> -->
                    <td>
                        <el-input :style="style.popup.address" v-model="item.address"></el-input>
                    </td>
                    <td>
                        <el-input :style="style.popup.tel" v-model="item.tel"></el-input>
                    </td>
                    <td>
                        <el-input :style="style.popup.name" v-model="item.name"></el-input>
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
                    <td colspan="4"></td>
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
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {reactive} from "vue";
import { request as ly0request } from '@yoooloo42/ly0browser'
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
            gbt2260code: '',
            address: '',
            tel: '',
            name: '',
        })
    },
    delete(index) {
        popup.formData.splice(index, 1)
    },
    submit() {
        // 这里不能使用JSON.parse(JSON.stringify())，否则会切断modelValue_box的响应性
        modelValue_box.splice(0, modelValue_box.length, ...popup.formData)
        let arrPromise = []
        modelValue_box.forEach(i => {
            arrPromise.push(
                ly0request.ly0.storpro({
                    noSession: true,
                    storproName: 'ly0d3.gbt2260code6.get',
                    data: { code6: i.gbt2260code },
                }),
            )
        })
        Promise.all(arrPromise).then(result => {
            result.forEach((item, index) => {
                modelValue_box[index].gbt2260text =
                    item.itemCode6.text2 + '-' + item.itemCode6.text4 + '-' + item.itemCode6.text6
            })
            // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
            emit("update:modelValue", modelValue_box)
            popup.visible = false
        })
    }
}

const style = reactive({
    modelValue_box: {
        label: {
            'text-align': 'right',
            'padding-right': '10px',
            'color': '#919191'
        },
        value: {
            color: 'blue'
        }
    },
    popup: {
        address: {
            width: '300px'
        },
        tel: {
            width: '200px'
        },
        name: {
            width: '200px'
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
