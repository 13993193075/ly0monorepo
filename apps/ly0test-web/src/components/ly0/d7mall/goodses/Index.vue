<template>
    <div class="root">
        <div class="goods-list">
            <div class="search-box">
                <el-input
                    class="search"
                    v-model="state.searchword"
                    @change="hdlSearchKey"
                >
                    <template v-slot:append>
                        <el-button-group style="width: 160px">
                            <el-button
                                type="danger"
                                size="small"
                                plain
                                class="button"
                                @click="hdlSearchKey"
                            >
                                <el-icon class="el-icon--left"><Search /></el-icon>
                                搜索
                            </el-button>
                            <el-button
                                type="danger"
                                size="small"
                                plain
                                class="button"
                                @click="state.group.popup.visible = true"
                            >
                                分类关键字
                                <el-icon class="el-icon--right"><Notebook /></el-icon>
                            </el-button>
                        </el-button-group>
                    </template>
                </el-input>
                <el-button
                    class="my-cart"
                    type="danger"
                    plain
                    size="small"
                    @click="scopeThis.jump.toCart({scopeThis})"
                >
                    <el-icon class="el-icon--left"><ShoppingCart /></el-icon>
                    我的购物车
                </el-button>
            </div>
            <div class="goods-item" v-for="(itemGoods, indexGoods) in state.dataBox.data">
                <div class="image-box" @click="scopeThis.jump.toGoods({scopeThis, id_goods: itemGoods._id})">
                    <el-image :src="itemGoods.thumb[0]"></el-image>
                </div>
                <div
                    class="name-box truncate-2-lines"
                    @click="scopeThis.jump.toGoods({scopeThis, id_goods: itemGoods._id})"
                >
                    <span class="name">{{ itemGoods.name }}</span>
                </div>
                <div class="price-box">
                    <span>{{ '¥' + Math.floor(itemGoods.price[0].price) / 100 }}</span>
                </div>
                <div class="add-cart-box">
                    <el-button
                        type="danger"
                        plain
                        size="small"
                        @click="scopeThis.jump.cartAddOne({scopeThis, id_goods: itemGoods._id})"
                    >
                        <el-icon class="el-icon--left"><ShoppingCart /></el-icon>
                        加入购物车
                    </el-button>
                </div>
            </div>
        </div>
        <el-drawer
            title="商品分类关键字"
            :visible.sync="state.group.popup.visible"
            :with-header="true"
            :size="'32%'"
        >
            <div class="key-list">
                <template v-for="(item, index) in state.group.dataBox.data">
                    <el-checkbox
                        class="key-check"
                        v-model="state.group.dataBox.arrChecked"
                        :label="item.name"
                        border
                        @change="hdlKeyChecked"
                    ></el-checkbox>
                </template>
                
                <div class="line"></div>
                <div class="submit-box">
                    <el-button-group>
                        <el-button
                            type="danger"
                            size="small"
                            plain
                            @click="hdlSearchKey"
                        >
                            <el-icon class="el-icon--left"><Search /></el-icon>
                            提交搜索
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            plain
                            @click="state.group.dataBox.arrChecked = []"
                        >
                            <el-icon class="el-icon--left"><RefreshLeft /></el-icon>
                            复位
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import {reactive, onMounted} from "vue"
import handles from './handles.js'

const props = defineProps(['scopeThis'])
const state = reactive({
    searchword: '',
    group: {
        popup: {
            visible: false,
        },
        dataBox: {
            data: [],
            total: 0,
            query: {
                limit: 100,
                page: 1,
                sort: {
                    // 按商品分类名称排序
                    label: 'name',
                    order: 1,
                },
            },
            arrChecked: [],
        },
    },
    dataBox: {
        data: [],
        total: 0,
        query: {
            limit: 100,
            page: 1,
            sort: {
                // 按商品编号排序
                label: 'number',
                order: 1,
            },
        },
    },
})

function hdlSearchKey() {
    state.group.popup.visible = false
    handles.getData({scopeThis: props.scopeThis, state})
}

function hdlKeyChecked() {
    console.log(props.scopeThis.group.dataBox.arrChecked)
}

onMounted(async ()=>{
    await handles.getData({scopeThis: props.scopeThis, state})
    await handles.groupGetData({scopeThis: props.scopeThis, state})
})
</script>

<style scoped lang="scss">
// 根
.root {
    text-align: center;
    // 商品列表
    .goods-list {
        display: inline-block;
        width: 75%;
        // 搜索框
        .search-box {
            margin-top: 10px;
            margin-bottom: 10px;
            .search {
                width: 50%;
                border: solid 1px red !important;
                .button {
                    height: 40px;
                    border-radius: 0;
                }
            }
            .my-cart {
                margin-left: 10px;
            }
        }
        // 商品条目
        .goods-item {
            display: inline-block;
            width: 160px;
            margin: 10px;
            vertical-align: top;
            // 商品图标
            .image-box {
                text-align: center;
                .image {
                    width: 120px;
                    height: 120px;
                }
            }
            // 商品名称
            .name-box {
                text-align: center;
                .name {
                    font-size: x-small;
                }
            }
            // 单价
            .price-box {
                text-align: center;
                color: red;
            }
            // 加入购物车
            .add-cart-box {
                text-align: center;
            }
        }
    }
    .key-list {
        text-align: left;
        .key-check {
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
        }
        .submit-box {
            text-align: center;
            .button {
            }
        }
    }
}
.line {
    height: 1px;
    background-color: #919191;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>

<style scoped lang="scss">
@use '@yoooloo42/ly0scss/truncate-2-lines';
@use '@yoooloo42/ly0scss/el-input__inner';
</style>
