<template>
    <div>
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <el-image
                            :style="style.thumb"
                            :src="modelValue_box[myProps.thumb.fieldName][0]"
                            :preview-src-list="modelValue_box[myProps.thumb.fieldName]"
                            :preview-teleported="true"
                            :hide-on-click-modal="true"
                        ></el-image>
                    </td>
                </tr>
                <tr @click="hdl.popup">
                    <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                    <td>
                        <div>
                            <span v-if="!!modelValue_box[myProps.number.fieldName]">{{ modelValue_box[myProps.number.fieldName] }}</span>
                            <span v-else style="color: #919191;">[未设置商品编号]</span>
                        </div>
                        <div>
                            <span v-if="!!modelValue_box[myProps.name.fieldName]">{{ modelValue_box[myProps.name.fieldName] }}</span>
                            <span v-else style="color: #919191;">[未设置商品名称]</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-if="!myProps.readOnly"
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="商品编号、名称及缩略图"
            width="800px"
            :destroy-on-close="true"
        >
            <table style="width: 100%">
                <tbody>
                    <tr>
                        <td>
                            <el-collapse>
                                <el-collapse-item title="原图">
                                    <el-image
                                        :style="style.thumb"
                                        :src="popup.formData.thumb[0]"
                                        :preview-src-list="popup.formData.thumb"
                                    ></el-image>
                                </el-collapse-item>
                            </el-collapse>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="margin-top: 10px; margin-bottom: 10px">上传新图</div>
                            <ly0Upload_avatar
                                v-model="popup.formData.thumb"
                                :myProps="upload.props"
                            ></ly0Upload_avatar>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <div style="margin-top: 10px; margin-bottom: 10px">商品编号</div>
                            <div><el-input style="width: 200px;" v-model="popup.formData.number"></el-input></div>
                            <div style="margin-top: 10px; margin-bottom: 10px">商品名称</div>
                            <div><el-input style="width: 400px;" v-model="popup.formData.name"></el-input></div>
                            </th>
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
import {request} from '@yoooloo42/blindboxes-depend'
const ly0request = request.ly0

// 遵循 Vue 3 v-model 规范，使用 modelValue
const props = defineProps({
    // modelValue: 外部 v-model 绑定的值
    modelValue: {
        type: Object,
        default: () => ({})
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

const modelValue_box = reactive(props.modelValue ?? {})
const popup = reactive({
    visible: false,
    formData: {
        thumb: '',
        name: '',
        number: '',
    }
})

const upload = reactive({
    props: {
        uploadUrl: props.myProps.thumb.uploadUrl || ly0request.domain + ly0request.upload_image,
        avatar: {
            width: props.myProps.thumb.width || '100px',
            height: props.myProps.thumb.height || '100px'
        },
    }
})

const hdl = {
    popup() {
        if (props.myProps.readOnly) {
            return
        }
        popup.formData = {
            thumb: modelValue_box[props.myProps.thumb.fieldName],
            number: modelValue_box[props.myProps.number.fieldName],
            name: modelValue_box[props.myProps.name.fieldName],
        }
        popup.visible = true
    },
    submit() {
        modelValue_box[props.myProps.thumb.fieldName] = popup.formData.thumb
        modelValue_box[props.myProps.name.fieldName] = popup.formData.name
        modelValue_box[props.myProps.number.fieldName] = popup.formData.number
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", modelValue_box)
        popup.visible = false
    },
}

const style = {
    thumb: {
        width: props.myProps.thumb.width || '100px',
        height: props.myProps.thumb.height || '100px'
    },
    line: {
        height: '1px',
        'background-color': '#6a6a6a',
        'margin-top': '10px',
        'margin-bottom': '10px'
    }
}

</script>
