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
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import {ly0withTable as withTable} from '@yoooloo42/ly0el'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'
import doc from './doc.js'
import pgData from './pgData.js'

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
        props_myProps: props.myProps,
    }
)

onMounted(async ()=>{
    scopeThis.queryInit.formData.id_business = props.myProps.id_business
    scopeThis.insertOne.formData.id_business = props.myProps.id_business
    scopeThis.pgData.query.id_business = props.myProps.id_business
    await withTable.init({scopeThis})
})

watch(()=>scopeThis.tableProps.popup.visible, (newVal, oldVal) => {
    if(!newVal) { // 监听table弹窗关闭
        emit('close')
        scopeThis.tableProps.popup.visible = true
    }
})
</script>
