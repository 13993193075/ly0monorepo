import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "新增"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'select',
                        label: '可以选择：标价物品',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis, fomData}) {
                            return scopeThis.pgData.data.arrGoods
                        },
                        hdlChange({scopeThis, formData, value}) {
                            const objGoods = scopeThis.pgData.data.arrGoods.find(i => i._id === value)
                            formData.name = objGoods.name
                            formData.price0 = Math.floor(objGoods.price) / 100
                        },
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '也可以输入：物品名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '单价',
                        fieldName: 'price0',
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'input',
                        label: '数量',
                        fieldName: 'count',
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}) {
                formData.price = Math.floor((formData.price0 * 100))
                await withTable.submitInsertOne({scopeThis, formData})
            }
        }
    },
    formData: {
        _id: null,
        id_business: null,
        id_goods: null,
        name: '',
        price: 0,
        price0: 0,
        count: 1,
        note: '',
    }
}
