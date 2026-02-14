<template>
    <el-dialog
        v-model="scopeThis.print.print0.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.print.print0.popup.title"
        :width="scopeThis.print.print0.popup.width"
        :destroy-on-close="true"
    >
        <div style="text-align: right">
            <el-button-group>
                <el-button
                    size="small"
                    class="button"
                    round
                    @click="print('print0Content')"
                    icon="Printer"
                >打印</el-button>
            </el-button-group>
        </div>

        <div id="print0Content">
            <div style="font-size: large; margin-left: 60px">
                {{ '【' + scopeThis.business.objBusiness.hotel_name + ' - 离店结算单】' }}
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
                    states.blindboxes.dateFormat.dateFormat(scopeThis.business.objBusiness.checkin) + ' - ' +
                    states.blindboxes.dateFormat.dateFormat(scopeThis.business.objBusiness.checkout)
                }}</span>
            </div>

            <div>{{ '-'.repeat(100) }}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;计费合计：{{
                    Math.floor(scopeThis.business.objBusiness.amount
                        ? scopeThis.business.objBusiness.amount : 0) / 100
                }}</span>
                <span>&nbsp;||&nbsp;房租：{{
                    Math.floor(scopeThis.business.objBusiness.amount_b_goods
                        ? scopeThis.business.objBusiness.amount_b_goods : 0) / 100
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;配售：{{
                    Math.floor(scopeThis.business.objBusiness.amount_b_goods0
                        ? scopeThis.business.objBusiness.amount_b_goods0 : 0) / 100
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;损赔：{{
                    Math.floor(scopeThis.business.objBusiness.amount_b_goods1
                        ? scopeThis.business.objBusiness.amount_b_goods1 : 0) / 100
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;挂账：{{
                    Math.floor(scopeThis.business.objBusiness.amount_bill
                        ? scopeThis.business.objBusiness.amount_bill : 0) / 100
                }}</span>
            </div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;核收：{{
                    Math.floor(scopeThis.business.objBusiness.deal
                        ? scopeThis.business.objBusiness.deal : 0) / 100
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;已收款：{{
                    Math.floor(scopeThis.business.objBusiness.money
                        ? scopeThis.business.objBusiness.money : 0) / 100
                }}</span>
            </div>

            <div>{{ '-'.repeat(100) }}</div>
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
import {blindboxes} from 'packages/ly0utils'
import { reactive } from 'vue'

const props = defineProps(['scopeThis'])
const states = reactive({
    blindboxes
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
