import {request} from 'packages/ly0libs/src/index.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
const ly0request = request.ly0

export default {
    titleLine: { // 标题线
        text: "商户号"
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
                label: '商户号',
                show: 'text',
                fieldName: 'mchid',
            },
            {
                label: '备注',
                show: 'text',
                fieldName: 'note',
            },
            {
                label: '用于系统年费',
                show: 'switch',
                fieldName: 'with_annual',
                activeValue: true,
                inactiveValue: false,
                activeText: '是',
                inactiveText: '否',
                activeColor: '#ff640a',
                hdlChange({scopeThis, row, inherit}) {
                    ly0request.ly0.storpro({
                        storproName: 'ly0d1.d0mchid.withAnnual',
                        data: {
                            _id: row._id,
                            with_annual: inherit.valNew,
                        },
                    })
                        .then((result) => {
                            ElMessage(result.message)
                        })
                },
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
        ]
    }
}
