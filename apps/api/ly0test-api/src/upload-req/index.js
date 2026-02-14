import {FileDB, Ali} from 'packages/ly0libs'
import {upload as configUpload, imageDomain} from '../main/config.js'

// 文件上传
function uploadFile (request, response) {
    return new Promise((resolve, reject) => {
        FileDB.upload.holdSingle(request, response, {
            destination: configUpload.uploadFolder,
            fileSize: 1024 * 1024 * 2, // 文件大小限制：2M
        }).then(result=>{
            if(result.code === 0) {
                resolve({code: 0, message: '文件上传成功',
                    data: {src: imageDomain.domain + configUpload.uploadUrl + '/' + result.file.filename}
                })
            }else {
                resolve({code: 1, message: '文件上传失败'})
            }
        }).catch(err=>{
            resolve({code: 1, message: '文件上传失败',
                err
            })
        })
    })
}

// 图片上传
function uploadImage (request, response) {
    return new Promise((resolve, reject) => {
        FileDB.upload.holdSingle(request, response, {
            destination: configUpload.uploadFolder,
            fileSize: 1024 * 1024 * 2, // 文件大小限制：2M
            fileMimetype: [ // 文件类型限制
                'image/jpeg',
                'image/gif',
                'image/png'
            ]
        }).then(result=>{
            if(result.code === 0) {
                resolve({code: 0, message: '图片上传成功',
                    data: {src: imageDomain.domain + configUpload.uploadUrl + '/' + result.file.filename}
                })
            }else {
                resolve({code: 1, message: '图片上传失败'})
            }
        }).catch(err=>{
            resolve({code: 1, message: '图片上传失败',
                err
            })
        })
    })
}

// 车牌识别
function uploadCarplate (request, response) {
    uploadImage(request, response).then(result => {
        if (result.code !== 0) {
            return response.send(result)
        }
        let imageUrl = result.data.src

        Ali.Carplate_AppCode.carplate({appCode: '0fa1fd8e2ac341b289ee0afa958b744b', imageUrl}).then(result=>{
            if(result.code === 0){
                response.send({code: 0, message: '图片上传成功，车牌识别成功',
                    data: {
                        src: imageUrl,
                        result: result.result
                    }
                })
            }else{
                response.send({code: 1, message: '图片上传失败或车牌识别失败'})
            }
        })
    })
}

export default {
    uploadFile,
    uploadImage,
    uploadCarplate
}
