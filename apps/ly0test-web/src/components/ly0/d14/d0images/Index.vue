<script setup>
import { reactive, onMounted } from 'vue'
import menu from './menu.js'
import newImage from './new-image.js'
import updateName from './update-name.js'
import handles from './handles.js'

const props = defineProps({
    root: {
        type: Object,
        default: () => ({
            id_d0: null
        })
    }
})

const scopeThis = reactive({
    root: props.root,
    menu,
    data: [],
    imagesShow: [], // 大图预览
    newImage,
    updateName,
    handles,
})

onMounted(() => {
    scopeThis.handles.init({scopeThis})
})
</script>

<template>
    <ly0Menu :myProps="scopeThis.menu" :scopeThis="scopeThis"></ly0Menu>
    <template v-for="(item, index) in scopeThis.data">
        <div class="image-item-box">
            <div class="image-box">
                <el-image
                    class="image"
                    :src="item.image[0]"
                    :preview-src-list="scopeThis.imagesShow"
                ></el-image>
            </div>
            <div class="name-box" @click="scopeThis.handles.updateNamePopup({scopeThis, item})">
                <span class="name">{{ item.name }}</span>
            </div>
            <div class="delete-box">
                <el-button
                    type="info"
                    size="default"
                    plain
                    circle
                    @click="handles.deleteImage({scopeThis, item})"
                >
                    <el-icon><Delete></Delete></el-icon>
                </el-button>
            </div>
        </div>
    </template>
    <ly0el-form
        v-if="scopeThis.newImage.formProps.popup.visible"
        v-model="scopeThis.newImage.formData"
        :myProps="scopeThis.newImage.formProps"
        :scopeThis="scopeThis"
    ></ly0el-form>
    <ly0el-form
        v-if="scopeThis.updateName.formProps.popup.visible"
        v-model="scopeThis.updateName.formData"
        :myProps="scopeThis.updateName.formProps"
        :scopeThis="scopeThis"
    ></ly0el-form>
</template>

<style scoped lang="scss">
.image-item-box {
    display: inline-block;
    margin: 20px;
    padding: 10px;
    background-color: #c5c5c5;
    .image-box {
        .image {
            width: 200px;
            height: 200px;
        }
    }
    .name-box {
        text-align: center;
        margin-top: 10px;
        .name {
            font-size: 14.5px;
        }
    }
    .delete-box {
        text-align: center;
        margin-top: 10px;
    }
}
</style>
