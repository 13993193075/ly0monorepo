import dataRequest from "../../../../utils/data-request.js"

// 弹出邮寄地址设置窗口
function setPostal(scopeThis, index){
    scopeThis.postal.selected = index
    if(scopeThis.postal.selected >= 0){
        scopeThis.postal.data = {
            code6: scopeThis.ly0session.user.postal[scopeThis.postal.selected].gbt2260code,
            address: scopeThis.ly0session.user.postal[scopeThis.postal.selected].address,
            tel: scopeThis.ly0session.user.postal[scopeThis.postal.selected].tel,
            name: scopeThis.ly0session.user.postal[scopeThis.postal.selected].name
        }
    }else if(scopeThis.postal.selected === -1){
        scopeThis.postal.data = {
            code6: scopeThis.ly0session.user.gbt2260code,
            address: scopeThis.ly0session.user.address,
            tel: scopeThis.ly0session.user.tel,
            name: scopeThis.ly0session.user.name
        }
    }else{
        scopeThis.postal.data = scopeThis.postalDataInit
    }

    scopeThis.postal.popup.visible = true
}

// 获取邮寄地址的值
function getPostal(scopeThis, result){
    scopeThis.postal.data = result
    if(!result.code6 || !result.address || !result.tel || !result.name){
        scopeThis.$message("数据不完整")
        return
    }

    // 增加1个新的邮寄地址
    if(scopeThis.postal.selected === -2){
        addOne(scopeThis, {
            id_guest: scopeThis.ly0session.user._id,
            postal: scopeThis.postal.data
        })
        return
    }
    // 修改默认邮寄地址
    if(scopeThis.postal.selected === -1){
        updateGuest(scopeThis, {
            id_guest: scopeThis.ly0session.user._id,
            postal: scopeThis.postal.data
        })
        return
    }
    // 修改1个邮寄地址
    if(scopeThis.postal.selected >= 0){
        updateOne(scopeThis, {
            id_guest: scopeThis.ly0session.user._id,
            index: scopeThis.postal.selected,
            postal: scopeThis.postal.data
        })
    }
}

// 增加1个新的邮寄地址
function addOne(scopeThis, data){
    // data.id_guest
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.postal.addOne",
            data
        }).then(result=>{
            scopeThis.ly0session.user.postal.push(result.postal)
            dataRequest.ly0sessionSave(scopeThis.ly0session)
            scopeThis.postal.selected = scopeThis.ly0session.user.postal.length - 1
            scopeThis.$message(result.message)
        })
    })
}

// 删除1个邮寄地址
function deleteOne(scopeThis, data){
    // data.id_guest
    // data.index

    return new Promise((resolve, reject) => {
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.postal.deleteOne",
            data
        }).then(result=>{
            scopeThis.ly0session.user.postal = [
                ...scopeThis.ly0session.user.postal.slice(0, data.index),
                ...scopeThis.ly0session.user.postal.slice(data.index + 1)
            ]
            dataRequest.ly0sessionSave(scopeThis.ly0session)
            scopeThis.postal.selected = -1
            scopeThis.$message(result.message)
        })
    })
}

// 修改1个邮寄地址
function updateOne(scopeThis, data){
    // data.id_guest
    // data.index
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.postal.updateOne",
            data
        }).then(result=>{
            scopeThis.ly0session.user.postal = [
                ...scopeThis.ly0session.user.postal.slice(0, data.index),
                result.postal,
                ...scopeThis.ly0session.user.postal.slice(data.index + 1)
            ]
            dataRequest.ly0sessionSave(scopeThis.ly0session)
            scopeThis.$message(result.message)
        })
    })
}

// 修改默认邮寄地址
function updateGuest(scopeThis, data){
    // data.id_guest
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.postal.updateGuest",
            data
        }).then(result=>{
            scopeThis.ly0session.user = Object.assign(scopeThis.ly0session.user, result.postal)
            dataRequest.ly0sessionSave(scopeThis.ly0session)
            scopeThis.$message(result.message)
        })
    })
}

export default {
    setPostal,
    getPostal,
    deleteOne
}