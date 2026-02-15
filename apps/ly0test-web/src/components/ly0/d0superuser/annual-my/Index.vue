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
import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import hanles from './handles.js'

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
        handles: {
            withTable,
            getStatus: hanles.getStatus,
            setStatus: hanles.setStatus,
            setFail: hanles.setFail,
            getCodeUrl: hanles.getCodeUrl,
        },
        qrcode: {
            code_url: '',
            amount: 0,
            id_business: null,
            mchid: '',
            popup: {
                visible: true,
                title: '微信支付.商户二维码收款',
            },
        }
    }
)

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
