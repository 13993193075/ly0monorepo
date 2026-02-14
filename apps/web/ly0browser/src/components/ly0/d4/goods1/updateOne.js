import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'select',
                        label: '旅店',
                        fieldName: 'id_hotel',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel
                        },
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                    },
                    {
                        inputType: 'input',
                        label: '物品名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'input',
                        label: '单价',
                        fieldName: 'price0',
                        style: {width: '100px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}){
                formData.price = Math.floor(formData.price0 * 100)
                await withTable.submitUpdateOne({scopeThis})
            }
        }
    }
}
