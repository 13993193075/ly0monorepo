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
    <ly0el-newnumber v-if="scopeThis.newNumber.popup.visible" :myProps="scopeThis.newNumber"></ly0el-newnumber>
    <ly0el-idlogin v-if="scopeThis.id_login.popup.visible" :myProps="scopeThis.id_login"></ly0el-idlogin>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { request as ly0request } from '@yoooloo42/ly0browser'
import {withTable} from '@yoooloo42/ly0el'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'
import doc from './doc.js'
import newNumber from '../../d0superuser/user/newNumber.js'
import id_login from '../../d0superuser/user/id_login.js'

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
        newNumber,
        id_login
    }
)
// 用户表名重置
scopeThis.newNumber.userTbl = 'ly0d7guest'

onMounted(async ()=>{
    const ly0session = ly0request.ly0.ly0sessionLoad()
    scopeThis.queryInit.formData.id_dataunit = ly0session.dataunit._id
    scopeThis.insertOne.formData.id_dataunit = ly0session.dataunit._id
    await withTable.init({scopeThis})
})
</script>
