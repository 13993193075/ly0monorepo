<template>
    <ly0el-table
        v-model="scopeThis.tableData"
        :myProps="scopeThis.tableProps"
        :scopeThis="scopeThis"
    ></ly0el-table>
    <ly0el-form
        v-if="scopeThis.formData
            && scopeThis.formProps
            && scopeThis.formProps.popup
            && scopeThis.formProps.popup.visible"
        v-model="scopeThis.formData"
        :myProps="scopeThis.formProps"
        :scopeThis="scopeThis"
    ></ly0el-form>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import {withTable} from '@yoooloo42/ly0el'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'

const props = defineProps({
    root: {
        type: Object,
        default: () => ({
            id_d0: null
        })
    }
})

const scopeThis = reactive({
    routerInstance: useRouter(),
    root: props.root,
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
    pgData: {
        query: null,
        data: {
            gbt: {
                gbt2261: [],
                gbt3304: [],
                gbt4658: []
            },
            busiCode: {}
        }
    },
})

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
