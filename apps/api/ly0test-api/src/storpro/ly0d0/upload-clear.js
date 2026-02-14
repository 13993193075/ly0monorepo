import {FileDB} from 'packages/ly0libs'
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
