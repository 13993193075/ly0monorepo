import path from 'path'
import { fileURLToPath } from 'url'
import {FileDB} from '@yoooloo42/ly0nodejs'

// 获取当前文件的目录路径 (相当于 CommonJS 的 __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 拼接出绝对路径，无论你在哪里运行命令，这个路径永远指向正确的位置
const gsfy_path = path.join(__dirname, '../config/gsfy.json');
const imageDomain_path = path.join(__dirname, '../config/image-domain.json');
const listen_path = path.join(__dirname, '../config/listen.json');
const mongodb_path = path.join(__dirname, '../config/mongodb.json');
const upload_path = path.join(__dirname, '../config/upload.json');

const gsfy_str = FileDB.utf8.readFileSync(gsfy_path).data
const imageDomain_str = FileDB.utf8.readFileSync(imageDomain_path).data
const listen_str = FileDB.utf8.readFileSync(listen_path).data
const mongodb_str = FileDB.utf8.readFileSync(mongodb_path).data
const upload_str = FileDB.utf8.readFileSync(upload_path).data

const gsfy = JSON.parse(gsfy_str)
const imageDomain = JSON.parse(imageDomain_str)
const listen = JSON.parse(listen_str)
const mongodb = JSON.parse(mongodb_str)
const upload = JSON.parse(upload_str)

const export_gsfy = gsfy[gsfy.branch],
    export_imageDomain = imageDomain[imageDomain.branch],
    export_mongodb = mongodb[mongodb.branch],
    export_upload = upload[upload.branch]
export {
    export_gsfy as gsfy,
    export_imageDomain as imageDomain,
    listen,
    export_mongodb as mongodb,
    export_upload as upload
}
export default {
    gsfy: export_gsfy,
    imageDomain: export_imageDomain,
    listen,
    mongodb: export_mongodb,
    upload: export_upload
}
