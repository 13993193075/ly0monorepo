<template>
    <template v-if="!!scopeThis.id_business">
        <compIdBusiness v-model="scopeThis.id_business" :key="scopeThis.keyComp.id_business" @reload="scopeThis.keyComp.id_business++"></compIdBusiness>
    </template>
    <template v-else>
        <div class="title-box">
            <h2 class="title">房态图 - 入住登记</h2>
        </div>
        <div class="title0-box">
            <span class="label">单击房号：</span>
            <span class="label0">入住登记/查看订单信息/修改房态</span>
            <span class="refresh" @click="scopeThis.handles.collapseSwitch({scopeThis, open: true})">刷新并打开面板</span>
            <span class="refresh0" @click="scopeThis.handles.collapseSwitch({scopeThis, open: false})">刷新并关闭面板</span>
        </div>
        <el-collapse v-model="scopeThis.collapseOpen" style="padding-left: 10px; padding-right: 10px;">
            <el-collapse-item
                v-for="(hotel, index) in scopeThis.pgData.arrHotel"
                :title="hotel.name"
                :name="index"
                :key="index"
            >
                <div class="status-show-box">
                    <span class="label">维修：</span>
                    <div class="show status0">
                        {{
                            scopeThis.pgData.arrRoom.filter(i => {
                                return i.id_hotel === hotel._id && i.status_code === '0'
                            }).length
                        }}
                    </div>

                    <span class="label">空房：</span>
                    <div class="show status1">
                        {{
                            scopeThis.pgData.arrRoom.filter(i => {
                                return i.id_hotel === hotel._id && i.status_code === '1'
                            }).length
                        }}
                    </div>

                    <span class="label">入住：</span>
                    <div class="show status2">
                        {{
                            scopeThis.pgData.arrRoom.filter(i => {
                                return i.id_hotel === hotel._id && i.status_code === '2'
                            }).length
                        }}
                    </div>

                    <span class="label">脏房：</span>
                    <div class="show status3">
                        {{
                            scopeThis.pgData.arrRoom.filter(i => {
                                return i.id_hotel === hotel._id && i.status_code === '3'
                            }).length
                        }}
                    </div>

                    <span class="label">已打扫：</span>
                    <div class="show status4">
                        {{
                            scopeThis.pgData.arrRoom.filter(i => {
                                return i.id_hotel === hotel._id && i.status_code === '4'
                            }).length
                        }}
                    </div>
                </div>

                <compRoom
                    :scopeThis="scopeThis"
                    :arrRoom="scopeThis.pgData.arrRoom.filter(i => {
                        return i.id_hotel === hotel._id && !i.id_roomplace
                    })"
                ></compRoom>
                <compPlace
                    :scopeThis="scopeThis"
                    :arrRoom="scopeThis.pgData.arrRoom.filter(i => {
                        return i.id_hotel === hotel._id && i.id_roomplace
                    })"
                    :arrPlace="scopeThis.pgData.arrRoomplace.filter(i => {
                        return i.id_hotel === hotel._id
                    })"
                    :key="scopeThis.keyComp.place"
                ></compPlace>
            </el-collapse-item>
        </el-collapse>

        <!-- 修改房态 -->
        <!-- 发生新订单 -->
        <ly0el-form
            v-if="scopeThis.formProps && scopeThis.formProps.popup.visible"
            v-model="scopeThis.formData"
            :myProps="scopeThis.formProps"
            :scopeThis="scopeThis"
        ></ly0el-form>
    </template>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import compRoom from './Room.vue'
import compPlace from './Place.vue'
import compIdBusiness from '../id_business/Index.vue'
import handles from './handles.js'
import newBusiness from './new_business.js'
import setStatus from './set_status.js'

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
        arrRoomStatus: [],
        arrBooktype: [],
    },
    focus: {}, // 焦点房号（当前被点击的房号）
    arrRoomChecked: [], // 选中房号数组
    formProps: null,
    formData: null,
    id_business: null,
    newBusiness,
    setStatus,
    handles,
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
