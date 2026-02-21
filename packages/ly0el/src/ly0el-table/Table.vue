<template>
    <div style="padding: 10px;">
        <!-- 标题线 -->
        <div
            v-if="myProps.titleLine.text"
            :style="myProps.titleLine.style.line"
        >
            <el-divider content-position="left">
                <span :style="myProps.titleLine.style.text">
                    {{ myProps.titleLine.text }}
                </span>
            </el-divider>
        </div>

        <!-- 置顶菜单 -->
        <ly0el-menu v-if="!!myProps.menu" :myProps="myProps.menu" :scopeThis="scopeThis"></ly0el-menu>

        <!-- 置顶快捷按钮组 -->
        <div
            v-if="myProps.topButtonGroups.length > 0"
            :style="style.topButtonGroups.rootBox"
        >
            <el-button-group v-for="(item, index) in myProps.topButtonGroups" :key="index">
                <template v-for="(item0, index0) in item" :key="index0">
                    <el-tooltip
                        :disabled="!item0.tip"
                        :content="item0.tip && item0.tip.content ? item0.tip.content : ''"
                        :placement="item0.tip && item0.tip.placement ? item0.tip.placement : 'bottom'"
                        effect="light"
                    >
                        <el-button
                            :style="style.topButtonGroups.button(index, index0).style"
                            :icon="style.topButtonGroups.button(index, index0).icon"
                            :type="style.topButtonGroups.button(index, index0).type"
                            :size="style.topButtonGroups.button(index, index0).size"
                            :plain="style.topButtonGroups.button(index, index0).plain"
                            :round="style.topButtonGroups.button(index, index0).round"
                            :circle="style.topButtonGroups.button(index, index0).circle"
                            @click="item0.hdlClick ? item0.hdlClick({tableData: modelValue, tableProps: myProps, scopeThis}) : null"
                        >
                            <span v-if="item0.text">{{ item0.text }}</span>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-button-group>
        </div>

        <!-- 表体 -->
        <el-table
            :data="modelValue.data"
            stripe
            border
            v-loading="myProps.table.loading.visible"
            element-loading-text="myProps.table.loading.text"
            element-loading-spinner="myProps.table.loading.spinner"
            element-loading-background="myProps.table.loading.background"
            @cell-mouse-enter="hdl.cellMouseEnter"
            @row-click="hdl.rowClick"
            @selection-change="hdl.selectionChange"
            @sort-change="hdl.sortChange"
        >
            <!-- 左手第1列：是否可以选择记录行 -->
            <el-table-column
                v-if="myProps.table.selection.yes"
                type="selection"
                :width="myProps.table.selection.width"
            ></el-table-column>

            <!-- 列 -->
            <template v-for="(col, colIndex) in myProps.table.cols" :key="colIndex">
                <el-table-column
                    #default="scope"
                    v-if="col.hdlVisible ? col.hdlVisible({scopeThis}) : true"
                    v-model="col.fieldName"
                    :label="col.label"
                    :sortable="col.sortable"
                    :sort-method="(row2, row1)=>{
                        if(col.hdlSortMethod){
                            return col.hdlSortMethod({inherit: {row2, row1}})
                        }
                    }"
                    :width="col.width ? col.width : ''"
                >
                    <el-tooltip placement="left" effect="dark" :disabled="myProps.table.cellTooltip.length === 0">
                        <div
                            @click="col.hdlClick ? col.hdlClick({scopeThis, row: scope.row}) : null"
                            @mouseover="hdl.cellMouseover({col, row: scope.row})"
                        >
                            <template v-if="col.show === 'text'">
                                <span :style="style.cell.text">{{ scope.row[col.fieldName] }}</span>
                            </template>
                            <template v-if="!col.show">
                                <span :style="style.cell.text">{{ scope.row[col.fieldName] }}</span>
                            </template>
                            <template v-if="col.show === 'expression'">
                                <span :style="style.cell.text">{{ col.hdlExpression({scopeThis, row: scope.row}) }}</span>
                            </template>
                            <template v-if="col.show === 'switch'">
                                <el-switch
                                    v-model="scope.row[col.fieldName]"
                                    :active-value="col.activeValue"
                                    :inactive-value="col.inactiveValue"
                                    :active-text="col.activeText"
                                    :inactive-text="col.inactiveText"
                                    :active-color="col.activeColor"
                                    @change="
                                        (valNew) => {
                                            if(col.hdlChange){
                                                col.hdlChange({scopeThis, row: scope.row, inherit: {valNew}})
                                            }
                                        }
                                    "
                                ></el-switch>
                            </template>
                            <template v-if="col.show === 'button-group'">
                                <el-button-group>
                                    <template v-for="(item, index) in col.buttonGroup" :key="index">
                                        <el-button
                                            v-if="item.hdlVisible ? item.hdlVisible({scopeThis, row: scope.row}) : true"
                                            :key="index"
                                            :style="style.cell.buttonGroup({item}).style"
                                            :icon="style.cell.buttonGroup({item}).icon"
                                            :type="style.cell.buttonGroup({item}).type"
                                            :size="style.cell.buttonGroup({item}).size"
                                            :plain="style.cell.buttonGroup({item}).plain"
                                            :round="style.cell.buttonGroup({item}).round"
                                            :circle="style.cell.buttonGroup({item}).circle"
                                            @click="item.hdlClick({scopeThis, row: scope.row})"
                                        >
                                            {{item.text ? item.text : item.hdlText({scopeThis, row: scope.row}) }}
                                        </el-button>
                                    </template>
                                </el-button-group>
                            </template>
                            <template v-if="col.show === 'image'">
                                <el-image
                                    :style="style.cell.image({col})"
                                    :src="hdl.getImageSrc({row: scope.row, col})"
                                    :preview-src-list="[hdl.getImageSrc({row: scope.row, col})]"
                                    :preview-teleported="true"
                                    :hide-on-click-modal="true"
                                ></el-image>
                            </template>
                            <template v-if="col.show === 'download'">
                                <a
                                    v-if="hdl.download({col, row: scope.row}).src"
                                    style="text-decoration: underline; color: #0000ff"
                                    :href="hdl.download({col, row: scope.row}).src"
                                    :download="hdl.download({col, row: scope.row}).fileName"
                                >
                                  <span>{{ hdl.download({col, row: scope.row}).label }}</span>
                                </a>
                                <span v-else style="color: #6a6a6a">{{ hdl.download({col, row: scope.row}).label }}</span>
                            </template>

                            <!-- 商品分类 -->
                            <template v-if="col.show === 'd7group'">
                                <ly0el-d7group
                                    v-model="scope.row[col.fieldName]"
                                    :myProps="{readOnly: !!col.readOnly}"
                                ></ly0el-d7group>
                            </template>
                            <!-- 商品标价 -->
                            <template v-if="col.show === 'd7price'">
                                <ly0el-d7price
                                    v-model="scope.row[col.fieldName]"
                                    :myProps="{readOnly: !!col.readOnly}"
                                ></ly0el-d7price>
                            </template>
                            <!-- 商品规格 -->
                            <template v-if="col.show === 'd7size'">
                                <ly0el-d7size
                                    v-model="scope.row[col.fieldName]"
                                    :myProps="{readOnly: !!col.readOnly}"
                                ></ly0el-d7size>
                            </template>
                            <!-- 商品缩略图 -->
                            <template v-if="col.show === 'd7thumb'">
                                <ly0el-d7thumb
                                    v-model="scope.row"
                                    :myProps="{
                                        thumb: {
                                            fieldName: col.thumb.fieldName,
                                            width: col.thumb.width || myProps.table.colShow.ly0d7thumb.thumb.width,
                                            height: col.thumb.height || myProps.table.colshow.ly0d7thumb.thumb.height
                                        },
                                        number: {
                                            fieldName: col.number.fieldName
                                        },
                                        name: {
                                            fieldName: col.name.fieldName
                                        },
                                        readOnly: !!col.readOnly
                                    }"
                                ></ly0el-d7thumb>
                            </template>
                        </div>

                        <!-- 指向单元格时的提示信息（多行） -->
                        <template #content>
                            <div v-for="(item, index) in myProps.table.cellTooltip" :key="index">{{ item }}</div>
                        </template>
                    </el-tooltip>
                </el-table-column>
            </template>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            :total="modelValue.total"
            :page-size="modelValue.pageSize"
            :page-sizes="modelValue.pageSizes"
            :current-page="modelValue.currentPage"
            :style="style.pagination"
            @size-change="hdl.pageSizeChange"
            @current-change="hdl.currentPageChange"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>

        <!-- 选择列 --><!-- 使用该组件，必须设置每一列的唯一标识：key -->
        <compPickCol :tableProps="myProps"></compPickCol>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import compPickCol from './PickCol.vue' // 列选择
