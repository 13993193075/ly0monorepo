<template>
  <div v-if="!!business">
    <compMenu :scopeThis="scopeThis0" :menuProps="menuProps.getMenuProps(scopeThis0)"></compMenu>
    <div class="main-box">
      <div class="left-box">
        <el-collapse v-model="collapseOpen_left">
          <el-collapse-item title="物业信息" name="property">
            <compProperty :scopeThis="scopeThis0"></compProperty>
          </el-collapse-item>
          <el-collapse-item title="服务类收费项目" name="bGoods">
            <compBGoods
              v-if="!!business.objProperty._id"
              :scopeThis="scopeThis0"
              :key="forceRefresh.all"
            ></compBGoods>
          </el-collapse-item>
          <el-collapse-item title="抄表记录" name="meterrecord">
            <compMeterrecord
              v-if="!!business.objProperty._id"
              :scopeThis="scopeThis0"
              :key="forceRefresh.all"
            ></compMeterrecord>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right-box">
        <el-collapse v-model="collapseOpen_right">
          <el-collapse-item title="计费信息" name="amount">
            <compAmount :scopeThis="scopeThis0"></compAmount>
          </el-collapse-item>
          <el-collapse-item title="资源类收费项目" name="bGoods0">
            <compBGoods0
              v-if="!!business.objProperty._id"
              :scopeThis="scopeThis0"
              :key="forceRefresh.all"
            ></compBGoods0>
          </el-collapse-item>
          <el-collapse-item title="备忘" name="memo">
            <compMemo
              v-if="!!business.objProperty._id"
              :scopeThis="scopeThis0"
              :key="forceRefresh.all"
            ></compMemo>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

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
import compPayment from '@/components/ly0/d2/test-business-side/index.vue'
import compProperty from './Property.vue'
import compAmount from './Amount.vue'
import compMeterrecord from '../meterrecord0/Index.vue'
import compBGoods from '../b_goods/Index.vue'
import compBGoods0 from '../b_goods0/Index.vue'
import compMemo from '../memo/Index.vue'
import compPrint from './Print.vue'
import compSmallticket from './Smallticket.vue'

export default {
  props: ['scopeThis', 'myProps'],
  components: {
    compMenu,
    compPayment,
    compProperty,
    compAmount,
    compMeterrecord,
    compBGoods,
    compBGoods0,
    compMemo,
    compPrint,
    compSmallticket,
  },
  data() {
    return {
      scopeThis0: this,
      menuProps, // 菜单属性
      forceRefresh: {
        all: 0,
        payment: 0,
        property: 0,
        amount: 0,
        bGoods: 0,
        bGoods0: 0,
        meterrecord: 0,
        memo: 0,
      },
      collapseOpen_left: ['property', 'bGoods'], // 自动打开订单基本信息、交易明细
      collapseOpen_right: ['amount', 'bGoods0'], // 自动打开计费信息
      business: {
        objProperty: {},
        objUnit: {},
        arrBGoods: [],
        arrBGoods0: [],
        arrMeterrecord: [],
        arrMemo: [],
        objBusiness: {
          _id: null,
          amount_goods: 0,
          amount_goods0: 0,
          amount: 0,
          deal_goods: 0,
          deal_goods0: 0,
          deal: 0,
        },
      },
      payment: {
        id_business: null,
        businesstype_code: 'ly0d9business',
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
    id_property() {
      if (!!this.myProps.id_property) {
        this.init() // 初始化
      }
    },
  },
  watch: {
    // 激活 computed 响应
    id_property(valNew, valOld) {},
  },
  methods: {
    init() {
      return new Promise((resolve) => {
        // 获取订单全部信息
        dataRequest
          .storpro({
            scopeThis: this,
            storproName: 'ly0d9business.findOne',
            data: { _id: this.myProps.id_property },
          })
          .then((result) => {
            this.business = result.doc
            resolve()
          })
      })
    },
  },
}
</script>
