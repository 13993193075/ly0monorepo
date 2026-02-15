<template>
    <el-dialog
        v-model="scopeThis.find.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        title="销售态势分析 - 查询"
        width="800px"
    >
        <div v-for="(item, index) in scopeThis.arrDate" :key="index" style="margin-bottom: 10px">
            <el-date-picker
                v-model="item.dateFrom"
                type="date"
                placeholder="选择时间"
                format="YYYY-M-D"
            ></el-date-picker>
            <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
            <el-date-picker
                v-model="item.dateTo"
                type="date"
                placeholder="选择时间"
                format="YYYY-M-D"
            ></el-date-picker>
        </div>
        <el-button-group>
            <el-button size="small" style="background-color: #009f95; color: #ffffff" @click="dateAppend">增加</el-button>
            <el-button size="small" style="background-color: #009f95; color: #ffffff" @click="dateReset">重置</el-button>
        </el-button-group>

        <div style="height: 1px; background-color: #cecece; margin-top: 20px; margin-bottom: 10px"></div>
        <div style="text-align: right; margin-top: 10px">
            <el-button type="danger" plain @click="submit">提交</el-button>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped></style>

<script setup>
import {ElMessage} from 'element-plus'
const props = defineProps(['scopeThis'])

// 增加
function dateAppend() {
    props.scopeThis.arrDate.push({
        dateFrom: null,
        dateTo: null,
    })
}
// 重置
function dateReset() {
    props.scopeThis.handles.dateReset({scopeThis: props.scopeThis})
}
// 提交
function submit() {
    props.scopeThis.arrDate = props.scopeThis.arrDate.filter(i => {
        return i.dateFrom && i.dateTo && i.dateFrom <= i.dateTo
    })
    props.scopeThis.hdlDatashow.dataShow({scopeThis: props.scopeThis})
    props.scopeThis.handles.collapseAll({scopeThis: props.scopeThis})
    ElMessage('已查询')
    props.scopeThis.find.popup.visible = false
}
</script>
