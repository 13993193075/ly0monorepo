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
                                        scopeThis.more.d4.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d4.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 运动篇'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d4.get({scopeThis}).update.items
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

    // 获取运动篇数据
    let itemData = scopeThis.formData.appendix.d4
    itemData = JSON.stringify(itemData) === '{}' ? null : itemData

    // 字段赋值
    doc.formData.d4f0 = !!itemData ? itemData.f0 : 0
    doc.formData.d4f0uncertain = !!itemData ? itemData.f0uncertain : true
    doc.formData.d4f0f0 = !!itemData ? itemData.f0f0 : 0
    doc.formData.d4f0f0uncertain = !!itemData ? itemData.f0f0uncertain : true
    doc.formData.d4f1 = !!itemData ? itemData.f1 : 0
    doc.formData.d4f1uncertain = !!itemData ? itemData.f1uncertain : true
    doc.formData.d4f1f0 = !!itemData ? itemData.f1f0 : 0
    doc.formData.d4f1f0uncertain = !!itemData ? itemData.f1f0uncertain : true
    doc.formData.d4f2 = !!itemData ? itemData.f2 : 0
    doc.formData.d4f2uncertain = !!itemData ? itemData.f2uncertain : true
    doc.formData.d4f2f0 = !!itemData ? itemData.f2f0 : 0
    doc.formData.d4f2f0uncertain = !!itemData ? itemData.f2f0uncertain : true
    doc.formData.d4f3 = !!itemData ? itemData.f3 : 0
    doc.formData.d4f3uncertain = !!itemData ? itemData.f3uncertain : true
    doc.formData.d4f4 = !!itemData ? itemData.f4 : 0
    doc.formData.d4f4uncertain = !!itemData ? itemData.f4uncertain : true
    update.formData.d4f0 = !!itemData ? itemData.f0 : 0
    update.formData.d4f0uncertain = !!itemData ? itemData.f0uncertain : true
    update.formData.d4f0f0 = !!itemData ? itemData.f0f0 : 0
    update.formData.d4f0f0uncertain = !!itemData ? itemData.f0f0uncertain : true
    update.formData.d4f1 = !!itemData ? itemData.f1 : 0
    update.formData.d4f1uncertain = !!itemData ? itemData.f1uncertain : true
    update.formData.d4f1f0 = !!itemData ? itemData.f1f0 : 0
    update.formData.d4f1f0uncertain = !!itemData ? itemData.f1f0uncertain : true
    update.formData.d4f2 = !!itemData ? itemData.f2 : 0
    update.formData.d4f2uncertain = !!itemData ? itemData.f2uncertain : true
    update.formData.d4f2f0 = !!itemData ? itemData.f2f0 : 0
    update.formData.d4f2f0uncertain = !!itemData ? itemData.f2f0uncertain : true
    update.formData.d4f3 = !!itemData ? itemData.f3 : 0
    update.formData.d4f3uncertain = !!itemData ? itemData.f3uncertain : true
    update.formData.d4f4 = !!itemData ? itemData.f4 : 0
    update.formData.d4f4uncertain = !!itemData ? itemData.f4uncertain : true
    // 生成表单条目
    doc.items = doc.items.concat([
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1.1. 在过去7天中，您有几天进行了剧烈运动，例如搬(举)重物、跑步、游泳、踢足球、打篮球、打网球、跳绳、跳健身操等。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f0uncertain
                    ? '[不确定]'
                    : !!formData.d4f0
                        ? formData.d4f0
                        : '0'
            },
            style: {'text-align': 'center', color: '#0000ff'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1.2. 在这几天中，您每天进行这些重体力活动的时间平均为多少分钟。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f0f0uncertain
                    ? '[不确定]'
                    : !!formData.d4f0f0
                        ? formData.d4f0f0
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2.1. 在过去7天中，您有几天进行了中等强度的活动，如搬(举)轻物、骑自行车、打太极拳、十八法、关节操、扇子舞、木兰拳、乒乓球、羽毛球、交谊舞等(不包括步行)。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f1uncertain
                    ? '[不确定]'
                    : !!formData.d4f1
                        ? formData.d4f1
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2.2. 在这几天中，您每天进行这些中等强度体力活动的时间为。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f1f0uncertain
                    ? '[不确定]'
                    : !!formData.d4f1f0
                        ? formData.d4f1f0
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3.1. 在过去7天中，您有几天是步行，每次步行至少10分钟，这里的步行包括您工作时和在家中的步行，交通行程的步行以及为了锻炼身体进行的步行。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f2uncertain
                    ? '[不确定]'
                    : !!formData.d4f2
                        ? formData.d4f2
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3.2. 在这几天中，您每天步行的时间为。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f2f0uncertain
                    ? '[不确定]'
                    : !!formData.d4f2f0
                        ? formData.d4f2f0
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 在过去7天中，您每天处于静坐的时间大约为包括您在工作单位和家中，坐在办公桌前，电脑前，坐着或躺着看电视，拜访朋友，看书，乘车等的时间。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f3uncertain
                    ? '[不确定]'
                    : !!formData.d4f3
                        ? formData.d4f3
                        : '0'
            },
            style: {'text-align': 'center', 'color': '#0000ff'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 您在最近一周每天运动的步数平均为(可从微信运动、支付宝运动、华为健康、运动手环中获取)'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return !!formData.d4f4uncertain
                    ? '[不确定]'
                    : !!formData.d4f4
                        ? formData.d4f4
                        : '0'
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
                return '1.1. 在过去7天中，您有几天进行了剧烈运动，例如搬(举)重物、跑步、游泳、踢足球、打篮球、打网球、跳绳、跳健身操等。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f0uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f0',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f0uncertain
            },
            style: {width: '100px'}
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '1.2. 在这几天中，您每天进行这些重体力活动的时间平均为多少分钟。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f0f0uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f0f0',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f0f0uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2.1. 在过去7天中，您有几天进行了中等强度的活动，如搬(举)轻物、骑自行车、打太极拳、十八法、关节操、扇子舞、木兰拳、乒乓球、羽毛球、交谊舞等(不包括步行)。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f1uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f1',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f1uncertain
            },
            style: {width: '100px'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '2.2. 在这几天中，您每天进行这些中等强度体力活动的时间为。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f1f0uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f1f0',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f1f0uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3.1. 在过去7天中，您有几天是步行，每次步行至少10分钟，这里的步行包括您工作时和在家中的步行，交通行程的步行以及为了锻炼身体进行的步行。取值范围：0-7'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f2uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f2',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f2uncertain
            },
            style: {width: '100px'},
        },
        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '3.2. 在这几天中，您每天步行的时间为。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f2f0uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f2f0',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f2f0uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '4. 在过去7天中，您每天处于静坐的时间大约为包括您在工作单位和家中，坐在办公桌前，电脑前，坐着或躺着看电视，拜访朋友，看书，乘车等的时间。取值范围：0-60*24'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f3uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f3',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f3uncertain
            },
            style: {width: '100px'},
        },

        {
            inputType: 'line',
        },

        {
            inputType: 'expression0',
            hdlExpression({scopeThis, formData}) {
                return '5. 您在最近一周每天运动的步数平均为(可从微信运动、支付宝运动、华为健康、运动手环中获取)'
            },
            style: {'text-align': 'center', color: '#66030b'}
        },
        {
            inputType: 'radio-group',
            fieldName: 'd4f4uncertain',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: true, text: '不确定' },
                { code: false, text: '确定' },
            ],
            inputBox: { style: {'text-align': 'center'} },
        },
        {
            inputType: 'input',
            fieldName: 'd4f4',
            inputBox: { style: {'text-align': 'center'} },
            hdlVisible({scopeThis, formData}) {
                return !formData.d4f4uncertain
            },
            style: {width: '100px'},
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
        f0uncertain: scopeThis.update.formData.d4f0uncertain,
        f0: scopeThis.update.formData.d4f0,
        f0f0uncertain: scopeThis.update.formData.d4f0f0uncertain,
        f0f0: scopeThis.update.formData.d4f0f0,
        f1uncertain: scopeThis.update.formData.d4f1uncertain,
        f1: scopeThis.update.formData.d4f1,
        f1f0uncertain: scopeThis.update.formData.d4f1f0uncertain,
        f1f0: scopeThis.update.formData.d4f1f0,
        f2uncertain: scopeThis.update.formData.d4f2uncertain,
        f2: scopeThis.update.formData.d4f2,
        f2f0uncertain: scopeThis.update.formData.d4f2f0uncertain,
        f2f0: scopeThis.update.formData.d4f2f0,
        f3uncertain: scopeThis.update.formData.d4f3uncertain,
        f3: scopeThis.update.formData.d4f3,
        f4uncertain: scopeThis.update.formData.d4f4uncertain,
        f4: scopeThis.update.formData.d4f4,
    }
    await request.ly0.storpro({
        storproName: 'ly0d14.d4.updateOne',
        data: dataNew,
    })
    ElMessage('已提交 - 运动篇')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
