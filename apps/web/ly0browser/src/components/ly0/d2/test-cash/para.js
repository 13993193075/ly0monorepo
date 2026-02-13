import {ElMessage} from 'element-plus'
export default {
    formProps: {
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '订单 _id',
                        fieldName: 'id_business',
                        placeholder: '<id_business>',
                        style: {width: '300px'}
                    },
                    {
                        inputType: 'select',
                        label: '订单类型',
                        fieldName: 'businesstype_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.para.pgData.arrBusinessType
                        },
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'input',
                        label: '金额',
                        fieldName: 'amount',
                        style: {width: '100px'}
                    },
                    {
                        inputType: 'input',
                        label: '微信-appid',
                        fieldName: 'wx_appid',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'input',
                        label: '微信-mchid',
                        fieldName: 'wx_mchid',
                        style: {width: '200px'}
                    },
                ],
            },
        ],
        submit: {
            async handle({formData, scopeThis}){
                if (
                    !scopeThis.para.formData.id_business ||
                    scopeThis.para.formData.id_business.length !== 24 ||
                    !scopeThis.para.formData.businesstype_code
                ) {
                    ElMessage('参数错误，不能提交测试！')
                    return
                }
                scopeThis.test.formData.id_business = scopeThis.para.formData.id_business
                scopeThis.test.formData.businesstype_code = scopeThis.para.formData.businesstype_code
                scopeThis.test.formData.amount = scopeThis.para.formData.amount
                scopeThis.test.formData.wx_appid = scopeThis.para.formData.wx_appid
                scopeThis.test.formData.wx_mchid = scopeThis.para.formData.wx_mchid
                scopeThis.test.formProps.popup.switch = true
                scopeThis.test.formProps.popup.visible = true
            }
        },
    },
    formData: {
        id_business: '',
        businesstype_code: '',
        amount: 0,
        wx_appid: '',
        wx_mchid: '',
    },
    pgData: {
        arrBusinessType: []
    },
}
