<template>
    <!-- label-box -->
    <div :style="style.box" @click="hdlClick">
        <span :style="style.label">
            {{propsItem_box.label}}
        </span>
    </div>
</template>

<script setup>
import {ref} from "vue";
import styleModule from './style.js'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    },
    item: {
        type: Object,
        default: () => ({})
    }
})

// props属性包装，使得页面和js使用相同的命名
let formData_box = props.modelValue
const formProps_box = props.myProps
const scopeThis_box = props.scopeThis
const propsItem_box = props.item

const style = ref({
    box: styleModule.label.box(propsItem_box),
    label: styleModule.label.label(propsItem_box),
})

const hdlClick = () => {
    if(propsItem_box.hdlLabelClick){
        propsItem_box.hdlLabelClick({formData: formData_box, formProps: formProps_box, scopeThis: scopeThis_box});
    }
}
</script>

<style scoped lang="scss">

</style>