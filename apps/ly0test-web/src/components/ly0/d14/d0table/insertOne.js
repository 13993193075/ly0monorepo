import { request as ly0request } from '@yoooloo42/ly0browser'
import {withTable} from '@yoooloo42/ly0el'
const ly0session = ly0request.ly0request.ly0sessionLoad()
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
                        inputType: 'input',
                        label: '姓名',
                        fieldName: 'f0name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '出生日期',
                        fieldName: 'f0birthdate',
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
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        dataunit_name: '',
        f0name: '',
        f0birthdate: null,
        f0idnumber: '',
        f0nation: '',
        f0nation_code: '',
        f0nativeplace: '',
        f0nativeplace_code: '',
        f0education: '',
        f0education_code: '',
        f0occupation: '',
        f0occupation_code: '',
        f0insurance: '',
        f0insurance_code: '',
        f0income: '',
        f0income_code: '',
        f0address: '',
        f0address_code: '',
        f0cellphone: '',
    }
}
