<template>
  <div>
    <div v-if="!idBusiness.id_business">
      <div class="title-box">
        <h2 class="title">餐位图 - 用餐</h2>
      </div>
      <div class="title0-box">
        <span class="label">单击餐位（桌号）：</span>
        <span class="label0">用餐登记/查看订单信息/修改餐位状态</span>
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
          <div class="status-show-box">
            <span class="label">停用：</span>
            <div class="show status0">
              {{
                pageData.arrTable.filter((i) => {
                  return i.id_restaurant === restaurant._id && i.status_code === '0'
                }).length
              }}
            </div>

            <span class="label">空位：</span>
            <div class="show status1">
              {{
                pageData.arrTable.filter((i) => {
                  return i.id_restaurant === restaurant._id && i.status_code === '1'
                }).length
              }}
            </div>

            <span class="label">用餐：</span>
            <div class="show status2">
              {{
                pageData.arrTable.filter((i) => {
                  return i.id_restaurant === restaurant._id && i.status_code === '2'
                }).length
              }}
            </div>
          </div>

          <compTable
            :scopeThis="scopeThis"
            :arrTable="
              pageData.arrTable.filter((i) => {
                return i.id_restaurant === restaurant._id && !i.id_diningplace
              })
            "
          ></compTable>
          <compPlace
            :scopeThis="scopeThis"
            :arrTable="
              pageData.arrTable.filter((i) => {
                return i.id_restaurant === restaurant._id && i.id_diningplace
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

      <!-- 修改餐位状态 -->
      <compForm
        v-if="setStatus.formProps.popup.visible"
        :scopeThis="scopeThis"
        :formProps="setStatus.formProps"
        :dataBox="setStatus.dataBox"
      ></compForm>
      <!-- 发生新订单 -->
      <compForm
        v-if="newBusiness.formProps.popup.visible"
        :scopeThis="scopeThis"
        :formProps="newBusiness.formProps"
        :dataBox="newBusiness.dataBox"
      ></compForm>
    </div>
    <!-- 订单详细 -->
    <compIdBusiness v-else :scopeThis="scopeThis" :myProps="idBusiness"></compIdBusiness>
  </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
import compTable from './Table.vue'
import compPlace from './Place.vue'
import compForm from '../../../common/form/Index.vue'
import compIdBusiness from '../id_business/Index.vue'
import handles from './handles.js'
import newBusiness from './new_business.js'
import setStatus from './set_status.js'

export default {
  components: {
    compTable,
    compPlace,
    compForm,
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
        arrDiningplace: [],
        arrTable: [],
        arrTableStatus: [],
      },
      focus: {}, // 焦点餐位（当前被点击的餐位）
      arrNewBTable: [], // 选中餐位数组
      newBusiness,
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
      setStatus,
      handles,
    }
  },
  mounted() {
    this.reload(this)
  },
  methods: {
    hdlCollapseSwitch(open) {
      this.collapseSwitch = open
      this.reload(this)
    },
    reload(scopeThis) {
      return new Promise((resolve, reject) => {
        scopeThis.handles.getPageData(scopeThis).then(() => {
          scopeThis.collapseOpen = []
          if (this.collapseSwitch) {
            // 全部展开
            for (let i = 0; i < scopeThis.pageData.arrRestaurant.length; i++) {
              scopeThis.collapseOpen.push(i)
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
