import {withTable} from '@yoooloo42/ly0el'
import {request as ly0request} from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
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
                async hdlClick({scopeThis}) {
                    scopeThis.pgData.data.arrGroup0 = scopeThis.pgData.data.arrGroup.filter(i=>{
                        return i.id_dataunit === scopeThis.ly0session.dataunit._id
                    })
                    await withTable.popupFind({scopeThis})
                }
            },
            {
                text: "新增",
                async hdlClick({scopeThis}) {
                    scopeThis.pgData.data.arrGroup0 = scopeThis.pgData.data.arrGroup.filter(i=>{
                        return i.id_dataunit === scopeThis.ly0session.dataunit._id
                    })
                    await withTable.popupInsertOne({scopeThis})
                }
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '用户组',
                show: 'text',
                fieldName: 'group_name'
            },
            {
                label: '用户名称',
                show: 'text',
                fieldName: 'name'
            },
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
                        },
                        hdlVisible({scopeThis, row}){
                            return !row.id_login
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
                        },
                        hdlVisible({scopeThis, row}){
                            return !row.id_login
                        }
                    },
                    {
                        text: "登录账号信息",
                        size: "small",
                        async hdlClick({scopeThis, row}){
                            scopeThis.id_login.id_login = row.id_login;
                            scopeThis.id_login.popup.visible = true;
                        },
                        hdlVisible({scopeThis, row}){
                            return row.id_login
                        }
                    },
                    {
                        text: "登录账号取关",
                        size: "small",
                        async hdlClick({scopeThis, row}){
                            try{
                                await ElMessageBox.confirm(
                                    '登录账号取关后，用户将无法正常登录', // 正文
                                    '警告', // 标题
                                    {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning', // 图标类型：success/info/warning/error
                                    }
                                )
                                const result = await ly0request.ly0.storpro({
                                    storproName: 'ly0d0.user.id_loginSetNull',
                                    data: {
                                        userId: row._id
                                    }
                                })
                                ElMessage(result.message)
                                withTable.refresh({scopeThis})
                            }catch(err){
                                console.log(err)
                                ElMessage('取消操作')
                            }
                        },
                        hdlVisible({scopeThis, row}){
                            return row.id_login
                        }
                    },
                ]
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
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
