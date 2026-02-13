import {blindboxes} from '@yoooloo42/blindboxes'
import more from '../d0more/index.js'

function getFormProps({scopeThis}) {
    // d1既往疾病史
    const more_d1 = more.d1.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d1.doc.formData,
    )
    // d2饮食篇
    const more_d2 = more.d2.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d2.doc.formData,
    )
    // d3饮食篇 - 膳食补充剂
    const more_d3 = more.d3.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d3.doc.formData,
    )
    // d4运动篇
    const more_d4 = more.d4.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d4.doc.formData,
    )
    // d5睡眠篇
    const more_d5 = more.d5.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d5.doc.formData,
    )
    // d6心理篇
    const more_d6 = more.d6.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d6.doc.formData,
    )
    // d7社会支持篇
    const more_d7 = more.d7.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d7.doc.formData,
    )
    // d8药物使用
    const more_d8 = more.d8.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d8.doc.formData,
    )
    // d9环境暴露
    const more_d9 = more.d9.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d9.doc.formData,
    )
    // d10相关实验室检查
    const more_d10 = more.d10.get({scopeThis})
    scopeThis.formData = blindboxes.deepClone.deepMerge(
        scopeThis.formData,
        more_d10.doc.formData,
    )

    return {
        cols: [
            {
                items: [
                    {
                        inputType: 'collapse',
                        accordion: true, // 手风琴模式
                        activeNames: scopeThis.openIndex,
                        hdlChange(activeNames){
                            // 保持当前打开面板
                            scopeThis.openIndex = activeNames
                        },
                        items: [
                            {
                                title: '个人基本信息',
                                name: 'd0',
                                items: [
                                    {
                                        inputType: 'expression0',
                                        label: '采样时间',
                                        hdlExpression({scopeThis, formData}) {
                                            return blindboxes.dateFormat.dateFormat(formData.time_create, 'yyyy/MM/dd HH:mm:ss')
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '姓名',
                                        fieldName: 'f0name',
                                    },
                                    {
                                        inputType: 'expression0',
                                        label: '出生日期',
                                        hdlExpression({scopeThis, formData}) {
                                            return blindboxes.dateFormat.dateFormat(formData.f0birthdate, 'yyyy/MM/dd')
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '身份证号',
                                        fieldName: 'f0idnumber',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '民族',
                                        fieldName: 'f0nation',
                                    },
                                    {
                                        inputType: 'ly0gbt2260',
                                        label: '籍贯',
                                        fieldName: 'f0nativeplace_code',
                                        readOnly: true,
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '文化程度',
                                        fieldName: 'f0education',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '职业',
                                        fieldName: 'f0occupation',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '医保',
                                        fieldName: 'f0insurance',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '家庭人均月收入',
                                        fieldName: 'f0income',
                                    },
                                    {
                                        inputType: 'ly0gbt2260',
                                        label: '家庭住址',
                                        fieldName: 'f0address_code',
                                        readOnly: true,
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '手机号',
                                        fieldName: 'f0cellphone',
                                    },
                                ],
                            },
                            {
                                title: '配偶信息',
                                name: 'd0f1',
                                items: [
                                    {
                                        inputType: 'button-group',
                                        inputBox: { style: 'text-align: right;', new: true },
                                        box: [
                                            {
                                                box: [
                                                    {
                                                        text: '修改',
                                                        icon: 'edit',
                                                        size: 'small',
                                                        hdlClick({scopeThis}) {
                                                            scopeThis.update.formData =
                                                                scopeThis.more.f1.update.getFormData({scopeThis})
                                                            scopeThis.update.formProps.submit.handle =
                                                                scopeThis.more.f1.update.submit
                                                            scopeThis.update.formProps.popup.title = '修改 - 配偶信息'
                                                            scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                                            scopeThis.update.formProps.cols.push({
                                                                items: scopeThis.more.f1.update.getItems({scopeThis})
                                                            })
                                                            scopeThis.update.formProps.popup.visible = true
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '姓名',
                                        fieldName: 'f1name',
                                    },
                                    {
                                        inputType: 'expression0',
                                        label: '出生日期',
                                        hdlExpression({scopeThis, formData}) {
                                            return blindboxes.dateFormat.dateFormat(formData.f1birthdate, 'yyyy/MM/dd')
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '文化程度',
                                        fieldName: 'f1education',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '职业',
                                        fieldName: 'f1occupation',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '手机号',
                                        fieldName: 'f1cellphone',
                                    },
                                ],
                            },
                            {
                                title: '孕产信息',
                                name: 'd0f2',
                                items: [
                                    {
                                        inputType: 'button-group',
                                        inputBox: { style: 'text-align: right;', new: true },
                                        box: [
                                            {
                                                box: [
                                                    {
                                                        text: '修改',
                                                        icon: 'edit',
                                                        size: 'small',
                                                        hdlClick({scopeThis}) {
                                                            scopeThis.update.formData =
                                                                scopeThis.more.f2.update.getFormData({scopeThis})
                                                            scopeThis.update.formProps.submit.handle =
                                                                scopeThis.more.f2.update.submit
                                                            scopeThis.update.formProps.popup.title = '修改 - 孕产信息'
                                                            scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                                            scopeThis.update.formProps.cols.push({
                                                                items: scopeThis.more.f2.update.getItems({scopeThis})
                                                            })
                                                            scopeThis.update.formProps.popup.visible = true
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '身高(cm)',
                                        fieldName: 'f2height',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '体重(kg)',
                                        fieldName: 'f2weight',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '孕次',
                                        fieldName: 'f2pregnancies',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '产次',
                                        fieldName: 'f2births',
                                    },
                                    {
                                        inputType: 'expression0',
                                        label: '末次月经',
                                        hdlExpression({scopeThis, formData}) {
                                            return blindboxes.dateFormat.dateFormat(
                                                formData.f2menstruation_last,
                                                'yyyy/MM/dd',
                                            )
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '初潮年龄',
                                        fieldName: 'f2menstruation_first',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '月经周期',
                                        fieldName: 'f2menstruation_cycle',
                                    },
                                    {
                                        inputType: 'line',
                                        hdlVisible({scopeThis, formData}) {
                                            return !!formData.f2abnormal
                                        },
                                    },
                                    {
                                        inputType: 'expression0',
                                        label: '异常孕产史',
                                        hdlExpression({scopeThis, formData}) {
                                            return !!formData.f2abnormal ? '有' : '无'
                                        },
                                        labelStyle: 'color: #66030b',
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '异常情况',
                                        fieldName: 'f2abnormal0',
                                        hdlVisible({scopeThis, formData}) {
                                            return !!formData.f2abnormal
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '流产几次',
                                        fieldName: 'f2abnormal1',
                                        hdlVisible({scopeThis, formData}) {
                                            return !!formData.f2abnormal
                                        },
                                    },
                                    {
                                        inputType: 'text0',
                                        label: '死胎死产几次',
                                        fieldName: 'f2abnormal2',
                                        hdlVisible({scopeThis, formData}) {
                                            return !!formData.f2abnormal
                                        },
                                    },
                                ],
                            },
                            {
                                title: '既往疾病史',
                                name: 'd1',
                                items: more_d1.doc.items,
                            },
                            {
                                title: '饮食篇',
                                name: 'd2',
                                items: more_d2.doc.items,
                            },
                            {
                                title: '饮食篇 - 膳食补充剂',
                                name: 'd3',
                                items: more_d3.doc.items,
                            },
                            {
                                title: '运动篇',
                                name: 'd4',
                                items: more_d4.doc.items,
                            },
                            {
                                title: '睡眠篇',
                                name: 'd5',
                                items: more_d5.doc.items,
                            },
                            {
                                title: '心理篇',
                                name: 'd6',
                                items: more_d6.doc.items,
                            },
                            {
                                title: '社会支持篇',
                                name: 'd7',
                                items: more_d7.doc.items,
                            },
                            {
                                title: '药物使用',
                                name: 'd8',
                                items: more_d8.doc.items,
                            },
                            {
                                title: '环境暴露',
                                name: 'd9',
                                items: more_d9.doc.items,
                            },
                            {
                                title: '相关实验室检查',
                                name: 'd10',
                                items: more_d10.doc.items,
                            },
                        ],
                    },
                ],
            },
        ],
        submit: {
            switch: false
        },
    }
}

export default {
    getFormProps,
}
