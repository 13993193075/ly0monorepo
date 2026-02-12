<template>
    <!-- input-box -->
    <div :style="style.box(propsItem_box)">
        <!-- 只读 -->
        <div v-if="propsItem_box.inputType === 'text'" :style="style.text(propsItem_box)">
            {{ formData_box[propsItem_box.fieldName] ? formData_box[propsItem_box.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="propsItem_box.inputType === 'text0'" :style="style.text0(propsItem_box)">
            {{ formData_box[propsItem_box.fieldName] ? formData_box[propsItem_box.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="!propsItem_box.inputType" :style="style.text(propsItem_box)">
            {{ formData_box[propsItem_box.fieldName] ? formData_box[propsItem_box.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="propsItem_box.inputType === 'expression'" :style="style.text(propsItem_box)">
            {{
                propsItem_box.hdlExpression && propsItem_box.hdlExpression({formData: formData_box, scopeThis})
                ? propsItem_box.hdlExpression({formData: formData_box, scopeThis: scopeThis_box})
                : '&nbsp;'
            }}
        </div>
        <div v-if="propsItem_box.inputType === 'expression0'" :style="style.text0(propsItem_box)">
            {{
                propsItem_box.hdlExpression && propsItem_box.hdlExpression({formData: formData_box, scopeThis: scopeThis_box})
                ? propsItem_box.hdlExpression({formData: formData_box, scopeThis: scopeThis_box})
                : '&nbsp;'
            }}
        </div>
        <div v-if="propsItem_box.inputType === 'line'" :style="style.line"></div>
    
        <!-- 修改数据 -->
        <el-input
            v-if="propsItem_box.inputType === 'input'"
            v-model="formData_box[propsItem_box.fieldName]"
            :placeholder="input.placeholder"
            :style="style.input(propsItem_box)"
            @input="input.hdlCannotInput"
            :show-password="input.showPassword"
        ></el-input>
        <el-select
            v-if="propsItem_box.inputType === 'select'"
            v-model="formData_box[propsItem_box.fieldName]"
            :placeholder="select.placeholder"
            filterable
            :style="style.input(propsItem_box)"
            @change="select.hdlChange"
        >
            <el-option
                v-for="(item0, index0) in select.items"
                :label="item0[propsItem_box.item_fieldLabel]"
                :value="item0[propsItem_box.item_fieldValue]"
                :key="index0"
            ></el-option>
        </el-select>
        <el-date-picker
            v-if="propsItem_box.inputType === 'date-picker'"
            v-model="formData_box[propsItem_box.fieldName]"
            :type="propsItem_box.type ? propsItem_box.type : 'datetime'"
            :placeholder="datePicker.placeholder"
            :format="datePicker.format"
            :style="style.input(propsItem_box)"
            @change="datePicker.hdlChange"
        ></el-date-picker>
        <el-input-number
            v-if="propsItem_box.inputType === 'input-number'"
            v-model="formData_box[propsItem_box.fieldName]"
            :size="style.input_number(propsItem_box).facade.size"
            :min="'min' in propsItem_box ? propsItem_box.min : 1"
            :max="'max' in propsItem_box ? propsItem_box.max : 100"
            :step="'step' in propsItem_box ? propsItem_box.step : 1"
            :step-strictly="'step_strictly' in propsItem_box ? propsItem_box.step_strictly : true"
        ></el-input-number>
        <el-switch
            v-if="propsItem_box.inputType === 'switch'"
            v-model="formData_box[propsItem_box.fieldName]"
            :active-text="propsItem_box.activeText"
            :inactive-text="propsItem_box.inactiveText"
            :active-value="propsItem_box.activeValue"
            :inactive-value="propsItem_box.inactiveValue"
            :active-color="style.el_switch(propsItem_box).facade.active_color"
            :disabled="!!('disabled' in propsItem_box && (propsItem_box.disabled === true || propsItem_box.disabled === 'true'))"
            @change="ly0switch.hdlChange"
        ></el-switch>
        <el-radio-group
            v-if="propsItem_box.inputType === 'radio-group'"
            v-model="formData_box[propsItem_box.fieldName]"
            :disabled="!!propsItem_box.disabled"
            @change="radioGroup.hdlChange"
        >
            <template v-for="(item0, index0) in propsItem_box.items" :key="index0">
                <el-radio :value="item0[propsItem_box.item_fieldValue]">
                    {{ item0[propsItem_box.item_fieldLabel] }}
                </el-radio>
            </template>
        </el-radio-group>
        <div v-if="propsItem_box.inputType === 'button-group' && propsItem_box.box && propsItem_box.box.length > 0">
            <template v-for="(item0, index0) in propsItem_box.box" :key="index0">
                <el-button-group :style="style.button_group().group.style">
                    <template v-for="(item1, index1) in item0.box" :key="index1">
                        <el-tooltip
                            :disabled="!item1.tip"
                            :content="item1.tip && item1.tip.content ? item1.tip.content : ''"
                            :placement="item1.tip && item1.tip.placement ? item1.tip.placement : 'bottom'"
                            effect="light"
                        >
                            <el-button
                                :style="style.button_group(propsItem_box, item0, item1).button.style"
                                :icon="style.button_group(propsItem_box, item0, item1).button.icon"
                                :type="style.button_group(propsItem_box, item0, item1).button.facade.type"
                                :size="style.button_group(propsItem_box, item0, item1).button.facade.size"
                                :plain="style.button_group(propsItem_box, item0, item1).button.facade.plain"
                                :round="style.button_group(propsItem_box, item0, item1).button.facade.round"
                                :circle="style.button_group(propsItem_box, item0, item1).button.facade.circle"
                                @click="item1.hdlClick ? item1.hdlClick({formData: formData_box, scopeThis: scopeThis_box}) : null"
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
        <div v-if="propsItem_box.inputType === 'image'">
            <div>
                <el-image
                    :style="style.image(propsItem_box)"
                    :src="image.getSrc[0]"
                    :preview-src-list="image.getSrc"
                    :preview-teleported="true"
                    :hide-on-click-modal="true"
                ></el-image>
            </div>
            <!-- 设置了图片删除功能，同时图片不为空 -->
            <div v-if="!!propsItem_box.imageDelete && !!formData_box[propsItem_box.fieldName]">
                <el-button
                    size="small"
                    :icon="!formData_box[propsItem_box.imageDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
                    @click="image.delete"
                >{{ formData_box[propsItem_box.imageDelete] ? '图片已删除，恢复' : '删除' }}</el-button>
            </div>
        </div>
        <!-- 多个图片 -->
        <div v-if="propsItem_box.inputType === 'images'">
            <div
                v-for="(itemImages, indexImages) in formData_box[propsItem_box.fieldName]"
                :key="indexImages"
                :style="style.images(propsItem_box).itemBox"
            >
                <div>
                    <el-image
                        :style="style.images(propsItem_box).itemThumb"
                        :src="images.getSrc(itemImages, indexImages)"
                        :preview-src-list="images.show"
                    ></el-image>
                </div>
                <div v-if="!!propsItem_box.imageDelete">
                    <el-button
                        size="small"
                        icon="el-icon-delete"
                        @click="images.delete(itemImages, indexImages)"
                    >{{
                        formData_box[propsItem_box.imageDelete].includes(itemImages) ? '恢复' : '删除'
                    }}</el-button>
                </div>
            </div>
        </div>
        <!-- 富文本 -->
        <div v-if="propsItem_box.inputType === 'richtext'" :style="style.richtext(propsItem_box)">
            <ly0Richtext v-model="formData_box[propsItem_box.fieldName]" :myProps="richtextProps"></ly0Richtext>
        </div>
        <!-- 富文本show -->
        <div v-if="propsItem_box.inputType === 'richtextShow'">
            <div v-html="formData_box[propsItem_box.fieldName]"></div>
        </div>
        <!-- 视频 -->
        <div v-if="propsItem_box.inputType === 'video'">
            <div>
                <video
                    :width="style.video(propsItem_box).width"
                    :height="style.video(propsItem_box).height"
                    controls
                    :poster="video.poster"
                >
                    <source :src="video.src" type="video/mp4" />
                    <!-- MP4/H.264/AAC - 最广泛支持 -->
                    <source :src="video.src" type="video/webm" />
                    <!-- WebM/VP9/Opus - 开源格式，支持良好 -->
                    <source :src="video.src" type="video/ogg" />
                    <!-- Ogg/Theora/Vorbis - 较旧的开源格式 -->
                </video>
            </div>
            <!-- 设置了视频删除功能，同时视频不为空 -->
            <div v-if="!!propsItem_box.videoDelete && !!formData_box[propsItem_box.fieldName]">
                <el-button
                    size="small"
                    :icon="!formData_box[propsItem_box.videoDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
                    @click="video.delete"
                >{{ !!formData_box[propsItem_box.videoDelete] ? '视频已删除，恢复' : '删除' }}</el-button>
            </div>
        </div>
    
        <!-- 上传及下载 -->
        <!-- 下载 -->
        <div v-if="propsItem_box.inputType === 'download'">
            <a
                v-if="formData_box[propsItem_box.fieldName]"
                :style="style.download.style"
                :href="download.downloadSrc"
                :download="download.fileName"
            >
                <span>{{ download.downloadLabel }}</span>
            </a>
            <span v-else :style="style.download.none">{{ download.downloadLabel }}</span>
        </div>
        <!-- 上传多个文件 -->
        <div v-if="propsItem_box.inputType === 'upload'">
            <ly0Upload
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl}"
            ></ly0Upload>
        </div>
        <!-- 拖拽上传 -->
        <div v-if="propsItem_box.inputType === 'upload-drag'">
            <ly0Upload_drag
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl}"
            ></ly0Upload_drag>
        </div>
        <!-- 图片列表 -->
        <div v-if="propsItem_box.inputType === 'upload-picture'">
            <ly0Upload_picture
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_image}"
            ></ly0Upload_picture>
        </div>
        <!-- 图片墙 -->
        <div v-if="propsItem_box.inputType === 'upload-picture-card'">
            <ly0Upload_pictureCard
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_image}"
            ></ly0Upload_pictureCard>
        </div>
        <!-- 头像 -->
        <div v-if="propsItem_box.inputType === 'upload-avatar'">
            <ly0Upload_avatar
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{
                    uploadUrl: upload.uploadUrl_image,
                    avatar: propsItem_box.avatar
                }"
            ></ly0Upload_avatar>
        </div>
        <!-- 车牌识别 -->
        <div v-if="propsItem_box.inputType === 'upload-carplate'">
            <ly0Upload_carplate
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_carplate}"
            ></ly0Upload_carplate>
        </div>
    
        <!-- 行政区划 -->
        <div v-if="propsItem_box.inputType === 'ly0gbt2260'">
            <ly0gbt2260
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{readOnly: propsItem_box.readOnly}"
            ></ly0gbt2260>
        </div>
    
        <!-- 商品分类 -->
        <div v-if="propsItem_box.inputType === 'ly0d7group'">
            <ly0d7group
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{readOnly: propsItem_box.readOnly}"
            ></ly0d7group>
        </div>
        <!-- 邮寄地址 -->
        <div v-if="propsItem_box.inputType === 'ly0d7postal'">
            <ly0d7postal
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{readOnly: propsItem_box.readOnly}"
            ></ly0d7postal>
        </div>
        <!-- 商品标价 -->
        <div v-if="propsItem_box.inputType === 'ly0d7price'">
            <ly0d7price
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{readOnly: propsItem_box.readOnly}"
            ></ly0d7price>
        </div>
        <!-- 商品规格 -->
        <div v-if="propsItem_box.inputType === 'ly0d7size'">
            <ly0d7size
                v-model="formData_box[propsItem_box.fieldName]"
                :myProps="{readOnly: propsItem_box.readOnly}"
            ></ly0d7size>
        </div>
        <!-- 商品缩略图 -->
        <div v-if="propsItem_box.inputType === 'ly0d7thumb'">
            <ly0d7thumb
                v-model="formData_box"
                :myProps="{
                    thumb: {
                        fieldName: propsItem_box.thumb.fieldName,
                        width: propsItem_box.thumb.width || '',
                        height: propsItem_box.thumb.height || ''
                    },
                    name: {
                        fieldName: propsItem_box.name.fieldName,
                    },
                    number: {
                        fieldName: propsItem_box.number.fieldName,
                    },
                    readOnly: propsItem_box.readOnly
                }"
            ></ly0d7thumb>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, computed} from "vue";
import styleModule from './style.js'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    },
    item: {
        type: Object,
        default: () => ({})
    }
})

