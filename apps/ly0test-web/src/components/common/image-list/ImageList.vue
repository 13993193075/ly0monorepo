<template>
  <div>
    <!-- 标题线 -->
    <div
      v-if="imageListProps.titleLine && imageListProps.titleLine.text"
      :style="
        imageListProps.titleLine.styleLine
          ? imageListProps.titleLine.styleLine
          : ly0default.titleLine.styleLine
      "
    >
      <el-divider content-position="left">
        <span
          :style="
            imageListProps.titleLine.styleText
              ? imageListProps.titleLine.styleText
              : ly0default.titleLine.styleText
          "
        >
          {{ imageListProps.titleLine.text }}
        </span>
      </el-divider>
    </div>

    <!-- 置顶菜单 -->
    <compMenu v-if="!!imageListProps.menu" :scopeThis="scopeThis" :menuProps="menuProps"></compMenu>

    <!-- 置顶快捷按钮组 -->
    <div
      v-if="
        imageListProps.topButtonGroups &&
        imageListProps.topButtonGroups.box &&
        imageListProps.topButtonGroups.box.length > 0
      "
      :style="
        imageListProps.topButtonGroups.style
          ? imageListProps.topButtonGroups.style
          : ly0default.topButtonGroups.style
      "
    >
      <el-button-group v-for="(item, index) in imageListProps.topButtonGroups.box" :key="index">
        <template v-for="(item0, index0) in item.box" :key="index0">
          <el-tooltip
            :disabled="!item0.tip"
            :content="item0.tip && item0.tip.content ? item0.tip.content : ''"
            :placement="item0.tip && item0.tip.placement ? item0.tip.placement : 'bottom'"
            effect="light"
          >
            <el-button
              :style="hdlTopButtonStyle(item, item0)"
              :size="hdlTopButtonSize(item, item0)"
              :round="!!item0.round"
              :icon="item0.icon ? item0.icon : ''"
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
    <div class="image-list">
      <div class="item-box" v-for="(itemData, indexData) in dataBox.data" :key="indexData">
        <!-- 图片及下拉菜单 -->
        <div>
          <el-dropdown trigger="click" @command="hdlDropdown">
            <!-- 图片 -->
            <img
              :src="hdlImageSrc(itemData)"
              :width="
                imageListProps.imageWidth
                  ? imageListProps.imageWidth
                  : ly0default.imageList.image.width
              "
              :height="
                imageListProps.imageHeight
                  ? imageListProps.imageHeight
                  : ly0default.imageList.image.height
              "
            />
            <!-- 下拉菜单：dropdownMenu -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(itemDropdownMenu, indexDropdownMenu) in imageListProps.dropdownMenu"
                  :key="indexDropdownMenu"
                  :icon="itemDropdownMenu.icon"
                  :command="{ hdl: itemDropdownMenu.handle, itemData }"
                >
                  {{ itemDropdownMenu.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 下标：subscriptLabel -->
        <div
          v-for="(itemSubscriptLabel, indexSubscriptLabel) in imageListProps.subscriptLabel"
          :key="indexSubscriptLabel"
        >
          <div class="label-item">
            <template v-if="itemSubscriptLabel.show === 'text'">
              <span>{{ itemData[itemSubscriptLabel.fieldName] }}</span>
            </template>
            <template v-if="!itemSubscriptLabel.show">
              <span>{{ itemData[itemSubscriptLabel.fieldName] }}</span>
            </template>
            <template v-if="itemSubscriptLabel.show === 'expression'">
              <span>{{ itemSubscriptLabel.hdlExpression(scopeThis, itemData) }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      :total="dataBox.total"
      :page-size="
        dataBox.request.query.pageSize
          ? dataBox.request.query.pageSize
          : ly0default.dataRequest.pageSize
      "
      :current-page="dataBox.request.query.currentPage ? dataBox.request.query.currentPage : 1"
      :style="
        imageListProps.imageList.stylePagination
          ? imageListProps.imageList.stylePagination
          : ly0default.imageList.stylePagination
      "
      @size-change="hdlPageSizeChange"
      @current-change="hdlCurrentPageChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<style lang="scss" scoped>
@use 'image-list';
</style>

<script>
import compMenu from '../menu/Index.vue' // 置顶菜单
import ly0default from './default.js' // 默认值
import deepcopy from '../../../utils/deepcopy.js' // 深拷贝

export default {
  props: ['scopeThis', 'imageListProps', 'dataBox'],
  components: { compMenu },
  data() {
    return {
      menuProps: {
        mode: 'horizontal',
        menu: this.imageListProps.menu,
      },
      loading: false,
      ly0default, // 默认值
    }
  },
  methods: {
    hdlCurrentPageChange(pgNum) {
      // 修改当前页号
      // eslint-disable-next-line
      this.dataBox.request.query.currentPage = pgNum
      this.hdlDataRequest() // 数据请求
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
    hdlDropdown(command) {
      // 下拉菜单
      command.hdl(this.scopeThis, command.itemData)
    },
    hdlImageSrc(itemData) {
      // 图片src
      return itemData[this.imageListProps.imageFieldName]
        ? this.dataBox.srcPrefix + itemData[this.imageListProps.imageFieldName]
        : ''
    },
    hdlPageSizeChange(pgSize) {
      // 重新分页
      // eslint-disable-next-line
      this.dataBox.request.query.pageSize = pgSize
      // eslint-disable-next-line
      this.dataBox.request.query.currentPage = 1
      this.hdlDataRequest() // 数据请求
    },
    // 保留换行符
    hdlStyleText() {
      return 'white-space:pre-line;'
    },
    hdlTopButtonSize(item, item0) {
      if (item0.size) {
        return item0.size
      }
      if (item.buttonSize) {
        return item.buttonSize
      }
      if (this.imageListProps.topButtonGroups.buttonSize) {
        return this.imageListProps.topButtonGroups.buttonSize
      }
      return this.ly0default.topButtonGroups.buttonSize
    },
    hdlTopButtonStyle(item, item0) {
      if (item0.style) {
        return item0.style
      }
      if (item.buttonStyle) {
        return item.buttonStyle
      }
      return this.ly0default.topButtonGroups.buttonStyle
    },
  },
}
</script>
