<template>
    <div>
        <el-dialog
            v-model="scopeThis.scan.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="商品扫码"
            :width="'1240px'"
            :before-close="()=>hdls.beforeClose({state, scopeThis, emit})"
            @open="hdls.open({state})"
        >
            <!-- 编辑区 -->
            <div class="scan-box">
                <!-- 左边扫码区 -->
                <div class="left-scan">
                    <table><tbody>
                    <tr class="row">
                        <td><div class="field-label">解码算法</div></td>
                        <td>
                            <el-select
                                class="field-input"
                                v-model="state.decode_selected"
                                placeholder="请选择"
                                filterable
                            >
                                <el-option
                                    v-for="(item, index) in state.decode"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.code"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">扫码区</div></td>
                        <td>
                            <el-input
                                class="field-input"
                                v-model="state.scan.scan"
                                placeholder="请扫码，<回车>增加"
                                @change="(val)=>hdls.scan0({state, scopeThis})"
                            ></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button class="field-button" size="small" round @click="hdls.scan({state, scopeThis})">解析</el-button>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">商品编号</div></td>
                        <td>
                            <el-input
                                class="field-input"
                                v-model="state.scan.number"
                                placeholder="请输入"
                            ></el-input>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">商品名称</div></td>
                        <td>
                            <el-input
                                class="field-input"
                                v-model="state.scan.name"
                                placeholder="请输入"
                            ></el-input>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">标价名称</div></td>
                        <td>
                            <el-select
                                class="field-input"
                                v-model="state.scan.price_name"
                                placeholder="请选择"
                                filterable
                                @change="(value)=>hdls.priceNameChange({state, value})"
                            >
                                <el-option
                                    v-for="(item, index) in state.scan.arrPrice"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">单价</div></td>
                        <td>
                            <el-input
                                class="field-input"
                                style="width: 150px"
                                v-model="state.scan.price0"
                                placeholder="请输入"
                            ></el-input>
                        </td>
                    </tr>
                    <tr class="row">
                        <td><div class="field-label">数量</div></td>
                        <td>
                            <el-input
                                class="field-input"
                                style="width: 150px"
                                v-model="state.scan.count"
                                placeholder="请输入"
                            ></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button class="field-button" size="small" round @click="hdls.append({state})">增加</el-button>
                        </td>
                    </tr>
                    </tbody></table>
                </div>
                
                <!-- 右边商品列表区 -->
                <div class="right-list">
                    <div class="sum">
                        <span class="label">合计金额：¥</span>
                        <span class="value">{{
                                Math.floor(
                                    state.arrGoods.reduce((getSum, i) => {
                                        return getSum + i.price * i.count
                                    }, 0),
                                ) / 100
                            }}</span>
                    </div>
                    <div class="dashed-line">----------------------------------------</div>
                    
                    <table class="list"><tbody>
                    <tr>
                        <td>商品编号</td>
                        <td>商品名称</td>
                        <td>单价</td>
                        <td>数量</td>
                        <td class="button-delete-td"></td>
                    </tr>
                    <tr v-for="(item, index) in state.arrGoods" :key="item._id + '-' + index + state.arrGoods.length">
                        <td>{{ item.number }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                            {{
                                Math.floor(item.price) / 100 +
                                (item.price_name ? '[' + item.price_name + ']' : '')
                            }}
                        </td>
                        <td>{{ item.count }}</td>
                        <td>
                            <div class="button-delete" @click="hdls.deleteOne({state, index})">删除</div>
                        </td>
                    </tr>
                    </tbody></table>
                </div>
            </div>
            
            <!-- 提交区 -->
            <div class="line"></div>
            <div class="submit-row">
                <el-button type="success" round @click="hdls.submit({state, scopeThis})">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
@use 'scan';
</style>

<script setup>
import {ref, reactive, watch, nextTick} from "vue"
import hdls from './scan.js'

const props = defineProps(['scopeThis'])
const emit = defineEmits(['closed', 'cancel'])

const scanInit = {
    scan: '',
    id_goods: null,
    number: '',
    name: '',
    arrPrice: [],
    price_name: '',
    price: 0,
    price0: 0,
    count: 0,
}
const state = reactive({
    scanInit,
    scan: JSON.parse(JSON.stringify(scanInit)),
    decode_selected: 'goods-number',
    decode: [
        { code: 'goods-number', text: '商品编码' },
        { code: 'n3c2', text: '3位商品编码+2位数量' },
    ],
    arrGoods: [],
    winScanAnother: null, // 客户浏览窗口
})

watch(
    ()=>props.scopeThis.scan.popup.visible,
    (valNew, valOld)=>{
        if (valNew) {
            nextTick(() => {
                // 客户浏览窗口
                // 获取第二块屏幕的位置
                let secondScreen = window.screen,
                    secondScreenLeft = 0,
                    secondScreenTop = 0,
                    secondScreenWidth = 600,
                    secondScreenHeight = 800
                if (window.screen.width > window.innerWidth) {
                    secondScreenLeft = secondScreen.availLeft
                    secondScreenTop = secondScreen.availTop
                    secondScreenWidth = Math.min(600, secondScreen.availWidth)
                    secondScreenHeight = Math.min(800, secondScreen.availHeight)
                }
                state.winScanAnother = window.open(
                    '',
                    '_blank',
                    'screenX=' +
                    secondScreenLeft +
                    ',' +
                    'screenY=' +
                    secondScreenTop +
                    ',' +
                    'width=' +
                    secondScreenWidth +
                    ',' +
                    'height=' +
                    secondScreenHeight +
                    ',' +
                    'location=no,' +
                    'menubar=no,' +
                    'resizable=no,' +
                    'scrollbars=no,' +
                    'status=no,' +
                    'titlebar=no,' +
                    'toolbar=no',
                )
                state.winScanAnother.document.write(
                    '<div style="text-align:center; margin-top:20px; margin-bottom:20px;">正在扫码加入您的购物车 ...</div>' +
                    '<div style="font-size:large; text-align:center;"><span>合计金额：¥</span>' +
                    "<span id='elIdSum' style='color:red;font-size:x-large;font-weight:bold;margin-left:10px;'>0</span></div>" +
                    '<div style="text-align:center;">----------------------------------------</div>' +
                    "<table id='elIdTable' style='width:100%; text-align:center'>" +
                    '<tr><td>商品编号</td><td>名称</td><td>单价</td><td>数量</td></tr>' +
                    '</table>',
                )
            })
        }
    },
    { immediate: true }
    )
</script>
