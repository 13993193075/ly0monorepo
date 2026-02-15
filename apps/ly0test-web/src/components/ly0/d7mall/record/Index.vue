<template>
  <div class="root" v-if="!!ly0session && !!ly0session.mall">
    <compRowLogin></compRowLogin>
    <div class="empty-box" v-if="dataBox.dataBusiness.data.length === 0" @click="hdlGoHome">
      <div class="empty-icon-box"><i class="el-icon-coffee-cup icon"></i></div>
      <div class="empty-text-box">
        <span class="empty-text">没有订单记录，去买点什么...</span>
        <i class="el-icon-thumb"></i>
      </div>
    </div>
    <div class="main" v-else>
      <div class="left-b_goods">
        <el-card class="card-item" v-for="(item, index) in dataBox.dataBGoods">
          <div class="item-box">
            <div class="thumb-box" @click="handles.jump.toGoods(scopeThis, item.id_goods)">
              <el-image class="thumb" :src="srcPrefix + item.thumb"></el-image>
            </div>
            <div class="name-box">
              <div class="name truncate-2-lines">{{ item.name }}</div>
              <div class="price">¥{{ Math.floor(item.price) / 100 }}</div>
              <div class="count">「{{ item.count }}」</div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="right-business">
        <div style="color: #009e94; font-size: medium; font-weight: bold; text-align: center">
          -- 我的订单记录 --
        </div>
        <el-card
          class="card-item"
          v-for="(item, index) in dataBox.dataBusiness.data"
          :style="dataBox.id_business === item._id ? 'border: solid 0.5px red;' : ''"
        >
          <div @click="handles.id_business(scopeThis, item._id)">
            <table style="font-size: 13px">
              <tr>
                <td><div class="field-label">订单id</div></td>
                <td class="field-value">{{ item._id }}</td>
              </tr>
              <tr>
                <td><div class="field-label">商品计数</div></td>
                <td class="field-value">{{ item.count }}</td>
              </tr>
              <tr>
                <td>
                  <div
                    class="field-label"
                    style="color: #009e94; font-size: 14px; font-weight: bold"
                  >
                    金额合计
                  </div>
                </td>
                <td class="field-value" style="color: red; font-size: 18px; font-weight: bold">
                  {{ Math.floor(item.amount) / 100 }}
                </td>
              </tr>
              <tr>
                <td><div class="field-label">交易时间</div></td>
                <td class="field-value">{{ dateFormat.dateFormat(item.time) }}</td>
              </tr>
            </table>
            <el-collapse>
              <el-collapse-item title="邮寄地址">
                <table style="font-size: 13px">
                  <tr>
                    <td><div class="field-label">省-市-县</div></td>
                    <td class="field-value">{{ item.postal_gbt2260text }}</td>
                  </tr>
                  <tr>
                    <td><div class="field-label">详细地址</div></td>
                    <td class="field-value">{{ item.postal_address }}</td>
                  </tr>
                  <tr>
                    <td><div class="field-label">联系电话</div></td>
                    <td class="field-value">{{ item.postal_tel }}</td>
                  </tr>
                  <tr>
                    <td><div class="field-label">联系人</div></td>
                    <td class="field-value">{{ item.postal_name }}</td>
                  </tr>
                </table>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>

        <!-- 分页 -->
        <el-pagination
          :total="dataBox.dataBusiness.count"
          :page-size="dataBox.limit"
          :page-sizes="[dataBox.limit]"
          :current-page="dataBox.page"
          style="text-align: left; margin-top: 10px"
          @size-change="hdlPageSizeChange"
          @current-change="hdlCurrentPageChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import compRowLogin from '../row-login/Index.vue'
import dataRequest from '../../../../utils/data-request.js'
import dateFormat from '../../../../utils/date-format.js'
import handles from './handles.js'
export default {
  components: {
    compRowLogin,
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
    if (dataRequest.ly0sessionLoseWithUsertbl(this, 'ly0d7guest')) {
      return
    }
    this.handles.reload(this)
  },
  data() {
    return {
      scopeThis: this,
      ly0session: null,
      dateFormat,
      srcPrefix: '',
      handles,
      dataBox: {
        limit: 3,
        page: 1,
        dataBusiness: {
          data: [],
          count: 0,
        },
        id_business: null,
        dataBGoods: [],
      },
    }
  },
  methods: {
    hdlGoHome() {
      this.$router.replace({ path: '/mall/*' })
    },
    hdlPageSizeChange(pgSize) {
      // 重新分页
      this.dataBox.limit = pgSize
      this.dataBox.page = 1
      // 数据请求
      this.handles.getBusiness(this)
    },
    hdlCurrentPageChange(pgNum) {
      // 修改当前页号
      this.dataBox.page = pgNum
      // 数据请求
      this.handles.getBusiness(this)
    },
  },
}
</script>

<style scoped lang="scss">
.empty-icon-box {
  text-align: center;
  .icon {
    font-size: 100px;
    color: #898989;
  }
}
.empty-text-box {
  text-align: center;
  .empty-text {
    color: #009f95;
    font-size: large;
    font-weight: bolder;
  }
}

.field-label {
  text-align: right;
  padding-right: 20px;
}
.field-value {
  color: blue;
}
.root {
  .main {
    display: flex;
    justify-content: center;
    .left-b_goods {
      padding-right: 10px;
      .card-item {
        width: 500px;
        margin: 10px;
        .item-box {
          display: flex;
          justify-content: space-between;
          .thumb-box {
            .thumb {
              width: 120px;
              height: 120px;
            }
          }
          .name-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              text-align: right;
              font-size: small;
              padding-left: 20px;
            }
            .price {
              text-align: right;
              font-weight: bold;
              color: red;
            }
            .count {
              text-align: right;
              font-weight: bold;
              color: #898989;
            }
          }
        }
      }
    }
    .right-business {
      padding-left: 10px;
      .card-item {
        margin: 10px;
      }
    }
  }
}
</style>

<style scoped lang="scss">
// 最多显示2行文本，溢出部分显示省略号...
@use '/src/assets/scss/truncate-2-lines';
</style>
