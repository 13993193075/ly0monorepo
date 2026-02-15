<template>
  <div class="root">
    <div class="goods-list">
      <div class="search-box">
        <el-input
          class="search"
          v-model="searchword"
          @input="hdlCannotInput($event)"
          @change="hdlSearchKey"
        >
          <el-button-group slot="append" style="width: 160px">
            <el-button
              type="danger"
              size="small"
              plain
              class="button"
              icon="el-icon-search"
              @click="hdlSearchKey"
              >搜索</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              class="button"
              @click="group.popup.visible = true"
              >分类关键字<i class="el-icon-notebook-2 el-icon--right"></i
            ></el-button>
          </el-button-group>
        </el-input>
        <el-button
          class="my-cart"
          type="danger"
          plain
          size="small"
          icon="el-icon-shopping-cart-2"
          @click="handles.jump.toCart(scopeThis)"
          >我的购物车</el-button
        >
      </div>
      <div class="goods-item" v-for="(itemGoods, indexGoods) in dataBox.data">
        <div class="image-box" @click="handles.jump.toGoods(scopeThis, itemGoods._id)">
          <el-image :src="srcPrefix + itemGoods.thumb"></el-image>
        </div>
        <div
          class="name-box truncate-2-lines"
          @click="handles.jump.toGoods(scopeThis, itemGoods._id)"
        >
          <span class="name">{{ itemGoods.name }}</span>
        </div>
        <div class="price-box">
          <span>{{ '¥' + Math.floor(itemGoods.price[0].price) / 100 }}</span>
        </div>
        <div class="add-cart-box">
          <el-button
            type="danger"
            plain
            size="small"
            icon="el-icon-shopping-cart-2"
            @click="handles.jump.cartAddOne(scopeThis, itemGoods._id)"
            >加入购物车</el-button
          >
        </div>
      </div>
    </div>
    <el-drawer
      title="商品分类关键字"
      :visible.sync="group.popup.visible"
      :with-header="true"
      :size="'32%'"
    >
      <div class="key-list">
        <template v-for="(item, index) in group.dataBox.data">
          <el-checkbox
            class="key-check"
            v-model="group.dataBox.arrChecked"
            :label="item.name"
            border
            @change="hdlKeyChecked"
          ></el-checkbox>
        </template>

        <div class="line"></div>
        <div class="submit-box">
          <el-button-group>
            <el-button type="danger" size="small" plain icon="el-icon-search" @click="hdlSearchKey"
              >提交搜索</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              icon="el-icon-refresh-left"
              @click="group.dataBox.arrChecked = []"
              >复位</el-button
            >
          </el-button-group>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import dataRequest from '../../../../utils/data-request.js'
const srcPrefix = dataRequest.srcPrefix
import handles from '../handles/index.js'
export default {
  data() {
    return {
      scopeThis: this,
      ly0session: null,
      srcPrefix,
      dataBox: {
        data: [],
        count: 0,
        query: {
          limit: 100,
          page: 1,
          sort: {
            // 按商品编号排序
            label: 'number',
            order: 1,
          },
        },
      },
      group: {
        popup: {
          visible: false,
        },
        dataBox: {
          data: [],
          count: 0,
          query: {
            limit: 100,
            page: 1,
            sort: {
              // 按商品分类名称排序
              label: 'name',
              order: 1,
            },
          },
          arrChecked: [],
        },
      },
      searchword: '',
      handles,
    }
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
    this.handles.goodses.getData(this)
    this.handles.group.getData(this)
  },
  methods: {
    hdlCannotInput(value) {
      // 解决偶发不能输入的问题
      // this.searchword = value
      // this.$forceUpdate()
    },
    hdlKeyChecked() {
      // console.log(this.group.dataBox.arrChecked)
    },
    hdlSearchKey() {
      this.group.popup.visible = false
      this.handles.goodses.getData(this)
    },
  },
}
</script>

<style scoped lang="scss">
// 根
.root {
  text-align: center;
  // 商品列表
  .goods-list {
    display: inline-block;
    width: 75%;
    // 搜索框
    .search-box {
      margin-top: 10px;
      margin-bottom: 10px;
      .search {
        width: 50%;
        border: solid 1px red !important;
        .button {
          height: 40px;
          border-radius: 0;
        }
      }
      .my-cart {
        margin-left: 10px;
      }
    }
    // 商品条目
    .goods-item {
      display: inline-block;
      width: 160px;
      margin: 10px;
      vertical-align: top;
      // 商品图标
      .image-box {
        text-align: center;
        .image {
          width: 120px;
          height: 120px;
        }
      }
      // 商品名称
      .name-box {
        text-align: center;
        .name {
          font-size: x-small;
        }
      }
      // 单价
      .price-box {
        text-align: center;
        color: red;
      }
      // 加入购物车
      .add-cart-box {
        text-align: center;
      }
    }
  }
  .key-list {
    text-align: left;
    .key-check {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    .submit-box {
      text-align: center;
      .button {
      }
    }
  }
}
.line {
  height: 1px;
  background-color: #919191;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<style scoped lang="scss">
@use '/src/assets/scss/truncate-2-lines';
@use '/src/assets/scss/el-input__inner';
</style>
