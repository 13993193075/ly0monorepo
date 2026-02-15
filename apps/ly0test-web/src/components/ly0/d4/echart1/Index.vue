<template>
    <div style="padding: 10px">
        <h2 class="title">销售态势分析</h2>
        <el-button-group class="top-button-box">
            <el-button class="top-button" @click="scopeThis.handles.reset({scopeThis})">重置</el-button>
            <el-button class="top-button" @click="scopeThis.handles.reload({scopeThis})">刷新</el-button>
            <el-button class="top-button" @click="scopeThis.find.popup.visible = true">查询</el-button>
        </el-button-group>

        <el-collapse v-model="scopeThis.collapseOpen" style="padding-left: 10px; padding-right: 10px">
            <el-collapse-item
                v-for="(itemHotel, indexHotel) in scopeThis.data.hotel"
                :title="itemHotel.name"
                :name="'hotel.' + itemHotel._id"
                :key="'hotel.' + itemHotel._id"
            >
                <el-collapse-item
                    v-for="(itemDate, indexDate) in scopeThis.arrDate"
                    :title="scopeThis.handles.dateFormat(itemDate.dateFrom, 'yyyy/M/d') + ' - ' +
                        scopeThis.handles.dateFormat(itemDate.dateTo, 'yyyy/M/d') + ' ' +
                        '（天数：' + scopeThis.handles.dateFormat(itemDate.dateFrom, itemDate.dateTo) + '）'"
                    :name="'hotel.' + itemHotel._id + '-date.' + indexDate"
                    :key="'hotel.' + itemHotel._id + '-date.' + indexDate"
                >
                    <el-row>
                        <el-col :span="8">
                            <div class="label-sum">
                                房*天数销售 合计：{{
                                    scopeThis.hdlDatashow.dataItem({
                                        dataShow: scopeThis.dataShow,
                                        idx: 'hotel-date',
                                        itemHotel,
                                        indexDate
                                    }).countSale
                                }}
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <el-progress
                                class="bar-sum"
                                :percentage="scopeThis.hdlDatashow.dataItem({
                                    dataShow: scopeThis.dataShow,
                                    idx: 'hotel-date',
                                    itemHotel, indexDate
                                }).countSale_percent"
                                :show-text="false"
                            ></el-progress>
                        </el-col>
                    </el-row>
                    <template
                        v-for="(itemBooktype, indexBooktype) in scopeThis.data.booktype"
                        :key="'hotel.' + itemHotel._id + '-date.' + indexDate + '-booktype.' + itemBooktype._id"
                    >
                        <el-collapse-item
                            v-if="itemBooktype.id_hotel === itemHotel._id"
                            :title="itemBooktype.text"
                            :name="'hotel.' + itemHotel._id + '-date.' + indexDate + '-booktype.' + itemBooktype._id"
                        >
                            <el-row>
                                <el-col :span="8">
                                    <div class="label-sum">
                                        房*天数销售 合计：{{scopeThis.hdlDatashow.dataItem({
                                                dataShow: scopeThis.dataShow,
                                                idx: 'hotel-date-booktype',
                                                itemHotel,
                                                indexDate,
                                                itemBooktype,
                                            }).countSale
                                        }}
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <el-progress
                                        class="bar-sum"
                                        :percentage="scopeThis.hdlDatashow.dataItem({
                                                dataShow: scopeThis.dataShow,
                                                idx: 'hotel-date-booktype',
                                                itemHotel,
                                                indexDate,
                                                itemBooktype,
                                            }).countSale_percent"
                                        :show-text="false"
                                    ></el-progress>
                                </el-col>
                            </el-row>
                            <div
                                v-for="(itemGoods, indexGoods) in scopeThis.data.goods"
                                :key="indexGoods"
                            >
                                <template v-if="itemGoods.id_hotel === itemHotel._id">
                                    <el-row>
                                        <el-col :span="8">
                                            <div class="label-sum">
                                                {{itemGoods.name + '：' +
                                            scopeThis.hdlDatashow.dataItem({
                                                dataShow: scopeThis.dataShow,
                                                idx: 'hotel-date-goods-booktype',
                                                itemHotel,
                                                indexDate,
                                                itemGoods,
                                                itemBooktype,
                                            }).countSale
                                                }}
                                            </div>
                                        </el-col>
                                        <el-col :span="16">
                                            <el-progress
                                                class="bar-sum"
                                                :percentage="scopeThis.hdlDatashow.dataItem({
                                                    dataShow: scopeThis.dataShow,
                                                    idx: 'hotel-date-goods-booktype',
                                                    itemHotel,
                                                    indexDate,
                                                    itemGoods,
                                                    itemBooktype,
                                                }).countSale_percent"
                                                :show-text="false"
                                            ></el-progress>
                                        </el-col>
                                    </el-row>
                                </template>
                            </div>
                            <el-row>
                                <el-col :span="8">
                                    <div class="label-sum">
                                        未明确的房型：{{scopeThis.hdlDatashow.dataItem({
                                                dataShow: scopeThis.dataShow,
                                                idx: 'hotel-date-booktype',
                                                itemHotel,
                                                indexDate,
                                                itemBooktype,
                                            }).countSaleUnknown
                                        }}
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <el-progress
                                        class="bar-sum"
                                        :percentage="scopeThis.hdlDatashow.dataItem({
                                                dataShow: scopeThis.dataShow,
                                                idx: 'hotel-date-booktype',
                                                itemHotel,
                                                indexDate,
                                                itemBooktype,
                                            }).countSaleUnknown_percent"
                                        :show-text="false"
                                    ></el-progress>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </template>
                    <el-collapse-item
                        title="未明确的预订类型"
                        :name="'hotel.' + itemHotel._id + '-date.' + indexDate + '-booktype.unknown'"
                        :key="'hotel.' + itemHotel._id + '-date.' + indexDate + '-booktype.unknown'"
                    >
                        <el-row>
                            <el-col :span="8">
                                <div class="label-sum">
                                    房*天数销售 合计：{{
                                        scopeThis.hdlDatashow.dataItem({
                                            dataShow: scopeThis.dataShow,
                                            idx: 'hotel-date',
                                            itemHotel,
                                            indexDate
                                        }).countSaleUnknown0
                                    }}
                                </div>
                            </el-col>
                            <el-col :span="16">
                                <el-progress
                                    class="bar-sum"
                                    :percentage="scopeThis.hdlDatashow.dataItem({
                                            dataShow: scopeThis.dataShow,
                                            idx: 'hotel-date',
                                            itemHotel,
                                            indexDate
                                        }).countSaleUnknown0_percent"
                                    :show-text="false"
                                ></el-progress>
                            </el-col>
                        </el-row>
                        <template v-for="(itemGoods, indexGoods) in scopeThis.data.goods" :key="indexGoods">
                            <div v-if="itemGoods.id_hotel === itemHotel._id">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="label-sum">
                                            {{itemGoods.name + '：' + scopeThis.hdlDatashow.dataItem({
                                                    dataShow: scopeThis.dataShow,
                                                    idx: 'hotel-date-goods',
                                                    itemHotel,
                                                    indexDate,
                                                    itemGoods,
                                                }).countSaleUnknown
                                            }}
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-progress
                                            class="bar-sum"
                                            :percentage="scopeThis.hdlDatashow.dataItem({
                                                    dataShow: scopeThis.dataShow,
                                                    idx: 'hotel-date-goods',
                                                    itemHotel,
                                                    indexDate,
                                                    itemGoods,
                                                }).countSaleUnknown_percent"
                                            :show-text="false"
                                        ></el-progress>
                                    </el-col>
                                </el-row>
                            </div>
                        </template>
                        <el-row>
                            <el-col :span="8">
                                <div class="label-sum">
                                    未明确的房型：{{
                                        scopeThis.hdlDatashow.dataItem({
                                            dataShow: scopeThis.dataShow,
                                            idx: 'hotel-date',
                                            itemHotel,
                                            indexDate
                                        }).countSaleUnknown
                                    }}
                                </div>
                            </el-col>
                            <el-col :span="16">
                                <el-progress
                                    class="bar-sum"
                                    :percentage="scopeThis.hdlDatashow.dataItem({
                                            dataShow: scopeThis.dataShow,
                                            idx: 'hotel-date',
                                            itemHotel,
                                            indexDate
                                        }).countSaleUnknown_percent"
                                    :show-text="false"
                                ></el-progress>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse-item>
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
import hdlDatashow from './hdl-datashow.js'
import { reactive, onMounted } from 'vue'

const scopeThis = reactive({
    collapseOpen: [],
    // 后台获取的数据源
    data: {
        hotel: [], // 旅店信息
        booktype: [], // 预订类型
        goods: [], // 房型信息
        business: [], //订单数据
        salebook: [], //房型销售
        room: [], //客房资源
    },
    // 数据渲染
    dataShow: [],
    // 时间段
    arrDate: [
        {
            dateFrom: null,
            dateTo: null,
        },
    ],
    // 查询
    find: {
        popup: {
            visible: false,
        },
    },
    handles,
    hdlDatashow,
})

onMounted(() => {
    handles.reset({scopeThis})
})
</script>
