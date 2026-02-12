import {GQuery} from '../../main/GQuery.js'
import ImageSave from '../../main/image-save.js'

//提交抄表照片
function savePhoto(data) {
    //data.id_property
    //data.id_metername
    //data.photo

    let oldData = data
    let thisTime = new Date () ;
    return new Promise((resolve, reject) => {
        if(!oldData){
            return resolve({code: 1, message: "数据丢失"})
        }
        if(!oldData.photo){
            return resolve({code: 1, message: "没有提交照片"})
        }

        GQuery({ //获取所有未清账的抄表记录
            tblName: 'ly0d9meterrecord',
            operator: 'find',
            query: {
                id_property: oldData.id_property,
                id_metername: oldData.id_metername,
                clear: false
            }
        }).then(res => {
            //删除所有有关记录的图片
            res.data.forEach(i=>{
                ImageSave.imageDelete({url: i.photo})
            })
            GQuery({ //删除所有未清账的抄表记录
                tblName: 'ly0d9meterrecord',
                operator: 'deleteMany',
                query: {
                    id_property: oldData.id_property,
                    id_metername: oldData.id_metername,
                    clear: false
                }
            }).then(() => {
                //插入新记录
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'insertOne',
                    update: Object.assign(oldData, {
                        time_create: thisTime,
                        time_update: thisTime,
                        clear: false,
                        time: thisTime,
                        readout: 0,
                        note: "",
                        recorder_cellphone: "",
                        recorder_name: ""
                    })
                }).then(result => {
                    let newId = result.dataNew._id
                    GQuery({
                        tblName: 'ly0d9meterrecord',
                        operator: 'findOne',
                        query: {_id: newId}
                    }).then(result=>{
                        let newData = result.data
                        ImageSave.imageAppend({
                            uploaded: newData.photo,
                            dataunitId: newData.id_dataunit,
                            tblName: 'ly0d9meterrecord',
                            fieldName: 'photo',
                            dataId: newId
                        }).then(function (photo) {
                            GQuery({
                                tblName: 'ly0d9meterrecord',
                                operator: 'updateOne',
                                query: {_id: newId},
                                update: {photo}
                            }).then(() => {
                                resolve({code: 0, message: '提交成功'})
                            })
                        })
                    })
                })
            })
        })
    })
}

//提交抄表读数
function readout (data) {
    //data._id
    //data.readout

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9meterrecord',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {readout: data.readout}
        }).then(() => {
            resolve({code: 0, message: '提交成功'})
        })
    })
}

export default {
    savePhoto,
    readout
}