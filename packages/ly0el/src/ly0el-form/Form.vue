<template>
    <!-- 置顶菜单 -->
    <ly0el-menu v-if="formProps_box.menu && formProps_box.menu.menu && formProps_box.menu.menu.length > 0" :myProps="formProps_box.menu" :scopeThis="scopeThis"></ly0el-menu>
    <!-- 表单区域可以分为多个列 -->
    <div :style="style.root_box">
        <div v-for="(item, index) in formProps_box.cols" :key="index">
            <table>
                <tbody>
                    <template v-for="(item0, index0) in item.items" :key="index0">
                        <tr v-if="item0.hdlVisible ? item0.hdlVisible({formData: formData_box, scopeThis: scopeThis_box}) : true">
                            <td :style="style.field_box.left" v-if="!!item0.label">
                                <compLabelBox v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box" :item="item0"></compLabelBox>
                            </td>
                            <td :style="style.field_box.right" :colspan="style.no_field_label(item0)">
                                <el-collapse
                                    v-if="item0.inputType === 'collapse'"
                                    :accordion="
                                        'accordion' in item0 &&
                                        (item0.accordion === true || item0.accordion === 'true')
                                    "
                                    v-model="item0.activeNames"
                                    :style="style.collapse.style"
                                    @change="activeNames=>{hdl.collapseChange({activeNames, item: item0})}"
                                >
                                    <template v-for="(item1, index1) in item0.items" :key="index1">
                                        <el-collapse-item
                                            v-if="item1.hdlVisible ? item1.hdlVisible({formData: formData_box, scopeThis: scopeThis_box}) : true"
                                            :title="item1.title"
                                            :name="item1.name ? item1.name : index1"
                                        >
                                            <table :style="style.collapse.table">
                                                <template v-for="(item2, index2) in item1.items" :key="index2">
                                                    <tr
                                                        v-if="
                                                            item2.hdlVisible
                                                            ? item2.hdlVisible({formData: formData_box, scopeThis: scopeThis_box})
                                                            : true
                                                        "
                                                    >
                                                        <td :style="style.field_box.left" v-if="item2.label">
                                                            <compLabelBox v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box" :item="item2"></compLabelBox>
                                                        </td>
                                                        <td
                                                            :style="style.field_box.right"
                                                            :colspan="style.no_field_label(item2)"
                                                        >
                                                            <compInputBox v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box" :item="item2"></compInputBox>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </table>
                                        </el-collapse-item>
                                    </template>
                                </el-collapse>
                                <compInputBox v-model="formData_box" :myProps="formProps_box" :scopeThis="scopeThis_box" :item="item0"></compInputBox>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
      </div>
    </div>

    <!-- 提交 -->
    <template v-if="formProps_box.submit.switch">
        <div :style="style.line"></div>
        <div :style="style.submit_box.style">
            <el-button
                :type="style.submit_box.button.facade.type"
                :plain="style.submit_box.button.facade.plain"
                :style="style.submit_box.button.style"
                @click="hdl.submit"
            >提交</el-button>
        </div>
    </template>
</template>

<script setup>
import {reactive} from "vue";
import compLabelBox from './LabelBox.vue'
import compInputBox from './InputBox.vue'
import ly0elMenu from "../ly0el-menu/Index.vue";
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
    }
})

// props属性包装，继承了顶层组件的响应性，页面和js可以使用相同的命名
let formData_box = props.modelValue
const formProps_box = props.myProps
const scopeThis_box = props.scopeThis

const style = reactive({
    collapse: styleModule.collapse,
    field_box: styleModule.field_box,
    line: styleModule.line,
    no_field_label: styleModule.no_field_label,
    root_box: styleModule.root_box,
    submit_box: styleModule.submit_box
})

const hdl = {
    async submit(){
        if(formProps_box.submit.handle){
            // 执行用户句柄
            await formProps_box.submit.handle({
                formData: formData_box,
                formProps: formProps_box,
                scopeThis: scopeThis_box
            })
        }
    },
    collapseChange({activeNames, item}){
        if(item.hdlChange){
            item.hdlChange(activeNames)
        }
    }
}
</script>

<style lang="scss" scoped></style>
