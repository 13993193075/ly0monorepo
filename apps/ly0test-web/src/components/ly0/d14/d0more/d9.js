import { request as ly0request } from '@yoooloo42/ly0browser'
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
                                        scopeThis.more.d9.get({scopeThis}).update.formData
                                    scopeThis.update.formProps.submit.handle = scopeThis.more.d9.submit
                                    scopeThis.update.formProps.popup.title = '修改 - 环境暴露'
                                    scopeThis.update.formProps.cols.splice(0, scopeThis.update.formProps.cols.length)
                                    scopeThis.update.formProps.cols.push({
                                        items: scopeThis.more.d9.get({scopeThis}).update.items
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

    // 遍历环境暴露类别代码
    scopeThis.busiCode.busiCode.d14d9environment.forEach((itemBusiCode) => {
        // 获取环境暴露数据
        const itemData = scopeThis.formData.appendix.d9.find(i => {
            return i.environment_code === itemBusiCode.code
        })

        // 定义字段名前缀
        const prefix = 'd9_' + itemBusiCode.code + '_'
        // 字段赋值
        doc.formData[prefix + 'environment_code'] = !!itemData ? itemBusiCode.code : ''
        doc.formData[prefix + 'environment'] = !!itemData ? itemBusiCode.text : ''
        doc.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        doc.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        doc.formData[prefix + 'smoke_code'] = !!itemData ? itemData.smoke_code : ''
        doc.formData[prefix + 'smoke'] = !!itemData ? itemData.smoke : ''
        update.formData[prefix + 'environment_code'] = !!itemData ? itemBusiCode.code : ''
        update.formData[prefix + 'environment'] = !!itemData ? itemBusiCode.text : ''
        update.formData[prefix + 'times_code'] = !!itemData ? itemData.times_code : ''
        update.formData[prefix + 'times'] = !!itemData ? itemData.times : ''
        update.formData[prefix + 'smoke_code'] = !!itemData ? itemData.smoke_code : ''
        update.formData[prefix + 'smoke'] = !!itemData ? itemData.smoke : ''
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
            label: '暴露频次',
            fieldName: prefix + 'times',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'environment_code']
            },
        })
        doc.items.push({
            inputType: 'text0',
            label: '吸烟频次',
            fieldName: prefix + 'smoke',
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'environment_code']
            },
        })
        update.items.push({
            inputType: 'radio-group',
            label: itemBusiCode.text,
            fieldName: prefix + 'environment_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: [
                { code: itemBusiCode.code, text: '有' },
                { code: '', text: '无' },
            ],
        })
        update.items.push({
            inputType: 'select',
            label: '暴露频次',
            fieldName: prefix + 'times_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d9times,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'environment_code']
            },
            style: {width: '200px'},
        })
        update.items.push({
            inputType: 'select',
            label: '吸烟频次',
            fieldName: prefix + 'smoke_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            items: scopeThis.busiCode.busiCode.d14d9smoke,
            hdlVisible({scopeThis, formData}) {
                return !!formData[prefix + 'environment_code']
            },
            style: {width: '200px'},
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
    // 遍历环境暴露类别代码
    scopeThis.busiCode.busiCode.d14d9environment.forEach((itemBusiCode) => {
        // 字段名前缀
        const prefix = 'd9_' + itemBusiCode.code + '_'
        if (!!scopeThis.update.formData[prefix + 'environment_code']) {
            dataNew.data.push({
                environment_code: scopeThis.update.formData[prefix + 'environment_code'],
                environment: scopeThis.update.formData[prefix + 'environment'],
                times_code: scopeThis.update.formData[prefix + 'times_code'],
                times: scopeThis.update.formData[prefix + 'times'],
                smoke_code: scopeThis.update.formData[prefix + 'smoke_code'],
                smoke: scopeThis.update.formData[prefix + 'smoke'],
            })
        }
    })
    await ly0request.ly0.storpro({
        storproName: 'ly0d14.d9.updateMany',
        data: dataNew,
    })
    ElMessage('已提交 - 环境暴露')
    scopeThis.update.formProps.popup.visible = false
    // 详细页面刷新
    await scopeThis.handles.init({scopeThis})
}

export default {
    get,
    submit,
}
