<template>
    <!-- 标题线 -->
    <div
        v-if="myProps.titleLine && myProps.titleLine.text"
        :style="myProps.titleLine.style.line"
    >
        <el-divider content-position="left">
            <span :style="myProps.titleLine.style.text">
                {{ myProps.titleLine.text }}
            </span>
        </el-divider>
    </div>
    
    <!-- 置顶菜单 -->
    <ly0el-menu v-if="myProps.menu" :myProps="myProps.menu" :scopeThis="scopeThis"></ly0el-menu>
    
    <!-- 置顶快捷按钮组 -->
    <div
        v-if="myProps.topButtonGroups.items.length > 0"
        :style="myProps.topButtonGroups.style"
    >
        <el-button-group v-for="(item, index) in myProps.topButtonGroups.items" :key="index">
            <template v-for="(item0, index0) in item.items" :key="index0">
                <el-tooltip
                    :disabled="!item0.tip"
                    :content="item0.tip && item0.tip.content ? item0.tip.content : ''"
                    :placement="item0.tip && item0.tip.placement ? item0.tip.placement : 'bottom'"
                    effect="light"
                >
                    <el-button
                        :style="style.topButton.style(item, item0)"
                        :size="style.topButton.size(item, item0)"
                        :round="!!item0.round"
                        :icon="item0.icon ? item0.icon : ''"
                        @click="item0.hdlClick ? item0.hdlClick({scopeThis}) : null"
                        :key="index0"
                    >
                        <span v-if="item0.text">{{ item0.text }}</span>
                    </el-button>
                </el-tooltip>
            </template>
        </el-button-group>
    </div>
    
    <!-- 表体 -->
    <div class="image-list">
        <div class="item-box" v-for="(itemData, indexData) in modelValue.data" :key="indexData">
            <!-- 图片及下拉菜单 -->
            <div>
                <el-dropdown trigger="click" @command="hdl.dropdown">
                    <!-- 图片 -->
                    <img
                        :src="itemData[myProps.imageFieldName]"
                        :width="myProps.imageList.image.width"
                        :height="myProps.imageList.image.height"
                    />
                    <!-- 下拉菜单：dropdownMenu -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="(itemDropdownMenu, indexDropdownMenu) in myProps.dropdownMenu"
                                :key="indexDropdownMenu"
                                :icon="itemDropdownMenu.icon"
                                :command="{ hdl: itemDropdownMenu.handle, itemData }"
                            >
                                {{ itemDropdownMenu.label }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            
            <!-- 下标：subscriptLabel -->
            <div
                v-for="(itemSubscriptLabel, indexSubscriptLabel) in myProps.subscriptLabel"
                :key="indexSubscriptLabel"
            >
                <div class="label-item">
                    <template v-if="itemSubscriptLabel.show === 'text'">
                        <span>{{ itemData[itemSubscriptLabel.fieldName] }}</span>
                    </template>
                    <template v-if="!itemSubscriptLabel.show">
                        <span>{{ itemData[itemSubscriptLabel.fieldName] }}</span>
                    </template>
                    <template v-if="itemSubscriptLabel.show === 'expression'">
                        <span>{{ itemSubscriptLabel.hdlExpression(scopeThis, itemData) }}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 分页 -->
    <el-pagination
        :total="modelValue.total"
        :page-size="modelValue.pageSize"
        :current-page="modelValue.currentPage"
        :style="myProps.pagination.style"
        @size-change="hdl.pageSizeChange"
        @current-change="hdl.currentPageChange"
        layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
</template>

<style lang="scss" scoped>
@use 'image-list';
</style>

<script setup>
import myProps from "../ly0el-d2cash/qrcode/myProps.js"; // 默认值

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    }
})

const hdl = {
// 重置当前页号
    async currentPageChange(currentPage){
        props.modelValue.currentPage = currentPage
        await myProps.pagination.hdlCurrentPageChange({currentPage, scopeThis})
    },
    // 重新分页
    async pageSizeChange(pageSize) {
        props.modelValue.pageSize = pageSize
        props.modelValue.currentPage = 1
        await myProps.pagination.hdlPageSizeChange({pageSize, scopeThis})
    },
    // 下拉菜单
    async dropdown(command) {
        await command.hdl({scopeThis, itemData: command.itemData})
    },
}

const style = {
    // 保留换行符
    preLine() {
        return {'white-space': 'pre-line'}
    },
    topButton: {
        size(item, item0) {
            if (item0.size) {
                return item0.size
            }
            if (item.buttonSize) {
                return item.buttonSize
            }
            return myProps.topButtonGroups.button.size
        },
        style(item, item0) {
            if (item0.style) {
                return item0.style
            }
            if (item.buttonStyle) {
                return item.buttonStyle
            }
            return myProps.topButtonGroups.button.style
        },
    }
}
</script>
