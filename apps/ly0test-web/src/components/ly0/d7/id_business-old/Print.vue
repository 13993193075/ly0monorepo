<template><div>
    <el-dialog
            v-model="scopeThis.print.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="打印"
            :width="'980px'"
    >
        <div style="text-align:right">
            <el-button-group>
                <el-button size="small" class="button" round @click="print('printContent')" icon="el-icon-printer">打印
                </el-button>
            </el-button-group>
        </div>

        <div id="printContent">
            <div style="text-align:center; font-size:large">{{scopeThis.business.objBusiness.shop_name}}</div>
            <br>
            <div>{{"-".repeat(148)}}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{scopeThis.business.objBusiness._id}}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;订单状态：{{scopeThis.business.objBusiness.status_text}}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;交易时间：{{dateFormat.dateFormat(scopeThis.business.objBusiness.time)}}</span>
            </div>

            <div>{{"-".repeat(148)}}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;客户手机号：{{scopeThis.business.objBusiness.client_cellphone}}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称：{{scopeThis.business.objBusiness.client_name}}</span>
            </div>

            <div>{{"-".repeat(148)}}</div>
            <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;计费：{{Math.floor(scopeThis.business.objBusiness.amount?scopeThis.business.objBusiness.amount:0)/100}}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;核收：{{Math.floor(scopeThis.business.objBusiness.deal?scopeThis.business.objBusiness.deal:0)/100}}</span>
            </div>

            <div v-if="scopeThis.business.arrBGoods && scopeThis.business.arrBGoods.length>0">
                <div>{{"-".repeat(148)}}</div>
                <table><tbody>
                    <tr>
                        <td>商品名称</td>
                        <td :width="width_price_count">单价</td>
                        <td :width="width_price_count">数量</td>
                    </tr>
                    <tr v-for="(item,index) in scopeThis.business.arrBGoods"
                        :key="item._id+'-'+index+scopeThis.business.arrBGoods.length">
                        <td>{{item.name}}</td>
                        <td :width="width_price_count">{{Math.floor(item.price)/100}}</td>
                        <td :width="width_price_count">{{item.count}}</td>
                    </tr>
                </tbody></table>
            </div>
            <div>{{"-".repeat(148)}}</div>
        </div>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
    .button {
        border-color: #009688;
        color: #009688;
    }

    .margin-bottom {
        margin-bottom: 10px;
    }
</style>

<script>
    import printJS from 'print-js'
    import dateFormat from "../../../../utils/date-format.js"

    export default {
        props: ["scopeThis"],
        data(){return {
            dateFormat,
            width_price_count: "15%"
        }},
        methods: {
            print: function (elId) {
                printJS({
                    printable: elId,
                    type: 'html',
                    scanStyles: false,
                    style: 'table { border-collapse: collapse }'
                })
            }
        }
    }
</script>
