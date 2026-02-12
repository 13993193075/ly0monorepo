<script setup>
import {ref, reactive, computed, onMounted, watch} from 'vue'
import tableData from './table-data.js'
import tableProps from './table-props.js'
import storpro from './storpro.js'
import query from './query.js'
import doc from './doc.js'
import handles from './handles.js'
import amountBox from './amount-box.js'
import cashBox from './cash-box.js'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({})
    }
})

const scopeThis = reactive({
    tableData,
    tableProps,
    formData: {},
    formProps: {},
    queryInit: query,
    query: JSON.parse(JSON.stringify(query)),
    storpro,
    doc,
    pgData: {
        query: null,
        data: {
            arrBusinessType: [],
            arrProcess: [],
            arrMethod: [],
            arrStatus: []
        }
    },
    handles,
    initBox: props.myProps,
    amountBox: computed(()=>{
        return amountBox.fun({scopeThis})
    }),
    cashBox
})

onMounted(async ()=>{
    await scopeThis.handles.init({scopeThis})
})

watch(() => scopeThis.cashBox.formProps.submitted, async (newVal) => {
    if(!!newVal){
        await scopeThis.handles.init({scopeThis})
        scopeThis.cashBox.formProps.submitted = false
    }
})

const style = ref({
    amount: {
        textAlign: 'center',
        fontSize: '16px',
        color: 'blue',
        weight: 'bold'
    }
})
</script>

<template>
    <!-- 金额统计 -->
    <table style="width: 100%;">
        <thead><tr>
            <th>订单金额（应收应付）</th>
            <th>支付中</th>
            <th>支付成功</th>
            <th>支付失败</th>
            <th>未支付</th>
        </tr></thead>
        <tbody><tr>
            <td :style="style.amount">{{Math.floor(scopeThis.initBox.deal) / 100}}</td>
            <td :style="style.amount">{{Math.floor(scopeThis.amountBox.started) / 100}}</td>
            <td :style="style.amount">{{Math.floor(scopeThis.amountBox.succeeded) / 100}}</td>
            <td :style="style.amount">{{Math.floor(scopeThis.amountBox.failed) / 100}}</td>
            <td :style="style.amount">{{Math.floor(scopeThis.amountBox.unpaid) / 100}}</td>
        </tr></tbody>
    </table>
    
    <!-- 支付记录 -->
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
    
    <!-- 收银 -->
    <ly0d2cash
        v-model="scopeThis.cashBox.formData"
        :myProps="scopeThis.cashBox.formProps"
    ></ly0d2cash>
</template>

<style scoped lang="scss">

</style>