import {request} from '@yoooloo42/ihavebacking'
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
                                        scopeThis.more.d8.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d8.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 药物使用'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d8.get({scopeThis}).update.items
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

    // 遍历药物类别代码
    scopeThis.busiCode.busiCode.d14d8medication.forEach((itemBusiCode) => {
        // 获取药物使用数据
        const itemData = scopeThis.formData.appendix.d8.find(i => {
            return i.medication_code === itemBusiCode.code
        })

        // 定义字段名前缀
        const prefix = 'd8_' + itemBusiCode.code + '_'
        // 字段赋值
        doc.formData[prefix + 'medication_code'] = !!itemData ? itemBusiCode.code : ''
        doc.formData[prefix + 'medication'] = !!itemData ? itemBusiCode.text : ''
        doc.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        doc.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        update.formData[prefix + 'medication_code'] = !!itemData ? itemBusiCode.code : ''
        update.formData[prefix + 'medication'] = !!itemData ? itemBusiCode.text : ''
        update.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        update.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        // 生成表单条目
        doc.items.push({
            inputType: 'expression0',
            label: (!!itemData ? '✔' : '✘') + ' ' + itemBusiCode.text,
            hdlExpression({scopeThis, formData}) {
                return ''
            },
            labelStyle: !!itemData ? 'color: #66030b;' : 'color: #999999',
        })
        doc.items.push({
            inputType: 'text0',
            label: '使用频次',
            fieldName: prefix + 'times',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'medication_code']
            },
        })
        update.items.push({
            inputType: 'radio-group',
            label: itemBusiCode.text,
            fieldName: prefix + 'medication_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: itemBusiCode.code, text: '有' },
                { code: '', text: '无' },
            ],
        })
        update.items.push({
            inputType: 'select',
            label: '使用频次',
            fieldName: prefix + 'times_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d8times,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'medication_code']
            },
            style: {width: '200px'}
        })
    })

    return {
        doc,
        update,
    }
}

async function submit({scopeThis}) {
    const dataNew = {
        id_ly0d14d0: scopeThis.formData._id,
        data: [],
    }
    // 遍历药物类别代码
    scopeThis.busiCode.busiCode.d14d8medication.forEach((itemBusiCode) => {
        // 字段名前缀
        const prefix = 'd8_' + itemBusiCode.code + '_'
        if (!!scopeThis.update.formData[prefix + 'medication_code']) {
            dataNew.data.push({
                medication_code: scopeThis.update.formData[prefix + 'medication_code'],
                medication: scopeThis.update.formData[prefix + 'medication'],
                times_code: scopeThis.update.formData[prefix + 'times_code'],
                times: scopeThis.update.formData[prefix + 'times'],
            })
        }
    })
    await request.ly0.storpro({
        storproName: 'ly0d14.d8.updateMany',
        data: dataNew,
    })
    ElMessage('已提交 - 药物使用')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
