import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
export default {
    update: {
        getFormData({scopeThis}) {
            return {
                f2height: scopeThis.formData.f2height,
                f2weight: scopeThis.formData.f2weight,
                f2pregnancies: scopeThis.formData.f2pregnancies,
                f2births: scopeThis.formData.f2births,
                f2menstruation_last: scopeThis.formData.f2menstruation_last,
                f2menstruation_first: scopeThis.formData.f2menstruation_first,
                f2menstruation_cycle: scopeThis.formData.f2menstruation_cycle,
                f2menstruation_cycle_code: scopeThis.formData.f2menstruation_cycle_code,
                f2abnormal: scopeThis.formData.f2abnormal,
                f2abnormal0: scopeThis.formData.f2abnormal0,
                f2abnormal1: scopeThis.formData.f2abnormal1,
                f2abnormal2: scopeThis.formData.f2abnormal2,
            }
        },
        getItems({scopeThis}) {
            return [
                {
                    inputType: 'input',
                    label: '身高(cm)',
                    fieldName: 'f2height',
                    style: {width: '100px'},
                },
                {
                    inputType: 'input',
                    label: '体重(kg)',
                    fieldName: 'f2weight',
                    style: {width: '100px'},
                },
                {
                    inputType: 'input',
                    label: '孕次',
                    fieldName: 'f2pregnancies',
                    style: {width: '100px'},
                },
                {
                    inputType: 'input',
                    label: '产次',
                    fieldName: 'f2births',
                    style: {width: '100px'},
                },
                {
                    inputType: 'date-picker',
                    label: '末次月经',
                    fieldName: 'f2menstruation_last',
                    type: 'date',
                },
                {
                    inputType: 'input',
                    label: '初潮年龄',
                    fieldName: 'f2menstruation_first',
                    style: {width: '100px'},
                },
                {
                    inputType: 'select',
                    label: '月经周期',
                    fieldName: 'f2menstruation_cycle_code',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    style: {width: '200px'},
                    hdlGetItems({scopeThis}) {
                        return scopeThis.busiCode.busiCode.d14d0f2menstruation_cycle
                    },
                },

                {
                    inputType: 'line',
                    hdlVisible({scopeThis, formData}) {
                        return !!formData.f2abnormal
                    },
                },

                {
                    inputType: 'radio-group',
                    label: '异常孕产史',
                    fieldName: 'f2abnormal',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    items: [
                        { text: '有', code: true },
                        { text: '无', code: false },
                    ],
                },
                {
                    inputType: 'input',
                    label: '异常情况',
                    fieldName: 'f2abnormal0',
                    style: {width: '400px'},
                    hdlVisible({scopeThis, formData}) {
                        return !!formData.f2abnormal
                    },
                },
                {
                    inputType: 'input',
                    label: '流产几次',
                    fieldName: 'f2abnormal1',
                    style: {width: '100px'},
                    hdlVisible({scopeThis, formData}) {
                        return !!formData.f2abnormal
                    },
                },
                {
                    inputType: 'input',
                    label: '死胎死产几次',
                    fieldName: 'f2abnormal2',
                    style: {width: '100px'},
                    hdlVisible({scopeThis, formData}) {
                        return !!formData.f2abnormal
                    },
                },
            ]
        },
        submit({scopeThis}) {
            ly0request.ly0.storpro({
                storproName: 'ly0d14.d0.updateOneF2',
                data: {
                    _id: scopeThis.formData._id,
                    f2height: scopeThis.update.formData.f2height,
                    f2weight: scopeThis.update.formData.f2weight,
                    f2pregnancies: scopeThis.update.formData.f2pregnancies,
                    f2births: scopeThis.update.formData.f2births,
                    f2menstruation_last: scopeThis.update.formData.f2menstruation_last,
                    f2menstruation_first: scopeThis.update.formData.f2menstruation_first,
                    f2menstruation_cycle_code: scopeThis.update.formData.f2menstruation_cycle_code,
                    f2menstruation_cycle: scopeThis.update.formData.f2menstruation_cycle_code
                        ? scopeThis.busiCode.busiCode.d14d0f2menstruation_cycle.find(i => {
                            return i.code === scopeThis.update.formData.f2menstruation_cycle_code
                        }).text
                        : '',
                    f2abnormal: scopeThis.update.formData.f2abnormal,
                    f2abnormal0: scopeThis.update.formData.f2abnormal0,
                    f2abnormal1: scopeThis.update.formData.f2abnormal1,
                    f2abnormal2: scopeThis.update.formData.f2abnormal2,
                },
            }).then(() => {
                ElMessage('已提交 - 孕产信息')
                scopeThis.update.formProps.popup.visible = false
                // 详细页面刷新
                scopeThis.handles.init({scopeThis})
            })
        },
    },
}
