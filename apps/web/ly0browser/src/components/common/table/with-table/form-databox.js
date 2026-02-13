import handles from "./handles.js"

function getFormDataBox(scopeThis){
    return {
        find: {
            fieldsValue: {},
            hdlSubmit: handles.findSubmit_withMessage
        },
        insertOne: {
            fieldsValue: {},
            hdlSubmit: handles.insertOneSubmit,
            srcPrefix: "",
            upload: "",
            upload_carplate: ""
        },
        doc: {
            fieldsValue: {},
            srcPrefix: ""
        },
        updateOne: {
            fieldsValue: {},
            hdlSubmit: handles.updateOneSubmit,
            srcPrefix: "",
            upload: "",
            upload_carplate: ""
        }
    }
}

export default {
    getFormDataBox
}