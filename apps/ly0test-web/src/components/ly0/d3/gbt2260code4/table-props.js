import {ElMessage, ElMessageBox} from 'element-plus'
import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "行政区划编码 - 市级"
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
        ],
        [
            {
                text: "导入代码",
                icon: "Upload",
                size: "small",
                hdlClick({scopeThis}){
                    ElMessageBox.confirm('此操作将先清空全部编码数据，继续?', '警告', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        // 打开进度条
                        scopeThis.tableProps.table.loading.visible = true
                        scopeThis.tableProps.table.loading.text = "正在导入..."
                        request.ly0.storpro({
                            noSession: true,
                            storproName: "ly0d3.gbt2260code4.loadAll",
                            data: null
                        }).then(result=>{
                            // 关闭进度条
                            scopeThis.tableProps.table.loading.visible = false
                            scopeThis.tableProps.table.loading.text = ""
                            ElMessage(result.message)
                            // 刷新页面
                            scopeThis.handles.reload({scopeThis})
                        })
                    }).catch(()=>{
                        ElMessage({type: 'info', message: '取消操作'})
                    })
                }
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '市级编码',
                show: 'text',
                fieldName: 'code4'
            },
            {
                label: '市级区划名称',
                show: 'text',
                fieldName: 'text4'
            },
            {
                label: '省级编码',
                show: 'text',
                fieldName: 'code2'
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
            }
        ]
    }
}
