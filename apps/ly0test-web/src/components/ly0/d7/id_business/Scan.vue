<template>
  <div>
    <el-dialog
      v-model="popup"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="商品扫码"
      :width="'1240px'"
      :before-close="hdlBeforeClose"
      @open="hdlOpen"
    >
      <!-- 编辑区 -->
      <div class="scan-box">
        <!-- 左边扫码区 -->
        <div class="left-scan">
          <table><tbody>
            <tr class="row">
              <td><div class="field-label">解码算法</div></td>
              <td>
                <el-select
                  class="field-input"
                  v-model="decode_selected"
                  placeholder="请选择"
                  filterable
                >
                  <el-option
                    v-for="(item, index) in decode"
                    :key="index"
                    :label="item.text"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">扫码区</div></td>
              <td>
                <el-input
                  class="field-input"
                  v-model="scan.scan"
                  placeholder="请扫码，<回车>增加"
                  @change="hdlScan0"
                  @input="cannotInput($event)"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button class="field-button" size="small" round @click="hdlScan">解析</el-button>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">商品编号</div></td>
              <td>
                <el-input
                  class="field-input"
                  v-model="scan.number"
                  placeholder="请输入"
                  @input="cannotInput($event)"
                ></el-input>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">商品名称</div></td>
              <td>
                <el-input
                  class="field-input"
                  v-model="scan.name"
                  placeholder="请输入"
                  @input="cannotInput($event)"
                ></el-input>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">标价名称</div></td>
              <td>
                <el-select
                  class="field-input"
                  v-model="scan.price_name"
                  placeholder="请选择"
                  filterable
                  @change="hdlPriceNameChange"
                >
                  <el-option
                    v-for="(item, index) in scan.arrPrice"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">单价</div></td>
              <td>
                <el-input
                  class="field-input"
                  style="width: 150px"
                  v-model="scan.price0"
                  placeholder="请输入"
                  @input="cannotInput($event)"
                ></el-input>
              </td>
            </tr>
            <tr class="row">
              <td><div class="field-label">数量</div></td>
              <td>
                <el-input
                  class="field-input"
                  style="width: 150px"
                  v-model="scan.count"
                  placeholder="请输入"
                  @input="cannotInput($event)"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button class="field-button" size="small" round @click="hdlAppend"
                  >增加</el-button
                >
              </td>
            </tr>
          </tbody></table>
        </div>

        <!-- 右边商品列表区 -->
        <div class="right-list">
          <div class="sum">
            <span class="label">合计金额：¥</span>
            <span class="value">{{
              Math.floor(
                arrGoods.reduce((getSum, i) => {
                  return getSum + i.price * i.count
                }, 0),
              ) / 100
            }}</span>
          </div>
          <div class="dashed-line">----------------------------------------</div>

          <table class="list"><tbody>
            <tr>
              <td>商品编号</td>
              <td>商品名称</td>
              <td>单价</td>
              <td>数量</td>
              <td class="button-delete-td"></td>
            </tr>
            <tr v-for="(item, index) in arrGoods" :key="item._id + '-' + index + arrGoods.length">
              <td>{{ item.number }}</td>
              <td>{{ item.name }}</td>
              <td>
                {{
                  Math.floor(item.price) / 100 +
                  (item.price_name ? '[' + item.price_name + ']' : '')
                }}
              </td>
              <td>{{ item.count }}</td>
              <td>
                <div class="button-delete" @click="hdlDeleteOne(index)">删除</div>
              </td>
            </tr>
          </tbody></table>
        </div>
      </div>

      <!-- 提交区 -->
      <div class="line"></div>
      <div class="submit-row">
        <el-button type="success" round @click="hdlSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use 'scan';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
import decode from '@yoooloo42/ly0utils/src/utils/decode.js'

