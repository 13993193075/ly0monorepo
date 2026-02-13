<template>
    <el-upload
            :action="myProps_box.uploadUrl"
            v-model:file-list="fileList_box"
            list-type="picture"
            :before-upload="hdl.beforeUpload"
            :on-preview="hdl.preview"
            :on-remove="hdl.remove"
            :on-success="hdl.success"
            :limit="myProps_box.limit"
    >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">&nbsp;{{myProps_box.tip || "可以上传" + myProps_box.limit + "个图片"}}</div>
        </template>
    </el-upload>
    <div v-if="fileList_box.length>0" style="font-size:xx-small">{{"已上传"+fileList_box.length+"个图片"}}</div>
    <el-button v-if="fileList_box.length>0" size="small" style="margin-top:10px;" @click="hdl.deleteAll">删除全部已上传图片</el-button>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {reactive, ref} from "vue";
import { ElMessage } from 'element-plus';
import ly0default from './default.js'
import {blindboxes} from '@yoooloo42/blindboxes'

// 遵循 Vue 3 v-model 规范，使用 modelValue
const props = defineProps({
    // modelValue: 外部 v-model 绑定的值
    modelValue: {
        type: Array,
        default: () => []
    },
    myProps: {
        type: Object,
        default: () => ({})
    }
});
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['update:modelValue', 'change'])

const myProps_box = reactive(blindboxes.deepClone.deepMerge(
    blindboxes.deepClone.deepClone(ly0default.myProps),
    props.myProps
))
const fileList_box = ref([])
props.modelValue.forEach((item, index) => {
    fileList_box.value.push({
        name: item.substring(item.lastIndexOf('/') + 1) ?? 'Old_' + index,
        url: item,
        response: {
            data: {
                src: item
            }
        }
    })
})

const hdl = {
    beforeUpload (file) {
        const isFileType = !myProps_box.type || file.type === myProps_box.type
        const isFileSize = file.size / 1024 < myProps_box.size
        
        if (!isFileType) {
            ElMessage.error('上传文件的格式只能是 ' + myProps_box.type)
            return false
        }
        if (!isFileSize) {
            ElMessage.error('上传文件的大小不能超过 ' + myProps_box.size + ' KB')
            return false
        }
        ElMessage('正在上传 ...')
        return true
    },
    preview (file) { // 点击文件列表中已上传的文件时的钩子
    },
    remove (file, fileList) { // 文件列表移除文件时的钩子
        // 重置文件列表， 注意：通过使用splice保持响应性
        fileList_box.value.splice(0, fileList_box.value.length, ...JSON.parse(JSON.stringify(fileList)))
        const arr = []
        fileList_box.value.forEach(i=>{
            arr.push(i.response.data.src)
        })
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", arr)
    },
    success (response, file, fileList) { // 上传
        // 重置文件列表， 注意：通过使用splice保持响应性
        fileList_box.value.splice(0, fileList_box.value.length, ...JSON.parse(JSON.stringify(fileList)))
        if (response.code === 0) {
            const arr = []
            fileList_box.value.forEach(i=>{
                arr.push(i.response.data.src)
            })
            // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
            emit("update:modelValue", arr)
            
            ElMessage({type: 'info', message: '上传成功'})
        } else {
            ElMessage({type: 'error', message: '上传失败'})
        }
    },
    deleteAll () { // 删除全部已上传图片
        // 重置文件列表， 注意：通过使用splice保持响应性
        fileList_box.value.splice(0, fileList_box.value.length)
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", [])
    }
}
</script>
