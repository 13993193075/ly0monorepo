<script setup>
import { reactive, onMounted } from 'vue'
import menu from './menu.js'
import handles from './handles.js'
import compBaseInfo from './BaseInfo.vue'
import compSalebook from './Salebook.vue'
import compBGoods from './BGoods.vue'
import compBGoods0 from './BGoods0.vue'
import compBGoods1 from './BGoods1.vue'
import compBill from './Bill.vue'
import compAmount from './Amount.vue'
import compGuest from './Guest.vue'
import compMemo from './Memo.vue'
import comp_set_salebook from '../salebook/Index.vue'
import comp_set_b_goods from '../b_goods/Index.vue'
import comp_set_b_goods0 from '../b_goods0/Index.vue'
import comp_set_b_goods1 from '../b_goods1/Index.vue'
import comp_set_bill from '../bill/Index.vue'
import comp_set_guest from '../guest/Index.vue'
import comp_set_memo from '../memo/Index.vue'
import compPrint from './Print.vue'
import compPrint0 from './Print0.vue'
import compPrint1 from './Print1.vue'

// 弹出窗口
import set_baseInfo_formProps from './set_baseInfo_formProps.js'
import set_deal_formProps from './set_deal_formProps.js'
import ly0d2busiside_props from './ly0d2busiside.js'

const props = defineProps(['modelValue'])
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['reload', 'update:modelValue', 'change'])

const scopeThis= reactive({
    emit, // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
    menu,
    panel: {
        open: {
            baseInfo: [],
            salebook: [],
            bGoods: [],
            bGoods0: [],
            bGoods1: [],
            bill: [],
            amount: [],
            guest: [],
            memo: [],
        },
    },
    id_business: props.modelValue,
    business: null,
    pgData: null,
    handles,

    formData: null,
    formProps: null,
    // 弹出窗口
    set_baseInfo_formProps,
    set_deal_formProps,
    ly0d2busiside_props, // 支付记录
    set_salebook: {
        id_business: null,
    },
    set_b_goods: {
        id_business: null,
    },
    set_b_goods0: {
        id_business: null,
    },
    set_b_goods1: {
        id_business: null,
    },
    set_bill: {
        id_business: null,
    },
    set_guest: {
        id_business: null,
    },
    set_memo: {
        id_business: null,
    },
    print: {
        print1: {
            popup: {
                visible: false,
                title: '抵店登记单(22cm*9.5cm)',
                width: '700px'
            }
        },
        print0: {
            popup: {
                visible: false,
                title: '离店结算单(22cm*9.5cm)',
                width: '700px'
            }
        },
        print: {
            popup: {
                visible: false,
                title: '订单详细(29.7cm*21cm)(A4)',
                width: '980px'
            }
        },
    }
})

