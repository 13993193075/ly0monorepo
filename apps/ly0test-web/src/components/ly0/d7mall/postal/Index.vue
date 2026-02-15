<template>
  <div>
    <el-dialog
      v-model="myProps.popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="邮寄地址"
      width="800px"
      :destroy-on-close="true"
    >
      <table style="width: 100%">
        <tr class="field-row">
          <td><div class="field-label-box">省</div></td>
          <td>
            <el-select class="field-value" v-model="code2" filterable @change="hdlChangeCode2">
              <el-option
                v-for="(item, index) in arrCode2"
                :label="item.text2"
                v-model="item.code2"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr class="field-row">
          <td><div class="field-label-box">市</div></td>
          <td>
            <el-select class="field-value" v-model="code4" filterable @change="hdlChangeCode4">
              <el-option
                v-for="(item, index) in arrCode4"
                :label="item.text4"
                v-model="item.code4"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr class="field-row">
          <td><div class="field-label-box">县</div></td>
          <td>
            <el-select class="field-value" v-model="code6" filterable>
              <el-option
                v-for="(item, index) in arrCode6"
                :label="item.text6"
                v-model="item.code6"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr class="field-row">
          <td><div class="field-label-box">详细地址</div></td>
          <td><el-input class="field-value" v-model="address"></el-input></td>
        </tr>
        <tr class="field-row">
          <td><div class="field-label-box">联系电话</div></td>
          <td><el-input class="field-value" v-model="tel"></el-input></td>
        </tr>
        <tr class="field-row">
          <td><div class="field-label-box">联系人</div></td>
          <td><el-input class="field-value" v-model="name"></el-input></td>
        </tr>
      </table>
      <div class="line"></div>
      <div class="submit-box">
        <el-button type="danger" plain @click="hdlSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
export default {
  props: ['myProps'],
  data() {
    return {
      arrCode2: [],
      code2: '',
      arrCode4: [],
      code4: '',
      arrCode6: [],
      code6: '',
      address: '',
      tel: '',
      name: '',
    }
  },
  mounted() {
    dataRequest
      .storpro({
        scopeThis: this,
        noSession: true,
        storproName: 'ly0d3.gbt2260code2.init',
        data: null,
      })
      .then((result) => {
        this.arrCode2 = result.arrCode2
        this.hdlChangeCode2(
          this.myProps.data.code6 ? this.myProps.data.code6.slice(0, 2) + '0000' : '',
        ).then(() => {
          this.hdlChangeCode4(
            this.myProps.data.code6 ? this.myProps.data.code6.slice(0, 4) + '00' : '',
          ).then(() => {
            this.code6 = this.myProps.data.code6 ? this.myProps.data.code6 : ''
            this.code2 = this.code6 ? this.code6.slice(0, 2) + '0000' : ''
            this.code4 = this.code6 ? this.code6.slice(0, 4) + '00' : ''
            this.address = this.myProps.data.address
            this.tel = this.myProps.data.tel
            this.name = this.myProps.data.name
          })
        })
      })
  },
  methods: {
    hdlChangeCode2(value) {
      return new Promise((resolve, reject) => {
        dataRequest
          .storpro({
            scopeThis: this,
            noSession: true,
            storproName: 'ly0d3.gbt2260code4.code2',
            data: {
              code2: value,
            },
          })
          .then((result) => {
            this.arrCode4 = result.arrCode4
            this.code4 = ''
            this.arrCode6 = []
            this.code6 = ''
            resolve()
          })
      })
    },
    hdlChangeCode4(value) {
      return new Promise((resolve, reject) => {
        dataRequest
          .storpro({
            scopeThis: this,
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.code4',
            data: {
              code4: value,
            },
          })
          .then((result) => {
            this.arrCode6 = result.arrCode6
            this.code6 = ''
            resolve()
          })
      })
    },
    hdlSubmit() {
      this.$emit('getValue', {
        code6: this.code6 ? this.code6 : this.code4 ? this.code4 : this.code2 ? this.code2 : '',
        address: this.address,
        tel: this.tel,
        name: this.name,
      })
      this.myProps.popup.visible = false
    },
  },
}
</script>
