// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"

function getTableProps(scopeThis){
    return {
        titleLine: {
            text: "商店名称及参数设置"
        },
        topButtonGroups: {
            box: [
                {
                    box: [
                        {
                            text: "刷新",
                            hdlClick: handles.reload
                        }
                    ]
                }
            ]
        },
        table: {
            cols: [
                {
                    label: '商店编号',
                    show: 'text',
                    fieldName: '_id'
                },
                {
                    label: '商店名称',
                    show: 'text',
                    fieldName: 'name'
                },
                {
                    label: '操作',
                    show: 'button-group',
                    buttonGroup: [
                        {
                            text: "修改",
                            hdlClick: handles.updateOnePopup,
                        }
                    ]
                }
            ]
        }
    }
}

export default{
    getTableProps
}