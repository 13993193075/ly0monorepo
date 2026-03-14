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
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {request as ly0request} from "@yoooloo42/ly0browser";
import {utils as ly0utils} from "@yoooloo42/ly0utils"
import {withTable} from '@yoooloo42/ly0el'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'
import doc from './doc.js'
import pgData from "./pgData.js";
import newNumber from './newNumber.js'
import id_login from './id_login.js'

const scopeThis = reactive(
    {
        routerInstance: useRouter(),
        ly0session: null,
        tableData,
        tableProps,
        formData: {},
        formProps: {},
        queryInit: ly0utils.deepClone.deepClone(query),
        query: ly0utils.deepClone.deepClone(query),
        storpro,
        find: ly0utils.deepClone.deepClone(find),
        insertOne: ly0utils.deepClone.deepClone(insertOne),
        updateOne: ly0utils.deepClone.deepClone(updateOne),
        doc,
        pgData: ly0utils.deepClone.deepClone(pgData),
        handles: {
            withTable
        },
        newNumber: JSON.parse(JSON.stringify(newNumber)),
        id_login: JSON.parse(JSON.stringify(id_login)),
    }
)

onMounted(async ()=>{
    scopeThis.ly0session = ly0request.ly0.ly0sessionLoad()
    await withTable.init({scopeThis})
})

// 注册新工号|绑定已有工号后刷新
watch([
    ()=>scopeThis.newNumber.popup.visible,
    ()=>scopeThis.id_login.popup.visible,
], ([newPopup1, newPopup2], [oldPopup1, oldPopup2])=>{
    if(newPopup1 === false || newPopup2 === false){
        withTable.refresh({scopeThis, noMessage: true})
    }
})
</script>
