<template>
    <el-dialog
        v-model="scopeThis.print.print1.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.print.print1.popup.title"
        :width="scopeThis.print.print1.popup.width"
        :destroy-on-close="true"
    >
        <div style="text-align: right">
            <el-button-group>
                <el-button
                    size="small"
                    class="button"
                    round
                    @click="print('print1Content')"
                    icon="Printer"
                >打印</el-button>
            </el-button-group>
        </div>

        <div id="print1Content">
            <div style="font-size: large; margin-left: 60px">
                {{ '【' + scopeThis.business.objBusiness.hotel_name + ' - 抵店登记单】' }}
            </div>
            <br />

            <div>{{ '-'.repeat(100) }}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{ scopeThis.business.objBusiness._id }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单手机号：{{ scopeThis.business.objBusiness.cellphone }}</span>
            </div>

            <div>{{ '-'.repeat(100) }}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;入住人数：{{ scopeThis.business.objBusiness.peoples }}</span>
                <span v-if="scopeThis.business.arrBGoods && scopeThis.business.arrBGoods.length > 0">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;房数：{{ scopeThis.business.arrBGoods.length }}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;房号：{{ scopeThis.business.arrBGoods[0].roomno }}</span>
                </span>
            </div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;入住时间：{{
                    states.ly0utils.dateFormat.dateFormat(scopeThis.business.objBusiness.checkin) + ' - ' +
                    states.ly0utils.dateFormat.dateFormat(scopeThis.business.objBusiness.checkout)
                }}</span>
            </div>

            <div>{{ '-'.repeat(100) }}</div>
            <div style="margin-top: 20px">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;押金：{{ '_'.repeat(20) }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;旅客签字：{{ '_'.repeat(50) }}</span>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.button {
    border-color: #009688;
    color: #009688;
}
</style>

<script setup>
import printJS from 'print-js'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import { reactive } from 'vue'

const props = defineProps(['scopeThis'])
const states = reactive({
    ly0utils
})

function print (elId) {
    printJS({
        printable: elId,
        type: 'html',
        scanStyles: false,
        style: 'table { border-collapse: collapse }',
    })
}
</script>
