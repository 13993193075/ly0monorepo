<template><div>
    <el-dialog
            v-model="scopeThis.smallticket.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="打印小票"
            :width="'600px'"
    >
        <el-divider content-position="center" class="title-line"><span class="title-font">{{arrPrinter.length>0?"选择打印机":"没有打印机"}}</span>
        </el-divider>
        <div v-for="(item,index) in arrPrinter" :key="index">
            <el-checkbox v-model="item.checked" style="margin-bottom:20px;">{{item.note}}</el-checkbox>
        </div>

        <div class="line"></div>
        <el-row class="submit-row">
            <el-button type="success" round @click="print">打印</el-button>
        </el-row>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
    .title-line {
        margin-bottom: 35px;
    }

    .title-font {
        font-size: large;
        color: #828282;
    }

    .line {
        height: 1px;
        background-color: #bdbdbd;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .submit-row {
        text-align: center;
    }
</style>

<script setup>
    import {request as ly0request} from "@yoooloo42/ly0browser"
    import {ref, watch} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    
    const props = defineProps(["scopeThis"])
    
    let arrPrinter = ref([])
    
    async function print(){
        try{
            await ElMessageBox.confirm('打印?', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            })
            const arrPrinter0 = arrPrinter.value.filter(i => {
                return i.checked
            })
            if (arrPrinter0.length === 0) {
                return this.ElMessage({
                    type: 'info',
                    message: '未选择打印机'
                })
            }
            const result = await ly0request.ly0.storpro({
                storproName: "ly0d7.smallticket.print",
                data: {
                    id_business: this.scopeThis.business.objBusiness._id, // 订单 ID
                    arrPrinter0
                }
            })
            ElMessage(result.message)
            props.scopeThis.smallticket.popup.visible = false
        }catch(err){
            ElMessage({type: 'info', message: '取消打印'})
        }
    }
    watch (()=>props.scopeThis.smallticket.popup.visible, async (valNew, oldVal) => {
        if (valNew) {
            const result = await ly0request.ly0.storpro({
                scopeThis: this,
                storproName: "ly0d7.smallticket.getPrinters",
                data: {
                    id_business: this.scopeThis.business.objBusiness._id
                }
            })
            const arrPrinter0 = result.arrPrinter;
            arrPrinter0.forEach(i => {
                i.checked = false
            })
            arrPrinter.value = arrPrinter0
        }
    })
</script>
