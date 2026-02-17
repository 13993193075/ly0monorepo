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
import {ElMessage, ElMessageBox} from 'element-plus'
import { useRouter } from 'vue-router';
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
        handles: {
            withTable,
            // 注册打印机
            register({scopeThis, row}) {
                ElMessageBox.confirm('注册打印机?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    ly0request.ly0.storpro({
                        storproName: 'ly0d1.d1printer.register',
                        data: {
                            id_ukey: row.id_ukey,
                            sn: row.sn,
                            key: row.key,
                            note: row.note,
                            carnum: row.carnum,
                        },
                    }).then((result) => {
                        ElMessage({
                            type: 'info',
                            message: result.message,
                        })
                    })
                }).catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消删除',
                    })
                })
            },
        }
    }
)

onMounted(async ()=>{
    await withTable.init({scopeThis})
})
</script>
