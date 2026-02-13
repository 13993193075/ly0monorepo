<template>
  <div v-if="!!business">
    <compMenu :scopeThis="scopeThis0" :menuProps="menuProps.getMenuProps(scopeThis0)"></compMenu>
    <div class="main-box">
      <div class="left-box">
        <el-collapse v-model="collapseOpen_left">
          <el-collapse-item title="工单信息" name="info">
            <compInfo
              :scopeThis="scopeThis0"
              :key="forceRefresh.all + forceRefresh.info"
            ></compInfo>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right-box">
        <el-collapse v-model="collapseOpen_right">
          <el-collapse-item title="备忘" name="memo">
            <compMemo :scopeThis="scopeThis0" :key="forceRefresh.all"></compMemo>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <compFormUpdate
      :scopeThis="scopeThis0"
      :formProps="update.formProps"
      :dataBox="update.dataBox"
    ></compFormUpdate>
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
import compInfo from './Info.vue'
import compMemo from '../memo0/Index.vue'

export default {
  props: ['scopeThis', 'myProps'],
  components: {
    compMenu,
    compFormUpdate: compForm,
    compInfo,
    compMemo,
  },
  data() {
    return {
      scopeThis0: this,
      forceRefresh: {
        all: 0,
        info: 0,
      },
      business: null, // 工单信息
      update, // 修改工单基本信息
      menuProps, // 菜单属性
      collapseOpen_left: ['info'], // 自动打开工单信息
      collapseOpen_right: ['memo'], // 自动打开备忘信息
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
        // 获取工单信息
        dataRequest
          .storpro({
            scopeThis: this,
            storproName: 'ly0d10business0.findOne',
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