import ly0elMenu from '../ly0el-menu/Index.vue'
import ly0elD7group from '../ly0el-d7group/Index.vue'
import ly0elD7price from '../ly0el-d7price/Index.vue'
import ly0elD7size from '../ly0el-d7size/Index.vue'
import ly0elD7thumb from '../ly0el-d7thumb/Index.vue'
import {utils as ly0utils} from '@yoooloo42/ly0utils'

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

// 设置列选择初始化参数
props.myProps.table.pickCol.colsInit = ly0utils.deepClone.deepClone(props.myProps.table.cols)

const hdl = {
    cellMouseEnter(row, column, cell, event) {
        // 当单元格hover进入时会触发该事件
        if (props.myProps.table.hdlCellMouseEnter) {
            props.myProps.table.hdlCellMouseEnter({scopeThis: props.scopeThis, tableProps: props.myProps, inherit: {
                row,
                column,
                cell,
                event
            }})
        } else {
            props.myProps.table.cellTooltip = []
        }
    },
    cellMouseover({col, row}) {
        if (col.hdlMouseover) {
            col.hdlMouseover({scopeThis: props.scopeThis, row, col})
        } else {
            props.myProps.table.cellTooltip = []
        }
    },
    async currentPageChange(currentPage) {
        // 当前页码改变
        props.modelValue.currentPage = currentPage
        if(props.myProps.table.hdlCurrentPageChange){
            await props.myProps.table.hdlCurrentPageChange({currentPage, scopeThis: props.scopeThis})
        }
    },
    download({row, col}) {
        if(!col.hdlGetSrc){
            return {
                src: '',
                label: props.myProps.table.colShow.download.downloadLabelNoSrc,
                fileName: props.myProps.table.colShow.download.fileName
            }
        }

        const src = col.hdlGetSrc({scopeThis: props.scopeThis, row})
        const label = col.hdlGetDownloadLabel
            ? col.hdlGetDownloadLabel({scopeThis: props.scopeThis, row})
            : props.myProps.table.colShow.download.downloadLabel
        const fileName = col.hdlGetFileName
            ? col.hdlGetFileName({scopeThis: props.scopeThis, row})
            : props.myProps.table.colShow.download.fileName
        return {
            src: src || '',
            label: src ? label : props.myProps.table.colShow.download.downloadLabelNoSrc,
            fileName: src ? fileName : props.myProps.table.colShow.download.fileName
        }
    },
    getImageSrc({row, col}){
        if(row[col.fieldName] && row[col.fieldName].length > 0){
            return row[col.fieldName][0] || ''
        }else{
            return ''
        }
    },
    // 页记录数改变
    async pageSizeChange(pageSize) {
        props.modelValue.pageSize = pageSize
        props.modelValue.currentPage = 1
        if(props.myProps.table.hdlPageSizeChange){
            await props.myProps.table.hdlPageSizeChange({pageSize, scopeThis: props.scopeThis})
        }
    },
    rowClick(row, column, event) {
        // 当某一行被点击时会触发该事件
        if (props.myProps.table.hdlRowClick) {
            props.myProps.table.hdlRowClick({scopeThis: props.scopeThis, inherit: {
                    row,
                    column,
                    event
                }})
        }
    },
    selectionChange(selection) {
        // 当选择项发生变化时会触发该事件
        if (props.myProps.table.hdlSelectionChange) {
            props.myProps.table.hdlSelectionChange({scopeThis: props.scopeThis, inherit: {
                    selection
                }})
        }
    },
    sortChange(para) {
        // 当表格的排序条件发生变化的时候会触发该事件，一般用于远程排序
        // para.column
        // para.prop
        // para.order
        
        if (props.myProps.table.hdlSortChange) {
            props.myProps.table.hdlSortChange({scopeThis: props.scopeThis, inherit: {
                    column: para.column,
                    prop: para.prop,
                    order: para.order,
                }})
        }
    },
}

