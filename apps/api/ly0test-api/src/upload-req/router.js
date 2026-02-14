import express from 'express'
import index from './index.js'
const router = express.Router()
router
    // 文件上传，不进行安全审计
    .post('/file', (request, response) => {
        index.uploadFile(request, response).then(result => {
            response.send(result)
        })

    })

    // 图片上传，不进行安全审计
    .post('/image', (request, response) => {
        index.uploadImage(request, response).then(result => {
            response.send(result)
        })

    })

    // 车牌识别，不进行安全审计
    .post('/carplate', (request, response) => {
        index.uploadCarplate(request, response)
    })

export default router
