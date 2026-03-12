import {withTable} from '@yoooloo42/ly0el'
import insertOne from './insertOne.js'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
        },
        cols: insertOne.formProps.cols,
        submit: {
            async handle({scopeThis, formData}) {
                formData.price = Math.floor((formData.price_yuan * 100))
                await withTable.submitUpdateOne({scopeThis, formData})
            }
        }
    }
}
