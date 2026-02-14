<script setup>
import { reactive, onMounted } from 'vue'
import {ElMessage} from 'element-plus'
import {request} from 'packages/ly0libs'
import {blindboxes} from 'packages/ly0utils'
import menu from './menu.js'
import formData from './form-data.js'
import formProps from './form-props.js'
import busiCode from './busi-code.js'
import more from '../d0more/index.js'

const props = defineProps({
    root: {
        type: Object,
        default: () => ({
            id_d0: null
        })
    }
})

const scopeThis = reactive({
    root: props.root,
    menu,
    formData,
    formProps: {},
    busiCode,
    update: {
        formData: {},
        formProps: {
            popup: {
                switch: true,
                visible: false,
                title: ''
            },
            cols: [],
            submit: {
                switch: true,
                handle: null
            }
        },
    },
    more,
    openIndex: '', // 当前打开面板
    refreshKey: 0, // 强制刷新
    handles: {
        async init({scopeThis}) {
            const result = await request.ly0.storpro({
                storproName: 'ly0d14.d0.id_ly0d14d0',
                data: { id_ly0d14d0: scopeThis.root.id_d0 },
            })
            blindboxes.deepClone.replaceObject(scopeThis.formData, result.doc)
            const result0 = await request.ly0.storpro({
                storproName: 'ly0d14.d0.getPgData',
                data: null,
            })
            blindboxes.deepClone.replaceObject(scopeThis.busiCode, result0.data)
            ElMessage('数据已刷新')
            scopeThis.formProps = blindboxes.deepClone.deepMerge(
                scopeThis.formProps,
                formProps.getFormProps({scopeThis})
            )
            scopeThis.refreshKey++
        },
    }
})

onMounted(async function() {
    await scopeThis.handles.init({scopeThis})
})
</script>

<template>
    <ly0Menu :myProps="scopeThis.menu" :scopeThis="scopeThis"></ly0Menu>
    <ly0Form
        v-model="scopeThis.formData"
        :myProps="scopeThis.formProps"
        :scopeThis="scopeThis"
        :key="scopeThis.refreshKey"
    ></ly0Form>
    <ly0Form
        v-if="scopeThis.update.formProps.popup.visible"
        v-model="scopeThis.update.formData"
        :myProps="scopeThis.update.formProps"
        :scopeThis="scopeThis"
    ></ly0Form>
</template>

<style scoped lang="scss">

</style>
