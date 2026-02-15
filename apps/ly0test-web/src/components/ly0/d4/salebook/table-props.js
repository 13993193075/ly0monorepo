import {ly0request} from '@yoooloo42/ly0browser/ly0request'
import {ElMessage, ElMessageBox} from 'element-plus'
import {withTable} from '@yoooloo42/ly0el'
export default {
    popup: {
        switch: true,
        visible: true,
    },
    titleLine: { // 标题线
        text: "房型预订"
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
                text: '自动配房',
                async hdlClick({scopeThis}){
                    try{
                        await ElMessageBox.confirm('自动配房将删除所有已配房记录，继续?', '警告', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning',
                        })
                        const result = await ly0request.storpro({
                            storproName: 'ly0d4.b_goods.allocation',
                            data: { id_business: scopeThis.props_myProps.id_business },
                        })
                        ElMessage(result.message)
                    } catch (err) {
                        ElMessage('取消操作')
                    }
                },
                size: 'small',
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '房型',
                show: 'text',
                fieldName: 'goods_name',
            },
            {
                label: '数量',
                show: 'text',
                fieldName: 'count',
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
