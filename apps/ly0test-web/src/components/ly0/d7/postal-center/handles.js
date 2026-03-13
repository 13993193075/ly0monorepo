import {request as ly0request} from '@yoooloo42/ly0browser'
import {ElMessage} from 'element-plus'

//
async function setPostalStatus1 ({scopeThis, row}) {
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d7.postal-center.setPostalStatus",
        data: {
            _id: row._id,
            postal_status_code: "1"
        }
    })
    ElMessage(result.message)
    scopeThis.handles.reload({scopeThis})
}

//
async function setPostalStatus2 ({scopeThis, row}) {
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d7.postal-center.setPostalStatus",
        data: {
            _id: row._id,
            postal_status_code: "2"
        }
    })
    ElMessage(result.message)
    scopeThis.handles.reload({scopeThis})
}

//
async function setPostalStatus3 ({scopeThis, row}) {
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d7.postal-center.setPostalStatus",
        data: {
            _id: row._id,
            postal_status_code: "3"
        }
    })
    ElMessage(result.message)
    scopeThis.handles.reload({scopeThis})
}

export default {
    setPostalStatus1,
    setPostalStatus2,
    setPostalStatus3
}
