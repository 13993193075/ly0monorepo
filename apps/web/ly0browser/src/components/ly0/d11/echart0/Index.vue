<template>
  <div style="padding-left: 10px; padding-right: 10px">
    <h2 style="text-align: center">时段应收</h2>
    <el-button-group class="top-button-box">
      <el-button class="top-button" @click="handles.reset(scopeThis)">重置</el-button>
      <el-button class="top-button" @click="handles.reload(scopeThis)">刷新</el-button>
      <el-button class="top-button" @click="scopeThis.popupFind = true">查询</el-button>
    </el-button-group>
    <el-collapse v-model="collapseOpen">
      <el-collapse-item
        v-for="(carpark, index) in data.carpark"
        :title="carpark.name"
        :name="index"
        :key="index"
      >
        <div class="echarts-show-box" :id="'echarts-show' + index"></div>
      </el-collapse-item>
    </el-collapse>

    <comp-find :scopeThis="scopeThis"></comp-find>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>

<script>
import compFind from './Find.vue'
import handles from './handles.js'

export default {
  components: { compFind },
  data() {
    return {
      scopeThis: this,
      collapseOpen: [],
      data: {
        // 后台获取的数据源
        carpark: [],
        carwithin_rec: [],
      },
      arrDate: [
        {
          dateFrom: null,
          dateTo: null,
        },
      ],
      popupFind: false,
      handles,
    }
  },
  mounted() {
    this.handles.reset(this).then(() => {
      this.data.carpark.forEach((item, index) => {
        this.collapseOpen.push(index)
      })
    })
  },
}
</script>
