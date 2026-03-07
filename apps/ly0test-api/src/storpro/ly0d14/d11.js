import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js"
import ImageSave from '../../main/image-save.js'

// 插入一条记录
async function insertOne({data, dependencies}) {
    // data.id_ly0d14d0
    // data.name
    // data.image
    const data_image = []
    data.image.forEach(i=>{
        try{
            data_image.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    // 提交
    const thisTime = new Date()
    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "findOne",
        query: {_id: data.id_ly0d14d0}
    })
    const objLy0d14d0 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'insertOne',
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objLy0d14d0.id_dataunit,
            dataunit_name: objLy0d14d0.dataunit_name,
            id_ly0d14d0: objLy0d14d0._id,
            name: data.name
        }
    })
    const dataNew = result.dataNew

    // 图片处理
    const image = await dependencies.ly0nodejs.imageSave.imageAppend({
        uploaded: data_image[0],
        dataunitId: objLy0d14d0.id_dataunit,
        tblName: 'ly0d14d11',
        fieldName: 'image',
        dataId: dataNew._id
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'updateOne',
        query: {_id: dataNew._id},
        update: {image: image ? [image] : []}
    })
    return {code: 0, message: '插入一条记录成功'}
}

// 删除一条记录
async function deleteOne({data, dependencies}) {
    // data._id

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'findOne',
        query: {_id: data._id}
    })
    await dependencies.imageSave.imageDelete({url: result.data.image[0]})
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 修改一条记录
async function updateOne({data, dependencies}){
    // data._id
    // data.name

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {name: data.name}
    })
    return {code: 0, message: '修改一条记录成功'}
}

//
async function find({data, dependencies}){
    // data.id_ly0d14d0

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d11',
        operator: 'find',
        query: {id_ly0d14d0: data.id_ly0d14d0},
        sort: {name: 1} // 按影像资料名称排序
    })
    return {code: 0, message: '',
        data: result.data.map(i=>{
            return Object.assign(i, {
                image: [i.image && i.image.length > 0 ? imageDomain.domain + i.image[0] : '']
            })
        })
    }
}

export default {
    insertOne,
    deleteOne,
    updateOne,
    find
}