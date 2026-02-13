<template>
  <div style="margin: 10px">
    <el-row>
      <el-col :span="16">
        <el-date-picker
          v-model="reqData.timeFrom"
          type="date"
          placeholder="起始日期"
          format="yyyy-MM-dd"
          style="width: 200px"
        ></el-date-picker>
        <span>&nbsp;至&nbsp;</span>
        <el-date-picker
          v-model="reqData.timeTo"
          type="date"
          placeholder="截止日期"
          format="yyyy-MM-dd"
          style="width: 200px"
        ></el-date-picker>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button-group>
          <el-button size="small" class="button" round @click="reload" icon="Refresh"
            >刷新</el-button
          >
          <el-button
            size="small"
            class="button"
            round
            @click="print('printContent')"
            icon="Printer"
          >
            打印
          </el-button>
          <el-button
            size="small"
            class="button"
            round
            @click="hdl.excel.tableToExcel('printContent', reportData.title + '.xlsx')"
            icon="Download"
            >下载Excel
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <div class="line" style="margin-bottom: 40px"></div>

    <div
      style="width: 960px"
      id="printContent"
      v-loading="loading"
      :element-loading-text="loadingText"
    >
      <div style="text-align: center; font-size: large; margin-bottom: 20px">
        {{ reportData.title }}
      </div>
      <table
        style="text-align: center; width: 960px; border: solid black 1px; border-collapse: collapse"
      >
        <!-- A4 纸的宽度 -->
        <tr :style="styleTbl.row">
          <td :style="styleTbl.col1">收费项目</td>
          <td :style="styleTbl.col2">期间应收</td>
          <td :style="styleTbl.col3"></td>
        </tr>
        <tr :style="styleTbl.row">
          <td style="font-weight: bolder">服务类收费项目</td>
        </tr>
        <tr
          :style="styleTbl.row"
          v-for="(item, index) in reportData.goods"
          :key="item._id + '-' + index + reportData.goods.length"
        >
          <td :style="styleTbl.col1">{{ item.name }}</td>
          <td :style="styleTbl.col2">{{ Math.floor(item.deal) / 100 }}</td>
          <td :style="styleTbl.col3"></td>
        </tr>
        <tr :style="styleTbl.row">
          <td :style="styleTbl.col1">小计</td>
          <td :style="styleTbl.col2">{{ Math.floor(reportData.sumGoods) / 100 }}</td>
          <td :style="styleTbl.col3"></td>
        </tr>
        <tr :style="styleTbl.row">
          <td style="font-weight: bolder">资源类收费项目</td>
        </tr>
        <tr
          :style="styleTbl.row"
          v-for="(item, index) in reportData.goods0"
          :key="item._id + '-' + index + reportData.goods0.length"
        >
          <td :style="styleTbl.col1">{{ item.name }}</td>
          <td :style="styleTbl.col2">{{ Math.floor(item.deal) / 100 }}</td>
          <td :style="styleTbl.col3"></td>
        </tr>
        <tr :style="styleTbl.row">
          <td :style="styleTbl.col1">小计</td>
          <td :style="styleTbl.col2">{{ Math.floor(reportData.sumGoods0) / 100 }}</td>
          <td :style="styleTbl.col3"></td>
        </tr>
        <tr :style="styleTbl.row">
          <td :style="styleTbl.col1 + 'font-weight: bolder;'">总计</td>
          <td :style="styleTbl.col2">{{ Math.floor(reportData.sumAll) / 100 }}</td>
          <td :style="styleTbl.col3"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  border-color: #009688;
  color: #009688;
}

.line {
  height: 1px;
  background-color: #bdbdbd;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script>
import printJS from 'print-js'
import hdl from './handle.js'

export default {
  data() {
    return {
      reqData: {
        timeFrom: null,
        timeTo: null,
      },
      reportData: {
        title: '',
        unit: [],
        goods: [],
        goods0: [],
        bBoods: [],
        bBoods0: [],
        sumGoods: 0,
        sumGoods0: 0,
        sumAll: 0,
      },
      loading: false,
      loadingText: '',
      styleTbl: {
        row: 'height: 40px;',
        col1: 'width: 35%; border: solid black 1px;',
        col2: 'width: 10%; border: solid black 1px;',
        col3: 'border: solid black 1px;',
      },
      hdl,
    }
  },
  methods: {
    reload() {
      hdl.getReportData(this)
    },
    print: function (elId) {
      printJS({
        printable: elId,
        type: 'html',
        scanStyles: false,
        style: 'table { border-collapse: collapse }',
      })
    },
  },
  mounted() {
    hdl.getReportData(this)
  },
}
</script>
