// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"
// 数据请求
import dataRequest from "../../../../utils/data-request.js"

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
                            text: "全部",
                            hdlClick: handles.reloadAll
                        },
                        {
                            text: "刷新",
                            hdlClick: handles.reload
                        },
                        {
                            text: "查询",
                            hdlClick: handles.findPopup
                        },
                        {
                            text: "新增",
                            hdlClick: handles.insertOnePopup
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
                    label: "商城代收",
                    show: "switch",
                    fieldName: "mall",
                    activeValue: true,
                    inactiveValue: false,
                    activeText: "是",
                    inactiveText: "否",
                    activeColor: "#ff640a",
                    hdlChange(scopeThis, row, inherit){
                        dataRequest.storpro({
                            scopeThis,
                            storproName: "ly0d7.shop.mall",
                            data: {
                                _id: row._id,
                                mall: inherit.valNew
                            }
                        }).then(result=>{
                            scopeThis.$message(result.message)
                            scopeThis.handles.reload(scopeThis)
                        })
                    }
                },
                {
                    label: '操作',
                    show: 'button-group',
                    buttonGroup: [
                        {
                            text: "详细",
                            hdlClick: handles.docPopup
                        },
                        {
                            text: "修改",
                            hdlClick: handles.updateOnePopup,
                        },
                        {
                            text: "删除",
                            hdlClick: handles.deleteOneSubmit,
                            style: "background-color:#ff640a; color:#ffffff;"
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