// props属性包装，继承了顶层组件的响应性，页面和js可以使用相同的命名
let formData_box = props.modelValue
const formProps_box = props.myProps
const scopeThis_box = props.scopeThis
const propsItem_box = props.item

const input = reactive({
    placeholder: propsItem_box.placeholder || formProps_box.para.placeholder.input,
    showPassword: !!propsItem_box.showPassword,
    hdlCannotInput: value => { // 解决偶发不能输入的问题
        formData_box[propsItem_box.fieldName] = value
    }
})

const select = reactive({
    placeholder: propsItem_box.placeholder || formProps_box.para.placeholder.select,
    items: computed(()=>{
        if (propsItem_box.items) {
            return propsItem_box.items
        } else if (propsItem_box.hdlGetItems) {
            return propsItem_box.hdlGetItems({formData: formData_box, scopeThis: scopeThis_box})
        }
    }),
    hdlChange: value => {
        if (propsItem_box.hdlChange) {
            propsItem_box.hdlChange({formData: formData_box, scopeThis: scopeThis_box, value})
        }
    }
})

const datePicker = reactive({
    placeholder: computed(()=> {
        if (propsItem_box.placeholder) {
            return propsItem_box.placeholder
        }
        if (propsItem_box.type === 'datetime') {
            return formProps_box.para.placeholder.datetime
        }
        if (propsItem_box.type === 'date') {
            return formProps_box.para.placeholder.date
        }
        return formProps_box.para.placeholder.datetime
    }),
    format: computed(() => {
        if (propsItem_box.format) {
            return propsItem_box.format
        }
        if (propsItem_box.type === 'datetime') {
            return 'YYYY/MM/DD HH:mm'
        }
        if (propsItem_box.type === 'date') {
            return 'YYYY/MM/DD'
        }
        return 'YYYY/MM/DD HH:mm'
    }),
    hdlChange: value => {
        if (propsItem_box.hdlChange) {
            propsItem_box.hdlChange({formData: formData_box, scopeThis: scopeThis_box, value})
        }
    }
})

