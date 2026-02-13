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
        doc
    }
)

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
