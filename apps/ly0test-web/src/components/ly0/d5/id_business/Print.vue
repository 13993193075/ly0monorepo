<template>
  <el-dialog
    v-model="scopeThis.print.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    title="打印"
    :width="'980px'"
  >
    <div style="text-align: right">
      <el-button-group>
        <el-button
          size="mini"
          class="button"
          round
          @click="print('printContent')"
          icon="el-icon-printer"
          >打印</el-button
        >
      </el-button-group>
    </div>

    <div id="printContent">
      <div style="font-size: large; margin-left: 60px">
        {{ '【' + scopeThis.business.objBusiness.restaurant_name + ' - 订单详细】' }}
      </div>
      <br />

      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{ scopeThis.business.objBusiness._id }}</span>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;订单状态：{{ scopeThis.business.objBusiness.status_text }}</span
        >
      </div>

      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;用餐时间：{{
            dateFormat.dateFormat(scopeThis.business.objBusiness.time)
          }}</span
        >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;用餐人数：{{ scopeThis.business.objBusiness.peoples }}</span>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;客户手机号：{{
            scopeThis.business.objBusiness.client_cellphone
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;客户名称：{{ scopeThis.business.objBusiness.client_name }}</span
        >
      </div>

      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;计费合计：{{
            Math.floor(
              scopeThis.business.objBusiness.amount ? scopeThis.business.objBusiness.amount : 0,
            ) / 100
          }}</span
        >
        <span
          >&nbsp;||&nbsp;菜金：{{
            Math.floor(
              scopeThis.business.objBusiness.amount_goods
                ? scopeThis.business.objBusiness.amount_goods
                : 0,
            ) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;配售：{{
            Math.floor(
              scopeThis.business.objBusiness.amount_goods0
                ? scopeThis.business.objBusiness.amount_goods0
                : 0,
            ) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;损赔：{{
            Math.floor(
              scopeThis.business.objBusiness.amount_goods1
                ? scopeThis.business.objBusiness.amount_goods1
                : 0,
            ) / 100
          }}</span
        >
      </div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;实际核收：{{
            Math.floor(
              scopeThis.business.objBusiness.deal ? scopeThis.business.objBusiness.deal : 0,
            ) / 100
          }}</span
        >
      </div>

      <div v-if="scopeThis.business.arrBTable && scopeThis.business.arrBTable.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <div>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;餐位：</span>
          <span
            v-for="(item, index) in scopeThis.business.arrBTable"
            :key="item._id + '-' + index + scopeThis.business.arrBTable.length"
            ><span v-if="index > 0">&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ item.tableno }}</span
          >
        </div>
      </div>

      <div v-if="scopeThis.business.arrBGoods && scopeThis.business.arrBGoods.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <table><tbody>
          <tr>
            <td>菜品名称</td>
            <td :width="width_price_count">单价</td>
            <td :width="width_price_count">数量</td>
          </tr>
          <tr
            v-for="(item, index) in scopeThis.business.arrBGoods"
            :key="item._id + '-' + index + scopeThis.business.arrBGoods.length"
          >
            <td>{{ item.name }}</td>
            <td :width="width_price_count">{{ Math.floor(item.price) / 100 }}</td>
            <td :width="width_price_count">{{ item.count }}</td>
          </tr>
        </tbody></table>
      </div>

      <div v-if="scopeThis.business.arrBGoods0 && scopeThis.business.arrBGoods0.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <table><tbody>
          <tr>
            <td>配售商品名称</td>
            <td :width="width_price_count">单价</td>
            <td :width="width_price_count">数量</td>
          </tr>
          <tr
            v-for="(item, index) in scopeThis.business.arrBGoods0"
            :key="item._id + '-' + index + scopeThis.business.arrBGoods0.length"
          >
            <td>{{ item.name }}</td>
            <td :width="width_price_count">{{ Math.floor(item.price) / 100 }}</td>
            <td :width="width_price_count">{{ item.count }}</td>
          </tr>
        </tbody></table>
      </div>

      <div v-if="scopeThis.business.arrBGoods1 && scopeThis.business.arrBGoods1.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <table><tbody>
          <tr>
            <td>损赔物品名称</td>
            <td :width="width_price_count">单价</td>
            <td :width="width_price_count">数量</td>
          </tr>
          <tr
            v-for="(item, index) in scopeThis.business.arrBGoods1"
            :key="item._id + '-' + index + scopeThis.business.arrBGoods1.length"
          >
            <td>{{ item.name }}</td>
            <td :width="width_price_count">{{ Math.floor(item.price) / 100 }}</td>
            <td :width="width_price_count">{{ item.count }}</td>
          </tr>
        </tbody></table>
      </div>

      <div>{{ '-'.repeat(148) }}</div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.button {
  border-color: #009688;
  color: #009688;
}
</style>

<script>
import printJS from 'print-js'
import dateFormat from '../../../../utils/date-format.js'
export default {
  props: ['scopeThis'],
  data() {
    return {
      dateFormat,
      width_price_count: '15%',
    }
  },
  methods: {
    print: function (elId) {
      printJS({
        printable: elId,
        type: 'html',
        scanStyles: false,
        style: 'table { border-collapse: collapse }',
      })
    },
  },
}
</script>
