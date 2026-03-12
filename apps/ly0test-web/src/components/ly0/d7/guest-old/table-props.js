// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"

function getTableProps(scopeThis){
    return {
        titleLine: {
            text: "商城访客信息"
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
                    label: '用户名称',
                    show: 'text',
                    fieldName: "name"
                },
                {
                    label: '国内行政区划',
                    show: 'text',
                    fieldName: "gbt2260text"
                },
                {
                    label: '联系电话',
                    show: 'text',
                    fieldName: "tel"
                },
                {
                    label: "登录账号",
                    show: "button-group",
                    buttonGroup: [
                        {
                            hdlText(scopeThis, row){
                                return !!row.id_login ? "账号id：" + row.id_login : "注册"
                            },
                            hdlStyle(row){
                                return !!row.id_login ? " ": ""
                            },
                            hdlType(row){
                                return !!row.id_login ? "text" : ""
                            },
                            round: true,
                            hdlClick(scopeThis, row){
                                scopeThis.hdlLogin.newLogin(scopeThis, row)
                            }
                        }
                    ]
                },
                {
                    label: '',
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