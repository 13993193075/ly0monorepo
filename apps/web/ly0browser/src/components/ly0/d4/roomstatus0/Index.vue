<template>
    <template v-if="!!scopeThis.id_business">
        <compIdBusiness v-model="scopeThis.id_business" :key="scopeThis.keyComp.id_business" @reload="scopeThis.keyComp.id_business++"></compIdBusiness>
    </template>
    <template v-else>
        <div class="title-box">
            <h2 class="title">房态图 - 预订情况</h2>
        </div>
        <div class="title0-box">
            <span class="label">单击房号：</span>
            <span class="label0">查看订单信息</span>
            <span class="refresh" @click="scopeThis.handles.collapseSwitch({scopeThis, open: true})">刷新并打开面板</span>
            <span class="refresh0" @click="scopeThis.handles.collapseSwitch({scopeThis, open: false})">刷新并关闭面板</span>
        </div>
        <el-collapse v-model="scopeThis.collapseOpen" style="padding-left: 10px; padding-right: 10px">
            <el-collapse-item
                v-for="(hotel, index) in scopeThis.pgData.arrHotel"
                :title="hotel.name"
                :name="index"
                :key="index"
            >
                <compBGoods
                    :scopeThis="scopeThis"
                    :arrBGoods="scopeThis.pgData.arrBGoods.filter(i => {
                        return i.id_hotel._id === hotel._id && !i.id_room.id_roomplace
                    })"
                ></compBGoods>
                <compPlace
                    :scopeThis="scopeThis"
                    :arrBGoods="scopeThis.pgData.arrBGoods.filter(i => {
                        return i.id_hotel._id === hotel._id && i.id_room.id_roomplace
                    })"
                    :arrPlace="scopeThis.pgData.arrRoomplace.filter(i => {
                        return i.id_hotel === hotel._id
                    })"
                    :key="scopeThis.keyComp.place"
                ></compPlace>
            </el-collapse-item>
        </el-collapse>
    </template>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script setup>
import compBGoods from './BGoods.vue'
import compPlace from './Place.vue'
import compIdBusiness from '../id_business/Index.vue'
import handles from './handles.js'
import { onMounted, reactive, watch } from 'vue'

const scopeThis = reactive({
    keyComp: {
        id_business: 0,
        place: 0
    },
    collapseSwitch: true,
    collapseOpen: [],
    pgData: {
        arrHotel: [],
        arrRoomplace: [],
        arrRoom: [],
    },
    focus: {}, // 焦点房号（当前被点击的房号）
    id_business: null,
})

watch(()=>scopeThis.id_business, (newVal, oldVal) => {
    if(!newVal) { // 订单详细关闭后，刷新订单记录
        handles.reload({scopeThis})
    }
})

onMounted(() => {
    handles.reload({scopeThis})
})
</script>