const style = {
    mainBox: {
        height: '600px',
        'box-shadow': 'var(--el-border-color-light) 0px 0px 10px',
    },
    panelBox: {
        'padding-left': '10px',
        'padding-right': '10px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
}
const elSplitterPanel_collapsible = false
const elSplitterPanel_min_width="200px"
const elSplitterPanel_min_height="100px"

onMounted(async () => {
    await scopeThis.handles.init({scopeThis})
})
</script>

<template>
    <ly0el-menu :myProps="scopeThis.menu" :scopeThis="scopeThis"></ly0el-menu>
    <div v-if="scopeThis.business" style="padding: 10px;">
        <div :style="style.mainBox">
            <el-splitter>
                <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_width">
                    <el-splitter layout="vertical">
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.baseInfo">
                                    <el-collapse-item title="订单基本信息" name="0">
                                        <comp-base-info :scopeThis="scopeThis"></comp-base-info>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.salebook">
                                    <el-collapse-item title="房型预订" name="0">
                                        <comp-salebook :scopeThis="scopeThis"></comp-salebook>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.bGoods">
                                    <el-collapse-item title="用房记录" name="0">
                                        <comp-b-goods :scopeThis="scopeThis"></comp-b-goods>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                    </el-splitter>
                </el-splitter-panel>
                <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_width">
                    <el-splitter layout="vertical">
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.bGoods0">
                                    <el-collapse-item title="配售商品" name="0">
                                        <comp-b-goods0 :scopeThis="scopeThis"></comp-b-goods0>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.bGoods1">
                                    <el-collapse-item title="损赔物品" name="0">
                                        <comp-b-goods1 :scopeThis="scopeThis"></comp-b-goods1>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.bill">
                                    <el-collapse-item title="挂账记录" name="0">
                                        <comp-bill :scopeThis="scopeThis"></comp-bill>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                    </el-splitter>
                </el-splitter-panel>
                <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_width">
                    <el-splitter layout="vertical">
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.amount">
                                    <el-collapse-item title="计费信息" name="0">
                                        <comp-amount :scopeThis="scopeThis"></comp-amount>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.guest">
                                    <el-collapse-item title="旅客信息" name="0">
                                        <comp-guest :scopeThis="scopeThis"></comp-guest>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                        <el-splitter-panel :collapsible="elSplitterPanel_collapsible" :min="elSplitterPanel_min_height">
                            <div :style="style.panelBox"><!-- 恢复块级 -->
                                <el-collapse v-model="scopeThis.panel.open.memo">
                                    <el-collapse-item title="备忘信息" name="0">
                                        <comp-memo :scopeThis="scopeThis"></comp-memo>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-splitter-panel>
                    </el-splitter>
                </el-splitter-panel>
            </el-splitter>
        </div>
    </div>

    <ly0el-form
        v-if="scopeThis.formData
                && scopeThis.formProps
                && scopeThis.formProps.popup
                && scopeThis.formProps.popup.visible"
        v-model="scopeThis.formData"
        :myProps="scopeThis.formProps"
        :scopeThis="scopeThis"
    ></ly0el-form>

    <ly0d2busiside
        v-if="!!scopeThis.ly0d2busiside_props.popup.visible"
        :myProps="scopeThis.ly0d2busiside_props"
    ></ly0d2busiside>

    <comp_set_salebook
        v-if="!!scopeThis.set_salebook.id_business"
        :myProps="scopeThis.set_salebook"
        @close="scopeThis.handles.setClosed.salebook({scopeThis})"
    ></comp_set_salebook>

    <comp_set_b_goods
        v-if="!!scopeThis.set_b_goods.id_business"
        :myProps="scopeThis.set_b_goods"
        @close="scopeThis.handles.setClosed.b_goods({scopeThis})"
    ></comp_set_b_goods>

    <comp_set_b_goods0
        v-if="!!scopeThis.set_b_goods0.id_business"
        :myProps="scopeThis.set_b_goods0"
        @close="scopeThis.handles.setClosed.b_goods0({scopeThis})"
    ></comp_set_b_goods0>

    <comp_set_b_goods1
        v-if="!!scopeThis.set_b_goods1.id_business"
        :myProps="scopeThis.set_b_goods1"
        @close="scopeThis.handles.setClosed.b_goods1({scopeThis})"
    ></comp_set_b_goods1>

    <comp_set_bill
        v-if="!!scopeThis.set_bill.id_business"
        :myProps="scopeThis.set_bill"
        @close="scopeThis.handles.setClosed.bill({scopeThis})"
    ></comp_set_bill>

    <comp_set_guest
        v-if="!!scopeThis.set_guest.id_business"
        :myProps="scopeThis.set_guest"
        @close="scopeThis.handles.setClosed.guest({scopeThis})"
    ></comp_set_guest>

    <comp_set_memo
        v-if="!!scopeThis.set_memo.id_business"
        :myProps="scopeThis.set_memo"
        @close="scopeThis.handles.setClosed.memo({scopeThis})"
    ></comp_set_memo>

    <compPrint v-if="!!scopeThis.print.print.popup.visible" :scopeThis="scopeThis"></compPrint>
    <compPrint0 v-if="!!scopeThis.print.print0.popup.visible" :scopeThis="scopeThis"></compPrint0>
    <compPrint1 v-if="!!scopeThis.print.print1.popup.visible" :scopeThis="scopeThis"></compPrint1>
</template>

<style scoped lang="scss">
</style>