const ly0switch = reactive({
    hdlChange: value => {
        if (propsItem_box.hdlChange) {
            propsItem_box.hdlChange({formData: formData_box, scopeThis: scopeThis_box, value})
        }
    }
})

const radioGroup = reactive({
    hdlChange: value => {
        if (propsItem_box.hdlChange) {
            propsItem_box.hdlChange({formData: formData_box, scopeThis: scopeThis_box, value})
        }
    }
})

const image = reactive({
    getSrc: computed(() => {
        if (
            propsItem_box.imageDelete &&
            formData_box[propsItem_box.imageDelete] &&
            (formData_box[propsItem_box.imageDelete] === true ||
                formData_box[propsItem_box.imageDelete] === 'true') // 图片已删除
        ) {
            return ['']
        }
        if (formData_box[propsItem_box.fieldName]) {
            return formData_box[propsItem_box.fieldName]
        }
        return ['']
    }),
    delete: ()=>{
        formData_box[propsItem_box.imageDelete] =
            !formData_box[propsItem_box.imageDelete]
    }
})

const images = reactive({
    getSrc: (itemImages, indexImages) => {
        if (
            !propsItem_box.imageDelete ||
            !formData_box[propsItem_box.imageDelete].includes(itemImages)
        ) {
            return itemImages
        }
        return ''
    },
    delete: (itemImages, indexImages) => {
        if (!formData_box[propsItem_box.imageDelete].includes(itemImages)) {
            formData_box[propsItem_box.imageDelete].push(itemImages)
            return
        }
        
        formData_box[propsItem_box.imageDelete] = formData_box[propsItem_box.imageDelete].filter(i => {
            return i !== itemImages
        })
    },
    show: computed(()=>{
        let result = []
        if (!propsItem_box.imageDelete) {
            formData_box[propsItem_box.fieldName].forEach(i => {
                result.push(i)
            })
        } else {
            formData_box[propsItem_box.fieldName]
                .filter(i => {
                    return !formData_box[propsItem_box.imageDelete].includes(i)
                })
                .forEach(i => {
                    result.push(i)
                })
        }
        return result
    })
})

