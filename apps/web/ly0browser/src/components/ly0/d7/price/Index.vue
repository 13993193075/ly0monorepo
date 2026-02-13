<template><div @click="hdlPopup">
    <table>
      <tbody>
        <tr v-if="!value || value.length === 0">
          <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
          <td>[未标价]</td>
        </tr>
        <tr v-for="(item, index) in value">
          <td>
            <i v-if="!myProps.readOnly && index === 0" class="el-icon-edit" style="color: blue"></i>
          </td>
          <td>
            <span v-if="!!item.name" class="value-name">{{ item.name }}</span>
            <span v-else class="value-name-empty">{{ nameEmpty }}</span>
            <span class="value-price">{{ Math.floor(item.price) / 100 }}</span>
            <img v-if="!!item.member" class="value-member" src="./member.png" />
            <img v-if="!!item.hot" class="value-hot" src="./hot.png" />
            <span class="value-note">{{ item.note ? item.note : '' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      v-model="popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="商品标价"
      width="1240px"
      :destroy-on-close="true"
    >
      <table style="width: 100%">
        <tbody>
          <tr>
            <th>标价名称</th>
            <th>单价</th>
            <th>会员标注</th>
            <th>热点标注</th>
            <th>备注</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in popup.value">
            <th><el-input class="input-name" v-model="item.name"></el-input></th>
            <th><el-input class="input-price" v-model="item.price"></el-input></th>
            <th>
              <el-switch
                v-model="item.member"
                active-text="是"
                inactive-text="否"
                :active-value="true"
                :inactive-value="false"
              ></el-switch>
            </th>
            <th>
              <el-switch
                v-model="item.hot"
                active-text="是"
                inactive-text="否"
                :active-value="true"
                :inactive-value="false"
              ></el-switch>
            </th>
            <th><el-input class="input-note" v-model="item.note"></el-input></th>
            <th>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="small"
                @click="hdlDelete(index)"
              ></el-button>
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                size="small"
                style="margin-top: 20px"
                @click="hdlAppend"
              ></el-button>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="line"></div>
      <div class="select-submit">
        <el-button type="danger" plain @click="hdlSubmit">确认</el-button>
      </div>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
const valueInit = []
export default {
  props: ['myProps'],
  data() {
    return {
      value: JSON.parse(JSON.stringify(valueInit)),
      popup: {
        visible: false,
        value: JSON.parse(JSON.stringify(valueInit)),
      },
      nameEmpty: '[未设置标价名称]',
    }
  },
  computed: {
    myPropsWatch() {
      this.value = this.myProps.value ? JSON.parse(JSON.stringify(this.myProps.value)) : []
      return JSON.stringify(this.myProps.value)
    },
  },
  watch: {
    myPropsWatch(valNew, valOld) {},
  },
  methods: {
    hdlPopup() {
      if (!this.myProps.readOnly) {
        this.popup.value = JSON.parse(JSON.stringify(this.value))
        this.popup.value.forEach((i) => {
          i.price = Math.floor(i.price) / 100
        })
        this.popup.visible = true
      }
    },
    hdlAppend() {
      this.popup.value.push({
        name: '',
        price: 0,
        member: false,
        hot: false,
        note: '',
      })
    },
    hdlDelete(index) {
      this.popup.value.splice(index, 1)
    },
    hdlSubmit() {
      this.value = JSON.parse(JSON.stringify(this.popup.value))
      this.value.forEach((i) => {
        i.price = Math.floor(i.price * 100)
      })
      this.$emit('getValue', {
        value: this.value,
        _id: !!this.myProps._id ? this.myProps._id : null,
      })
      this.popup.visible = false
    },
  },
}
</script>
