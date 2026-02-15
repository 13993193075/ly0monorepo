import {blindboxes} from 'packages/ly0utils/src/index.js'
import {ElMessage} from 'element-plus'
import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'

export default {
    popup: {
        switch: true,
        visible: true,
        title: '用房记录'
    },
    menu: {
        menu: [ // 置顶菜单
            {
                title: '刷新/查询',
                menu: [
                    {
                        title: '全部',
                        handle: withTable.reload
                    },
                    {
                        title: '刷新',
                        handle: withTable.refresh
                    },
                    {
                        title: "查询",
                        handle: withTable.popupFind
                    },
                ]
            },
            {
                title: '新增',
                menu: [
                    {
                        title: '新增一条用房记录',
                        handle: withTable.popupInsertOne
                    },
                    {
                        title: '批量新增',
                        menu: [
                            {
                                title: '按客房分区',
                                handle({scopeThis}) {
                                    scopeThis.insertMany.handles.insertManyPopup({scopeThis})
                                },
                            },
                            {
                                title: '按房型',
                                handle({scopeThis}) {
                                    scopeThis.insertMany0.handles.insertMany0Popup({scopeThis})
                                },
                            }
                        ]
                    }
                ]
            },
            {
                title: '选中：批量修改',
                menu: [
                    {
                        title: '入住时间',
                        handle({scopeThis}) {
                            if(scopeThis.arrMultipleSelection.length > 0){
                                scopeThis.formData = scopeThis.updateMany.formData
                                scopeThis.formProps = scopeThis.updateMany.formProps_checkin
                                scopeThis.formProps.popup.visible = true
                                return
                            }
                            ElMessage('没有选中的记录')
                        },
                    },
                    {
                        title: '离开时间',
                        handle({scopeThis}) {
                            if(scopeThis.arrMultipleSelection.length > 0){
                                scopeThis.formData = scopeThis.updateMany.formData
                                scopeThis.formProps = scopeThis.updateMany.formProps_checkout
                                scopeThis.formProps.popup.visible = true
                                return
                            }
                            ElMessage('没有选中的记录')
                        },
                    },
                    {
                        title: '用房状态',
                        handle({scopeThis}) {
                            if(scopeThis.arrMultipleSelection.length > 0){
                                scopeThis.formData = scopeThis.updateMany.formData
                                scopeThis.formProps = scopeThis.updateMany.formProps_status
                                scopeThis.formProps.popup.visible = true
                                return
                            }
                            ElMessage('没有选中的记录')
                        },
                    },
                    {
                        title: '单价',
                        handle({scopeThis}) {
                            if(scopeThis.arrMultipleSelection.length > 0){
                                scopeThis.formData = scopeThis.updateMany.formData
                                scopeThis.formProps = scopeThis.updateMany.formProps_price
                                scopeThis.formProps.popup.visible = true
                                return
                            }
                            ElMessage('没有选中的记录')
                        },
                    },
                ]
            }
        ],
    },
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        selection: {yes: true},
        hdlSelectionChange({scopeThis, inherit}) {
            // 获取选中的多记录数组
            scopeThis.arrMultipleSelection = inherit.selection
        },
        cols: [
            {
                label: '房号/房型/单价',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.roomno + '/' +
                        row.goods_name + '/' +
                        (Math.floor(row.price) / 100)
                },
            },
            {
                label: '入住时间 - 离开时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return blindboxes.dateFormat.dateFormat(row.checkin) + ' - ' +
                        blindboxes.dateFormat.dateFormat(row.checkout)
                },
                width: '300px'
            },
            {
                label: '用房状态',
                show: 'text',
                fieldName: 'status_text',
                width: '100px'
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick: withTable.popupDoc
                    },
                    {
                        text: "修改",
                        size: "small",
                        async hdlClick({scopeThis, row}) {
                            const row0 = JSON.parse(JSON.stringify(row))
                            row0.price0 = Math.floor(row0.price) / 100
                            await withTable.popupUpdateOne({scopeThis, row: row0})
                        }
                    },
                    {
                        text: "删除",
                        size: "small",
                        hdlClick: withTable.submitDeleteOne,
                        style: {
                            'background-color': '#ff640a',
                            'color': '#ffffff'
                        }
                    }
                ]
            }
        ]
    }
}