let scanInit = {
  scan: '',
  id_goods: null,
  number: '',
  name: '',
  arrPrice: [],
  price_name: '',
  price: 0,
  price0: 0,
  count: 0,
}
export default {
  props: ['scopeThis'],
  data() {
    return {
      decode_selected: 'goods-number',
      decode: [
        { code: 'goods-number', text: '商品编码' },
        { code: 'n3c2', text: '3位商品编码+2位数量' },
      ],
      scanInit,
      scan: JSON.parse(JSON.stringify(scanInit)),
      arrGoods: [],
      winScanAnother: null, // 客户浏览窗口
    }
  },
  methods: {
    cannotInput(event) {
      this.$forceUpdate()
    },
    hdlAnotherShow() {
      let elTable = this.winScanAnother.document.getElementById('elIdTable'),
        elSum = this.winScanAnother.document.getElementById('elIdSum'),
        sum = 0
      elTable.innerHTML = '<tr><td>商品编号</td><td>名称</td><td>单价</td><td>数量</td></tr>'
      this.arrGoods.forEach((i) => {
        let elTr = this.winScanAnother.document.createElement('tr')
        elTr.innerHTML =
          '<td>' +
          i.number +
          '</td>' +
          '<td>' +
          i.name +
          '</td>' +
          '<td>' +
          Math.floor(i.price) / 100 +
          (i.price_name ? '[' + i.price_name + ']' : '') +
          '</td>' +
          ('<td>' + i.count) +
          '</td>'
        elTable.appendChild(elTr)
        sum = sum + i.price * i.count
      })
      elSum.innerHTML = Math.floor(sum) / 100
    },
    hdlAppend() {
      this.arrGoods.unshift({
        id_goods: this.scan.id_goods,
        number: this.scan.number,
        name: this.scan.name,
        price_name: this.scan.price_name,
        price: Math.floor(this.scan.price0 * 100),
        count: this.scan.count,
      })
      this.$message('已增加')
      this.hdlAnotherShow()
    },
    hdlBeforeClose() {
      this.$emit('closed', 'cancel')
      this.winScanAnother.close()
      this.winScanAnother = null
      this.scopeThis.scan.popup.visible = false
    },
    hdlDeleteOne(i) {
      this.arrGoods.splice(i, 1)
      this.hdlAnotherShow()
    },
    hdlOpen() {
      this.scan = JSON.parse(JSON.stringify(scanInit))
      this.arrGoods = []
    },
    hdlPriceNameChange(value) {
      this.scan.price = this.scan.arrPrice.find((i) => {
        return i.name === value
      }).price
      this.scan.price0 = Math.floor(this.scan.price) / 100
    },
    hdlScan() {
      return new Promise((resolve, reject) => {
        // 商品解码
        let objDecode = decode.decode(this.decode_selected, this.scan.scan).data
        this.scan.number = objDecode.number
        this.scan.count = objDecode.count

        // 获取商品信息
        dataRequest
          .storpro({
            scopeThis: this,
            storproName: 'ly0d7.b_goods.findNumber',
            data: {
              id_business: this.scopeThis.myProps.id_business,
              number: this.scan.number,
            },
          })
          .then((result) => {
            this.$message(result.message)

            if (result.code === 0) {
              this.scan.id_goods = result.objGoods._id
              this.scan.number = result.objGoods.number
              this.scan.name = result.objGoods.name
              this.scan.arrPrice = result.objGoods.price ? result.objGoods.price : []
              let objPrice = this.scan.arrPrice.length > 0 ? this.scan.arrPrice[0] : null
              this.scan.price_name = objPrice ? objPrice.name : ''
              this.scan.price = objPrice ? objPrice.price : 0
              this.scan.price0 = Math.floor(this.scan.price) / 100
            }
            resolve({
              code: result.code,
            })
          })
      })
    },
    hdlScan0() {
      this.hdlScan().then((result) => {
        if (result.code === 0) {
          this.hdlAppend()
        }
      })
    },
    hdlSubmit() {
      dataRequest
        .storpro({
          scopeThis: this,
          storproName: 'ly0d7.b_goods.insertMany',
          data: {
            id_business: this.scopeThis.myProps.id_business,
            arrGoods: this.arrGoods,
          },
        })
        .then((result) => {
          this.$message(result.message)
          this.scopeThis.scan.popup.visible = false
          this.scopeThis.init().then(() => {
            this.scopeThis.forceRefresh.all++ // 强制重载子组件
          })
        })
    },
  },
  computed: {
    popup() {
      return this.scopeThis.scan.popup.visible
    },
  },
  watch: {
    popup: function (valNew, valOld) {
      if (valNew) {
        this.$nextTick(() => {
          // 客户浏览窗口
          // 获取第二块屏幕的位置
          let secondScreen = window.screen,
            secondScreenLeft = 0,
            secondScreenTop = 0,
            secondScreenWidth = 600,
            secondScreenHeight = 800
          if (window.screen.width > window.innerWidth) {
            secondScreenLeft = secondScreen.availLeft
            secondScreenTop = secondScreen.availTop
            secondScreenWidth = Math.min(600, secondScreen.availWidth)
            secondScreenHeight = Math.min(800, secondScreen.availHeight)
          }
          this.winScanAnother = window.open(
            '',
            '_blank',
            'screenX=' +
              secondScreenLeft +
              ',' +
              'screenY=' +
              secondScreenTop +
              ',' +
              'width=' +
              secondScreenWidth +
              ',' +
              'height=' +
              secondScreenHeight +
              ',' +
              'location=no,' +
              'menubar=no,' +
              'resizable=no,' +
              'scrollbars=no,' +
              'status=no,' +
              'titlebar=no,' +
              'toolbar=no',
          )
          this.winScanAnother.document.write(
            '<div style="text-align:center; margin-top:20px; margin-bottom:20px;">正在扫码加入您的购物车 ...</div>' +
              '<div style="font-size:large; text-align:center;"><span>合计金额：¥</span>' +
              "<span id='elIdSum' style='color:red;font-size:x-large;font-weight:bold;margin-left:10px;'>0</span></div>" +
              '<div style="text-align:center;">----------------------------------------</div>' +
              "<table id='elIdTable' style='width:100%; text-align:center'>" +
              '<tr><td>商品编号</td><td>名称</td><td>单价</td><td>数量</td></tr>' +
              '</table>',
          )
        })
      }
    },
  },
}
</script>
