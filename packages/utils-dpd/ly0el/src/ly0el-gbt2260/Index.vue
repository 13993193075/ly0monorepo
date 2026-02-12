<template>
    <div @click="hdl.popup">
        <table>
            <tbody>
                <tr>
                    <td>
                        <el-icon v-if="!myProps.readOnly" style="color: blue"><edit /></el-icon>
                    </td>
                    <td>
                        <span :style="style.modelValue_box.code">{{ '[' + (modelValue_box.code2 ? modelValue_box.code2 : '省') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.modelValue_box.text">{{ modelValue_box.text2 ? modelValue_box.text2 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span :style="style.modelValue_box.code">{{ '[' + (modelValue_box.code4 ? modelValue_box.code4 : '市') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.modelValue_box.text">{{ modelValue_box.text4 ? modelValue_box.text4 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span :style="style.modelValue_box.code">{{ '[' + (modelValue_box.code6 ? modelValue_box.code6 : '县') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.modelValue_box.text">{{ modelValue_box.text6 ? modelValue_box.text6 : '' }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="行政区划 - 级联"
            width="800px"
            :destroy-on-close="true"
        >
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="width: 30%"><div :style="style.popup.label">省</div></td>
                        <td>
                            <el-select
                                v-model="popup.formData.code2"
                                placeholder="请选择 省"
                                filterable
                                :style="style.popup.select"
                                @change="hdl.changeCode2"
                            >
                                <el-option
                                    v-for="(item, index) in popup.formData.arrCode2"
                                    :label="item.text2"
                                    :value="item.code2"
                                    :key="item.code2"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td><div :style="style.popup.label">市</div></td>
                        <td>
                            <el-select
                                v-model="popup.formData.code4"
                                placeholder="请选择 市"
                                filterable
                                :style="style.popup.select"
                                @change="hdl.changeCode4"
                            >
                                <el-option
                                    v-for="(item, index) in popup.formData.arrCode4"
                                    :label="item.text4"
                                    :value="item.code4"
                                    :key="item.code4"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td><div :style="style.popup.label">县</div></td>
                        <td>
                            <el-select
                                v-model="popup.formData.code6"
                                placeholder="请选择 县"
                                filterable
                                :style="style.popup.select"
                            >
                                <el-option
                                    v-for="(item, index) in popup.formData.arrCode6"
                                    :label="item.text6"
                                    :value="item.code6"
                                    :key="item.code6"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div :style="style.line"></div>
            <div :style="style.popup.submit">
                <el-button type="danger" plain @click="hdl.submit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {reactive, ref, watch, computed} from "vue";
import {request} from '@yoooloo42/blindboxes-depend'
const ly0request = request.ly0

// 遵循 Vue 3 v-model 规范，使用 modelValue
const props = defineProps({
    // modelValue: 外部 v-model 绑定的值
    modelValue: {
        type: String,
        default: () => ''
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

const modelValue_box = reactive(Object.assign({
    code2: '',
    text2: '',
    code4: '',
    text4: '',
    code6: '',
    text6: '',
}, {code6: props.modelValue ?? ''}))

const popup = reactive({
    visible: false,
    formData: {
        arrCode2: [],
        code2: '',
        arrCode4: [],
        code4: '',
        arrCode6: [],
        code6: '',
    }
})

watch(() => props.modelValue,
    async (valNew, valOld) => {
        const result2 = await ly0request.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code2.init',
        })
        popup.formData.arrCode2 = result2.arrCode2.filter(item => item.code2)
        
        const result6 = await ly0request.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.get',
            data: { code6: valNew },
        })
        
        if(result6.itemCode6){
            // 保持响应式
            Object.assign(modelValue_box, result6.itemCode6)
            
            // 确保按顺序加载级联数据
            if (modelValue_box.code2) {
                await hdl.changeCode2(modelValue_box.code2)
            }
            if (modelValue_box.code4) {
                await hdl.changeCode4(modelValue_box.code4)
            }
        }
    },
    { immediate: true }
);

const hdl = {
    popup: async () => {
        if (props.myProps.readOnly) {
            return
        }
        
        popup.formData.code2 = modelValue_box.code2
        await hdl.changeCode2(popup.formData.code2)
        
        popup.formData.code4 = modelValue_box.code4
        await hdl.changeCode4(popup.formData.code4)
        
        popup.formData.code6 = modelValue_box.code6
        popup.visible = true
    },
    
    changeCode2: async value => { // 使用 async 标记
        const result = await ly0request.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code4.code2',
            data: {code2: value},
        })
        
        popup.formData.arrCode4 = result.arrCode4.filter(item => item.code4)
        popup.formData.code4 = ''
        popup.formData.arrCode6 = []
        popup.formData.code6 = ''
    },
    
    changeCode4: async value => {
        const result = await ly0request.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.code4',
            data: {code4: value},
        })
        
        popup.formData.arrCode6 = result.arrCode6.filter(item => item.code6)
        popup.formData.code6 = ''
    },
    
    submit: () => {
        modelValue_box.code2 = popup.formData.code2
        const foundItem2 = popup.formData.arrCode2.find(i => i.code2 === modelValue_box.code2)
        modelValue_box.text2 = foundItem2 ? foundItem2.text2 : ''
        modelValue_box.code4 = popup.formData.code4
        const foundItem4 = popup.formData.arrCode4.find(i => i.code4 === modelValue_box.code4)
        modelValue_box.text4 = foundItem4 ? foundItem4.text4 : ''
        modelValue_box.code6 = popup.formData.code6
        const foundItem6 = popup.formData.arrCode6.find(i => i.code6 === modelValue_box.code6)
        modelValue_box.text6 = foundItem6 ? foundItem6.text6 : ''
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", modelValue_box.code6 ?? modelValue_box.code4 ?? modelValue_box.code2 ?? '')
        popup.visible = false
    }
}

const style = reactive({
    modelValue_box: {
        code: {
            color: '#6a6a6a',
        },
        text: {
            color: '#0000bb',
            'padding-left': '10px',
        }
    },
    popup: {
        label: {
            'text-align': 'right',
            'font-size': 'medium',
            'padding-right': '20px'
        },
        select: {
            width: '300px',
            'margin-top': '10px',
            'margin-bottom': '10px',
            height: '40px',
            'line-height': '40px'
        },
        submit: {
            'text-align': 'right'
        }
    },
    line: {
        height: '1px',
        'background-color': '#999999',
        'margin-top': '10px',
        'margin-bottom': '10px'
    }
})
</script>
