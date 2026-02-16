<template>
    <div style="padding: 10px;">
        <ly0el-form
            v-model="formData"
            :myProps="formProps"
        ></ly0el-form>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import formDataModule from './data.js'
import propsModule from './props.js'

let formData = reactive(formDataModule)
const formProps = reactive(propsModule)

// 表单数据监听
watch(
    formData,
    (newVal, oldVal) => {
        console.log('表单数据监听：', newVal);
    },
    {
        deep: true, // 深层监听
    }
)

</script>

<style scoped></style>
