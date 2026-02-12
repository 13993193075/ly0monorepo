import {FileDB} from '@yoooloo42/ihavebacking'
import {upload} from '../../main/config.js'

function clear() {
    return new Promise((resolve, reject) => {
        FileDB.clear.clearFolder(upload.uploadFolder).then(() => {
            resolve({code: 0, message: "已清空上传文件夹"})
        })
    })
}

export default {
    clear
}
