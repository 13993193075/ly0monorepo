<template>
    <div style="padding: 10px">
        <ly0Form
            v-model="scopeThis.formData"
            :myProps="scopeThis.formProps"
            :scopeThis="scopeThis"
        ></ly0Form>

        <compQrcode
            v-if="!!scopeThis.qrcode.formData.code_url && scopeThis.qrcode.popup.visible"
            :myProps="scopeThis.qrcode"
        ></compQrcode>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive, onMounted } from 'vue'
import {unclassified as LibsJsUnclass} from '@yoooloo42/blindboxes'
import formData from './form-data.js'
import formProps from './form-props.js'
import qrcode from './qrcode/myProps.js'
import handles from './handles.js'
import compQrcode from './qrcode/Index.vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    }
})

const scopeThis = reactive({
    formData: LibsJsUnclass.deepClone.deepDefaults(props.modelValue, formData),
    formProps: LibsJsUnclass.deepClone.deepDefaults(props.myProps, formProps),
    handles,
    pgData: {
        arrBusinessType: [],
        arrProcess: [],
        arrMethod: [],
    },
    qrcode,
})

onMounted(()=>{
    scopeThis.handles.init({scopeThis})
})
</script>
