<template>
    <div style="padding: 10px;">
        <ly0Table
            v-model="tableData"
            :myProps="tableProps"
        ></ly0Table>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import dataModule from './data.js'
import propsModule from './props.js'

const tableData = reactive(dataModule)
const tableProps = reactive(propsModule)

</script>

<style scoped></style>
