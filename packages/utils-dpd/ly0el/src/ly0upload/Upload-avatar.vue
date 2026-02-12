<template>
    <el-upload
        class="avatar"
        :style="style.avatarBox"
        :action="myProps_box.uploadUrl"
        v-model:file-list="fileList_box"
        :show-file-list="false"
        :before-upload="hdl.beforeUpload"
        :on-preview="hdl.preview"
        :on-remove="hdl.remove"
        :on-success="hdl.success"
    >
        <img
            v-if="fileList_box.length>0 && fileList_box[0].response && fileList_box[0].response.data && fileList_box[0].response.data.src"
            :src="fileList_box[0].response.data.src"
            class="avatar"
            :style="style.avatarImage">
        <el-icon v-else class="avatar-uploader-icon" :style="style.avatarIcon"><Plus /></el-icon>
    </el-upload>
    <div v-if="fileList_box.length>0 && fileList_box[0].response && fileList_box[0].response.data && fileList_box[0].response.data.src">
        <el-button size="small" icon="el-icon-delete" style="margin-top:10px;" @click="hdl.deleteAll">删除</el-button>
    </div>
</template>

<style lang="scss" scoped>
    .avatar {
        border: 1px dashed #d9d9d9;
    }
    .avatar:hover {
        border-color: #409EFF;
    }
</style>

<script setup>
import {reactive, ref, watch} from "vue";
import { ElMessage } from 'element-plus';
import ly0default from "./default.js"
import {unclassified as LibsJsUnclass} from '@heartbeat-ly0/libs-js'

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

const myProps_box = reactive(LibsJsUnclass.deepClone.deepMerge(
    LibsJsUnclass.deepClone.deepClone(ly0default.myProps),
    props.myProps
))
let fileList_box = ref([])
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

const style = reactive({
    avatarBox: {
        width: myProps_box.avatar.width,
        height: myProps_box.avatar.height,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
    },
    avatarImage: {
        display: 'block',
        width: myProps_box.avatar.width,
        height: myProps_box.avatar.height,
    },
    avatarIcon: {
        display: 'block',
        width: myProps_box.avatar.width,
        height: myProps_box.avatar.height,
        "line-height": myProps_box.avatar.height,
        "font-size": "28px",
        color: "#8c939d",
        "text-align": "center"
    }
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
        // 因为只能上传一个图片，移除即清空
        fileList_box.value.splice(0, fileList_box.value.length)
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", [])
    },
    success (response, file, fileList) { // 上传
        // 重置文件列表， 注意：通过使用splice保持响应性
        // 只能上传一个图片
        fileList_box.value.splice(0, fileList_box.value.length, file)
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
    deleteAll () { // 删除全部已上传文件
        // 重置文件列表， 注意：通过使用splice保持响应性
        fileList_box.value.splice(0, fileList_box.value.length)
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", [])
    }
}
</script>
