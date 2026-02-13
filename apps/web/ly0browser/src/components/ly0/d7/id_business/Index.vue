<template>
  <div v-if="!!business">
    <compMenu :scopeThis="scopeThis0" :menuProps="menuProps.getMenuProps(scopeThis0)"></compMenu>
    <div style="padding: 10px">
      <el-collapse v-model="collapseOpen">
        <el-collapse-item title="订单信息" name="info">
          <div style="text-align: center">
            <compInfo
              :scopeThis="scopeThis0"
              :key="forceRefresh.all + forceRefresh.info"
            ></compInfo>
            <compAmount
              :scopeThis="scopeThis0"
              :key="forceRefresh.all + forceRefresh.amount"
            ></compAmount>
          </div>
        </el-collapse-item>
        <el-collapse-item title="交易明细" name="bGoods">
          <compBGoods
            :scopeThis="scopeThis0"
            :key="forceRefresh.all + forceRefresh.bGoods"
          ></compBGoods>
        </el-collapse-item>
        <el-collapse-item title="备忘" name="memo">
          <compMemo :scopeThis="scopeThis0" :key="forceRefresh.all + forceRefresh.memo"></compMemo>
        </el-collapse-item>
      </el-collapse>
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
    <compScan :scopeThis="scopeThis0"></compScan>
    <compPrint :scopeThis="scopeThis0"></compPrint>
    <compSmallticket :scopeThis="scopeThis0"></compSmallticket>
  </div>
</template>

<style scoped></style>

<script>
import dataRequest from '../../../../utils/data-request.js'
import compMenu from '../../../common/menu/Index.vue'
import menuProps from './menu-props.js'
import compForm from '../../../common/form/Index.vue'
import update from './update.js'
import deal from './deal.js'
import compPayment from '@/components/ly0/d2/test-business-side/Index.vue'
import compScan from './Scan.vue'
import compInfo from './Info.vue'
import compAmount from './Amount.vue'
import compBGoods from '../b_goods/Index.vue'
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
    compScan,
    compInfo,
    compAmount,
    compBGoods,
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
        info: 1,
        amount: 2,
        bGoods: 3,
        memo: 4,
      },
      business: null, // 订单全部信息
      update, // 修改订单基本信息
      deal, // 账目处理 - 核收
      menuProps, // 菜单属性
      collapseOpen: ['info', 'bGoods'], // 自动打开订单基本信息、计费信息、交易明细
      payment: {
        id_business: null,
        businesstype_code: 'ly0d7business',
        deal: 0,
        wx_appid: '',
        wx_mchid: '',
        popup: {
          visible: false,
        },
        readOnly: false,
      },
      scan: {
        popup: {
          visible: false,
        },
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
            storproName: 'ly0d7.business.findOne',
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
