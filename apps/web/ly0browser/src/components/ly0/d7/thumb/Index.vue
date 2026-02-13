<template>
  <div>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            <el-image
              :style="hdlGetStyle()"
              :src="hdlUploadProps().srcPrefix + value.thumb"
              :preview-src-list="[hdlUploadProps().srcPrefix + value.thumb]"
              :preview-teleported="true"
              :hide-on-click-modal="true"
            ></el-image>
          </th>
        </tr>
        <tr @click="hdlPopup">
          <th><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></th>
          <th>
            <div>
              <span v-if="!!value.number" class="value-number">{{ value.number }}</span>
              <span v-else class="value-number-empty">[未设置商品编号]</span>
            </div>
            <div>
              <span v-if="!!value.name" class="value-number">{{ value.name }}</span>
              <span v-else class="value-number-empty">[未设置商品名称]</span>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
    <el-dialog
      v-model="popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      title="商品编号、名称及缩略图"
      width="800px"
      :destroy-on-close="true"
    >
      <table style="width: 100%">
        <tbody>
          <tr>
            <th>
              <el-collapse>
                <el-collapse-item title="原图">
                  <el-image
                    :style="hdlGetStyle()"
                    :src="hdlUploadProps().srcPrefix + value.thumb"
                    :preview-src-list="[hdlUploadProps().srcPrefix + popup.value.thumb]"
                  ></el-image>
                </el-collapse-item>
              </el-collapse>
            </th>
          </tr>
          <tr>
            <th>
              <div style="margin-top: 10px; margin-bottom: 10px">上传新图</div>
              <ly0Upload_avatar
                :uploadProps="hdlUploadProps()"
                @getUploadResult="hdlGetUploadResult"
              ></ly0Upload_avatar>
            </th>
          </tr>
          <tr>
            <th>
              <div style="margin-top: 10px; margin-bottom: 10px">商品编号</div>
              <div><el-input class="input-number" v-model="popup.value.number"></el-input></div>
              <div style="margin-top: 10px; margin-bottom: 10px">商品名称</div>
              <div>
                <el-input
                  class="input-number"
                  v-model="popup.value.name"
                  style="width: 400px"
                ></el-input>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="line"></div>
      <div class="select-submit">
        <el-button type="danger" plain @click="hdlSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
const valueInit = {
  number: '',
  name: '',
  thumb: '',
}

export default {
  props: ['myProps'],
  data() {
    return {
      value: JSON.parse(JSON.stringify(valueInit)),
      popup: {
        visible: false,
        value: JSON.parse(JSON.stringify(valueInit)),
      },
      size: {
        width: '100px',
        height: '100px',
      },
    }
  },
  computed: {
    myPropsWatch() {
      this.value = this.myProps.value
        ? JSON.parse(JSON.stringify(this.myProps.value))
        : JSON.parse(JSON.stringify(valueInit))
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
    hdlGetStyle() {
      return (
        'width: ' +
        (this.myProps.thumb.size && this.myProps.thumb.size.width
          ? this.myProps.thumb.size.width
          : this.size.width) +
        '; ' +
        'height: ' +
        (this.myProps.thumb.size && this.myProps.thumb.size.height
          ? this.myProps.thumb.size.height
          : this.size.height) +
        ';'
      )
    },
    hdlUploadProps() {
      return {
        srcPrefix: this.myProps.thumb.srcPrefix,
        upload: this.myProps.thumb.upload,
        avatar: {
          width:
            this.myProps.thumb.size && this.myProps.thumb.size.width
              ? this.myProps.thumb.size.width
              : this.size.width,
          height:
            this.myProps.thumb.size && this.myProps.thumb.size.height
              ? this.myProps.thumb.size.height
              : this.size.height,
        },
      }
    },
    hdlGetUploadResult(result) {
      // 可以获取多个文件上传结果
      this.popup.value.thumb = result.fileList.length === 0 ? '' : result.fileList[0].src
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
