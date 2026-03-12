import {withTable} from '@yoooloo42/ly0el'
export default {
    popup: {
        switch: true,
        visible: true,
    },
    titleLine: { // 标题线
        text: "交易明细"
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
                async hdlClick({scopeThis, formData}){
                    scopeThis.pgData.data.arrGoods = []
                    scopeThis.pgData.data.arrPrice = []
                    await withTable.popupInsertOne({scopeThis, formData})
                }
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '商品编号/名称',
                show: 'expression',
                hdlExpression ({scopeThis, row}) {
                    return row.number + "/" + row.name
                }
            },
            {
                label: '标价名称/单价',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (row.price_name ? row.price_name : "-") + '/' + (Math.floor(row.price) / 100)
                },
            },
            {
                label: "数量",
                show: "text",
                fieldName: "count"
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
                        async hdlClick({scopeThis, row}) {
                            const row0 = JSON.parse(JSON.stringify(row))
                            row0.price_yuan = Math.floor(row0.price) / 100
                            scopeThis.pgData.data.arrGoods = (await scopeThis.withArrGoods.getOne(row.id_goods)).data
                            scopeThis.pgData.data.arrPrice = scopeThis.pgData.data.arrGoods.find(i=>{
                                return i._id === row.id_goods
                            }).price
                            await withTable.popupUpdateOne({scopeThis, row: row0})
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
            }
        ]
    }
}
