<template><div>
    <el-dialog
            v-model="pickColProps.popup"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="选择列"
            width="400px"
    >
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="hdlCheckAllChange">全选</el-checkbox>
        <el-row style="height:1px; background-color:#bdbdbd; margin-top:10px; margin-bottom:10px;"></el-row>
        <el-checkbox-group v-model="itemsChecked" @change="hdlCheckedItemsChange">
            <el-checkbox style="display:block; margin-bottom:10px" v-for="item in pickColProps.colsInit"
                         :label="item ? item.key : ''" :key="item ? item.key : ''">{{item ? item.label : ''}}
            </el-checkbox>
        </el-checkbox-group>

        <el-row style="height:1px; background-color:#bdbdbd; margin-top:10px; margin-bottom:10px;"></el-row>
        <el-row style="text-align: center">
            <el-button type="success" round @click="hdlConfirm">确认</el-button>
        </el-row>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
</style>

<script>
    import ly0default from "./default"
    export default {
        props: ["scopeThis", "tableProps", "pickColProps"],
        data() {
            return {
                ly0default,
                checkAll: true, // 是否全选
                isIndeterminate: false, // 是否存在已选但未全选
                itemsChecked: [] // 选中的结果
            }
        },
        methods: {
            hdlGetKeys(p) { // 获取键值数组
                let a = []
                p.forEach(i => {
                    a.push(i.key)
                })
                return a
            },
            hdlCheckAllChange(val) { // 全选
                this.itemsChecked = val ? this.hdlGetKeys(this.pickColProps.colsInit) : []
                this.isIndeterminate = false
            },
            hdlCheckedItemsChange(val) { // 选中或取消某一条
                this.checkAll = val.length === this.pickColProps.colsInit.length
                this.isIndeterminate = val.length > 0 && val.length < this.pickColProps.colsInit.length
            },
            hdlConfirm() { // 确认提交
                this.tableProps.table.cols = []
                this.itemsChecked.forEach(i => {
                    this.tableProps.table.cols.push(this.pickColProps.colsInit.find(j => {
                        return j.key === i
                    }))
                })
                this.pickColProps.popup = false
            }
        },
        computed: {
            popup() {
                return this.pickColProps.popup
            }
        },
        watch: {
            popup: function (valNew, valOld) {
                if (valNew) {
                    this.checkAll = this.tableProps.table.cols.length === this.pickColProps.colsInit.length
                    this.isIndeterminate = this.tableProps.table.cols.length !== this.pickColProps.colsInit.length
                    this.itemsChecked = this.hdlGetKeys(this.tableProps.table.cols);
                }
            }
        }
    }
</script>