const richtextProps = ref({
    uploadUrl: formProps_box.para.upload.uploadUrl_image
})

const video = reactive({
    src: computed(()=>{
        if (
            propsItem_box.videoDelete &&
            formData_box[propsItem_box.videoDelete] &&
            (formData_box[propsItem_box.videoDelete] === true ||
                formData_box[propsItem_box.videoDelete] === 'true') // 图片已删除
        ) {
            return ''
        }
        if (formData_box[propsItem_box.fieldName]) {
            return formData_box[propsItem_box.fieldName]
        }
        return ''
    }),
    poster: computed(()=>{
        if (
            propsItem_box.videoDelete &&
            formData_box[propsItem_box.videoDelete] &&
            (formData_box[propsItem_box.videoDelete] === true ||
                formData_box[propsItem_box.videoDelete] === 'true') // 图片已删除
        ) {
            return ''
        }
        if (formData_box[propsItem_box.poster]) {
            return formData_box[propsItem_box.poster]
        }
        return ''
    }),
    delete: ()=>{
        formData_box[propsItem_box.videoDelete] =
            !formData_box[propsItem_box.videoDelete]
    },
})

const download = reactive({
    fileName: propsItem_box.downloadFileName || formProps_box.para.download.fileName,
    downloadLabel: computed(() => {
        if (!formData_box[propsItem_box.fieldName]) {
            return formProps_box.para.download.downloadLabelNoSrc
        }
        if (propsItem_box.hdlGetDownloadLabel) {
            return propsItem_box.hdlGetDownloadLabel({formData: formData_box, scopeThis: scopeThis_box})
        }
        return formProps_box.para.download.downloadLabel
    }),
    downloadSrc: formData_box[propsItem_box.fieldName] || ''
})

const upload = reactive({
    uploadUrl: formProps_box.para.upload.uploadUrl,
    uploadUrl_image: formProps_box.para.upload.uploadUrl_image,
    uploadUrl_carplate: formProps_box.para.upload.uploadUrl_carplate
})

const style = reactive({
    box: styleModule.input.box,
    text: styleModule.input.text,
    text0: styleModule.input.text0,
    line: styleModule.line,
    input: styleModule.input.input,
    input_number: styleModule.input.input_number,
    el_switch: styleModule.input.el_switch,
    button_group: styleModule.input.button_group,
    image: styleModule.input.image,
    images: styleModule.input.images,
    richtext: styleModule.input.richtext,
    video: styleModule.input.video,
    download: computed(()=>styleModule.input.download()),
})
</script>

<style scoped lang="scss"></style>
