<template>
  <!-- input-box -->
  <div :style="style.input.box(item)">
    <!-- 只读 -->
    <div v-if="item.inputType === 'text'" :style="style.input.text(item)">
      {{ dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : '&nbsp;' }}
    </div>
    <div v-if="item.inputType === 'text0'" :style="style.input.text0(item)">
      {{ dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : '&nbsp;' }}
    </div>
    <div v-if="!item.inputType" :style="style.input.text(item)">
      {{ dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : '&nbsp;' }}
    </div>
    <div v-if="item.inputType === 'expression'" :style="style.input.text(item)">
      {{
        item.hdlExpression && item.hdlExpression(scopeThis, dataBox.fieldsValue)
          ? item.hdlExpression(scopeThis, dataBox.fieldsValue)
          : '&nbsp;'
      }}
    </div>
    <div v-if="item.inputType === 'expression0'" :style="style.input.text0(item)">
      {{
        item.hdlExpression && item.hdlExpression(scopeThis, dataBox.fieldsValue)
          ? item.hdlExpression(scopeThis, dataBox.fieldsValue)
          : '&nbsp;'
      }}
    </div>
    <div v-if="item.inputType === 'line'" :style="style.line()"></div>

    <!-- 可编辑 -->
    <el-input
      v-if="item.inputType === 'input'"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :placeholder="hdlInputPlaceholder()"
      :style="style.input.input(item)"
      @input="hdlCannotInput($event)"
      :show-password="hdlShowPassword()"
    ></el-input>
    <el-select
      v-if="item.inputType === 'select'"
      class="deep-input"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :placeholder="hdlSelectPlaceholder()"
      filterable
      :style="style.input.input(item)"
      @change="hdlSelectChange"
    >
      <el-option
        v-for="(item0, index0) in hdlSelectGetItems()"
        :label="item0[item.item_fieldLabel]"
        :value="item0[item.item_fieldValue]"
        :key="index0"
      ></el-option>
    </el-select>
    <el-date-picker
      v-if="item.inputType === 'date-picker'"
      class="deep-input"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :type="item.type ? item.type : 'datetime'"
      :placeholder="hdlDatePickerPlaceholder()"
      :format="hdlDatePickerFormat()"
      :style="style.input.input(item)"
      @change="hdlDateChange"
    ></el-date-picker>
    <el-input-number
      v-if="item.inputType === 'input-number'"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :size="style.input.input_number(item).facade.size"
      :min="'min' in item ? item.min : 1"
      :max="'max' in item ? item.max : 100"
      :step="'step' in item ? item.step : 1"
      :step-strictly="'step_strictly' in item ? item.step_strictly : true"
    ></el-input-number>
    <el-switch
      v-if="item.inputType === 'switch'"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :active-text="item.activeText"
      :inactive-text="item.inactiveText"
      :active-value="item.activeValue"
      :inactive-value="item.inactiveValue"
      :active-color="style.input.el_switch(item).facade.active_color"
      :disabled="!!('disabled' in item && (item.disabled === true || item.disabled === 'true'))"
      @change="hdlSwitchChange"
    ></el-switch>
    <el-radio-group
      v-if="item.inputType === 'radio-group'"
      v-model="dataBox.fieldsValue[item.fieldName]"
      :disabled="!!item.disabled"
      @change="hdlRadioGroupChange"
    >
      <template v-for="(item0, index0) in item.items" :key="index0">
        <el-radio :label="item0[item.item_fieldValue]">
          {{ item0[item.item_fieldLabel] }}
        </el-radio>
      </template>
    </el-radio-group>
    <div v-if="item.inputType === 'button-group' && item.box && item.box.length > 0">
      <template v-for="(item0, index0) in item.box" :key="index0">
        <el-button-group :style="style.input.button_group().group.style">
          <template v-for="(item1, index1) in item0.box" :key="index1">
            <el-tooltip
              :disabled="!item1.tip"
              :content="item1.tip && item1.tip.content ? item1.tip.content : ''"
              :placement="item1.tip && item1.tip.placement ? item1.tip.placement : 'bottom'"
              effect="light"
            >
              <el-button
                :style="style.input.button_group(item, item0, item1).button.style"
                :icon="style.input.button_group(item, item0, item1).button.icon"
                :type="style.input.button_group(item, item0, item1).button.facade.type"
                :size="style.input.button_group(item, item0, item1).button.facade.size"
                :plain="style.input.button_group(item, item0, item1).button.facade.plain"
                :round="style.input.button_group(item, item0, item1).button.facade.round"
                :circle="style.input.button_group(item, item0, item1).button.facade.circle"
                @click="item1.hdlClick ? item1.hdlClick(scopeThis) : null"
                :key="index1"
              >
                <span v-if="item1.text">{{ item1.text }}</span>
              </el-button>
            </el-tooltip>
          </template>
        </el-button-group>
      </template>
    </div>

    <!-- 图片&富文本&视频 -->
    <!-- 图片 -->
    <div v-if="item.inputType === 'image'">
      <div>
        <el-image
          :style="style.input.image(item).imageStyle"
          :src="hdlImageSrc()"
          :preview-src-list="[hdlImageSrc()]"
          :preview-teleported="true"
          :hide-on-click-modal="true"
        ></el-image>
      </div>
      <!-- 设置了图片删除功能，同时图片不为空 -->
      <div v-if="!!item.imageDelete && !!dataBox.fieldsValue[item.fieldName]">
        <el-button
          size="small"
          :icon="!dataBox.fieldsValue[item.imageDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
          @click="hdlImageDelete"
          >{{ !!dataBox.fieldsValue[item.imageDelete] ? '图片已删除，恢复' : '删除' }}</el-button
        >
      </div>
    </div>
    <!-- 多个图片 -->
    <div v-if="item.inputType === 'images'">
      <div
        v-for="(itemImages, indexImages) in dataBox.fieldsValue[item.fieldName]"
        :key="indexImages"
        :style="style.input.images().imageBox"
      >
        <div>
          <el-image
            :style="style.input.images(item).imageStyle"
            :src="hdlImagesSrc(itemImages, indexImages)"
            :preview-src-list="hdlImagesShow()"
          ></el-image>
        </div>
        <div v-if="!!item.imageDelete">
          <el-button
            size="small"
            icon="el-icon-delete"
            @click="hdlImagesDelete(itemImages, indexImages)"
            >{{
              dataBox.fieldsValue[item.imageDelete].includes(itemImages) ? '恢复' : '删除'
            }}</el-button
          >
        </div>
      </div>
    </div>
    <!-- 富文本 -->
    <div v-if="item.inputType === 'richtext'" :style="style.input.rich_text(item)">
      <compRichtext
        ref="text"
        v-model="dataBox.fieldsValue[item.fieldName]"
        :options="hdlRichtextOptions()"
      />
    </div>
    <!-- 富文本show -->
    <div v-if="item.inputType === 'richtextShow'">
      <div v-html="dataBox.fieldsValue[item.fieldName]"></div>
    </div>
    <!-- 视频 -->
    <div v-if="item.inputType === 'video'">
      <div>
        <video
          :width="style.input.video(item).width"
          :height="style.input.video(item).height"
          controls
          :poster="hdlVideoPoster()"
        >
          <source :src="hdlVideoSrc()" type="video/mp4" />
          <!-- MP4/H.264/AAC - 最广泛支持 -->
          <source :src="hdlVideoSrc()" type="video/webm" />
          <!-- WebM/VP9/Opus - 开源格式，支持良好 -->
          <source :src="hdlVideoSrc()" type="video/ogg" />
          <!-- Ogg/Theora/Vorbis - 较旧的开源格式 -->
        </video>
      </div>
      <!-- 设置了视频删除功能，同时视频不为空 -->
      <div v-if="!!item.videoDelete && !!dataBox.fieldsValue[item.fieldName]">
        <el-button
          size="small"
          :icon="!dataBox.fieldsValue[item.videoDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
          @click="hdlVideoDelete"
          >{{ !!dataBox.fieldsValue[item.videoDelete] ? '视频已删除，恢复' : '删除' }}</el-button
        >
      </div>
    </div>

    <!-- 上传及下载 -->
    <!-- 下载 -->
    <div v-if="item.inputType === 'download'">
      <a
        v-if="dataBox.fieldsValue[item.fieldName]"
        :style="style.input.download().style"
        :href="dataBox.srcPrefix + hdlDownloadSrc()"
        :download="hdlDownloadFileName()"
      >
        <span>{{ hdlDownloadLabel() }}</span>
      </a>
      <span v-else :style="style.input.download().none">{{ hdlDownloadLabel() }}</span>
    </div>
    <!-- 上传多个文件 -->
    <div v-if="item.inputType === 'upload'">
      <ly0Upload
        :myProps="uploadProps"
        @getUploadResult="hdlGetUploadResult"
      ></ly0Upload>
    </div>
    <!-- 拖拽上传 -->
    <div v-if="item.inputType === 'upload-drag'">
      <ly0Upload_drag
        :myProps="uploadProps"
        @getUploadResult="hdlGetUploadResult"
      ></ly0Upload_drag>
    </div>
    <!-- 图片列表 -->
    <div v-if="item.inputType === 'upload-picture'">
      <ly0Upload_picture
          :myProps="uploadProps_image"
          @getUploadResult="hdlGetUploadResult"
      ></ly0Upload_picture>
    </div>
    <!-- 图片墙 -->
    <div v-if="item.inputType === 'upload-picture-card'">
      <ly0Upload_pictureCard
        :myProps="uploadProps_image"
        @getUploadResult="hdlGetUploadResult"
      ></ly0Upload_pictureCard>
    </div>
    <!-- 头像 -->
    <div v-if="item.inputType === 'upload-avatar'">
      <ly0Upload_avatar
        :myProps="uploadProps_image"
        @getUploadResult="hdlGetUploadResult"
      ></ly0Upload_avatar>
    </div>
    <!-- 车牌识别 -->
    <div v-if="item.inputType === 'upload-carplate'">
      <ly0Upload_carplate
        :myProps="uploadProps_carplate"
        @getUploadResult="hdlGetUploadResultCarplate"
      ></ly0Upload_carplate>
    </div>

    <!-- 商品缩略图 -->
    <div v-if="item.inputType === 'd7thumb'">
      <compD7thumb
        :myProps="{
          value: {
            thumb: dataBox.fieldsValue[item.fieldName.thumb],
            name: dataBox.fieldsValue[item.fieldName.name],
          },
          readOnly: item.readOnly,
        }"
        @getValue="hdlD7thumbGetValue"
      ></compD7thumb>
    </div>
    <!-- 商品分类 -->
    <div v-if="item.inputType === 'd7group'">
      <compD7group
        :myProps="{
          value: dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : [],
          readOnly: item.readOnly,
        }"
        @getValue="hdlD7groupGetValue"
      ></compD7group>
    </div>
    <!-- 商品规格 -->
    <div v-if="item.inputType === 'd7size'">
      <compD7size
        :myProps="{
          value: dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : [],
          readOnly: item.readOnly,
        }"
        @getValue="hdlD7sizeGetValue"
      ></compD7size>
    </div>
    <!-- 商品标价 -->
    <div v-if="item.inputType === 'd7price'">
      <compD7price
        :myProps="{
          value: dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : [],
          readOnly: item.readOnly,
        }"
        @getValue="hdlD7priceGetValue"
      ></compD7price>
    </div>
    <!-- 邮寄地址 -->
    <div v-if="item.inputType === 'd7postal'">
      <compD7postal
        :myProps="{
          value: dataBox.fieldsValue[item.fieldName] ? dataBox.fieldsValue[item.fieldName] : [],
          readOnly: item.readOnly,
        }"
        @getValue="hdlD7postalGetValue"
      ></compD7postal>
    </div>
  </div>
