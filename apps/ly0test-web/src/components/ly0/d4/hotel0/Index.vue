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
import tableData from '../hotel/table-data.js'
import tableProps from './table-props.js'
import storpro from '../hotel/storpro.js'
import query from '../hotel/query.js'
import find from '../hotel/find.js'
import updateOne from '../hotel/updateOne.js'
import doc from '../hotel/doc.js'

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
