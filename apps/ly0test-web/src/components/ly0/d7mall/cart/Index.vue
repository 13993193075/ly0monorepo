<template>
  <div v-if="!!ly0session && !!ly0session.mall">
    <compRowLogin></compRowLogin>
    <div
      class="empty-box"
      v-if="!business || !business.arrBGoods || business.arrBGoods.length < 1"
      @click="hdlGoHome"
    >
      <div class="empty-icon-box"><i class="el-icon-shopping-cart-2 icon"></i></div>
      <div class="empty-text-box">
        <span class="empty-text">购物车空空如也，再逛逛...</span>
        <i class="el-icon-thumb"></i>
      </div>
    </div>
    <div class="cart-box" v-else>
      <div class="goodses-box">
        <el-card class="item-card" v-for="(item, index) in business.arrBGoods">
          <div class="goods-box">
            <div class="thumb-box" @click="handles.jump.toGoods(scopeThis, item.id_goods)">
              <el-image class="thumb" :src="srcPrefix + item.thumb"></el-image>
            </div>
            <div class="name-box">
              <div class="name truncate-2-lines">{{ item.name }}</div>
              <div class="price">¥{{ Math.floor(item.price) / 100 }}</div>
              <div class="count">
                <el-input-number
                  size="small"
                  v-model="item.count"
                  :min="1"
                  @change="
                    handles.b_goods.setCount(scopeThis, { id_bGoods: item._id, count: item.count })
                  "
                ></el-input-number>
                <el-button
                  style="margin-left: 20px"
                  size="small"
                  type="info"
                  plain
                  icon="el-icon-delete"
                  circle
                  @click="handles.b_goods.deleteOne(scopeThis, { id_bGoods: item._id })"
                ></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="amount-box">
        <el-card class="amount-card">
          <div class="content-box">
            <span style="font-size: 35px; font-weight: bold; color: #ff640a">
              <i class="el-icon-shopping-cart-2 icon"></i>&nbsp;
            </span>
            <span class="label">购物车内总金额：</span>
            <span class="amount">¥{{ Math.floor(business.objBusiness.amount) / 100 }}</span>
          </div>
          <div class="button-box">
            <el-button @click="handles.deal.qrcodeOpened(scopeThis)"
              ><img src="wxzf.png" style="width: 100px; height: 30px"
            /></el-button>
          </div>
        </el-card>

        <div class="postal-title">-- 请选择邮寄地址（红框选中） --</div>
        <el-card :class="'postal-card ' + (postal.selected === -1 ? 'postal-selected' : '')">
          <div @click="postal.selected = -1">
            <table class="postal-table">
              <tr>
                <td>
                  <div class="label">省-市-县</div>
                </td>
                <td>
                  <div class="value">{{ ly0session.user.gbt2260text }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="label">详细地址</div>
                </td>
                <td>
                  <div class="value">{{ ly0session.user.address }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="label">联系人</div>
                </td>
                <td>
                  <div class="value">{{ ly0session.user.name }}/{{ ly0session.user.tel }}</div>
                </td>
              </tr>
            </table>
            <div class="button">
              <el-button
                size="small"
                plain
                type="info"
                icon="el-icon-edit"
                circle
                @click="handles.postal.setPostal(scopeThis, -1)"
              ></el-button>
            </div>
          </div>
        </el-card>
        <el-card
          :class="'postal-card ' + (postal.selected === index ? 'postal-selected' : '')"
          v-for="(item, index) in ly0session.user.postal"
        >
          <div @click="postal.selected = index">
            <table class="postal-table">
              <tr>
                <td>
                  <div class="label">省-市-县</div>
                </td>
                <td>
                  <div class="value">{{ item.gbt2260text }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="label">详细地址</div>
                </td>
                <td>
                  <div class="value">{{ item.address }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="label">联系人</div>
                </td>
                <td>
                  <div class="value">{{ item.name }}/{{ item.tel }}</div>
                </td>
              </tr>
            </table>
            <div class="button">
              <el-button
                size="small"
                plain
                type="info"
                icon="el-icon-edit"
                circle
                @click="handles.postal.setPostal(scopeThis, index)"
              ></el-button>
              <el-button
                size="small"
                plain
                type="info"
                icon="el-icon-delete"
                circle
                @click="
                  handles.postal.deleteOne(scopeThis, { id_guest: ly0session.user._id, index })
                "
              ></el-button>
            </div>
          </div>
        </el-card>
        <div class="postal-add">
          <el-button
            type="info"
            size="small"
            plain
            icon="el-icon-document-add"
            @click="handles.postal.setPostal(scopeThis, -2)"
            >增加新地址</el-button
          >
        </div>
      </div>
    </div>
    <compPostal v-if="postal.popup.visible" :myProps="postal" @getValue="hdlGetPostal"></compPostal>
    <!--compQrcode
      v-if="!!qrcode.code_url && qrcode.popup.visible"
      :scopeThis="scopeThis"
      :myProps="qrcode"
      @closed="handles.deal.qrcodeClosed(scopeThis)"
    ></compQrcode-->
  </div>
</template>

<script>
import compRowLogin from '../row-login/Index.vue'
import compPostal from '../postal/Index.vue'
//import compQrcode from '../../d2/cash/Qrcode.vue'
import dataRequest from '../../../../utils/data-request.js'
const srcPrefix = dataRequest.srcPrefix
import handles from './handles.js'
const postalDataInit = {
  code6: '',
  address: '',
  tel: '',
  name: '',
}

export default {
  components: {
    compRowLogin,
    compPostal,
    //compQrcode,
  },
  data() {
    return {
      scopeThis: this,
      ly0session: null,
      srcPrefix,
      business: null,
      postal: {
        selected: -1,
        popup: {
          visible: false,
        },
        data: JSON.parse(JSON.stringify(postalDataInit)),
      },
      postalDataInit,
      qrcode: {
        code_url: '',
        amount: 0,
        id_business: null,
        appid: '',
        mchid: '',
        popup: {
          visible: false,
          title: '微信支付.商户二维码收款',
          second: false,
        },
      },
      handles,
    }
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
    if (dataRequest.ly0sessionLoseWithUsertbl(this, 'ly0d7guest')) {
      return
    }
    this.handles.b_goods.getCart(this)
  },
  methods: {
    hdlGetPostal(result) {
      this.handles.postal.getPostal(this, result)
    },
    hdlGoHome() {
      this.$router.replace({ path: '/mall/*' })
    },
  },
}
</script>

<style scoped lang="scss">
.empty-icon-box {
  text-align: center;
  .icon {
    font-size: 100px;
    color: #ff640a;
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

.cart-box {
  display: flex;
  justify-content: center;
  .goodses-box {
    display: inline-block;
    width: 600px;
    text-align: left;
    .item-card {
      margin: 20px;
    }
    .goods-box {
      display: flex;
      justify-content: space-between;
      .thumb-box {
        .thumb {
          width: 120px;
          height: 120px;
        }
      }
      .name-box {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 120px;
        .name {
          text-align: right;
          font-size: small;
        }
        .price {
          text-align: right;
          color: red;
          font-weight: bolder;
        }
        .count {
          text-align: right;
        }
      }
    }
  }
  .amount-box {
    margin-top: 20px;
    .amount-card {
      width: 400px;
      text-align: center;
      .content-box {
        margin-bottom: 20px;
        .label {
          color: #009e94;
          font-weight: bolder;
        }
        .amount {
          color: red;
          font-weight: bolder;
        }
      }
      .button-box {
      }
    }

    .postal-title {
      text-align: center;
      color: #009e94;
      margin-top: 20px;
      font-weight: bolder;
      font-size: 14px;
    }
    .postal-card {
      width: 500px;
      margin-top: 20px;
      .postal-table {
        width: 100%;
        font-size: small;
        .label {
          text-align: right;
          padding-right: 10px;
          line-height: 25px;
        }
        .value {
          color: blue;
        }
      }
      .button {
        text-align: right;
      }
    }
    .postal-selected {
      border: 1px solid red;
    }
    .postal-add {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>

<style scoped lang="scss">
// 最多显示2行文本，溢出部分显示省略号...
@use '/src/assets/scss/truncate-2-lines';
</style>
