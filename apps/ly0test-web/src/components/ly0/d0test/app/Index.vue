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
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {withTable} from '@yoooloo42/ly0el'
import tableData from '../first/table-data.js'
import tableProps from '../first/table-props.js'
import storpro from './storpro.js'
import query from '../first/query.js'
import find from '../first/find.js'
import insertOne from '../first/insertOne.js'
import updateOne from '../first/updateOne.js'
import doc from '../first/doc.js'

const scopeThis = reactive(
    {
        routerInstance: useRouter(),
        tableData,
        tableProps: ly0utils.deepClone.deepMerge(ly0utils.deepClone.deepClone(tableProps), {
            titleLine: { // 标题线
                text: "应用"
            }
        }),
        formData: {},
        formProps: {},
        queryInit: query,
        query: JSON.parse(JSON.stringify(query)),
        storpro,
        find,
        insertOne,
        updateOne,
        doc
    }
)

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
