import {withTable, request as ly0request} from '@yoooloo42/joker'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    titleLine: { // 标题线
        text: "教材资源清单"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "全部",
                async hdlClick({scopeThis}){
                    await withTable.reload({scopeThis})
                },
            },
            {
                text: "刷新",
                async hdlClick({scopeThis}){
                    await withTable.refresh({scopeThis, message: true})
                },
            },
            {
                text: "查询",
                hdlClick({scopeThis}){
                    withTable.popupFind({scopeThis})
                },
            },
            {
                text: "新增",
                hdlClick({scopeThis}){
                    withTable.popupInsertOne({scopeThis})
                },
            }
        ]
    ],
    table: {
        cols: [
            {
                label: '序号',
                show: 'text',
                fieldName: 'number',
            },
            {
                label: '教材分类',
                show: 'text',
                fieldName: 'class_name',
            },
            {
                label: '教材名称',
                show: 'download',
                hdlGetSrc({scopeThis, row}) {
                    // 获取链接地址的方法 如果不存在或返回false，则无链接
                    return row.url
                },
                hdlGetDownloadLabel({scopeThis, row}) {
                    // 获取链接标题的方法（下载文件名）
                    return row.name
                },
                hdlGetDownloadFileName({scopeThis, row}) {
                    // 指定下载文件名
                    return row.name
                },
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            withTable.popupDoc({scopeThis, row})
                        }
                    },
                    {
                        text: "修改",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            withTable.popupUpdateOne({scopeThis, row})
                        }
                    },
                    {
                        text: "删除",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            withTable.submitDeleteOne({scopeThis, row})
                        },
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
