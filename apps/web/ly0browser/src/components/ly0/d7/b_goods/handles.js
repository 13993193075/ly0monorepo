// 新增提交前的处理
function insertOneSubmitBefore(scopeThis){
    scopeThis.formDataBox.insertOne.fieldsValue.price = Math.floor(scopeThis.formDataBox.insertOne.fieldsValue.price_yuan * 100)
}

// 新增提交后的处理
function insertOneSubmitAfter(scopeThis){
    scopeThis.scopeThis.init().then(()=>{
        scopeThis.scopeThis.forceRefresh.amount++ // 强制更新 id_business 相关子组件
    })
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis){
    scopeThis.pageData.data.arrGoods = []
    scopeThis.pageData.data.arrGoods.push({
        _id: scopeThis.formDataBox.updateOne.fieldsValue.id_goods,
        number: scopeThis.formDataBox.updateOne.fieldsValue.number,
        name: scopeThis.formDataBox.updateOne.fieldsValue.name
    })

    scopeThis.pageData.data.arrPrice = []
    scopeThis.pageData.data.arrPrice.push({
        name: scopeThis.formDataBox.updateOne.fieldsValue.price_name ? scopeThis.formDataBox.updateOne.fieldsValue.price_name : "",
        price: scopeThis.formDataBox.updateOne.fieldsValue.price && scopeThis.formDataBox.updateOne.fieldsValue.price > 0 ? scopeThis.formDataBox.updateOne.fieldsValue.price : 0
    })

    scopeThis.formDataBox.updateOne.fieldsValue = Object.assign(scopeThis.formDataBox.updateOne.fieldsValue, {
        price_yuan: Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price) / 100
    })

    scopeThis.withArrGoods.dataBox.fieldsValue.pagination_limit = scopeThis.withArrGoods.dataBox.fieldsValue_init.limit
    scopeThis.withArrGoods.dataBox.fieldsValue.pagination_page = scopeThis.withArrGoods.dataBox.fieldsValue_init.page
    scopeThis.withArrGoods.dataBox.fieldsValue.pagination_count = scopeThis.pageData.data.arrGoods.length
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis){
    scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price_yuan * 100)
}

export default{
    insertOneSubmitBefore,
    insertOneSubmitAfter,
    updateOnePopupBefore,
    updateOneSubmitBefore,
    updateOneSubmitAfter: insertOneSubmitAfter, // 修改提交后的处理
    deleteOneSubmitAfter: insertOneSubmitAfter // 删除提交后的处理
}
