import {request as ly0request} from "@yoooloo42/ly0browser";

const formData = {
    number: "",
    name: "",
    group: [],
    size: [],

    // 分页查询
    pagination_limit: 100,
    pagination_page: 1,
    pagination_total: 0
}
const formProps = {
    popup: {
        switch: true,
        visible: false,
        title: "获取更多已上架商品"
    },
    cols: [
        {
            items: [
                {
                    inputType: "input",
                    label: "商品编号",
                    fieldName: "number"
                },
                {
                    inputType: "input",
                    label: "商品名称",
                    fieldName: "name"
                },
                {
                    inputType: "ly0d7group",
                    label: "商品分类",
                    fieldName: "group"
                },
                {
                    inputType: "ly0d7size",
                    label: "商品规格",
                    fieldName: "size"
                },
                {
                    inputType: "collapse",
                    items: [
                        {
                            title: "分页查询",
                            items: [
                                {
                                    inputType: "input-number",
                                    label: "分页大小",
                                    fieldName: "pagination_limit",
                                    min: 10,
                                    max: 1000,
                                    size: "small"
                                },
                                {
                                    inputType: "input-number",
                                    label: "当前页号",
                                    fieldName: "pagination_page",
                                    min: 1,
                                    max: 100,
                                    size: "small"
                                },
                                {
                                    inputType: "text",
                                    label: "全部记录数",
                                    fieldName: "pagination_total",
                                    inputWidth: "100px"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    submit: {
        async handle({formData, formProps, scopeThis}) {
            await getData({formData, formProps, scopeThis})
            formProps.popup.visible = false
        }
    }
}

// 通过查询表单获取商品信息
async function getData({formData, scopeThis}){
    // 取整
    formData.pagination_limit = Math.floor(formData.pagination_limit)
    formData.pagination_page = Math.floor(formData.pagination_page)

    // 获取更多已上架商品
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d7.goods.find",
        data: {
            query: {
                id_dataunit: scopeThis.pgData.data.objBusiness.id_dataunit,
                id_shop: scopeThis.pgData.data.objShop._id,
                number: formData.number,
                name: formData.name,
                group: formData.group,
                size: formData.size
            },
            sort: {
                label: "number",
                order: 1
            },
            limit: formData.pagination_limit,
            page: formData.pagination_page
        }
    })
    scopeThis.pgData.data.arrGoods = result.data
    formData.pagination_total = result.total
}

// 获取单条商品信息，
async function getOne(_id){
    return await ly0request.ly0.storpro({
        storproName: "ly0d7.goods.find",
        data: {query: {_id}}
    })
}

export default{
    formData,
    formProps,
    getData,
    getOne
}
