import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
function get({scopeThis}) {
    const doc = {
        formData: {},
        items: [
            {
                inputType: 'button-group',
                inputBox: {
                    style: {'text-align': 'right'},
                    new: true
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
                                        scopeThis.more.d10.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d10.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 相关实验室检查'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d10.get({scopeThis}).update.items
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

    // 获取相关实验室检查数据
    let itemData = scopeThis.formData.appendix.d10
    itemData = JSON.stringify(itemData) === '{}' ? null : itemData

    // 字段赋值
    doc.formData.d10f0 = !!itemData ? itemData.f0 : false
    doc.formData.d10f0note = !!itemData ? itemData.f0note : ''
    doc.formData.d10f1 = !!itemData ? itemData.f1 : false
    doc.formData.d10f1note = !!itemData ? itemData.f1note : ''
    doc.formData.d10f2 = !!itemData ? itemData.f2 : false
    doc.formData.d10f2nt = !!itemData ? itemData.f2nt : ''
    doc.formData.d10f2note = !!itemData ? itemData.f2note : ''
    doc.formData.d10f3 = !!itemData ? itemData.f3 : false
    doc.formData.d10f3item_code = !!itemData ? itemData.f3item_code : ''
    doc.formData.d10f3item = !!itemData ? itemData.f3item : ''
    doc.formData.d10f3result_code = !!itemData ? itemData.f3result_code : ''
    doc.formData.d10f3result = !!itemData ? itemData.f3result : ''
    doc.formData.d10f4 = !!itemData ? itemData.f4 : false
    doc.formData.d10f5 = !!itemData ? itemData.f5 : false
    doc.formData.d10f5item_code = !!itemData ? itemData.f5item_code : ''
    doc.formData.d10f5item = !!itemData ? itemData.f5item : ''
    doc.formData.d10f5note = !!itemData ? itemData.f5note : ''
    doc.formData.d10f6 = !!itemData ? itemData.f6 : false
    doc.formData.d10f6note = !!itemData ? itemData.f6note : ''
    doc.formData.d10f7 = !!itemData ? itemData.f7 : false
    doc.formData.d10f7note = !!itemData ? itemData.f7note : ''
    doc.formData.d10f8 = !!itemData ? itemData.f8 : false
    doc.formData.d10f8note = !!itemData ? itemData.f8note : ''
    update.formData.d10f0 = !!itemData ? itemData.f0 : false
    update.formData.d10f0note = !!itemData ? itemData.f0note : ''
    update.formData.d10f1 = !!itemData ? itemData.f1 : false
    update.formData.d10f1note = !!itemData ? itemData.f1note : ''
    update.formData.d10f2 = !!itemData ? itemData.f2 : false
    update.formData.d10f2nt = !!itemData ? itemData.f2nt : ''
    update.formData.d10f2note = !!itemData ? itemData.f2note : ''
    update.formData.d10f3 = !!itemData ? itemData.f3 : false
    update.formData.d10f3item_code = !!itemData ? itemData.f3item_code : ''
    update.formData.d10f3item = !!itemData ? itemData.f3item : ''
    update.formData.d10f3result_code = !!itemData ? itemData.f3result_code : ''
    update.formData.d10f3result = !!itemData ? itemData.f3result : ''
    update.formData.d10f4 = !!itemData ? itemData.f4 : false
    update.formData.d10f5 = !!itemData ? itemData.f5 : false
    update.formData.d10f5item_code = !!itemData ? itemData.f5item_code : ''
    update.formData.d10f5item = !!itemData ? itemData.f5item : ''
    update.formData.d10f5note = !!itemData ? itemData.f5note : ''
    update.formData.d10f6 = !!itemData ? itemData.f6 : false
    update.formData.d10f6note = !!itemData ? itemData.f6note : ''
    update.formData.d10f7 = !!itemData ? itemData.f7 : false
    update.formData.d10f7note = !!itemData ? itemData.f7note : ''
    update.formData.d10f8 = !!itemData ? itemData.f8 : false
    update.formData.d10f8note = !!itemData ? itemData.f8note : ''
    // 生成表单条目
    doc.items = doc.items.concat([
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 备孕是否做过平片或CT等放射性检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f0 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '具体说明',
            fieldName: 'd10f0note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f0
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 孕妇本人及家属备孕期间是否接触放射性核素'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f1 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '具体说明',
            fieldName: 'd10f1note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f1
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 是否于妊娠11-13周(+6)在我院进行NT检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f2 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: 'NT值',
            fieldName: 'd10f2nt',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f2
            },
        },
        {
            inputType: 'text0',
            label: '有无合并其他异常',
            fieldName: 'd10f2note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f2
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 是否做过唐氏筛查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f3 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '筛查项目',
            fieldName: 'd10f3item',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f3
            },
        },
        {
            inputType: 'text0',
            label: '筛查结果',
            fieldName: 'd10f3result',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f3
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 是否做过系统超声或四维超声'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f4 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 是否做过胎儿染色体相关检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f5 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '检查项目',
            fieldName: 'd10f5item',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f5
            },
        },
        {
            inputType: 'text0',
            label: '有无异常(检查时间)',
            fieldName: 'd10f5note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f5
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '7. 是否查过孕妇或丈夫的染色体'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f6 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '有无异常(家族病史)',
            fieldName: 'd10f6note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f6
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '8. 胎儿出生后是否做髋关节检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f7 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '有无异常',
            fieldName: 'd10f7note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f7
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '9. 胎儿出生后是否做超声、核磁检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d10f8 ? '[是]' : '[否]'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'text0',
            label: '有无异常(心脏可疑)',
            fieldName: 'd10f8note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f8
            },
        },
    ])
    update.items = [
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 备孕是否做过平片或CT等放射性检查'
            },
            style: {'text-align': 'center', 'color': '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f0',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: {style: {'text-align': 'center'}},
        },
        {
            inputType: 'input',
            label: '具体说明',
            fieldName: 'd10f0note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f0
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 孕妇本人及家属备孕期间是否接触放射性核素'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f1',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            label: '具体说明',
            fieldName: 'd10f1note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f1
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 是否于妊娠11-13周(+6)在我院进行NT检查'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f2',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            label: 'NT值',
            fieldName: 'd10f2nt',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f2
            },
        },
        {
            inputType: 'input',
            label: '有无合并其他异常',
            fieldName: 'd10f2note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f2
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 是否做过唐氏筛查'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f3',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'select',
            label: '筛查项目',
            fieldName: 'd10f3item_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d10f3item,
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f3
            },
        },
        {
            inputType: 'select',
            label: '筛查结果',
            fieldName: 'd10f3result_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d10f3result,
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f3
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 是否做过系统超声或四维超声'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f4',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 是否做过胎儿染色体相关检查'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f5',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'select',
            label: '检查项目',
            fieldName: 'd10f5item_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d10f5item,
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f5
            },
        },
        {
            inputType: 'input',
            label: '有无异常(检查时间)',
            fieldName: 'd10f5note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f5
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '7. 是否查过孕妇或丈夫的染色体'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f6',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            label: '有无异常(家族病史)',
            fieldName: 'd10f6note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f6
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '8. 胎儿出生后是否做髋关节检查'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f7',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            label: '有无异常',
            fieldName: 'd10f7note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f7
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '9. 胎儿出生后是否做超声、核磁检查'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd10f8',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '是' },
                { code: false, text: '否' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            label: '有无异常(心脏可疑)',
            fieldName: 'd10f8note',
            hdlVisible({scopeThis, formData}) {
                return !!formData.d10f8
            },
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
        f0: scopeThis.update.formData.d10f0,
        f0note: scopeThis.update.formData.d10f0note,
        f1: scopeThis.update.formData.d10f1,
        f1note: scopeThis.update.formData.d10f1note,
        f2: scopeThis.update.formData.d10f2,
        f2nt: scopeThis.update.formData.d10f2nt,
        f2note: scopeThis.update.formData.d10f2note,
        f3: scopeThis.update.formData.d10f3,
        f3item_code: scopeThis.update.formData.d10f3item_code,
        f3item: scopeThis.update.formData.d10f3item,
        f3result_code: scopeThis.update.formData.d10f3result_code,
        f3result: scopeThis.update.formData.d10f3result,
        f4: scopeThis.update.formData.d10f4,
        f5: scopeThis.update.formData.d10f5,
        f5item_code: scopeThis.update.formData.d10f5item_code,
        f5item: scopeThis.update.formData.d10f5item,
        f5note: scopeThis.update.formData.d10f5note,
        f6: scopeThis.update.formData.d10f6,
        f6note: scopeThis.update.formData.d10f6note,
        f7: scopeThis.update.formData.d10f7,
        f7note: scopeThis.update.formData.d10f7note,
        f8: scopeThis.update.formData.d10f8,
        f8note: scopeThis.update.formData.d10f8note,
    }
    await request.ly0.storpro({
        storproName: 'ly0d14.d10.updateOne',
        data: dataNew,
    })
    ElMessage('已提交 - 相关实验室检查')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
