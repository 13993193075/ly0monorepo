import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
function get({scopeThis}) {
    const doc = {
        formData: {},
        items: [
            {
                inputType: 'button-group',
                inputBox: { style: {'text-align': 'right'}, new: true },
                box: [
                    {
                        box: [
                            {
                                text: '修改',
                                icon: 'edit',
                                size: 'small',
                                hdlClick({scopeThis}) {
                                    scopeThis.update.formData =
                                        scopeThis.more.d7.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d7.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 社会支持篇'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d7.get({scopeThis}).update.items
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

    // 获取社会支持篇数据
    let itemData = scopeThis.formData.appendix.d7
    itemData = JSON.stringify(itemData) === '{}' ? null : itemData

    // 字段赋值
    doc.formData.d7f0 = !!itemData ? itemData.f0 : ''
    doc.formData.d7f0code = !!itemData ? itemData.f0code : ''
    doc.formData.d7f1 = !!itemData ? itemData.f1 : ''
    doc.formData.d7f1code = !!itemData ? itemData.f1code : ''
    doc.formData.d7f2 = !!itemData ? itemData.f2 : ''
    doc.formData.d7f2code = !!itemData ? itemData.f2code : ''
    doc.formData.d7f3 = !!itemData ? itemData.f3 : ''
    doc.formData.d7f3code = !!itemData ? itemData.f3code : ''

    doc.formData.d7f4f0 = !!itemData ? itemData.f4f0 : ''
    doc.formData.d7f4f0code = !!itemData ? itemData.f4f0code : ''
    doc.formData.d7f4f1 = !!itemData ? itemData.f4f1 : ''
    doc.formData.d7f4f1code = !!itemData ? itemData.f4f1code : ''

    doc.formData.d7f5 = !!itemData ? itemData.f5 : ''
    doc.formData.d7f5code = !!itemData ? itemData.f5code : ''
    doc.formData.d7f6 = !!itemData ? itemData.f6 : ''
    doc.formData.d7f6code = !!itemData ? itemData.f6code : ''
    doc.formData.d7f7 = !!itemData ? itemData.f7 : ''
    doc.formData.d7f7code = !!itemData ? itemData.f7code : ''
    doc.formData.d7f8 = !!itemData ? itemData.f8 : ''
    doc.formData.d7f8code = !!itemData ? itemData.f8code : ''
    doc.formData.d7f9 = !!itemData ? itemData.f9 : ''
    doc.formData.d7f9code = !!itemData ? itemData.f9code : ''
    update.formData.d7f0 = !!itemData ? itemData.f0 : ''
    update.formData.d7f0code = !!itemData ? itemData.f0code : ''
    update.formData.d7f1 = !!itemData ? itemData.f1 : ''
    update.formData.d7f1code = !!itemData ? itemData.f1code : ''
    update.formData.d7f2 = !!itemData ? itemData.f2 : ''
    update.formData.d7f2code = !!itemData ? itemData.f2code : ''
    update.formData.d7f3 = !!itemData ? itemData.f3 : ''
    update.formData.d7f3code = !!itemData ? itemData.f3code : ''

    update.formData.d7f4f0 = !!itemData ? itemData.f4f0 : ''
    update.formData.d7f4f0code = !!itemData ? itemData.f4f0code : ''
    update.formData.d7f4f1 = !!itemData ? itemData.f4f1 : ''
    update.formData.d7f4f1code = !!itemData ? itemData.f4f1code : ''

    update.formData.d7f5 = !!itemData ? itemData.f5 : ''
    update.formData.d7f5code = !!itemData ? itemData.f5code : ''
    update.formData.d7f6 = !!itemData ? itemData.f6 : ''
    update.formData.d7f6code = !!itemData ? itemData.f6code : ''
    update.formData.d7f7 = !!itemData ? itemData.f7 : ''
    update.formData.d7f7code = !!itemData ? itemData.f7code : ''
    update.formData.d7f8 = !!itemData ? itemData.f8 : ''
    update.formData.d7f8code = !!itemData ? itemData.f8code : ''
    update.formData.d7f9 = !!itemData ? itemData.f9 : ''
    update.formData.d7f9code = !!itemData ? itemData.f9code : ''
    // 生成表单条目
    doc.items = doc.items.concat([
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 您有多少关系密切可以得到支持和帮助的朋友'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f0',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f0
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 近一年来您的居住状态'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f1',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f1
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 您与邻居'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f2',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f2
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 您与同事'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f3',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f3
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 从家庭成员得到的支持和照顾'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            label: '成员类型',
            fieldName: 'd7f4f0',
        },
        {
            inputType: 'text0',
            label: '得到的支持和照顾',
            fieldName: 'd7f4f1',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 过去,在您遇到急难情况时,曾经得到的经济支持和解决实际问题的帮助来源有'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f5',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f5
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '7. 过去,在您遇到急难情况时,曾经得到的安慰和关心来源有'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f6',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f6
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '8. 您遇到烦恼时的倾诉方式'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f7',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f7
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '9. 您遇到烦恼时的求助方式'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f8',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f8
            },
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '10. 对于团体(如党团组织、宗教组织、工会等)组织活动，您参加的情况'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'text0',
            fieldName: 'd7f9',
            style: {'text-align': 'center', color: '#0000ff'},
            hdlVisible({scopeThis, formData}) {
                return !!formData.d7f9
            },
        },
    ])
    update.items = [
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1. 您有多少关系密切可以得到支持和帮助的朋友'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f0code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f0,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'}
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2. 近一年来您的居住状态'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f1code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f1,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3. 您与邻居'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f2code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f2,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 您与同事'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f3code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f3,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 从家庭成员得到的支持和照顾'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            label: '成员类型',
            fieldName: 'd7f4f0code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f4f0,
            style: {width: '400px'},
        },
        {
            inputType: 'select',
            label: '得到的支持和照顾',
            fieldName: 'd7f4f1code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f4f1,
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '6. 过去,在您遇到急难情况时,曾经得到的经济支持和解决实际问题的帮助来源有'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f5code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f5,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '7. 过去,在您遇到急难情况时,曾经得到的安慰和关心来源有'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f6code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f6,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '8. 您遇到烦恼时的倾诉方式'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f7code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f7,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '9. 您遇到烦恼时的求助方式'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f8code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f8,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '10. 对于团体(如党团组织、宗教组织、工会等)组织活动，您参加的情况'
            },
            style: {'text-align': 'center', color: '#66030b'},
        },
        {
            inputType: 'select',
            fieldName: 'd7f9code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d7f9,
            inputBox: { style: {'text-align': 'center'} },
            style: {width: '400px'},
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
        f0code: scopeThis.update.formData.d7f0code,
        f0: scopeThis.update.formData.d7f0,
        f1code: scopeThis.update.formData.d7f1code,
        f1: scopeThis.update.formData.d7f1,
        f2code: scopeThis.update.formData.d7f2code,
        f2: scopeThis.update.formData.d7f2,
        f3code: scopeThis.update.formData.d7f3code,
        f3: scopeThis.update.formData.d7f3,

        f4f0code: scopeThis.update.formData.d7f4f0code,
        f4f0: scopeThis.update.formData.d7f4f0,
        f4f1code: scopeThis.update.formData.d7f4f1code,
        f4f1: scopeThis.update.formData.d7f4f1,

        f5code: scopeThis.update.formData.d7f5code,
        f5: scopeThis.update.formData.d7f5,
        f6code: scopeThis.update.formData.d7f6code,
        f6: scopeThis.update.formData.d7f6,
        f7code: scopeThis.update.formData.d7f7code,
        f7: scopeThis.update.formData.d7f7,
        f8code: scopeThis.update.formData.d7f8code,
        f8: scopeThis.update.formData.d7f8,
        f9code: scopeThis.update.formData.d7f9code,
        f9: scopeThis.update.formData.d7f9,
    }
    await request.ly0.storpro({
        storproName: 'ly0d14.d7.updateOne',
        data: dataNew,
    })
    ElMessage('已提交 - 社会支持篇')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
