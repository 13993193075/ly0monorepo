// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"

function getTableProps (scopeThis) {
    return {
        titleLine: {
            text: '商品名录'
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
                    fieldName: "shop_name",
                    hdlVisible(scopeThis, row){
                        return scopeThis.pageData.data.arrShop.length > 1
                    }
                },
                {
                    label: '商品名称',
                    show: 'd7thumb',
                    fieldName: {
                        thumb: 'thumb',
                        number: "number",
                        name: "name"
                    },
                    hdlSubmit(scopeThis, rowOld, thumbNew){
                        // 提交数据库
                        scopeThis.storpro.storpro({
                            scopeThis,
                            storproName: "ly0d7.goods.setThumb",
                            data: {
                                _id: rowOld._id,
                                thumb: thumbNew.thumb,
                                number: thumbNew.number,
                                name: thumbNew.name
                            }
                        }).then(result=>{
                            let dataNew = result.dataNew
                            scopeThis.$message("已提交商品编号、名称及缩略图")

                            // 刷新页面缩略图信息
                            scopeThis.tableDataBox.data.forEach(i=>{
                                if(i._id === rowOld._id){
                                    i.thumb = dataNew.thumb
                                    i.number = thumbNew.number
                                    i.name = thumbNew.name
                                }
                            })
                        })
                    }
                },
                {
                    label: '商品分类',
                    show: 'd7group',
                    fieldName: "group",
                    hdlSubmit(scopeThis, rowOld, groupNew){
                        // 刷新页面商品分类信息
                        scopeThis.tableDataBox.data.forEach(i=>{
                            if(i._id === rowOld._id){
                                i.group = JSON.parse(JSON.stringify(groupNew))
                            }
                        })

                        // 提交数据库
                        scopeThis.storpro.storpro({
                            scopeThis,
                            storproName: "ly0d7.goods.setGroup",
                            data: {
                                _id: rowOld._id,
                                group: groupNew
                            }
                        }).then(()=>{
                            scopeThis.$message("已重新分类")
                        })
                    }
                },
                {
                    label: '商品规格',
                    show: 'd7size',
                    fieldName: "size",
                    hdlSubmit(scopeThis, rowOld, sizeNew){
                        // 刷新页面商品规格信息
                        scopeThis.tableDataBox.data.forEach(i=>{
                            if(i._id === rowOld._id){
                                i.size = JSON.parse(JSON.stringify(sizeNew))
                            }
                        })

                        // 提交数据库
                        scopeThis.storpro.storpro({
                            scopeThis,
                            storproName: "ly0d7.goods.setSize",
                            data: {
                                _id: rowOld._id,
                                size: sizeNew
                            }
                        }).then(()=>{
                            scopeThis.$message("已重新标价")
                        })
                    }
                },
                {
                    label: '商品标价',
                    show: 'd7price',
                    width: "250px",
                    fieldName: "price",
                    hdlSubmit(scopeThis, rowOld, priceNew){
                        // 刷新页面商品标价信息
                        scopeThis.tableDataBox.data.forEach(i=>{
                            if(i._id === rowOld._id){
                                i.price = JSON.parse(JSON.stringify(priceNew))
                            }
                        })

                        // 提交数据库
                        scopeThis.storpro.storpro({
                            scopeThis,
                            storproName: "ly0d7.goods.setPrice",
                            data: {
                                _id: rowOld._id,
                                price: priceNew
                            }
                        }).then(()=>{
                            scopeThis.$message("已重新标价")
                        })
                    }
                },
                {
                    label: '',
                    show: 'button-group',
                    width: "100px",
                    buttonGroup: [
                        {
                            text: '详细',
                            hdlClick: handles.docPopup,
                            style: "width: 70px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                        },
                        {
                            text: '修改',
                            hdlClick: handles.updateOnePopup,
                            style: "width: 70px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                        },
                        {
                            text: '删除',
                            hdlClick: handles.deleteOneSubmit,
                            style: 'width: 70px; border-radius: 0; background-color: #ff640a; color: #ffffff;'
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
