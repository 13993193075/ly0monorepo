import {ly0request} from '@yoooloo42/ly0browser/ly0request'
import {ElMessage, ElMessageBox} from 'element-plus'
function get({scopeThis}) {
    const doc = {
        formData: {},
        items: [
            {
                inputType: 'button-group',
                inputBox: {
                    style: {'text-align': 'right'}
                },
                box: [
                    {
                        box: [
                            {
                                text: '修改',
                                icon: 'edit',
                                size: 'small',
                                hdlClick({scopeThis}) {
                                    scopeThis.update.formData =
                                        scopeThis.more.d5.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d5.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 睡眠篇'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d5.get({scopeThis}).update.items
                                    })
                                    scopeThis.update.formProps.popup.visible = true
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }
    const update = {
        formData: {},
        items: [],
    }

    // 获取睡眠篇数据
    let itemData = scopeThis.formData.appendix.d5
    itemData = JSON.stringify(itemData) === '{}' ? null : itemData

    // 字段赋值
    doc.formData.d5f0 = !!itemData ? itemData.f0 : 0
    doc.formData.d5f0uncertain = !!itemData ? itemData.f0uncertain : true
    doc.formData.d5f1 = !!itemData ? itemData.f1 : 0
    doc.formData.d5f1uncertain = !!itemData ? itemData.f1uncertain : true
    doc.formData.d5f2 = !!itemData ? itemData.f2 : 0
    doc.formData.d5f2uncertain = !!itemData ? itemData.f2uncertain : true
    doc.formData.d5f3 = !!itemData ? itemData.f3 : 0
    doc.formData.d5f3uncertain = !!itemData ? itemData.f3uncertain : true
    doc.formData.d5f4 = !!itemData ? itemData.f4 : 0
    doc.formData.d5f4uncertain = !!itemData ? itemData.f4uncertain : true
    doc.formData.d5f4f0code = !!itemData ? itemData.f4f0code : ''
    doc.formData.d5f4f0 = !!itemData ? itemData.f4f0 : ''
    doc.formData.d5f4f1 = !!itemData ? itemData.f4f1 : ''
    doc.formData.d5f4f2code = !!itemData ? itemData.f4f2code : ''
    doc.formData.d5f4f2 = !!itemData ? itemData.f4f2 : ''
    doc.formData.d5f5code = !!itemData ? itemData.f5code : 0
    doc.formData.d5f5 = !!itemData ? itemData.f5 : 0
    doc.formData.d5f5uncertain = !!itemData ? itemData.f5uncertain : true
    update.formData.d5f0 = !!itemData ? itemData.f0 : 0
    update.formData.d5f0uncertain = !!itemData ? itemData.f0uncertain : true
    update.formData.d5f1 = !!itemData ? itemData.f1 : 0
    update.formData.d5f1uncertain = !!itemData ? itemData.f1uncertain : true
    update.formData.d5f2 = !!itemData ? itemData.f2 : 0
    update.formData.d5f2uncertain = !!itemData ? itemData.f2uncertain : true
    update.formData.d5f3 = !!itemData ? itemData.f3 : 0
    update.formData.d5f3uncertain = !!itemData ? itemData.f3uncertain : true
    update.formData.d5f4 = !!itemData ? itemData.f4 : 0
    update.formData.d5f4uncertain = !!itemData ? itemData.f4uncertain : true
    update.formData.d5f4f0code = !!itemData ? itemData.f4f0code : ''
    update.formData.d5f4f0 = !!itemData ? itemData.f4f0 : ''
    update.formData.d5f4f1 = !!itemData ? itemData.f4f1 : ''
    update.formData.d5f4f2code = !!itemData ? itemData.f4f2code : ''
    update.formData.d5f4f2 = !!itemData ? itemData.f4f2 : ''
    update.formData.d5f5code = !!itemData ? itemData.f5code : ''
    update.formData.d5f5 = !!itemData ? itemData.f5 : ''
    update.formData.d5f5uncertain = !!itemData ? itemData.f5uncertain : true
    // 生成表单条目
    doc.items = doc.items.concat([
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 怀孕前1个月，晚上上床睡觉通常是几点。取值范围：0-23'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            },
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d5f0uncertain
                    ? '[不确定]'
                    : !!formData.d5f0
                        ? formData.d5f0
                        : '0'
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 怀孕前1个月，从上床到入睡通常需要几分钟'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d5f1uncertain
                    ? '[不确定]'
                    : !!formData.d5f1
                        ? formData.d5f1
                        : '0'
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 怀孕前1个月，通常早上几点起床。取值范围：0-23'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d5f2uncertain
                    ? '[不确定]'
                    : !!formData.d5f2
                        ? formData.d5f2
                        : '0'
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 怀孕前1个月，每夜通常实际睡眠几小时(不等于卧床时间)。取值范围：0-24'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d5f3uncertain
                    ? '[不确定]'
                    : !!formData.d5f3
                        ? formData.d5f3
                        : '0'
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 怀孕前1个月，因下列情况影响睡眠而烦恼，对下列原因请选择1个最适合您的答案'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '[不确定]'
            },
            hdlVisible({scopeThis, formData}) {
                return !!formData.d5f4uncertain
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },
        {
            inputType: 'text0',
            label: '类别',
            fieldName: 'd5f4f0',
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
        },
        {
            inputType: 'text0',
            label: '说明',
            fieldName: 'd5f4f1',
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
        },
        {
            inputType: 'text0',
            label: '频次',
            fieldName: 'd5f4f2',
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 怀孕前1个月，您认为自己的睡眠质量'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '[不确定]'
            },
            hdlVisible({scopeThis, formData}) {
                return !!formData.d5f5uncertain
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },
        {
            inputType: 'text0',
            fieldName: 'd5f5',
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f5uncertain
            },
            style: {
                'text-align': 'center',
                'color': '#0000ff'
            },
        },
    ])
    update.items = [
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 怀孕前1个月，晚上上床睡觉通常是几点。取值范围：0-23'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f0uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            }
        },
        {
            inputType: 'input',
            fieldName: 'd5f0',
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            },
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f0uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 怀孕前1个月，从上床到入睡通常需要几分钟'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f1uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            }
        },
        {
            inputType: 'input',
            fieldName: 'd5f1',
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            },
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f1uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 怀孕前1个月，通常早上几点起床。取值范围：0-23'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f2uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            }
        },
        {
            inputType: 'input',
            fieldName: 'd5f2',
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            },
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f2uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 怀孕前1个月，每夜通常实际睡眠几小时(不等于卧床时间)。取值范围：0-24'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            },
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f3uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            },
        },
        {
            inputType: 'input',
            fieldName: 'd5f3',
            inputBox: {
                style: {
                    'text-align': 'center'
                }
            },
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f3uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 怀孕前1个月，因下列情况影响睡眠而烦恼，对下列原因请选择1个最适合您的答案'
            },
            style: {
                'text-align': 'center',
                color: '#66030b'
            }
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f4uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {'text-align': 'center'}
            },
        },
        {
            inputType: 'select',
            label: '类别',
            fieldName: 'd5f4f0code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d5f4f0,
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
            style: {width: '300px'},
        },
        {
            inputType: 'input',
            label: '说明',
            fieldName: 'd5f4f1',
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
            style: {width: '400px'},
        },
        {
            inputType: 'select',
            label: '频次',
            fieldName: 'd5f4f2code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d5f4f2,
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f4uncertain
            },
            style: {width: '200px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 怀孕前1个月，您认为自己的睡眠质量'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd5f5uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: {
                style: {'text-align': 'center'}
            },
        },
        {
            inputType: 'select',
            fieldName: 'd5f5code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d5f5,
            hdlVisible({scopeThis, formData}) {
                return !formData.d5f5uncertain
            },
            inputBox: {
                style: {'text-align': 'center'}
            },
            style: {width: '200px'},
        },
    ]

    return {
        doc,
        update,
    }
}

