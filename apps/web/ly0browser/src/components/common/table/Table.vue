<template>
  <div>
    <!-- 标题线 -->
    <div
      v-if="tableProps.titleLine && tableProps.titleLine.text"
      :style="style.title_line(tableProps).lineStyle"
    >
      <el-divider content-position="left">
        <span :style="style.title_line(tableProps).textStyle">
          {{ tableProps.titleLine.text }}
        </span>
      </el-divider>
    </div>

    <!-- 置顶菜单 -->
    <ly0Menu v-if="!!tableProps.menu" :scopeThis="scopeThis" :myProps="menuProps"></ly0Menu>

    <!-- 置顶快捷按钮组 -->
    <div
      v-if="
        tableProps.topButtonGroups &&
        tableProps.topButtonGroups.box &&
        tableProps.topButtonGroups.box.length > 0
      "
      :style="style.top_buttongroup(tableProps).rootBoxStyle.style"
    >
      <el-button-group v-for="(item, index) in tableProps.topButtonGroups.box">
        <template v-for="(item0, index0) in item.box">
          <el-tooltip
            :disabled="!item0.tip"
            :content="item0.tip && item0.tip.content ? item0.tip.content : ''"
            :placement="item0.tip && item0.tip.placement ? item0.tip.placement : 'bottom'"
            effect="light"
          >
            <el-button
              :style="style.top_buttongroup(tableProps, item, item0).buttonStyle.style"
              :icon="style.top_buttongroup(tableProps, item, item0).buttonStyle.icon"
              :type="style.top_buttongroup(tableProps, item, item0).buttonStyle.facade.type"
              :size="style.top_buttongroup(tableProps, item, item0).buttonStyle.facade.size"
              :plain="style.top_buttongroup(tableProps, item, item0).buttonStyle.facade.plain"
              :round="style.top_buttongroup(tableProps, item, item0).buttonStyle.facade.round"
              :circle="style.top_buttongroup(tableProps, item, item0).buttonStyle.facade.circle"
              @click="item0.hdlClick ? item0.hdlClick(scopeThis) : null"
              :key="index0"
            >
              <span v-if="item0.text">{{ item0.text }}</span>
            </el-button>
          </el-tooltip>
        </template>
      </el-button-group>
    </div>

    <!-- 表体 -->
    <el-table
      :data="dataBox.data"
      stripe
      border
      v-loading="dataBox.request.loading"
      :element-loading-text="
        dataBox.request.loadingText
          ? dataBox.request.loadingText
          : ly0default.dataRequest.loadingText
      "
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @cell-mouse-enter="hdlCellMouseEnter"
      @row-click="hdlRowClick"
      @selection-change="hdlSelectionChange"
      @sort-change="hdlSortChange"
      id="elIdTable"
    >
      <!-- 左手第1列：是否可以选择记录行 -->
      <el-table-column
        v-if="tableProps.table.selection && tableProps.table.selection.yes"
        type="selection"
        :width="style.col_selection(tableProps).colWidth"
      ></el-table-column>

      <!-- 列 -->
      <template v-for="(col, colIndex) in tableProps.table.cols" :key="colIndex">
        <el-table-column
          v-if="col.hdlVisible ? col.hdlVisible(scopeThis) : true"
          v-model="col.fieldName"
          :label="col.label"
          #default="scope"
          :sortable="col.sortable"
          :sort-method="col.hdlSortMethod ? col.hdlSortMethod : null"
          :width="col.width ? col.width : ''"
        >
          <el-tooltip placement="left" effect="dark" :disabled="!dataBox.cellTooltip.length > 0">
            <div
              @click="col.hdlClick ? col.hdlClick(scopeThis, scope.row) : null"
              @mouseover="hdlColMouseover(scope.row, col)"
            >
              <template v-if="col.show === 'text'">
                <span :style="hdlStyleText()">{{ scope.row[col.fieldName] }}</span>
              </template>
              <template v-if="!col.show">
                <span :style="hdlStyleText()">{{ scope.row[col.fieldName] }}</span>
              </template>
              <template v-if="col.show === 'expression'">
                <span :style="hdlStyleText()">{{ col.hdlExpression(scopeThis, scope.row) }}</span>
              </template>
              <template v-if="col.show === 'switch'">
                <el-switch
                  v-model="scope.row[col.fieldName]"
                  :active-value="col.activeValue"
                  :inactive-value="col.inactiveValue"
                  :active-text="col.activeText"
                  :inactive-text="col.inactiveText"
                  :active-color="col.activeColor"
                  @change="
                    (valNew) => {
                      hdlCellSwitchChange(valNew, scope.row, col)
                    }
                  "
                ></el-switch>
              </template>
              <template v-if="col.show === 'button-group'">
                <el-button-group>
                  <template v-for="(item, index) in col.buttonGroup" :key="index">
                    <el-button
                      v-if="item.hdlVisible ? item.hdlVisible(scopeThis, scope.row) : true"
                      :key="index"
                      :style="style.row_buttongroup(scope.row, item).buttonStyle.style"
                      :icon="style.row_buttongroup(scope.row, item).buttonStyle.icon"
                      :type="style.row_buttongroup(scope.row, item).buttonStyle.facade.type"
                      :size="style.row_buttongroup(scope.row, item).buttonStyle.facade.size"
                      :plain="style.row_buttongroup(scope.row, item).buttonStyle.facade.plain"
                      :round="style.row_buttongroup(scope.row, item).buttonStyle.facade.round"
                      :circle="style.row_buttongroup(scope.row, item).buttonStyle.facade.circle"
                      @click="item.hdlClick(scopeThis, scope.row)"
                    >
                      {{ item.text ? item.text : item.hdlText(scopeThis, scope.row) }}
                    </el-button>
                  </template>
                </el-button-group>
              </template>
              <template v-if="col.show === 'image'">
                <el-image
                  :style="style.row_image(scope.row, col).imageStyle"
                  :src="hdlImageSrc(scope.row, col)"
                  :preview-src-list="[hdlImageSrc(scope.row, col)]"
                  :preview-teleported="true"
                  :hide-on-click-modal="true"
                ></el-image>
              </template>
              <template v-if="col.show === 'download'">
                <a
                  v-if="hdlDownloadSrc(scope.row, col)"
                  style="text-decoration: underline; color: #0000ff"
                  :href="dataBox.srcPrefix + hdlDownloadSrc(scope.row, col)"
                  :download="hdlDownloadFileName(scope.row, col)"
                >
                  <span>{{ hdlDownloadLabel(scope.row, col) }}</span>
                </a>
                <span v-else style="color: #6a6a6a">{{ hdlDownloadLabel(scope.row, col) }}</span>
              </template>

              <!-- 商品缩略图 -->
              <template v-if="col.show === 'd7thumb'">
                <compD7thumb
                  :myProps="hdlD7thumbGetMyProps(scope.row, col)"
                  @getValue="hdlD7thumbGetValue"
                ></compD7thumb>
              </template>
              <!-- 商品分类 -->
              <template v-if="col.show === 'd7group'">
                <compD7group
                  :myProps="{
                    value: scope.row[col.fieldName] ? scope.row[col.fieldName] : [],
                    readOnly: !!col.readOnly,
                    _id: { row: scope.row, col },
                  }"
                  @getValue="hdlD7groupGetValue"
                ></compD7group>
              </template>
              <!-- 商品规格 -->
              <template v-if="col.show === 'd7size'">
                <compD7size
                  :myProps="{
                    value: scope.row[col.fieldName] ? scope.row[col.fieldName] : [],
                    readOnly: !!col.readOnly,
                    _id: { row: scope.row, col },
                  }"
                  @getValue="hdlD7sizeGetValue"
                ></compD7size>
              </template>
              <!-- 商品标价 -->
              <template v-if="col.show === 'd7price'">
                <compD7price
                  :myProps="{
                    value: scope.row[col.fieldName] ? scope.row[col.fieldName] : [],
                    readOnly: !!col.readOnly,
                    _id: { row: scope.row, col },
                  }"
                  @getValue="hdlD7priceGetValue"
                ></compD7price>
              </template>
            </div>

            <!-- 指向单元格时的提示信息（多行） -->
            <template #content>
              <div v-for="(item, index) in dataBox.cellTooltip" :key="index">{{ item }}</div>
            </template>
          </el-tooltip>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :total="dataBox.total"
      :page-size="
        dataBox.request.query.pageSize
          ? dataBox.request.query.pageSize
          : ly0default.dataRequest.pageSize
      "
      :page-sizes="[
        dataBox.request.query.pageSize
          ? dataBox.request.query.pageSize
          : ly0default.dataRequest.pageSize,
      ]"
      :current-page="dataBox.request.query.currentPage ? dataBox.request.query.currentPage : 1"
      :style="style.pagination(tableProps).style"
      @size-change="hdlPageSizeChange"
      @current-change="hdlCurrentPageChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <!-- 选择列 -->
    <compPickCol
      :scopeThis="scopeThis"
      :tableProps="tableProps"
      :pickColProps="pickColProps"
    ></compPickCol>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import compPickCol from './PickCol.vue' // 列选择
