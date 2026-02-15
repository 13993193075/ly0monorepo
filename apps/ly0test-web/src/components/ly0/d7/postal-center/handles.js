import dataRequest from "../../../../utils/data-request.js"

// ��ʼ�ּ�
function setPostalStatus1 (scopeThis, row) {
    return new Promise(resolve => {
        dataRequest.storpro({
            storproName: "ly0d7.postal-center.setPostalStatus",
            data: {
                _id: row._id,
                postal_status_code: "1"
            }
        }).then(result=>{
            scopeThis.$message(result.message)
            scopeThis.handles.reload(scopeThis)
            resolve()
        })
    })
}

// �ּ����
function setPostalStatus2 (scopeThis, row) {
    return new Promise(resolve => {
        dataRequest.storpro({
            storproName: "ly0d7.postal-center.setPostalStatus",
            data: {
                _id: row._id,
                postal_status_code: "2"
            }
        }).then(result=>{
            scopeThis.$message(result.message)
            scopeThis.handles.reload(scopeThis)
            resolve()
        })
    })
}

// ���ջ�
function setPostalStatus3 (scopeThis, row) {
    return new Promise(resolve => {
        dataRequest.storpro({
            storproName: "ly0d7.postal-center.setPostalStatus",
            data: {
                _id: row._id,
                postal_status_code: "3"
            }
        }).then(result=>{
            scopeThis.$message(result.message)
            scopeThis.handles.reload(scopeThis)
            resolve()
        })
    })
}

export default {
    setPostalStatus1,
    setPostalStatus2,
    setPostalStatus3
}
