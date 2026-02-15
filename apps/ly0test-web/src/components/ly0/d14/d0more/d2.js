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
                                        scopeThis.more.d2.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d2.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 饮食篇'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d2.get({scopeThis}).update.items
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

    // 遍历食物名称代码
    scopeThis.busiCode.busiCode.d14d2food.forEach(itemBusiCode => {
        // 非叶节点处理
        if (itemBusiCode.type !== 'leaf') {
            let item = {
                inputType: 'expression0',
                hdlExpression({scopeThis, formData}) {
                    return itemBusiCode.text
                },
            }
            doc.items.push(item)
            update.items.push(item)
            return
        }

        // 获取饮食篇数据
        const itemData = scopeThis.formData.appendix.d2.find(i => {
            return i.food_code === itemBusiCode.code
        })

        // 定义字段名前缀
        const prefix = 'd2_' + itemBusiCode.code + '_'
        // 字段赋值
        doc.formData[prefix + 'food_code'] = !!itemData ? itemBusiCode.code : ''
        doc.formData[prefix + 'food'] = !!itemData ? itemBusiCode.text : ''
        doc.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        doc.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        doc.formData[prefix + 'weight_code'] = !!itemData ? itemData.weight_code : ''
        doc.formData[prefix + 'weight'] = !!itemData ? itemData.weight : ''
        update.formData[prefix + 'food_code'] = !!itemData ? itemBusiCode.code : ''
        update.formData[prefix + 'food'] = !!itemData ? itemBusiCode.text : ''
        update.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        update.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        update.formData[prefix + 'weight_code'] = !!itemData ? itemData.weight_code : ''
        update.formData[prefix + 'weight'] = !!itemData ? itemData.weight : ''
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
            label: '食用次数',
            fieldName: prefix + 'times',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        doc.items.push({
            inputType: 'text0',
            label: '食用量',
            fieldName: prefix + 'weight',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        doc.items.push({
            inputType: 'line',
        })
        update.items.push({
            inputType: 'radio-group',
            label: itemBusiCode.text,
            fieldName: prefix + 'food_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: itemBusiCode.code, text: '食用' },
                { code: '', text: '不食用' },
            ],
        })
        update.items.push({
            inputType: 'select',
            label: '食用次数',
            fieldName: prefix + 'times_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d2times,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        update.items.push({
            inputType: 'select',
            label: '食用量',
            fieldName: prefix + 'weight_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d2weight,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        update.items.push({
            inputType: 'line',
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
    // 遍历食物名称代码
    scopeThis.busiCode.busiCode.d14d2food.forEach(itemBusiCode => {
        // 字段名前缀
        const prefix = 'd2_' + itemBusiCode.code + '_'
        if (!!scopeThis.update.formData[prefix + 'food_code']) {
            dataNew.data.push({
                food_code: scopeThis.update.formData[prefix + 'food_code'],
                food: scopeThis.update.formData[prefix + 'food'],
                times_code: scopeThis.update.formData[prefix + 'times_code'],
                times: scopeThis.update.formData[prefix + 'times'],
                weight_code: scopeThis.update.formData[prefix + 'weight_code'],
                weight: scopeThis.update.formData[prefix + 'weight'],
            })
        }
    })
    await ly0request.storpro({
        storproName: 'ly0d14.d2.updateMany',
        data: dataNew,
    })
    ElMessage('已提交 - 饮食篇')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
