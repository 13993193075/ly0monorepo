<template>
    <div @click="hdl.popup">
        <table>
            <tbody>
                <tr v-if="!modelValue_box || modelValue_box.length === 0">
                    <td><el-icon v-if="!myProps.readOnly" :size="16" color="blue"><Edit /></el-icon></td>
                    <td>[未标价]</td>
                </tr>
                <template v-else>
                    <tr v-for="(item, index) in modelValue_box" :key="index">
                        <td><el-icon v-if="!myProps.readOnly && index === 0" :size="16" color="blue"><Edit /></el-icon></td>
                        <td>
                            <span v-if="!!item.name" :style="style.modelValue_box.name">{{ item.name }}</span>
                            <span v-else :style="style.modelValue_box.name_empty">[未设置标价名称]</span>
                            <span :style="style.modelValue_box.price">￥{{ (item.price / 100).toFixed(2) }}</span>
                            <img v-if="!!item.member" :style="style.modelValue_box.member" src="./member.png" alt="会员" />
                            <img v-if="!!item.hot" :style="style.modelValue_box.hot" src="./hot.png" alt="热点" />
                            <span :style="style.modelValue_box.note">{{ item.note || '' }}</span>
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
            title="商品标价"
            width="1240px"
            :destroy-on-close="true"
        >
            <table style="width: 100%;">
            <tbody>
                <tr>
                    <th>标价名称</th>
                    <th>单价（元）</th>
                    <th>会员标注</th>
                    <th>热点标注</th>
                    <th>备注</th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in popup.formData" :key="index">
                    <td><el-input :style="style.popup.name" v-model="item.name"></el-input></td>
                    <td><el-input-number
                        :style="style.popup.price"
                        v-model="item.price"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                    /></td>
                    <td>
                        <el-switch
                            v-model="item.member"
                            active-text="是"
                            inactive-text="否"
                            :active-value="true"
                            :inactive-value="false"
                        ></el-switch>
                    </td>
                    <td>
                        <el-switch
                            v-model="item.hot"
                            active-text="是"
                            inactive-text="否"
                            :active-value="true"
                            :inactive-value="false"
                        ></el-switch>
                    </td>
                    <td><el-input :style="style.popup.note" v-model="item.note"></el-input></td>
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
                    <td colspan="5"></td>
                    <td>
                        <el-button
                            type="primary"
                            circle
                            size="small"
                            style="margin-top: 20px;"
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
        popup.formData.forEach(i => {
            // 价格从“分”转换为“元”
            i.price = i.price / 100
        })
        popup.visible = true
    },
    append() {
        popup.formData.push({
            name: '',
            price: 0, // 初始价格为 0 元
            member: false,
            hot: false,
            note: '',
        })
    },
    delete(index) {
        popup.formData.splice(index, 1)
    },
    submit() {
        // 这里不能使用JSON.parse(JSON.stringify())，否则会切断modelValue_box的响应性
        modelValue_box.splice(0, modelValue_box.length, ...popup.formData)
        modelValue_box.forEach(i => {
            // 确保 price 是数字，然后转为“分”
            i.price = Math.floor(Number(i.price) * 100)
        })
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", modelValue_box)
        popup.visible = false
    },
}

const style = reactive({
    modelValue_box: {
        name: {},
        name_empty: {
            color: '#919191'
        },
        price: {
            'margin-left': '10px',
            color: 'blue'
        },
        member: {
            'margin-left': '10px',
            width: '32px',
            height: '32px'
        },
        hot: {
            'margin-left': '10px',
            width: '20px',
            height: '20px'
        },
        note: {
            'margin-left': '10px'
        }
    },
    popup: {
        name: {
            width: '200px',
        },
        price: {
            width: '120px'
        },
        note: {
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
