import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'
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
                        inputType: 'input',
                        label: '姓名',
                        fieldName: 'f0name',
                    },
                    {
                        inputType: 'date-picker',
                        label: '出生日期',
                        fieldName: 'f0birthdate',
                        type: 'date',
                    },
                    {
                        inputType: 'input',
                        label: '身份证号码',
                        fieldName: 'f0idnumber',
                    },
                    {
                        inputType: 'select',
                        label: '民族',
                        fieldName: 'f0nation_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.gbt.gbt3304
                        },
                    },
                    {
                        inputType: 'ly0gbt2260',
                        label: '籍贯',
                        fieldName: 'f0nativeplace_code',
                    },
                    {
                        inputType: 'select',
                        label: '文化程度',
                        fieldName: 'f0education_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.gbt.gbt4658
                        },
                    },
                    {
                        inputType: 'select',
                        label: '职业',
                        fieldName: 'f0occupation_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.busiCode.d14d0f0occupation
                        },
                    },
                    {
                        inputType: 'select',
                        label: '医保',
                        fieldName: 'f0insurance_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.busiCode.d14d0f0insurance
                        },
                    },
                    {
                        inputType: 'select',
                        label: '家庭人均月收入',
                        fieldName: 'f0income_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.busiCode.d14d0f0income
                        },
                    },
                    {
                        inputType: 'ly0gbt2260',
                        label: '家庭住址',
                        fieldName: 'f0address_code',
                    },
                    {
                        inputType: 'input',
                        label: '手机号',
                        fieldName: 'f0cellphone',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
