<template>
    <ly0Table
        v-model="scopeThis.tableData"
        :myProps="scopeThis.tableProps"
        :scopeThis="scopeThis"
    ></ly0Table>
    <ly0Form
        v-if="scopeThis.formData
            && scopeThis.formProps
            && scopeThis.formProps.popup
            && scopeThis.formProps.popup.visible"
        v-model="scopeThis.formData"
        :myProps="scopeThis.formProps"
        :scopeThis="scopeThis"
    ></ly0Form>

    <compInsertMany v-if="!!scopeThis.insertMany.popup.visible" :scopeThis="scopeThis"></compInsertMany>
    <compInsertMany0 v-if="!!scopeThis.insertMany0.popup.visible" :scopeThis="scopeThis"></compInsertMany0>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'
import doc from './doc.js'
import pgData from './pgData.js'
import handles from './handles.js'

import compInsertMany from './InsertMany.vue'
import compInsertMany0 from './InsertMany0.vue'
import hdlInertMany from './insert-many.js'

import updateMany from './updateMany.js'

const props = defineProps(['myProps'])
const emit = defineEmits(['close'])

const scopeThis = reactive(
    {
        routerInstance: useRouter(),
        tableData,
        tableProps,
        formData: {},
        formProps: {},
        queryInit: query,
        query: JSON.parse(JSON.stringify(query)),
        storpro,
        find,
        insertOne,
        updateOne,
        doc,
        pgData,
        handles,
        props_myProps: props.myProps,
        insertMany: {
            popup: {
                visible: false,
            },
            data: [],
            handles: hdlInertMany,
        },
        insertMany0: {
            popup: {
                visible: false,
            },
            data: [],
            handles: hdlInertMany,
        },
        updateMany,
        arrMultipleSelection: []
    }
)

onMounted(async ()=>{
    handles.init({scopeThis})
})

watch(()=>scopeThis.tableProps.popup.visible, (newVal, oldVal) => {
    if(!newVal) { // 监听table弹窗关闭
        emit('close')
        scopeThis.tableProps.popup.visible = true
    }
})
</script>
