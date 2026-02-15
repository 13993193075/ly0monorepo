<template><div @click="hdlPopup">
    <table>
      <tbody>
        <tr v-if="!value || value.length === 0">
          <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
          <td>[未分类]</td>
        </tr>
        <tr v-else>
          <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
          <td>
            <template v-for="(item, index) in value">
              <template v-if="!!item">
                <div class="value-item">{{ item.value }}</div>
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      v-model="popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="商品分类"
      width="1000px"
      :destroy-on-close="true"
    >
      <table style="width: 100%">
        <tbody>
          <tr>
            <td>
              <template v-for="(item, index) in popup.value">
                <div class="popup-value-item">
                  <el-input class="input" v-model="item.value"></el-input>
                  <el-button
                    class="delete"
                    type="danger"
                    circle
                    size="small"
                    @click="hdlDelete(index)"
                  >
                    <el-icon><Delete></Delete></el-icon></el-button>
                </div>
              </template>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td style="width: 50px">
              <el-button
                type="primary"
                circle
                size="small"
                style="margin-top: 20px"
                @click="hdlAppend"
              >
                <el-icon><Plus></Plus></el-icon>
              </el-button>
            </td>
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
    }
  },
  computed: {
    myPropsWatch() {
      this.value = []
      this.myProps.value.forEach((i) => {
        this.value.push({ value: i })
      })
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
      this.popup.value.push({ value: '' })
    },
    hdlDelete(index) {
      this.popup.value.splice(index, 1)
    },
    hdlSubmit() {
      this.value = JSON.parse(JSON.stringify(this.popup.value))
      let value = []
      this.value.forEach((i) => {
        if (!!i.value) {
          value.push(i.value)
        }
      })
      this.$emit('getValue', { value: value, _id: !!this.myProps._id ? this.myProps._id : null })
      this.popup.visible = false
    },
  },
}
</script>