async function submit({scopeThis}) {
    const dataNew = {
        id_ly0d14d0: scopeThis.formData._id,
        f0uncertain: scopeThis.update.formData.d5f0uncertain,
        f0: scopeThis.update.formData.d5f0,
        f1uncertain: scopeThis.update.formData.d5f1uncertain,
        f1: scopeThis.update.formData.d5f1,
        f2uncertain: scopeThis.update.formData.d5f2uncertain,
        f2: scopeThis.update.formData.d5f2,
        f3uncertain: scopeThis.update.formData.d5f3uncertain,
        f3: scopeThis.update.formData.d5f3,
        f4uncertain: scopeThis.update.formData.d5f4uncertain,
        f4: scopeThis.update.formData.d5f4,
        f4f0code: scopeThis.update.formData.d5f4f0code,
        f4f0: scopeThis.update.formData.d5f4f0,
        f4f1: scopeThis.update.formData.d5f4f1,
        f4f2code: scopeThis.update.formData.d5f4f2code,
        f4f2: scopeThis.update.formData.d5f4f2,
        f5uncertain: scopeThis.update.formData.d5f5uncertain,
        f5code: scopeThis.update.formData.d5f5code,
        f5: scopeThis.update.formData.d5f5,
    }
    await ly0request.storpro({
        storproName: 'ly0d14.d5.updateOne',
        data: dataNew,
    })
    ElMessage('已提交 - 睡眠篇')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
