import {request} from '@yoooloo42/ihavebacking'
import { ElMessageBox, ElMessage } from 'element-plus'
import {ly0withTable as withTable} from '@yoooloo42/ly0el'
const ly0request = request.ly0

export default {
    titleLine: { // 标题线
        text: "数据单元"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "全部",
                hdlClick: withTable.reload
            },
            {
                text: "刷新",
                hdlClick: withTable.refresh
            },
            {
                text: "查询",
                hdlClick: withTable.popupFind
            },
            {
                text: "新增",
                hdlClick: withTable.popupInsertOne
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '数据单元_id',
                show: 'text',
                fieldName: '_id'
            },
            {
                label: '数据单元名称',
                show: 'text',
                fieldName: 'name'
            },
            {
                label: "系统关闭",
                show: "switch",
                fieldName: "systemoff",
                activeValue: true,
                inactiveValue: false,
                activeText: "是",
                inactiveText: "否",
                activeColor: "#ff640a",
                hdlChange({scopeThis, row, inherit}){
                    ly0request.storpro({
                        storproName: "ly0d0.dataunit.systemOff",
                        data: {
                            _id: row._id,
                            systemoff: inherit.valNew
                        },
                        routerInstance: scopeThis.routerInstance
                    }).then(result=>{
                        ElMessage(result.message)
                    })
                }
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
                        hdlClick: withTable.popupUpdateOne
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
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "清除数据单元",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            ElMessageBox.confirm(row._id + ': 清除该单元下的所有数据?', '警告', {
                                confirmButtonText: '确认',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                ElMessageBox.confirm('该操作具有极大的危险性，并将耗费较长的时间，再次确认?', '警告', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    ElMessage('因为极大的危险性，暂时关闭此操作')
                                    /*
                                    scopeThis.tableProps.table.loading.text = "正在清除数据单元，可能需要较长时间，请耐心等待..."
                                    scopeThis.tableProps.table.loading.visible = true
                                    ly0request.storpro({
                                        storproName: "ly0d0.dataunit-clear.clear",
                                        data: {
                                            id_dataunit: row._id
                                        },
                                        routerInstance: scopeThis.routerInstance
                                    }).then(result=>{
                                        ElMessage(result.message)
                                        scopeThis.handles.withTable.refresh({scopeThis})
                                        scopeThis.tableProps.table.loading.visible = false
                                        scopeThis.tableProps.table.loading.text = ""
                                    })
                                    */
                                }).catch(() => {
                                    ElMessage({
                                        type: 'info',
                                        message: '取消操作'
                                    })
                                })
                            }).catch(() => {
                                ElMessage({
                                    type: 'info',
                                    message: '取消操作'
                                })
                            })
                        }
                    }
                ],
            },
        ]
    }
}
