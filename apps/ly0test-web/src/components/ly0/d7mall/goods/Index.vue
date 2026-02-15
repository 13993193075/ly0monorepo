<template>
  <div>
    <compRowLogin></compRowLogin>
    <div v-if="!dataBox.goods" style="text-align: center" @click="hdlGoHome">
      <div><i class="el-icon-coffee-cup" style="font-size: 100px; color: #6a6a6a"></i></div>
      <div>
        <span style="color: #009e94; font-size: large; font-weight: bold"
          >商品已下架，看看别的...</span
        >
        <i class="el-icon-thumb"></i>
      </div>
    </div>
    <div v-else style="text-align: center">
      <div style="display: inline-block; width: 50%">
        <!-- 标签 -->
        <div>
          <el-tabs v-model="activeName" @tab-click="hdlTabClick">
            <el-tab-pane label="商品信息" name="info">
              <div style="text-align: left; color: red">
                <span>{{
                  !!dataBox.goods.price && dataBox.goods.price.length > 0
                    ? '¥' + Math.floor(dataBox.goods.price[0].price) / 100
                    : ''
                }}</span>
              </div>
              <div style="text-align: left">
                <el-button
                  type="danger"
                  plain
                  size="small"
                  icon="el-icon-shopping-cart-2"
                  @click="handles.jump.cartAddOne(scopeThis, dataBox.goods._id)"
                  >加入购物车</el-button
                >
              </div>

              <compIllustration :scopeThis="scopeThis"></compIllustration>
              <compInfo :scopeThis="scopeThis"></compInfo>
              <compSize :scopeThis="scopeThis"></compSize>
            </el-tab-pane>
            <el-tab-pane label="售后服务" name="afterSales"></el-tab-pane>
            <el-tab-pane label="客户点评" name="comment"></el-tab-pane>
            <el-tab-pane label="店铺信息" name="shop">
              <div style="text-align: left; color: #009f95">{{ dataBox.goods.shop_name }}</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataRequest from '../../../../utils/data-request.js'
import compRowLogin from '../row-login/Index.vue'
import compIllustration from './Illustration.vue'
import compInfo from './Info.vue'
import compSize from './Size.vue'
import handles from '../handles/index.js'

export default {
  components: {
    compRowLogin,
    compIllustration,
    compInfo,
    compSize,
  },
  data() {
    return {
      scopeThis: this,
      srcPrefix: dataRequest.srcPrefix,
      ly0session: null,
      dataBox: {
        id_goods: null,
        goods: null,
      },
      handles,

      activeName: 'info',
    }
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
    this.dataBox.id_goods = this.$route.params.id_goods
    this.handles.goods.getData(this)
  },
  methods: {
    hdlTabClick() {
      console.log(this.activeName)
    },
    hdlGoHome() {
      this.$router.replace({ path: '/mall/*' })
    },
  },
}
</script>

<style scoped></style>
