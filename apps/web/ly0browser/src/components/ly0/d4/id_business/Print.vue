<template>
    <el-dialog
        v-model="scopeThis.print.print.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.print.print.popup.title"
        :width="scopeThis.print.print.popup.width"
        :destroy-on-close="true"
    >
        <div style="text-align: right">
            <el-button-group>
                <el-button
                    size="small"
                    class="button"
                    round
                    @click="print('printContent')"
                    icon="Printer"
                >打印</el-button>
            </el-button-group>
        </div>

        <div id="printContent">
            <div style="font-size: large; margin-left: 60px">
                {{ '【' + scopeThis.business.objBusiness.hotel_name + ' - 订单详细】' }}
            </div>
            <br />

            <div>{{ '-'.repeat(148) }}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{ scopeThis.business.objBusiness._id }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单手机号：{{ scopeThis.business.objBusiness.cellphone }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单状态：{{ scopeThis.business.objBusiness.status_text }}</span>
            </div>

            <div>{{ '-'.repeat(148) }}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;入住人数：{{ scopeThis.business.objBusiness.peoples }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;所需客房数：{{ scopeThis.business.objBusiness.rooms }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;入住时间：{{
                    states.blindboxes.dateFormat.dateFormat(scopeThis.business.objBusiness.checkin)
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;离开时间：{{
                    states.blindboxes.dateFormat.dateFormat(scopeThis.business.objBusiness.checkout)
                }}</span>
            </div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;客户手机号：{{
                    scopeThis.business.objBusiness.client_cellphone
                }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称：{{ scopeThis.business.objBusiness.client_name }}</span>
            </div>

            <div>{{ '-'.repeat(148) }}</div>
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

            <div v-if="scopeThis.business.arrBGoods && scopeThis.business.arrBGoods.length > 0">
                <div>{{ '-'.repeat(148) }}</div>
                <table style="width: 100%"><tbody>
                <tr>
                    <td>姓名</td>
                    <td>房号</td>
                    <td>单价</td>
                    <td>入住时间</td>
                </tr>
                <tr
                    v-for="(item, index) in scopeThis.business.arrBGoods"
                    :key="item._id + '-' + index + scopeThis.business.arrBGoods.length"
                >
                    <td>{{ item.guestNames }}</td>
                    <td>{{ item.roomno }}</td>
                    <td>
                        {{ Math.floor(item.price) / 100 + '(' +
                            item.method_text + ',' +
                            (item.price_name ? item.price_name : '') + ')'
                        }}
                    </td>
                    <td>
                        {{
                            states.blindboxes.dateFormat.dateFormat(item.checkin) + ' - ' +
                            states.blindboxes.dateFormat.dateFormat(item.checkout)
                        }}
                    </td>
                </tr>
                </tbody></table>
            </div>

            <div v-if="scopeThis.business.arrBGoods0 && scopeThis.business.arrBGoods0.length > 0">
                <div>{{ '-'.repeat(148) }}</div>
                <table style="width: 50%"><tbody>
                <tr>
                    <td>配售商品名称</td>
                    <td>单价</td>
                    <td>数量</td>
                </tr>
                <tr
                    v-for="(item, index) in scopeThis.business.arrBGoods0"
                    :key="item._id + '-' + index + scopeThis.business.arrBGoods0.length"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ Math.floor(item.price) / 100 }}</td>
                    <td>{{ item.count }}</td>
                </tr>
                </tbody></table>
            </div>

            <div v-if="scopeThis.business.arrBGoods1 && scopeThis.business.arrBGoods1.length > 0">
                <div>{{ '-'.repeat(148) }}</div>
                <table style="width: 50%"><tbody>
                <tr>
                    <td>损赔物品名称</td>
                    <td>单价</td>
                    <td>数量</td>
                </tr>
                <tr
                    v-for="(item, index) in scopeThis.business.arrBGoods1"
                    :key="item._id + '-' + index + scopeThis.business.arrBGoods1.length"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ Math.floor(item.price) / 100 }}</td>
                    <td>{{ item.count }}</td>
                </tr>
                </tbody></table>
            </div>

            <div v-if="scopeThis.business.arrBill && scopeThis.business.arrBill.length > 0">
                <div>{{ '-'.repeat(148) }}</div>
                <table style="width: 100%"><tbody>
                <tr>
                    <td>挂账金额</td>
                    <td>备注</td>
                </tr>
                <tr
                    v-for="(item, index) in scopeThis.business.arrBill"
                    :key="item._id + '-' + index + scopeThis.business.arrBill.length"
                >
                    <td style="width: 100px">{{ Math.floor(item.amount) / 100 }}</td>
                    <td>{{ item.note }}</td>
                </tr>
                </tbody></table>
            </div>

            <div v-if="scopeThis.business.arrMemo && scopeThis.business.arrMemo.length > 0">
                <div>{{ '-'.repeat(148) }}</div>
                <table style="width: 100%"><tbody>
                <tr>
                    <td>备忘信息</td>
                    <td>记录时间</td>
                </tr>
                <tr
                    v-for="(item, index) in scopeThis.business.arrMemo"
                    :key="item._id + '-' + index + scopeThis.business.arrMemo.length"
                >
                    <td>{{ item.memo }}</td>
                    <td style="width: 200px">{{ states.blindboxes.dateFormat.dateFormat(item.time) }}</td>
                </tr>
                </tbody></table>
            </div>

            <div>{{ '-'.repeat(148) }}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;签字确认：</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>{{ '-'.repeat(148) }}</div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.button {
    border-color: #009688;
    color: #009688;
}

.table-td {
    margin-left: 80px;
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
