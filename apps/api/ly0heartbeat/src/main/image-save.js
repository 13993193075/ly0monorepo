import {FileDB} from 'packages/ly0libs'
import {upload} from './config.js'
const pathHead = {
    dbFolder: upload.imageFolder,
    dbUrl: upload.imageUrl,
    uploadFolder: upload.uploadFolder,
    uploadUrl: upload.uploadUrl
}

// 图片新增
async function imageAppend({
    uploaded,
    dataunitId,
    tblName,
    fieldName,
    fieldIndex = 0,
    dataId
}){
    return await FileDB.ImageSave.imageAppend({
        pathHead,
        uploaded,
        dataunitId,
        tblName,
        fieldName,
        fieldIndex,
        dataId
    })
}

// 图片删除
async function imageDelete({url}){
    return await FileDB.ImageSave.imageDelete({pathHead, url})
}

// 图片更新
async function imageUpdate({
    uploaded,
    old,
    dataunitId,
    tblName,
    fieldName,
    fieldIndex = 0,
    dataId
}){
    return await FileDB.ImageSave.imageUpdate({
        pathHead,
        uploaded,
        old,
        dataunitId,
        tblName,
        fieldName,
        fieldIndex,
        dataId
    })
}

// 图片新增 - 多文件处理
async function imagesAppend({
   arrUploaded,
   dataunitId,
   tblName,
   fieldName,
   dataId
}){
    return await FileDB.ImageSave.imagesAppend({
        pathHead,
        arrUploaded,
        dataunitId,
        tblName,
        fieldName,
        dataId
    })
}

// 图片删除 - 多文件处理
async function imagesDelete({arrUrl}){
    return await FileDB.ImageSave.imagesDelete({pathHead, arrUrl})
}

// 图片更新 - 多文件处理
async function imagesUpdate({
    arrUploaded,
    arrOld,
    arrDelete,
    dataunitId,
    tblName,
    fieldName,
    dataId
}){
    return await FileDB.ImageSave.imagesUpdate({
        pathHead,
        arrUploaded,
        arrOld,
        arrDelete,
        dataunitId,
        tblName,
        fieldName,
        dataId
    })
}

// 富文本新增
async function richtextAppend({
    richtext,
    dataunitId,
    tblName,
    fieldName,
    dataId
}){
    return await FileDB.ImageSave.richtextAppend({
        pathHead,
        richtext,
        dataunitId,
        tblName,
        fieldName,
        dataId
    })
}

// 富文本删除
async function richtextDelete({richtext}){
    return await FileDB.ImageSave.richtextDelete({pathHead, richtext})
}

// 富文本更新
async function richtextUpdate({
    richtextNew,
    richtextOld,
    dataunitId,
    tblName,
    fieldName,
    dataId
}){
    return await FileDB.ImageSave.richtextUpdate({
        pathHead,
        richtextNew,
        richtextOld,
        dataunitId,
        tblName,
        fieldName,
        dataId
    })
}

export {
    imageAppend,
    imageDelete,
    imageUpdate,
    imagesAppend,
    imagesDelete,
    imagesUpdate,
    richtextAppend,
    richtextDelete,
    richtextUpdate
}
export default {
    imageAppend,
    imageDelete,
    imageUpdate,
    imagesAppend,
    imagesDelete,
    imagesUpdate,
    richtextAppend,
    richtextDelete,
    richtextUpdate
}