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
          icon="Printer"
          >打印
        </el-button>
      </el-button-group>
    </div>

    <div id="printContent">
      <div style="text-align: center; font-size: large; width: 75%">
        {{ scopeThis.business.objProperty.unit_name + ' - 收费单' }}
      </div>
      <br />
      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;户号：{{ scopeThis.business.objProperty.number }}</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;户名：{{ scopeThis.business.objProperty.name }}</span>
      </div>

      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;收费单号：{{
            scopeThis.business.objProperty.id_business
              ? scopeThis.business.objProperty.id_business
              : '未制单'
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;制单时间：{{
            scopeThis.business.objBusiness.time
              ? dateFormat.dateFormat(scopeThis.business.objBusiness.time)
              : '未制单'
          }}</span
        >
      </div>

      <div>{{ '-'.repeat(148) }}</div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;服务类项目计费：{{
            Math.floor(scopeThis.business.objBusiness.amount_goods) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;资源类项目计费：{{
            Math.floor(scopeThis.business.objBusiness.amount_goods0) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;合计：{{
            Math.floor(scopeThis.business.objBusiness.amount) / 100
          }}</span
        >
      </div>
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;服务类项目核收：{{
            Math.floor(scopeThis.business.objBusiness.deal_goods) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;资源类项目核收：{{
            Math.floor(scopeThis.business.objBusiness.deal_goods0) / 100
          }}</span
        >
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;合计：{{
            Math.floor(scopeThis.business.objBusiness.deal) / 100
          }}</span
        >
      </div>

      <div v-if="scopeThis.business.arrBGoods && scopeThis.business.arrBGoods.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <table style="width: 75%"><tbody>
          <tr>
            <td style="width: 35%">服务类项目名称</td>
            <td :width="width_price_count">有效期</td>
            <td :width="width_price_count">单价/计费/核收</td>
          </tr>
          <tr
            v-for="(item, index) in scopeThis.business.arrBGoods"
            :key="item._id + '-' + index + scopeThis.business.arrBGoods.length"
          >
            <td>{{ item.goods_name }}</td>
            <td :width="width_price_count">
              {{
                dateFormat.dateFormat(item.from, 'yyyy/MM/dd') +
                ' - ' +
                dateFormat.dateFormat(item.to, 'yyyy/MM/dd')
              }}
            </td>
            <td :width="width_price_count">
              {{
                Math.floor(item.price) / 100 +
                '/' +
                Math.floor(item.amount) / 100 +
                '/' +
                Math.floor(item.deal) / 100
              }}
            </td>
          </tr>
        </tbody></table>
      </div>

      <div v-if="scopeThis.business.arrBGoods0 && scopeThis.business.arrBGoods0.length > 0">
        <div>{{ '-'.repeat(148) }}</div>
        <table style="width: 75%"><tbody>
          <tr>
            <td style="width: 35%">资源类项目名称</td>
            <td :width="width_price_count">数量</td>
            <td :width="width_price_count">单价/计费/核收</td>
          </tr>
          <tr
            v-for="(item, index) in scopeThis.business.arrBGoods0"
            :key="item._id + '-' + index + scopeThis.business.arrBGoods0.length"
          >
            <td>{{ item.goods_name }}</td>
            <td :width="width_price_count">{{ item.count }}</td>
            <td :width="width_price_count">
              {{
                Math.floor(item.price) / 100 +
                '/' +
                Math.floor(item.amount) / 100 +
                '/' +
                Math.floor(item.deal) / 100
              }}
            </td>
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

.margin-bottom {
  margin-bottom: 10px;
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
