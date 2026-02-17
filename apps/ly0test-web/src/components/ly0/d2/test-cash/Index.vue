<template>
    <div class="container">
        <el-divider class="title-line" content-position="left">
            <span class="label">收银（交易端 - 测试 - 接入参数）</span>
        </el-divider>

        <div class="para-box">
            <div class="para">
                <ly0el-form
                    v-model="scopeThis.para.formData"
                    :myProps="scopeThis.para.formProps"
                    :scopeThis="scopeThis"
                ></ly0el-form>
            </div>
        </div>

        <ly0d2cash
            v-model="scopeThis.test.formData"
            :myProps="scopeThis.test.formProps"
        ></ly0d2cash>
    </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import { reactive, onMounted } from 'vue'
import { request as ly0request } from '@yoooloo42/ly0browser'
import para from './para.js'
import test from './test.js'

const scopeThis = reactive({
    para,
    test
})

onMounted(() => {
    ly0request.ly0.storpro({
        storproName: 'ly0d2.record0.getPgData',
        data: null,
    }).then(result => {
        scopeThis.para.pgData.arrBusinessType = result.data.arrBusinessType
    })
})
</script>
