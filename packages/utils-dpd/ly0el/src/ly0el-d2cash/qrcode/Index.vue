<template>
    <el-dialog
        v-model="myProps.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="myProps.popup.title"
        :width="'600px'"
        :before-close="handles.beforeClose"
    >
        <el-row class="qrcode-box">
            <div class="qrcode" id="qrcodejs2.ly0d2cash"></div>
            <div class="amount">{{ '金额：¥' + myProps.formData.amount }}</div>
        </el-row>

        <div class="line"></div>
        <el-row class="submit-box">
            <el-button type="success" round @click="handles.confirm">支付完成后，点击这里以确认</el-button>
        </el-row>
    </el-dialog>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import handles from './handles.js'
import myProps from './myProps.js'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => (myProps)
    }
})

const scopeThis = reactive({
    props: props.myProps,
    // 第二块屏幕 - 客户付费窗口
    winPayAnother: null,
    handles
})

onMounted(()=>{
    handles.init({scopeThis})
})
</script>
