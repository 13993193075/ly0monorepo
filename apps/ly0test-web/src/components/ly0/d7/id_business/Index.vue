<script setup>
import { reactive, onMounted } from 'vue'
import menu from './menu.js'
import handles from './handles.js'
import compBaseInfo from './BaseInfo.vue'
import compBGoods from './BGoods.vue'
import compMemo from './Memo.vue'
import compScan from "./Scan.vue"
import ly0d2busiside_props from "./ly0d2busiside.js"
import compPrint from './Print.vue'
import compSmallticket from "./Smallticket.vue"
import set_deal_formProps from "./set_deal_formProps.js"
import set_baseInfo_formProps from "./set_baseInfo_formProps.js"
// import comp_set_b_goods from '../b_goods/Index.vue'
import comp_set_memo from '../memo/Index.vue'

const props = defineProps(['modelValue'])
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['reload', 'update:modelValue', 'change'])

const scopeThis= reactive({
    emit, // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
    menu,
    panel: {
        open: {
            baseInfo: [],
            bGoods: [],
            memo: [],
        },
    },
    id_business: props.modelValue,
    business: null,
    handles,
    formData: null,
    formProps: null,

    // 弹出窗口
    set_baseInfo_formProps,
    set_deal_formProps,
    ly0d2busiside_props, // 支付记录
    scan: {
        popup: {
            visible: false,
        },
    },
    print: {
        popup: {
            visible: false,
            title: '订单详细(29.7cm*21cm)(A4)',
            width: '980px'
        }
    },
    smallticket: {
        popup: {
            visible: false,
        },
    },
    set_b_goods: {
        id_business: null,
    },
    set_memo: {
        id_business: null,
    },
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
                                    <el-collapse-item title="备忘" name="0">
                                        <comp-memo :scopeThis="scopeThis"></comp-memo>
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
                                <el-collapse v-model="scopeThis.panel.open.bGoods">
                                    <el-collapse-item title="交易明细" name="0">
                                        <comp-b-goods :scopeThis="scopeThis"></comp-b-goods>
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

    <ly0el-d2busiside
        v-if="!!scopeThis.ly0d2busiside_props.popup.visible"
        :myProps="scopeThis.ly0d2busiside_props"
    ></ly0el-d2busiside>
    
    <!--comp_set_b_goods
        v-if="!!scopeThis.set_b_goods.id_business"
        :myProps="scopeThis.set_b_goods"
        @close="scopeThis.handles.setClosed.b_goods({scopeThis})"
    ></comp_set_b_goods-->
    
    <comp_set_memo
        v-if="!!scopeThis.set_memo.id_business"
        :myProps="scopeThis.set_memo"
        @close="scopeThis.handles.setClosed.memo({scopeThis})"
    ></comp_set_memo>
    
    <compScan v-if="!!scopeThis.scan.popup.visible" :scopeThis="scopeThis"></compScan>
    <compPrint v-if="!!scopeThis.print.popup.visible" :scopeThis="scopeThis"></compPrint>
    <compSmallticket v-if="!!scopeThis.smallticket.popup.visible" :scopeThis="scopeThis"></compSmallticket>
</template>

<style scoped lang="scss">
</style>
