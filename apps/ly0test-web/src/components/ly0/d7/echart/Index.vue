<template>
    <div style="padding-left: 10px; padding-right: 10px">
        <h2 style="text-align: center">时段应收统计</h2>
        <el-button-group class="top-button-box">
            <el-button class="top-button" @click="handles.reset({scopeThis})">重置</el-button>
            <el-button class="top-button" @click="handles.reload({scopeThis})">刷新</el-button>
            <el-button class="top-button" @click="scopeThis.find.popup.visible = true">查询</el-button>
        </el-button-group>
        <el-collapse v-model="scopeThis.collapseOpen">
            <el-collapse-item
                v-for="(shop, index) in scopeThis.data.shop"
                :title="shop.name"
                :name="index"
                :key="index"
            >
                <div class="echarts-show-box" :id="'echarts-show' + index"></div>
            </el-collapse-item>
        </el-collapse>
        
        <comp-find :scopeThis="scopeThis"></comp-find>
    </div>
</template>

<style scoped lang="scss">
@use 'index';
</style>

<script setup>
import compFind from './Find.vue'
import handles from './handles.js'
import { reactive, onMounted } from 'vue'

const scopeThis = reactive({
    collapseOpen: [],
    data: {
        // 后台获取的数据源
        shop: [],
        business: [],
    },
    arrDate: [
        {
            // 时间段
            dateFrom: null,
            dateTo: null,
        },
    ],
    find: {
        // 查询
        popup: {
            visible: false,
        },
    },
    handles,
})

onMounted(async () => {
    await scopeThis.handles.reset({scopeThis})
    // 展开全部面板
    scopeThis.data.shop.forEach((item, index) => {
        scopeThis.collapseOpen.push(index)
    })
})
</script>
