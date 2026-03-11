<template>
    <template v-if="!!scopeThis.id_business">
        <compIdBusiness v-model="scopeThis.id_business" :key="key_id_business" @reload="key_id_business++"></compIdBusiness>
    </template>
    <template v-else>
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
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import find from './find.js'
import insertOne from './insertOne.js'
import updateOne from './updateOne.js'
import doc from './doc.js'
import pgData from './pgData.js'
import handles from './handles.js'
import compIdBusiness from '../id_business/Index.vue'
import {withTable} from '@yoooloo42/ly0el'

// 用于 订单详细 组件的内部刷新
const key_id_business = ref(0)

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
        handles,
        id_business: null
    }
)

watch(()=>scopeThis.id_business, (newVal, oldVal) => {
    if(!newVal) { // 订单详细关闭后，刷新订单记录
        withTable.refresh({scopeThis})
    }
})

onMounted(async ()=>{
    scopeThis.handles.init({scopeThis})
})
</script>
