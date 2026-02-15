import {ly0request} from '@yoooloo42/ly0browser/ly0request'
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
                                        scopeThis.more.d1.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d1.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 既往疾病史'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d1.get({scopeThis}).update.items
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

    // 遍历疾病代码
    scopeThis.busiCode.busiCode.d14d1disease.forEach(itemBusiCode => {
        // 获取既往疾病史数据
        const itemData = scopeThis.formData.appendix.d1.find(i => {
            return i.disease_code === itemBusiCode.code
        })

        // 定义字段名前缀
        const prefix = 'd1_' + itemBusiCode.code + '_'
        // 字段赋值
        doc.formData[prefix + 'disease_code'] = !!itemData ? itemBusiCode.code : ''
        doc.formData[prefix + 'disease'] = !!itemData ? itemBusiCode.text : ''
        doc.formData[prefix + 'note'] = !!itemData ? itemData.note : ''
        update.formData[prefix + 'disease_code'] = !!itemData ? itemBusiCode.code : ''
        update.formData[prefix + 'disease'] = !!itemData ? itemBusiCode.text : ''
        update.formData[prefix + 'note'] = !!itemData ? itemData.note : ''
        // 生成表单条目

        doc.items.push({
            inputType: 'expression0',
            label: (!!itemData ? '✔' : '✘') + ' ' + itemBusiCode.text,
            hdlExpression({scopeThis, formData}) {
                return !!formData[prefix + 'disease_code'] ? formData[prefix + 'note'] : ''
            },
            labelStyle: !!itemData ? 'color: #66030b;' : 'color: #999999'
        })
        update.items.push({
            inputType: 'radio-group',
            label: itemBusiCode.text,
            fieldName: prefix + 'disease_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: itemBusiCode.code, text: '有' },
                { code: '', text: '无' },
            ],
        })
        update.items.push({
            inputType: 'input',
            label: '说明',
            fieldName: prefix + 'note',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'disease_code']
            },
            style: {width: '400px'}
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
    // 遍历疾病代码
    scopeThis.busiCode.busiCode.d14d1disease.forEach(itemBusiCode => {
        // 字段名前缀
        const prefix = 'd1_' + itemBusiCode.code + '_'
        if (!!scopeThis.update.formData[prefix + 'disease_code']) {
            dataNew.data.push({
                disease_code: scopeThis.update.formData[prefix + 'disease_code'],
                disease: scopeThis.update.formData[prefix + 'disease'],
                note: scopeThis.update.formData[prefix + 'note'],
            })
        }
    })
    await ly0request.storpro({
        storproName: 'ly0d14.d1.updateMany',
        data: dataNew,
    })
    ElMessage('已提交 - 既往疾病史')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
