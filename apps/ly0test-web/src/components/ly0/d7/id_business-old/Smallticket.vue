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

<script>
    import dataRequest from "../../../../utils/data-request.js"
    export default {
        props: ["scopeThis"],
        data() {
            return {
                arrPrinter: []
            }
        },
        methods: {
            print() {
                this.$confirm('打印?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arrPrinter = this.arrPrinter.filter(i => {
                        return i.checked
                    })
                    if (arrPrinter.length === 0) {
                        return this.$message({
                            type: 'info',
                            message: '未选择打印机'
                        })
                    }
                    dataRequest.storpro({
                        scopeThis: this,
                        storproName: "ly0d7.smallticket.print",
                        data: {
                            id_business: this.scopeThis.business.objBusiness._id, // 订单 ID
                            arrPrinter
                        }
                    }).then(result => {
                        this.$message(result.message)
                        this.scopeThis.smallticket.popup.visible = false
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '取消打印'})
                })
            }
        },
        computed: {
            popup() {
                return this.scopeThis.smallticket.popup.visible
            }
        },
        watch: {
            popup(valNew, valOld) {
                if (valNew) {
                    dataRequest.storpro({
                        scopeThis: this,
                        storproName: "ly0d7.smallticket.getPrinters",
                        data: {
                            id_business: this.scopeThis.business.objBusiness._id
                        }
                    }).then(result => {
                        let arrPrinter = result.arrPrinter;
                        arrPrinter.forEach((item, index, arrThis) => {
                            item.checked = false
                        })
                        this.arrPrinter = arrPrinter
                    })
                }
            }
        }
    }
</script>
