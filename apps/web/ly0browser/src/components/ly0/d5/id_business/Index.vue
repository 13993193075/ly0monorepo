<template>
  <div v-if="!!business">
    <compMenu :scopeThis="scopeThis0" :menuProps="menuProps.getMenuProps(scopeThis0)"></compMenu>
    <div class="main-box">
      <div class="left-box">
        <el-collapse v-model="collapseOpen_left">
          <el-collapse-item title="订单基本信息" name="info">
            <compInfo
              :scopeThis="scopeThis0"
              :key="forceRefresh.all + forceRefresh.info"
            ></compInfo>
          </el-collapse-item>
          <el-collapse-item title="餐位信息" name="bTable">
            <compBTable :scopeThis="scopeThis0" :key="forceRefresh.all"></compBTable>
          </el-collapse-item>
          <el-collapse-item title="配售" name="bGoods0">
            <compBGoods0 :scopeThis="scopeThis0" :key="forceRefresh.all"></compBGoods0>
          </el-collapse-item>
          <el-collapse-item title="备忘" name="memo">
            <compMemo :scopeThis="scopeThis0" :key="forceRefresh.all"></compMemo>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right-box">
        <el-collapse v-model="collapseOpen_right">
          <el-collapse-item title="计费信息" name="amount">
            <compAmount
              :scopeThis="scopeThis0"
              :key="forceRefresh.all + forceRefresh.amount"
            ></compAmount>
          </el-collapse-item>
          <el-collapse-item title="菜品" name="bGoods">
            <compBGoods :scopeThis="scopeThis0" :key="forceRefresh.all"></compBGoods>
          </el-collapse-item>
          <el-collapse-item title="损赔" name="bGoods1">
            <compBGoods1 :scopeThis="scopeThis0" :key="forceRefresh.all"></compBGoods1>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <compFormUpdate
      :scopeThis="scopeThis0"
      :formProps="update.formProps"
      :dataBox="update.dataBox"
    ></compFormUpdate>
    <compFormDeal
      :scopeThis="scopeThis0"
      :formProps="deal.formProps"
      :dataBox="deal.dataBox"
    ></compFormDeal>
    <compPayment
      v-if="!!payment.id_business"
      :scopeThis="scopeThis0"
      :myProps="payment"
      :key="forceRefresh.all + forceRefresh.payment"
    ></compPayment>
    <compPrint :scopeThis="scopeThis0"></compPrint>
    <compSmallticket :scopeThis="scopeThis0"></compSmallticket>
  </div>
</template>

<style scoped>
@use './index.scss';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
import compMenu from '../../../common/menu/index.vue'
import menuProps from './menu-props.js'
import compForm from '../../../common/form/index.vue'
import update from './update.js'
import deal from './deal.js'
import compPayment from '../../../../../../joker/src/ly0d2businessSide/Index.vue'
import compInfo from './Info.vue'
import compAmount from './Amount.vue'
import compBTable from '../b_table/Index.vue'
import compBGoods from '../b_goods/Index.vue'
import compBGoods0 from '../b_goods0/Index.vue'
import compBGoods1 from '../b_goods1/index.vue'
import compMemo from '../memo/Index.vue'
import compPrint from './Print.vue'
import compSmallticket from './Smallticket.vue'

export default {
  props: ['scopeThis', 'myProps'],
  components: {
    compMenu,
    compFormUpdate: compForm,
    compFormDeal: compForm,
    compPayment,
    compInfo,
    compAmount,
    compBTable,
    compBGoods,
    compBGoods0,
    compBGoods1,
    compMemo,
    compPrint,
    compSmallticket,
  },
  data() {
    return {
      scopeThis0: this,
      forceRefresh: {
        all: 0,
        payment: 0,
        info: 0,
        amount: 0,
        bGoods: 0,
      },
      business: null, // 订单全部信息
      update, // 修改订单基本信息
      deal, // 账目处理 - 核收
      menuProps, // 菜单属性
      collapseOpen_left: ['info', 'bTable'], // 自动打开订单基本信息
      collapseOpen_right: ['amount'], // 自动打开计费信息、用餐房号
      payment: {
        id_business: null,
        businesstype_code: 'ly0d5business',
        deal: 0,
        wx_appid: '',
        wx_mchid: '',
        popup: {
          visible: false,
        },
        readOnly: false,
      },
      print: {
        popup: {
          visible: false,
        },
      },
      smallticket: {
        popup: {
          visible: false,
        },
      },
    }
  },
  computed: {
    id_business() {
      if (!!this.myProps.id_business) {
        this.init() // 初始化
      }
    },
  },
  watch: {
    // 激活 computed 响应
    id_business(valNew, valOld) {},
  },
  methods: {
    init() {
      return new Promise((resolve) => {
        // 获取订单全部信息
        dataRequest
          .storpro({
            scopeThis: this,
            storproName: 'ly0d5.business.findOne',
            data: { _id: this.myProps.id_business },
          })
          .then((result) => {
            this.business = result.business
            resolve()
          })
      })
    },
  },
}
</script>
