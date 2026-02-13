// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"

function getTableProps (scopeThis) {
    return {
        titleLine: {
            text: '商品解码'
        },
        topButtonGroups: {
            box: [
                {
                    box: [
                        {
                            text: '全部',
                            hdlClick: handles.reloadAll
                        },
                        {
                            text: '刷新',
                            hdlClick: handles.reload
                        },
                        {
                            text: '查询',
                            hdlClick: handles.findPopup
                        },
                        {
                            text: '新增',
                            hdlClick: handles.insertOnePopup
                        }
                    ]
                }
            ]
        },
        table: {
            cols: [
                {
                    label: '商店',
                    show: 'text',
                    fieldName: 'shop_name',
                    hdlVisible (scopeThis) {
                        return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
                    }
                },
                {
                    label: '解码名称',
                    show: 'text',
                    fieldName: 'name'
                },
                {
                    label: '关键字',
                    show: 'text',
                    fieldName: 'decode'
                },
                {
                    label: '操作',
                    show: 'button-group',
                    buttonGroup: [
                        {
                            text: '详细',
                            hdlClick: handles.docPopup,
                        },
                        {
                            text: '修改',
                            hdlClick: handles.updateOnePopup,
                        },
                        {
                            text: '删除',
                            hdlClick: handles.deleteOneSubmit,
                            style: 'background-color:#ff640a; color:#ffffff;'
                        }
                    ]
                }
            ]
        }
    }
}

export default {
    getTableProps
}