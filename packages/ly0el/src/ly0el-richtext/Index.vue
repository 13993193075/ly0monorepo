<template>
    <div>
        <QuillEditor
            ref="quillEditor"
            :content="modelValue"
            :options="editorOptions"
            :theme="theme"
            contentType="html"
            @update:content="handleContentUpdate"
        />
    </div>
</template>
<script setup>
import {ref, computed, reactive} from "vue";
import { request as ly0request } from '@yoooloo42/ly0browser'
// 引入quill富文本组件
import { QuillEditor } from '@vueup/vue-quill'
/* 以下quill富文本组件的样式库需要在宿主项目的main.js中引入
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css' // snow主题
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
*/

const props = defineProps({
    // v-model 对应的 prop
    modelValue: {
        type: String,
        default: '',
    },
    myProps: {
        type: Object,
        default: () => ({}),
    }
})
const emit = defineEmits(['update:modelValue'])

// 文件上传地址
const uploadUrl = props.myProps.uploadUrl || ly0request.ly0.upload()
// 指定上传文件的参数名称(Field Name)
const uploadFieldName = props.myProps.uploadFieldName || "upload_file"
// 限制文件上传的最大大小，默认5MB
const maxSize = props.myProps.maxSize || 1024 * 5
const theme = props.myProps.theme || "snow" // 默认snow主题
const customOptions = reactive(props.myProps.customOptions || {})

const quillEditor = ref(null)

// 自定义图片上传处理函数
const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/jpg')
    input.click()
    
    input.onchange = async () => {
        const file = input.files[0]
        if (!file) return
        
        // 检查文件大小
        if (file.size / 1024 > maxSize.value) {
            alert(`图片大小不能超过 ${maxSize} KB`)
            return
        }
        
        // 获取 Quill 实例
        const quill = quillEditor.value.getQuill()
        // 记录当前光标位置
        const length = quill.getSelection().index
        
        // 插入一个占位符，例如加载中的图片或文字
        quill.insertEmbed(length, 'image', 'uploading...')
        
        const formData = new FormData()
        formData.append(uploadFieldName.value, file)
        
        try {
            // ⚠️ 模拟/替换为你真实的上传逻辑 (例如使用 axios 或 fetch)
            // 注意：这里需要你处理好响应，确保返回图片 URL
            
            // 假设使用 fetch
            const response = await ly0request.ly0.request({
                uploadUrl: uploadUrl ? uploadUrl : ly0request.ly0.domain() + ly0request.ly0.upload(),
                data: formData
            })
            
            const result = await response.json()
            // 假设上传成功后，服务器返回的数据结构是 { url: '图片URL' }
            let imageUrl = ''
            if(result.code === 0){
                imageUrl = result.data.src
            }
            
            // 📢 插入图片
            // 1. 删除占位符
            quill.deleteText(length, 'uploading...'.length)
            // 2. 插入真实的图片链接
            quill.insertEmbed(length, 'image', imageUrl)
            // 3. 移动光标到图片后
            quill.setSelection(length + 1)
        } catch (error) {
            console.error('图片上传失败:', error)
            // 上传失败，删除占位符
            quill.deleteText(length, 'uploading...'.length)
            alert('图片上传失败')
        }
    }
}

// 富文本编辑器的配置
const editorOptions = computed(() => {
    return {
        placeholder: '请输入内容...',
        modules: {
            toolbar: {
                // 📢 自定义 Toolbar 并绑定 imageHandler
                container: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'], // 'image' 会触发 handler
                    ['clean']
                ],
                handlers: {
                    'image': imageHandler // 绑定自定义的图片处理函数
                }
            }
        },
        ...customOptions // 允许用户覆盖默认选项
    }
})

// 处理富文本内容更新，同步到 v-model
const handleContentUpdate = (content) => {
    emit('update:modelValue', content)
}
</script>

<style scoped lang="scss">
</style>