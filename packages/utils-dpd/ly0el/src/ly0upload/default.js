import { request } from '@yoooloo42/ihavebacking'
const ly0request = request.ly0

export default {
    myProps: {
        uploadUrl: ly0request.domain + ly0request.upload,
        tip: '', // 提示信息
        limit: 1, // 允许上传的文件个数
        size: 2048, // 允许上传的文件大小，单位：KB
        type: '', // 允许上传的文件类型 示例："image/jpeg", "image/png", "image/webp", "text/plain"
        avatar: { // 头像
            width: "120px",
            height: "160px"
        }
    },
    carplate: { // 车牌识别
        uploadUrl: ly0request.domain + ly0request.upload_carplate,
        width: "400px",
        height: "300px"
    }
}
