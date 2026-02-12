<template>
    <el-menu
        :mode="myProps_box.mode"
        :default-active="myProps_box.defaultActive"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :background-color="myProps_box.backgroundColor"
        :text-color="myProps_box.textColor"
        :active-text-color="myProps_box.activeTextColor"
        menu-trigger="hover"
        :style="'--el-menu-horizontal-height: ' + myProps_box.horizontalHeight + '; ' +
            myProps_box.styleBase + ' ' +
            myProps_box.style"
    >
        <!-- 第1层 -->
        <template
            v-for="(item, index) in myProps_box.menu"
            :key="item.index ? item.index : String(index)"
        >
            <el-menu-item
                v-if="!item.menu || item.menu.length === 0"
                :index="item.index ? item.index : String(index)"
                :disabled="
                    'disabled' in item
                    ? item.disabled
                    : 'hdlDisabled' in item
                        ? item.hdlDisabled({scopeThis: scopeThis_box, item, index})
                        : false
                "
            >{{ item.title }}</el-menu-item>
            <el-sub-menu v-else :index="item.index ? item.index : String(index)">
                <template #title>{{ item.title }}</template>
                <!-- 第2层 -->
                <template
                    v-for="(item0, index0) in item.menu"
                    :key="item0.index ? item0.index : String(index) + '-' + String(index0)"
                >
                    <el-menu-item
                        v-if="!item0.menu || item0.menu.length === 0"
                        :index="item0.index ? item0.index : String(index) + '-' + String(index0)"
                        :disabled="
                            'disabled' in item0
                            ? item0.disabled
                            : 'hdlDisabled' in item0
                                ? item0.hdlDisabled({scopeThis: scopeThis_box, item: item0, index: index0})
                                : false
                        "
                    >{{ item0.title }}</el-menu-item>
                    <el-sub-menu
                        v-else
                        :index="item0.index ? item0.index : String(index) + '-' + String(index0)"
                    >
                        <template #title>{{ item0.title }}</template>
                        <!-- 第3层 -->
                        <template
                            v-for="(item1, index1) in item0.menu"
                            :key="
                                item1.index
                                ? item1.index
                                : String(index) + '-' + String(index0) + '-' + String(index1)
                            "
                        >
                            <el-menu-item
                                v-if="!item1.menu || item1.menu.length === 0"
                                :index="
                                    item1.index
                                    ? item1.index
                                    : String(index) + '-' + String(index0) + '-' + String(index1)
                                "
                                :disabled="
                                    'disabled' in item1
                                    ? item1.disabled
                                    : 'hdlDisabled' in item1
                                        ? item1.hdlDisabled({scopeThis: scopeThis_box, item: item1, index: index1})
                                        : false
                                "
                            >{{ item1.title }}</el-menu-item>
                            <el-sub-menu
                                v-else
                                :index="
                                    item1.index
                                    ? item1.index
                                    : String(index) + '-' + String(index0) + '-' + String(index1)
                                "
                            >
                                <template #title>{{ item1.title }}</template>
                                <!-- 第4层 -->
                                <template
                                    v-for="(item2, index2) in item1.menu"
                                    :key="
                                        item2.index
                                        ? item2.index
                                        : String(index) + '-' + String(index0) + '-' + String(index1) + '-' + String(index2)
                                    "
                                >
                                    <el-menu-item
                                        v-if="!item2.menu || item2.menu.length === 0"
                                        :index="
                                            item2.index
                                            ? item2.index
                                            : String(index) + '-' + String(index0) + '-' + String(index1) + '-' + String(index2)
                                        "
                                        :disabled="
                                            'disabled' in item2
                                            ? item2.disabled
                                            : 'hdlDisabled' in item2
                                                ? item2.hdlDisabled({scopeThis: scopeThis_box, item: item2, index: index2})
                                                : false
                                        "
                                    >{{ item2.title }}</el-menu-item>
                                    <el-sub-menu
                                        v-else
                                        :index="
                                            item2.index
                                            ? item2.index
                                            : String(index) + '-' + String(index0) + '-' + String(index1) + '-' + String(index2)
                                        "
                                    >
                                        <template #title>{{ item2.title }}</template>
                                        <!-- 第5层 -->
                                        <template
                                            v-for="(item3, index3) in item2.menu"
                                            :key="
                                                item3.index
                                                ? item3.index
                                                : String(index) + '-' + String(index0) + '-' + String(index1) + '-' + String(index2) + '-' + String(index3)
                                            "
                                        >
                                            <el-menu-item
                                                :index="
                                                    item3.index
                                                    ? item3.index
                                                    : String(index) + '-' + String(index0) + '-' + String(index1) + '-' + String(index2) + '-' + String(index3)
                                                "
                                                :disabled="
                                                    'disabled' in item3
                                                    ? item3.disabled
                                                    : 'hdlDisabled' in item3
                                                        ? item3.hdlDisabled({scopeThis: scopeThis_box, item: item3, index: index3})
                                                        : false
                                                "
                                            >{{ item3.title }}</el-menu-item>
                                        </template>
                                    </el-sub-menu>
                                </template>
                            </el-sub-menu>
                        </template>
                    </el-sub-menu>
                </template>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<style lang="scss" scoped></style>

<script setup>
import {reactive} from "vue";
import ly0default from './default.js'
import {unclassified as LibsJsUnclass} from '@heartbeat-ly0/libs-js'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    }
})
const myProps_box = reactive(LibsJsUnclass.deepClone.deepDefaults(props.myProps, ly0default.myProps))
const scopeThis_box = reactive(props.scopeThis)

const handleRun = ({
   index, // 目标索引
   menu, // 当前菜单
   indexFather, // 父节点索引
}) => {
    let result = false
    // 遍历菜单节点
    for (let i = 0; i < menu.length; i++) {
        // 内部索引继承
        let index0 = indexFather ? indexFather + '-' + i : '' + i
        // 节点存在自定义索引
        if (!!menu[i].index && index === menu[i].index) {
            if (menu[i].handle) {
                menu[i].handle({scopeThis: scopeThis_box, index})
            }
            result = true
            break
        }
        // 节点不存在自定义索引
        if (index === index0) {
            if (menu[i].handle) {
                menu[i].handle({scopeThis: scopeThis_box, index})
            }
            result = true
            break
        }
        // 存在子节点，递归调用
        if (!!menu[i].menu && menu[i].menu.length > 0) {
            result = handleRun({index, menu: menu[i].menu, indexFather: index0})
            if (!!result) {
                break
            }
        }
    }
    return result
}

const handleSelect = key=>{
    handleRun({index: key, menu: myProps_box.menu, indexFather: ''})
}

const handleOpen = key=>{}
const handleClose = key=> {}
</script>
