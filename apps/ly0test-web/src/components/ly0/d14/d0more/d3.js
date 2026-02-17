import { request as ly0request } from '@yoooloo42/ly0browser'
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
                                        scopeThis.more.d3.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d3.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 饮食篇 - 膳食补充剂'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d3.get({scopeThis}).update.items
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
    scopeThis.busiCode.busiCode.d14d3food.forEach(itemBusiCode => {
        // 获取饮食篇 - 膳食补充剂数据
        const itemData = scopeThis.formData.appendix.d3.find(i => {
          return i.food_code === itemBusiCode.code
        })

        // 定义字段名前缀
        const prefix = 'd3_' + itemBusiCode.code + '_'
        // 字段赋值
        doc.formData[prefix + 'food_code'] = !!itemData ? itemBusiCode.code : ''
        doc.formData[prefix + 'food'] = !!itemData ? itemBusiCode.text : ''
        doc.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        doc.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        doc.formData[prefix + 'weight_code'] = !!itemData ? itemData.weight_code : ''
        doc.formData[prefix + 'weight'] = !!itemData ? itemData.weight : ''
        doc.formData[prefix + 'nw'] = !!itemData ? itemData.nw : ''
        doc.formData[prefix + 'nwunit_code'] = !!itemData ? itemData.nwunit_code : ''
        doc.formData[prefix + 'nwunit'] = !!itemData ? itemData.nwunit : ''
        doc.formData[prefix + 'brand'] = !!itemData ? itemData.brand : ''
        update.formData[prefix + 'food_code'] = !!itemData ? itemBusiCode.code : ''
        update.formData[prefix + 'food'] = !!itemData ? itemBusiCode.text : ''
        update.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        update.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        update.formData[prefix + 'weight_code'] = !!itemData ? itemData.weight_code : ''
        update.formData[prefix + 'weight'] = !!itemData ? itemData.weight : ''
        update.formData[prefix + 'nw'] = !!itemData ? itemData.nw : ''
        update.formData[prefix + 'nwunit_code'] = !!itemData ? itemData.nwunit_code : ''
        update.formData[prefix + 'nwunit'] = !!itemData ? itemData.nwunit : ''
        update.formData[prefix + 'brand'] = !!itemData ? itemData.brand : ''
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
            inputType: 'text0',
            label: '净含量(net weight)',
            fieldName: prefix + 'nw',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        doc.items.push({
            inputType: 'text0',
            label: '净含量计量单位',
            fieldName: prefix + 'nwunit',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        doc.items.push({
            inputType: 'text0',
            label: '品牌',
            fieldName: prefix + 'brand',
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
            items: scopeThis.busiCode.busiCode.d14d3times,
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
            items: scopeThis.busiCode.busiCode.d14d3weight,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        update.items.push({
            inputType: 'input',
            label: '净含量(net weight)',
            fieldName: prefix + 'nw',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        update.items.push({
            inputType: 'select',
            label: '净含量计量单位',
            fieldName: prefix + 'nwunit_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d3nwunit,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'food_code']
            },
        })
        update.items.push({
            inputType: 'input',
            label: '品牌',
            fieldName: prefix + 'brand',
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
    scopeThis.busiCode.busiCode.d14d3food.forEach(itemBusiCode => {
        // 字段名前缀
        const prefix = 'd3_' + itemBusiCode.code + '_'
        if (!!scopeThis.update.formData[prefix + 'food_code']) {
            dataNew.data.push({
                food_code: scopeThis.update.formData[prefix + 'food_code'],
                food: scopeThis.update.formData[prefix + 'food'],
                times_code: scopeThis.update.formData[prefix + 'times_code'],
                times: scopeThis.update.formData[prefix + 'times'],
                weight_code: scopeThis.update.formData[prefix + 'weight_code'],
                weight: scopeThis.update.formData[prefix + 'weight'],
                nw: scopeThis.update.formData[prefix + 'nw'],
                nwunit_code: scopeThis.update.formData[prefix + 'nwunit_code'],
                nwunit: scopeThis.update.formData[prefix + 'nwunit'],
                brand: scopeThis.update.formData[prefix + 'brand'],
            })
        }
    })
    await ly0request.ly0.storpro({
        storproName: 'ly0d14.d3.updateMany',
        data: dataNew,
    })
    ElMessage('已提交 - 饮食篇 - 膳食补充剂')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
