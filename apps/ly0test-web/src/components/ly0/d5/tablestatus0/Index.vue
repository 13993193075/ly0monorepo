<template>
  <div>
    <div v-if="!idBusiness.id_business">
      <div class="title-box">
        <h2 class="title">餐位状态图 - 预订情况</h2>
      </div>
      <div class="title0-box">
        <span class="label">单击餐位（桌号）：</span>
        <span class="label0">查看订单信息</span>
        <span class="refresh" @click="hdlCollapseSwitch(true)">刷新并打开面板</span>
        <span class="refresh0" @click="hdlCollapseSwitch(false)">刷新并关闭面板</span>
      </div>
      <el-collapse v-model="collapseOpen" style="padding-left: 10px; padding-right: 10px">
        <el-collapse-item
          v-for="(restaurant, index) in pageData.arrRestaurant"
          :title="restaurant.name"
          :name="index"
          :key="index"
        >
          <compBTable
            :scopeThis="scopeThis"
            :arrBTable="
              pageData.arrBTable.filter((i) => {
                return i.id_restaurant._id === restaurant._id && !i.id_table.id_diningplace
              })
            "
          ></compBTable>
          <compPlace
            :scopeThis="scopeThis"
            :arrBTable="
              pageData.arrBTable.filter((i) => {
                return i.id_restaurant._id === restaurant._id && i.id_table.id_diningplace
              })
            "
            :arrPlace="
              pageData.arrDiningplace.filter((i) => {
                return i.id_restaurant === restaurant._id
              })
            "
            :key="keyPlace"
          ></compPlace>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 订单详细 -->
    <compIdBusiness v-else :scopeThis="scopeThis" :myProps="idBusiness"></compIdBusiness>
  </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
import compBTable from './BTable.vue'
import compPlace from './Place.vue'
import compIdBusiness from '../id_business/Index.vue'
import handles from './handles.js'

export default {
  components: {
    compBTable,
    compPlace,
    compIdBusiness,
  },
  data: function () {
    return {
      scopeThis: this,
      keyPlace: 0,
      collapseSwitch: true,
      collapseOpen: [],
      pageData: {
        arrRestaurant: [],
        arrBTable: [],
        arrDiningplace: [],
      },
      focus: {}, //当前选中餐位
      idBusiness: {
        // 订单详细
        id_business: null,
        flow: true, // 流程化订单
        refreshAfterGoback: {
          // 返回后的刷新
          hdl: this.reload,
          para: this,
        },
      },
      handles,
    }
  },
  mounted() {
    this.reload(this).then(() => {})
  },
  methods: {
    hdlCollapseSwitch(open) {
      this.collapseSwitch = open
      this.reload(this)
    },
    reload(scopeThis) {
      return new Promise((resolve, reject) => {
        this.handles.getPageData(this).then(() => {
          scopeThis.collapseOpen = []
          if (this.collapseSwitch) {
            // 全部展开
            for (let i = 0; i < this.pageData.arrRestaurant.length; i++) {
              this.collapseOpen.push(i)
            }
          }
          scopeThis.keyPlace++ // 重载 place 组件
          resolve()
        })
      })
    },
  },
}
</script>
