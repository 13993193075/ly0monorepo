import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "查询"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'date-picker',
                        label: '采样时间 起',
                        fieldName: 'time_start',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '止',
                        fieldName: 'time_end',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '姓名',
                        fieldName: 'f0name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '出生日期 起',
                        fieldName: 'f0birthdate_start',
                        type: 'date',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '止',
                        fieldName: 'f0birthdate_end',
                        type: 'date',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '身份证号码',
                        fieldName: 'f0idnumber',
                        style: {width: '200px'},
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
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'ly0gbt2260',
                        label: '籍贯',
                        fieldName: 'f0nativeplace_code',
                        style: {width: '200px'},
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
                        style: {width: '200px'},
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
                        style: {width: '200px'},
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
                        style: {width: '200px'},
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
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'ly0gbt2260',
                        label: '家庭住址',
                        fieldName: 'f0address_code',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '手机号',
                        fieldName: 'f0cellphone',
                        style: {width: '200px'},
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