</template>

<script>
// 引入富文本组件及样式
import { QuillEditor as compRichtext } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// 引入商品缩略图组件
import compD7thumb from '../../ly0/d7/thumb/Index.vue'
// 引入商品分类组件
import compD7group from '../../ly0/d7/group/Index.vue'
// 引入商品规格组件
import compD7size from '../../ly0/d7/size/Index.vue'
// 引入商品标价组件
import compD7price from '../../ly0/d7/price/Index.vue'
// 引入邮寄地址组件
import compD7postal from '../../ly0/d7/postal/Index.vue'

import style from './style.js'
import ly0default from './default.js' // 默认值

export default {
    props: ['scopeThis', 'formProps', 'dataBox', 'item'],
    components: {
        compRichtext,
        compD7thumb,
        compD7group,
        compD7size,
        compD7price,
        compD7postal,
    },
    data() {return {
        style,
        ly0default,
    }},
    computed: {
        uploadProps() {
            return {
                uploadUrl: this.dataBox.upload
            }
        },
        uploadProps_image() {
            return {
                uploadUrl: this.dataBox.upload_image
            }
        },
        uploadProps_carplate() {
            return {
                uploadUrl: this.dataBox.upload_carplate
            }
        },
    },
  methods: {
    hdlCannotInput(value) {
      // 解决偶发不能输入的问题
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = value
      this.$forceUpdate()
    },
    hdlD3gbt2260getValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = !!result.code6 ? result.code6 : ''
    },
    hdlD7thumbGetValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName.thumb] = result.value.thumb
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName.name] = result.value.name
    },
    hdlD7groupGetValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = !!result.value ? result.value : []
    },
    hdlD7sizeGetValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = !!result.value ? result.value : []
    },
    hdlD7priceGetValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = !!result.value ? result.value : []
    },
    hdlD7postalGetValue(result) {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = !!result.value ? result.value : []
    },
    hdlDateChange(value) {
      if (this.item.hdlChange) {
        this.item.hdlChange(this.scopeThis, value)
      }
    },
    hdlDatePickerFormat() {
      if (this.item.format) {
        return this.item.format
      }
      if (this.item.type === 'datetime') {
        return 'YYYY/MM/DD HH:mm'
      }
      if (this.item.type === 'date') {
        return 'YYYY/MM/DD'
      }
      return 'YYYY/MM/DD HH:mm'
    },
    hdlDatePickerPlaceholder() {
      if (this.item.placeholder) {
        return this.item.placeholder
      }
      if (this.item.type === 'datetime') {
        return this.ly0default.placeholder.datetime
      }
      if (this.item.type === 'date') {
        return this.ly0default.placeholder.date
      }
      return this.ly0default.placeholder.datetime
    },
    hdlDownloadFileName() {
      if (this.item.downloadFileName) {
        return this.item.downloadFileName
      }
      return this.ly0default.download.fileName
    },
    hdlDownloadLabel() {
      if (!this.dataBox.fieldsValue[this.item.fieldName]) {
        return this.ly0default.download.downloadLabelNoSrc
      }
      if (this.item.hdlGetDownloadLabel) {
        return this.item.hdlGetDownloadLabel(this.scopeThis, this.item)
      }
      return this.ly0default.download.downloadLabel
    },
    hdlDownloadSrc() {
      if (this.dataBox.fieldsValue[this.item.fieldName]) {
        return this.dataBox.srcPrefix + this.dataBox.fieldsValue[this.item.fieldName]
      }
      return ''
    },
    hdlGetUploadResult(result) {
      // 可以获取多个文件上传结果
      console.log('文件上传结果：', result.fileList)
      if ('limit' in this.item && this.item.limit > 1) {
        // 接收多个文件
        // eslint-disable-next-line
        this.dataBox.fieldsValue[this.item.fieldName] = []
        result.fileList.forEach((i) => {
          // eslint-disable-next-line
          this.dataBox.fieldsValue[this.item.fieldName].push(i.src)
        })
      } else {
        // 只接收一个文件
        // eslint-disable-next-line
        this.dataBox.fieldsValue[this.item.fieldName] =
          result.fileList.length === 0 ? '' : result.fileList[0].src
      }
    },
    hdlGetUploadResultCarplate(result) {
      // 获取车牌识别结果
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.fieldName] = result.src ? result.src : ''
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.carplate] =
        result.result && result.result.txt ? result.result.txt : ''
    },
    hdlImageSrc() {
      let result = ""
      if (
        !!this.item.imageDelete &&
        !!this.dataBox.fieldsValue[this.item.imageDelete] &&
        (this.dataBox.fieldsValue[this.item.imageDelete] === true ||
          this.dataBox.fieldsValue[this.item.imageDelete] === 'true') // 图片已删除
      ) {
        result = ''
      }
      if (!!this.dataBox.fieldsValue[this.item.fieldName]) {
        result = (
          (!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) +
          this.dataBox.fieldsValue[this.item.fieldName]
        )
      }

      return result
    },
    hdlImageDelete() {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.imageDelete] =
        !this.dataBox.fieldsValue[this.item.imageDelete]
    },
    hdlImagesSrc(
      itemImages,
      // eslint-disable-next-line
      indexImages,
    ) {
      if (
        !this.item.imageDelete ||
        !this.dataBox.fieldsValue[this.item.imageDelete].includes(itemImages)
      ) {
        return (!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) + itemImages
      }
      return ''
    },
    hdlImagesDelete(
      itemImages,
      // eslint-disable-next-line
      indexImages,
    ) {
      if (!this.dataBox.fieldsValue[this.item.imageDelete].includes(itemImages)) {
        // eslint-disable-next-line
        this.dataBox.fieldsValue[this.item.imageDelete].push(itemImages)
        return
      }

      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.imageDelete] = this.dataBox.fieldsValue[
        this.item.imageDelete
      ].filter((i) => {
        return i !== itemImages
      })
    },
    hdlImagesShow() {
      let result = []
      if (!this.item.imageDelete) {
        this.dataBox.fieldsValue[this.item.fieldName].forEach((i) => {
          result.push((!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) + i)
        })
      } else {
        this.dataBox.fieldsValue[this.item.fieldName]
          .filter((i) => {
            return !this.dataBox.fieldsValue[this.item.imageDelete].includes(i)
          })
          .forEach((i) => {
            result.push((!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) + i)
          })
      }
      return result
    },
    hdlInputPlaceholder() {
      return this.item.placeholder ? this.item.placeholder : this.ly0default.placeholder.input
    },
    hdlRadioGroupChange(value) {
      if (this.item.hdlChange) {
        this.item.hdlChange(this.scopeThis, value)
      }
    },
    hdlRichtextOptions() {
      return {
        action: this.dataBox.srcPrefix + this.dataBox.upload, // 必填参数 图片上传地址
        methods: 'post', // 必填参数 图片上传方式
        // token: '' // 可选参数 如果需要token验证，假设你的token有存放在session-storage
        name: 'upload_file', // 必填参数 文件的参数名
        size: this.ly0default.richtext.size, // 可选参数  可上传的图片大小，单位为Kb, 1M = 1024Kb
        // accept: 'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg' // 可选参数 可上传的图片格式
      }
    },
    hdlSelectChange(value) {
      if (this.item.hdlChange) {
        this.item.hdlChange(this.scopeThis, value)
      }
    },
    hdlSelectGetItems() {
      if (this.item.items) {
        return this.item.items
      } else if (this.item.hdlGetItems) {
        return this.item.hdlGetItems(this.scopeThis)
      }
    },
    hdlSelectPlaceholder() {
      return this.item.placeholder ? this.item.placeholder : this.ly0default.placeholder.select
    },
    hdlShowPassword() {
      return !!this.item.showPassword
    },
    hdlSwitchChange(value) {
      if (this.item.hdlChange) {
        this.item.hdlChange(this.scopeThis, value)
      }
    },
    hdlVideoDelete() {
      // eslint-disable-next-line
      this.dataBox.fieldsValue[this.item.videoDelete] =
        !this.dataBox.fieldsValue[this.item.videoDelete]
    },
    hdlVideoPoster() {
      if (
        !!this.item.videoDelete &&
        !!this.dataBox.fieldsValue[this.item.videoDelete] &&
        (this.dataBox.fieldsValue[this.item.videoDelete] === true ||
          this.dataBox.fieldsValue[this.item.videoDelete] === 'true') // 图片已删除
      ) {
        return ''
      }
      if (!!this.dataBox.fieldsValue[this.item.poster]) {
        return (
          (!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) +
          this.dataBox.fieldsValue[this.item.poster]
        )
      }
      return ''
    },
    hdlVideoSrc() {
      if (
        !!this.item.videoDelete &&
        !!this.dataBox.fieldsValue[this.item.videoDelete] &&
        (this.dataBox.fieldsValue[this.item.videoDelete] === true ||
          this.dataBox.fieldsValue[this.item.videoDelete] === 'true') // 图片已删除
      ) {
        return ''
      }
      if (!!this.dataBox.fieldsValue[this.item.fieldName]) {
        return (
          (!!this.item.noSrcPrefix ? '' : this.dataBox.srcPrefix) +
          this.dataBox.fieldsValue[this.item.fieldName]
        )
      }
      return ''
    },
  },
}
</script>

<style scoped lang="scss">
@use 'deep-input';
</style>
