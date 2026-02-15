<template>
    <el-dialog
        v-model="scopeThis.insertMany0.popup.visible"
        class="code-template-dialog"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.insertMany0.popup.title"
        width="800px"
    >
        <table class="checkin-checkout">
            <tbody>
            <tr class="field-row">
                <td class="col-label">
                    <label class="label">入住时间</label>
                </td>
                <td class="col-input">
                    <el-date-picker
                        class="input"
                        v-model="state.checkin"
                        type="datetime"
                        placeholder="选择时间"
                        format="YYYY-MM-DD HH:mm"
                        value-format="YYYY-MM-DD HH:mm"
                    />
                </td>
            </tr>
            <tr class="field-row">
                <td class="col-label">
                    <label class="label">离开时间</label>
                </td>
                <td class="col-input">
                    <el-date-picker
                        class="input"
                        v-model="state.checkout"
                        type="datetime"
                        placeholder="选择时间"
                        format="YYYY-MM-DD HH:mm"
                        value-format="YYYY-MM-DD HH:mm"
                    />
                </td>
            </tr>
            </tbody>
        </table>

        <div class="line"></div>
        <div class="rooms-box">
            <span>选中房数：</span>
            <span class="count">{{ roomsCount }}</span>
        </div>

        <el-tree
            :data="scopeThis.insertMany0.data"
            node-key="treeItemCode"
            ref="treeRef"
            show-checkbox
            @check-change="hdlCheckChange"
        />

        <div class="line"></div>
        <div class="submit-box">
            <el-button type="danger" plain @click="hdlSubmit">提交</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// 定义Props
const props = defineProps(['scopeThis'])

// 声明Tree组件的引用
const treeRef = ref(null)

// 响应式数据状态
const state = reactive({
    checkin: props.scopeThis.pgData.data.objBusiness.checkin,
    checkout: props.scopeThis.pgData.data.objBusiness.checkout,
})
const roomsCount = ref(0)

// 勾选
const hdlCheckChange = () => {
    // 使用可选链，防止treeRef.value为空
    const checkedNodes = treeRef.value?.getCheckedNodes() || []
    roomsCount.value = checkedNodes.filter(i => i.treeItemNode === 'Room').length
}

// 提交
const hdlSubmit = () => {
    // 使用可选链，防止treeRef.value为空
    const checkedNodes = treeRef.value?.getCheckedNodes() || []

    // 调用父组件传入的 submit 方法
    props.scopeThis.insertMany0.handles.submit({
        scopeThis:props.scopeThis,
        data: {
            arrCheckedNodes: checkedNodes,
            checkin: state.checkin,
            checkout: state.checkout,
        }
    })
}
</script>

<style lang="scss" scoped>
@use 'insert-many';
</style>
