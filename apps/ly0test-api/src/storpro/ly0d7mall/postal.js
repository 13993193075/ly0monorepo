import {GQuery} from '../../main/GQuery.js'
import {GBT} from 'packages/ly0utils/src/index.js'

// 增加1个新的邮寄地址
function addOne(data){
    // data.id_guest
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        let objCode6 = GBT.gbt2260code6.find(i=>{
            return i.code6 === data.postal.code6
        })
        let postal = {
            gbt2260code: data.postal.code6,
            gbt2260text: objCode6.text2 + "-" + objCode6.text4 + "-" + objCode6.text6,
            address: data.postal.address,
            tel: data.postal.tel,
            name: data.postal.name
        }
        GQuery({
            tblName: "ly0d7guest",
            operator: "updateOne",
            query: {_id: data.id_guest},
            update: {$push: {postal}}
        }).then(()=>{
            resolve({code: 0, message: "已增加1个新的邮寄地址",
                postal
            })
        })
    })
}

// 删除1个邮寄地址
function deleteOne(data){
    // data.id_guest
    // data.index

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d7guest",
            operator: "findOne",
            query: {_id: data.id_guest}
        }).then(result=>{
            if(result.data){
                return resolve({code: 1, message: "数据不存在"})
            }
            let postal = result.data.postal
            if(!postal || postal.length === 0){
                return resolve({code: 1, message: "数据不存在"})
            }

            GQuery({
                tblName: "ly0d7guest",
                operator: "updateOne",
                query: {_id: data.id_guest},
                update: {
                    postal: [...postal.slice(0, data.index), ...postal.slice(data.index + 1)]
                }
            }).then(()=>{
                resolve({code: 0, message: "已删除1个邮寄地址"})
            })
        })
    })
}

// 修改1个邮寄地址
function updateOne(data){
    // data.id_guest
    // data.index
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d7guest",
            operator: "findOne",
            query: {_id: data.id_guest}
        }).then(result=>{
            if(result.data){
                return resolve({code: 1, message: "数据不存在"})
            }

            let postalOld = result.data.postal
            if(!postalOld || postalOld.length === 0){
                return resolve({code: 1, message: "数据不存在"})
            }

            let objCode6 = GBT.gbt2260code6.find(i=>{
                return i.code6 === data.postal.code6
            })
            let postalNew = {
                gbt2260code: data.postal.code6,
                gbt2260text: objCode6.text2 + "-" + objCode6.text4 + "-" + objCode6.text6,
                address: data.postal.address,
                tel: data.postal.tel,
                name: data.postal.name
            }

            GQuery({
                tblName: "ly0d7guest",
                operator: "updateOne",
                query: {_id: data.id_guest},
                update: {
                    postal: [...postalOld.slice(0, data.index), postalNew, ...postalOld.slice(data.index + 1)]
                }
            }).then(()=>{
                resolve({code: 0, message: "已修改1个邮寄地址",
                    postal: postalNew
                })
            })
        })
    })
}

// 修改默认邮寄地址
function updateGuest(data){
    // data.id_guest
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    return new Promise((resolve, reject) => {
        let objCode6 = GBT.gbt2260code6.find(i=>{
            return i.code6 === data.postal.code6
        })
        let postal = {
            gbt2260code: data.postal.code6,
            gbt2260text: objCode6.text2 + "-" + objCode6.text4 + "-" + objCode6.text6,
            address: data.postal.address,
            tel: data.postal.tel,
            name: data.postal.name
        }
        GQuery({
            tblName: "ly0d7guest",
            operator: "updateOne",
            query: {_id: data.id_guest},
            update: postal
        }).then(()=>{
            resolve({code: 0, message: "已修改默认邮寄地址",
                postal
            })
        })
    })
}

export default {
    addOne,
    deleteOne,
    updateOne,
    updateGuest
}
