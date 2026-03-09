import path from 'path'
import {dirRoot} from './dirroot.js'
import {FileDB} from '@yoooloo42/ly0nodejs'

// 拼接出绝对路径，无论你在哪里运行命令，这个路径永远指向正确的位置
const gsfy_path = path.join(dirRoot, 'src/config/gsfy.json');
const imageDomain_path = path.join(dirRoot, 'src/config/image-domain.json');
const listen_path = path.join(dirRoot, 'src/config/listen.json');
const mongodb_path = path.join(dirRoot, 'src/config/mongodb.json');
const upload_path = path.join(dirRoot, 'src/config/upload.json');

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
    export_imageDomain = imageDomain[imageDomain.branch].domain,
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
