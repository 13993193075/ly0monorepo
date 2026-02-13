<template>
  <el-dialog
    v-model="scopeThis.find.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    title="时段应收统计 - 查询"
    width="800px"
  >
    <el-row v-for="(item, index) in scopeThis.arrDate" :key="index" style="margin-bottom: 10px">
      <el-date-picker
        v-model="item.dateFrom"
        type="date"
        placeholder="选择日期"
        format="yyyy-M-d"
      ></el-date-picker>
      &nbsp;&nbsp;至&nbsp;&nbsp;
      <el-date-picker
        v-model="item.dateTo"
        type="date"
        placeholder="选择日期"
        format="yyyy-M-d"
      ></el-date-picker>
    </el-row>
    <el-button-group>
      <el-button size="mini" style="background-color: #009f95; color: #ffffff" @click="dateAppend"
        >增加</el-button
      >
      <el-button size="mini" style="background-color: #009f95; color: #ffffff" @click="dateReset"
        >重置</el-button
      >
    </el-button-group>

    <div
      style="height: 1px; background-color: #cecece; margin-top: 20px; margin-bottom: 10px"
    ></div>
    <div style="text-align: right">
      <el-button type="danger" plain @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  props: ['scopeThis'],
  methods: {
    dateAppend() {
      this.scopeThis.arrDate.push({
        dateFrom: null,
        dateTo: null,
      })
    },
    dateReset() {
      this.scopeThis.handles.dateReset(this.scopeThis)
    },
    submit() {
      this.scopeThis.arrDate = this.scopeThis.arrDate.filter((i) => {
        return i.dateFrom && i.dateTo && i.dateFrom <= i.dateTo
      })
      this.scopeThis.find.popup.visible = false
      this.scopeThis.handles.showEcharts(this.scopeThis)
      this.scopeThis.$message('已查询')
    },
  },
}
</script>
