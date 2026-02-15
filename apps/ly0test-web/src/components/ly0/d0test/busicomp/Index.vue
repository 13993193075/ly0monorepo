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
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {blindboxes} from 'packages/ly0utils/src/index.js'
import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
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
        tableProps: blindboxes.deepClone.deepMerge(blindboxes.deepClone.deepClone(tableProps), {
            titleLine: { // 标题线
                text: "业务构件"
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
