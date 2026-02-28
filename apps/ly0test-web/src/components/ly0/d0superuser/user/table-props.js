import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "用户信息"
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
                label: '数据单元/用户组',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.dataunit_name + '/' + row.group_name;
                }
            },
            {
                label: '用户名称',
                show: 'text',
                fieldName: 'name'
            },
            /*
            {
                label: "图标",
                show: "image",
                fieldName: "icon",
                imageWidth: "30px",
                imageHeight: "30px"
            },

             */
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "注册新工号",
                        size: "small",
                        async hdlClick({scopeThis, row}){
                            scopeThis.newNumber.branch = 'newNumber'
                            scopeThis.newNumber.userId = row._id;
                            scopeThis.newNumber.popup.visible = true;
                        }
                    },
                    {
                        text: "绑定已有工号",
                        size: "small",
                        async hdlClick({scopeThis, row}){
                            scopeThis.newNumber.branch = 'bind'
                            scopeThis.newNumber.popup.title = '绑定已有工号'
                            scopeThis.newNumber.userId = row._id;
                            scopeThis.newNumber.popup.visible = true;
                        }
                    },
                ]
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
                        async hdlClick({scopeThis, row}){
                            scopeThis.pgData.data.arrGroup0 = scopeThis.pgData.data.arrGroup.filter(i=>{
                                return "" + i.id_dataunit === "" + row.id_dataunit
                            })
                            await withTable.popupUpdateOne({scopeThis, row})
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
            },
        ]
    }
}
