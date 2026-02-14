import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
export default {
    update: {
        getFormData({scopeThis}) {
            return {
                f1name: scopeThis.formData.f1name,
                f1birthdate: scopeThis.formData.f1birthdate,
                f1education: scopeThis.formData.f1education,
                f1education_code: scopeThis.formData.f1education_code,
                f1occupation: scopeThis.formData.f1occupation,
                f1occupation_code: scopeThis.formData.f1occupation_code,
                f1cellphone: scopeThis.formData.f1cellphone,
            }
        },
        getItems({scopeThis}) {
            return [
                {
                    inputType: 'input',
                    label: '姓名',
                    fieldName: 'f1name',
                },
                {
                    inputType: 'date-picker',
                    label: '出生日期',
                    fieldName: 'f1birthdate',
                    type: 'date',
                },
                {
                    inputType: 'select',
                    label: '文化程度',
                    fieldName: 'f1education_code',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    hdlGetItems({scopeThis}) {
                        return scopeThis.busiCode.gbt.gbt4658
                    },
                },
                {
                    inputType: 'select',
                    label: '职业',
                    fieldName: 'f1occupation_code',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    hdlGetItems({scopeThis}) {
                        return scopeThis.busiCode.busiCode.d14d0f0occupation
                    },
                },
                {
                    label: '手机号',
                    inputType: 'input',
                    fieldName: 'f1cellphone',
                },
            ]
        },
        submit({scopeThis}) {
            request.ly0.storpro({
                storproName: 'ly0d14.d0.updateOneF1',
                data: {
                    _id: scopeThis.formData._id,
                    f1name: scopeThis.update.formData.f1name,
                    f1birthdate: scopeThis.update.formData.f1birthdate,
                    f1education_code: scopeThis.update.formData.f1education_code,
                    f1education: scopeThis.update.formData.f1education_code
                        ? scopeThis.busiCode.gbt.gbt4658.find(i => {
                            return i.code === scopeThis.update.formData.f1education_code
                        }).text
                        : '',
                    f1occupation_code: scopeThis.update.formData.f1occupation_code,
                    f1occupation: scopeThis.update.formData.f1occupation_code
                        ? scopeThis.busiCode.busiCode.d14d0f0occupation.find(i => {
                            return i.code === scopeThis.update.formData.f1occupation_code
                        }).text
                        : '',
                    f1cellphone: scopeThis.update.formData.f1cellphone,
                },
            }).then(async () => {
                ElMessage('已提交 - 配偶信息')
                scopeThis.update.formProps.popup.visible = false
                // 详细页面刷新
                await scopeThis.handles.init({scopeThis})
            })
        },
    },
}
