import {withTable} from '@yoooloo42/ly0el'
import {request as ly0request} from '@yoooloo42/ly0browser'
import {ElMessage} from 'element-plus'

export default {
    titleLine: { // 标题线
        text: "商品名录"
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
                label: '商店',
                show: 'text',
                fieldName: 'shop_name',
                hdlVisible({scopeThis}) {
                    return scopeThis.pgData.data.arrShop.length > 1 // 只有一个商店时不显示
                },
            },
            {
                label: '商品名称',
                show: 'ly0d7thumb',
                thumb: {
                    fieldName: 'thumb',
                    width: '160px',
                    height: '120px',
                },
                number: {
                    fieldName: 'number',
                },
                name: {
                    fieldName: "name",
                },
                async hdlSubmit(scopeThis, data){
                    await ly0request.ly0.storpro({
                        storproName: 'ly0d7.goods.setThumb',
                        data: {
                            _id: data._id,
                            thumb: data.thumb.thumb,
                            number: data.thumb.number,
                            name: data.thumb.name,
                        }
                    })
                    ElMessage("已更新商品基本信息")
                }
            },
            {
                label: '商品分类',
                show: 'ly0d7group',
                fieldName: "group",
                async hdlSubmit(scopeThis, data){
                    await ly0request.ly0.storpro({
                        storproName: 'ly0d7.goods.setGroup',
                        data: {
                            _id: data._id,
                            group: data.group,
                        }
                    })
                    ElMessage("已重新设置商品分类")
                }
            },
            {
                label: '商品规格',
                show: 'ly0d7size',
                fieldName: "size",
                async hdlSubmit(scopeThis, data){
                    await ly0request.ly0.storpro({
                        storproName: 'ly0d7.goods.setSize',
                        data: {
                            _id: data._id,
                            size: data.size,
                        }
                    })
                    ElMessage("已重新设置商品规格")
                }
            },
            {
                label: '商品标价',
                show: 'ly0d7price',
                fieldName: "price",
                async hdlSubmit(scopeThis, data){
                    await ly0request.ly0.storpro({
                        storproName: 'ly0d7.goods.setPrice',
                        data: {
                            _id: data._id,
                            price: data.price,
                        }
                    })
                    ElMessage("已重新标价")
                }
            },
            {
                label: '',
                show: 'button-group',
                width: "100px",
                buttonGroup: [
                    {
                        text: '详细',
                        hdlClick: withTable.popupDoc,
                        style: "width: 70px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                    },
                    {
                        text: '修改',
                        hdlClick: withTable.popupUpdateOne,
                        style: "width: 70px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                    },
                    {
                        text: '删除',
                        hdlClick: withTable.submitDeleteOne,
                        style: 'width: 70px; border-radius: 0; background-color: #ff640a; color: #ffffff;'
                    }
                ]
            }
        ]
    }
}
