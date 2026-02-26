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
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import {withTable} from '@yoooloo42/ly0el'
import {request as ly0request} from '@yoooloo42/ly0browser'
import tableData from '../user/table-data.js'
import tableProps from '../user/table-props.js'
import storpro from '../user/storpro.js'
import query from '../user/query.js'
import find from '../user/find.js'
import insertOne from '../user/insertOne.js'
import updateOne from '../user/updateOne.js'
import doc from '../user/doc.js'
const ly0session = ly0request.ly0.ly0sessionLoad()

const scopeThis = reactive(
    {
        routerInstance: useRouter(),
        tableData,
        tableProps,
        formData: {},
        formProps: {},
        queryInit: JSON.parse(JSON.stringify(query)),
        query: JSON.parse(JSON.stringify(query)),
        storpro,
        find,
        insertOne: JSON.parse(JSON.stringify(insertOne)),
        updateOne,
        doc,
        handles: {
            withTable
        },
        pgData: {
            query: {id_dataunit: ly0session.dataunit._id},
            data: {
                arrDataunit: [],
                arrGroup: [],
                arrGroup0: [],
            }
        }
    }
)

onMounted(async ()=>{
    scopeThis.queryInit.formData.id_dataunit = ly0session.dataunit._id
    scopeThis.query.formData.id_dataunit = ly0session.dataunit._id
    scopeThis.insertOne.formData.id_dataunit = ly0session.dataunit._id
    await withTable.init({scopeThis})
})
</script>
