<template><div @click="hdlPopup">
    <table>
      <tbody>
        <tr v-if="!value || value.length === 0">
          <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
          <td>[未设置规格]</td>
        </tr>
        <tr v-for="(item, index) in value">
          <td>
            <i v-if="!myProps.readOnly && index === 0" class="el-icon-edit" style="color: blue"></i>
          </td>
          <td>
            <span v-if="!!item.name" class="value-name">{{ item.name }}</span>
            <span v-else class="value-name-empty">{{ nameEmpty }}</span>
            <span v-if="!!item.size" class="value-size">{{ item.size }}</span>
            <span v-else class="value-size-empty">{{ sizeEmpty }}</span>
            <img v-if="!!item.new" class="value-new" src="./new.png" />
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      v-model="popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="商品规格"
      width="1000px"
      :destroy-on-close="true"
    >
      <table style="width: 100%">
        <tbody>
          <tr>
            <th>规格名称</th>
            <th>规格内容</th>
            <th>上新标注</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in popup.value">
            <th><el-input class="input-name" v-model="item.name"></el-input></th>
            <th><el-input class="input-size" v-model="item.size"></el-input></th>
            <th>
              <el-switch
                v-model="item.new"
                active-text="是"
                inactive-text="否"
                :active-value="true"
                :inactive-value="false"
              ></el-switch>
            </th>
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
      nameEmpty: '[未设置规格名称]',
      sizeEmpty: '[未设置规格内容]',
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
        this.popup.visible = true
      }
    },
    hdlAppend() {
      this.popup.value.push({
        name: '',
        size: '',
        new: false,
      })
    },
    hdlDelete(index) {
      this.popup.value.splice(index, 1)
    },
    hdlSubmit() {
      this.value = JSON.parse(JSON.stringify(this.popup.value))
      this.$emit('getValue', {
        value: this.value,
        _id: !!this.myProps._id ? this.myProps._id : null,
      })
      this.popup.visible = false
    },
  },
}
</script>
