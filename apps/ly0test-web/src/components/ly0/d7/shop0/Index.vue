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
import tableData from '../shop/table-data.js'
import tableProps from './table-props.js'
import storpro from '../shop/storpro.js'
import query from '../shop/query.js'
import find from '../shop/find.js'
import updateOne from '../shop/updateOne.js'
import doc from '../shop/doc.js'

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
        updateOne,
        doc
    }
)

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