import style from './style.js'
import ly0default from './default' // 默认值
import deepcopy from '../../../utils/deepcopy.js' // 深拷贝
import excel from '../../../libs/excel.js' // 生成Excel表格
import printDom from '../../../libs/print-dom.js' // 打印组件

// 引入商品缩略图组件
import compD7thumb from '../../ly0/d7/thumb/Index.vue'
// 引入商品分类组件
import compD7group from '../../ly0/d7/group/Index.vue'
// 引入商品规格组件
import compD7size from '../../ly0/d7/size/Index.vue'
// 引入商品标价组件
import compD7price from '../../ly0/d7/price/Index.vue'

export default {
  props: ['scopeThis', 'tableProps', 'dataBox'],
  components: {
    compPickCol,
    compD7thumb,
    compD7group,
    compD7size,
    compD7price,
  },
  data() {
    return {
      menuProps: {
        mode: 'horizontal',
        menu: this.tableProps.menu,
      },
      pickColProps: {
        // 组件属性：选择列
        popup: false,
        colsInit: [].concat(this.tableProps.table.cols),
      },
      style,
      ly0default, // 默认值
    }
  },
  mounted() {
    // 内部对象引用
    if (this.dataBox.scopeThis && this.dataBox.scopeThis.label) {
      if (!this.scopeThis.scopeThis) {
        this.scopeThis.scopeThis = {}
      }
      if (!this.scopeThis.scopeThis[this.dataBox.scopeThis.label]) {
        this.scopeThis.scopeThis[this.dataBox.scopeThis.label] = {
          hdlPickCol: this.hdlPickCol,
          hdlPrint: this.hdlPrint,
          hdlSaveToExcel: this.hdlSaveToExcel,
        }
      }
    }

    // 选择列子组件初始化
    this.pickColProps.colsInit.forEach((item, index) => {
      item.key = '' + index
    })
  },
  methods: {
    hdlCellMouseEnter(row, column, cell, event) {
      // 当单元格hover进入时会触发该事件
      if (this.tableProps.table.hdlCellMouseEnter) {
        let result = this.tableProps.table.hdlCellMouseEnter(this.scopeThis, {
          row,
          column,
          cell,
          event,
        })
        if (deepcopy.objectType(result) === 'promise') {
          // 异步执行
          result.then(() => {})
        } else {
          // 同步执行
        }
      } else {
        this.dataBox.cellTooltip = []
      }
    },
    hdlCellSwitchChange(valNew, row, col) {
      // 行内switch字段发生改变时的回调
      if (col.hdlChange) {
        col.hdlChange(this.scopeThis, row, { valNew })
      }
    },
    hdlColMouseover(row, col) {
      if (col.hdlMouseover) {
        let result = col.hdlMouseover(this.scopeThis, row)
        if (deepcopy.objectType(result) === 'promise') {
          // 异步执行
          result.then(() => {})
        } else {
          // 同步执行
        }
      } else {
        this.dataBox.cellTooltip = []
      }
    },
    hdlPickCol() {
      // 选择列
      this.pickColProps.popup = true
    },
    hdlCurrentPageChange(pgNum) {
      // 修改当前页号
      this.dataBox.request.query.currentPage = pgNum
      this.hdlDataRequest() // 数据请求
    },
    hdlD7thumbGetMyProps(row, col) {
      return {
        value: {
          thumb: row[col.fieldName.thumb],
          number: row[col.fieldName.number],
          name: row[col.fieldName.name],
        },
        thumb: {
          srcPrefix: this.dataBox.srcPrefix,
          upload: this.dataBox.upload,
        },
        readOnly: !!col.readOnly,
        _id: {
          row,
          col,
        },
      }
    },
    hdlD7thumbGetValue(result) {
      // result.value
      // result._id

      if (!result._id.col.readOnly && !!result._id.col.hdlSubmit) {
        result._id.col.hdlSubmit(
          this.scopeThis,
          // rowOld
          result._id.row,
          // thumbNew
          result.value,
        )
      }
    },
    hdlD7groupGetValue(result) {
      // result.value
      // result._id

      if (!result._id.col.readOnly && !!result._id.col.hdlSubmit) {
        result._id.col.hdlSubmit(
          this.scopeThis,
          // rowOld
          result._id.row,
          // groupNew
          result.value,
        )
      }
    },
    hdlD7sizeGetValue(result) {
      // result.value
      // result._id

      if (!result._id.col.readOnly && !!result._id.col.hdlSubmit) {
        result._id.col.hdlSubmit(
          this.scopeThis,
          // rowOld
          result._id.row,
          // sizeNew
          result.value,
        )
      }
    },
    hdlD7priceGetValue(result) {
      // result.value
      // result._id

      if (!result._id.col.readOnly && !!result._id.col.hdlSubmit) {
        result._id.col.hdlSubmit(
          this.scopeThis,
          // rowOld
          result._id.row,
          // priceNew
          result.value,
        )
      }
    },
    hdlDataRequest() {
      // 数据请求
      if (!this.dataBox.request || !this.dataBox.request.handle) {
        return
      }
      let result = this.dataBox.request.handle(this.scopeThis)
      if (deepcopy.objectType(result) === 'promise') {
        // 异步执行数据请求
        result.then(() => {})
      } else {
        // 同步执行数据请求
      }
    },
    hdlDownloadFileName(row, col) {
      if (col.hdlGetDownloadFileName) {
        return col.hdlGetDownloadFileName(this.scopeThis, row)
      }
      return this.ly0default.table.downloadInRow.fileName
    },
    hdlDownloadLabel(row, col) {
      if (!col.hdlGetSrc || !col.hdlGetSrc(this.scopeThis, row)) {
        return this.ly0default.table.downloadInRow.downloadLabelNoSrc
      }
      if (col.hdlGetDownloadLabel) {
        return col.hdlGetDownloadLabel(this.scopeThis, row)
      }
      return this.ly0default.table.downloadInRow.downloadLabel
    },
    hdlDownloadSrc(row, col) {
      if (col.hdlGetSrc) {
        return col.hdlGetSrc(this.scopeThis, row)
      }
      return ''
    },
    hdlImageSrc(row, col) {
      // 行内图片src
      return row[col.fieldName] ? this.dataBox.srcPrefix + row[col.fieldName] : ''
    },
    hdlPageSizeChange(pgSize) {
      // 重新分页
      this.dataBox.request.query.pageSize = pgSize
      this.dataBox.request.query.currentPage = 1
      this.hdlDataRequest() // 数据请求
    },
    hdlPrint() {
      // 打印
      printDom.printDom0('elIdTable')
    },
    hdlRowClick(row, column, event) {
      // 当某一行被点击时会触发该事件
      if (this.tableProps.table.hdlRowClick) {
        this.tableProps.table.hdlRowClick(this.scopeThis, {
          row,
          column,
          event,
        })
      }
    },
    hdlSaveToExcel() {
      // 另存为excel文件
      excel.tableToExcel(
        'elIdTable',
        this.tableProps.table.excelFileName
          ? this.tableProps.table.excelFileName
          : this.ly0default.table.excelFileName,
      )
    },
    hdlSelectionChange(selection) {
      // 当选择项发生变化时会触发该事件
      if (this.tableProps.table.hdlSelectionChange) {
        this.tableProps.table.hdlSelectionChange(this.scopeThis, { selection })
      }
    },
    hdlSortChange(para) {
      // 当表格的排序条件发生变化的时候会触发该事件，一般用于远程排序
      // para.column
      // para.prop
      // para.order

      if (!!this.dataBox.request.query.sort) {
        console.log('远程排序指令：', para.column.label, para.column.order, para.order)
        this.dataBox.request.query.sort.label = para.column.label
        // this.dataBox.request.query.sort.order = para.column.order
        this.dataBox.request.query.sort.order = para.order
        this.hdlDataRequest() // 数据请求
      }
    },
    hdlStyleText() {
      return 'white-space:pre-line;' // 保留换行符
    },
  },
}
</script>