const style = {
    topButtonGroups: {
        rootBox: {
            display: 'flex',
            'justify-content': 'space-between',
            'margin-bottom': '10px'
        },
        button(index, index0){return {
            style: props.myProps.topButtonGroups[index][index0].style || {
                "background-color": "#009f95",
                color: "#ffffff"
            },
            icon: props.myProps.topButtonGroups[index][index0].icon || "", // el-图标
            type: props.myProps.topButtonGroups[index][index0].type || "",
            size: props.myProps.topButtonGroups[index][index0].size || "",
            plain: props.myProps.topButtonGroups[index][index0].plain || false,
            round: props.myProps.topButtonGroups[index][index0].round || false,
            circle: props.myProps.topButtonGroups[index][index0].circle || false
        }}
    },
    cell: {
        text: {
            'white-space': 'pre-line' // 保留换行符
        },
        buttonGroup({item}){return{
            style: item.style || {
                'background-color': '#009f95',
                color: '#ffffff'
            },
            icon: item.icon || "", // el-图标
            type: item.type || "",
            size: item.size || "",
            plain: item.plain || false,
            round: item.round || false,
            circle: item.circle || false
        }},
        image({col}){return {
            width: col.imageWidth || props.myProps.table.colShow.image.width,
            height: col.imageHeight || props.myProps.table.colShow.image.height,
        }}
    },
    pagination: {
        "text-align": "left",
        "margin-top": "10px"
    }
}
</script>
