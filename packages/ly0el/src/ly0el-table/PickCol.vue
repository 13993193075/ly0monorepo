<template><div>
    <el-dialog
        v-model="tableProps_box.table.pickCol.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        title="选择列"
        width="400px"
    >
        <el-checkbox
            v-model="checkedAll"
            :indeterminate="isIndeterminate"
            @change="hdl.checkedAll"
        >全选</el-checkbox>
        <div :style="style.line"></div>
        <el-checkbox-group
            v-model="itemsChecked"
            @change="hdl.checkedItemsChange"
        >
            <el-checkbox
                v-for="(item, index) in tableProps_box.table.pickCol.colsInit"
                :label="item.key"
                :key="index"
                style="display:block; margin-bottom:10px"
            >{{item.label}}
            </el-checkbox>
        </el-checkbox-group>

        <div :style="style.line"></div>
        <div style="text-align: center;">
            <el-button type="success" round @click="hdl.confirm">确认</el-button>
        </div>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
</style>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    tableProps: {
        type: Object,
        default: () => ({})
    }
})
// props属性包装，继承了顶层组件的响应性，页面和js可以使用相同的命名
const tableProps_box = props.tableProps

let checkedAll = ref(false) // 是否全选状态
let isIndeterminate = ref(false) // 不确定状态：非全选、非全空
let itemsChecked = ref([]) // 已选中条目
let itemsAll = ref([]) // 全部条目

const hdl = {
    // 获取键值数组
    getItems(p) {
        let a = []
        p.forEach((item, index) => {
            a.push(item.key)
        })
        return a
    },
    // 全选
    checkedAll(val) {
        itemsChecked.value = []
        if (val) {
            itemsChecked.value.push(...itemsAll.value)
        }
        if(itemsChecked.value.length > 0 && itemsChecked.value.length === itemsAll.value.length){
            checkedAll.value = true
            isIndeterminate.value = false
        }else if(itemsChecked.value.length > 0 && itemsChecked.value.length !== itemsAll.value.length){
            checkedAll.value = false
            isIndeterminate.value = true
        }else if(itemsChecked.value.length === 0){
            checkedAll.value = false
            isIndeterminate.value = false
        }
    },
    // 选中或取消某一条
    checkedItemsChange(val) {
        if(val.length > 0 && val.length === itemsAll.value.length){
            checkedAll.value = true
            isIndeterminate.value = false
            return
        }
        if(val.length > 0 && val.length !== itemsAll.value.length){
            checkedAll.value = false
            isIndeterminate.value = true
            return
        }
        if(val.length === 0){
            checkedAll.value = false
            isIndeterminate.value = false
        }
    },
    confirm() { // 确认提交
        tableProps_box.table.cols = []
        itemsChecked.value.forEach((item, index) => {
            tableProps_box.table.cols.push(tableProps_box.table.pickCol.colsInit.find((item0, index0) => {
                return item === '' + item0.key
            }))
        })
        tableProps_box.table.pickCol.popup.visible = false
    }
}

// 窗口弹出监听
watch(
    () => tableProps_box.table.pickCol.popup.visible,
    (newVal, oldVal) => {
        if (newVal) {
            itemsAll.value = hdl.getItems(tableProps_box.table.pickCol.colsInit)
            itemsChecked.value = hdl.getItems(tableProps_box.table.cols)
            if(itemsChecked.value.length > 0 && itemsChecked.value.length === itemsAll.value.length){
                checkedAll.value = true
                isIndeterminate.value = false
            }else if(itemsChecked.value.length > 0 && itemsChecked.value.length !== itemsAll.value.length){
                checkedAll.value = false
                isIndeterminate.value = true
            }else if(itemsChecked.value.length === 0){
                checkedAll.value = false
                isIndeterminate.value = false
            }
        }
    }
)

const style = {
    line: {
        height: '1px',
        'background-color': '#bdbdbd',
        'margin-top': '10px',
        'margin-bottom': '10px'
    }
}
</script>
