<template>
    <div class="container">
        <el-divider class="title-line" content-position="left">
            <span class="font">文件上传垃圾清理</span>
        </el-divider>
    <el-button class="button" @click="handleClear">立即清理</el-button>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import {request} from 'packages/ly0libs'
const ly0request = request.ly0

const handleClear = function () {
    ElMessageBox.confirm('立即清理, 确认?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        ly0request.storpro({
            storproName: 'ly0d0.upload-clear.clear',
            data: null,
        }).then(result => {
            ElMessage({
                type: 'success',
                message: result.message,
            })
        })
    }).catch(err => {
        ElMessage({
            type: 'info',
            message: '取消清理',
        })
    })
}
</script>
