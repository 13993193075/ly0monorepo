import {DB_Bridge} from '@yoooloo42/ly0nodejs'
import Schema from '../schema/index.js'
import {utils as ly0utils} from '@yoooloo42/ly0utils'

async function GQuery(para){
    // 自动获取表模型
    if(!para.schema){
        para.schema = ly0utils.deepClone.getNodeValue(Schema, para.tblName)
    }

    return await DB_Bridge.MongoDB_GQuery.GQuery({
        para,
        db: global.ly0mongodb
    })
}

export {
    GQuery
}
export default {
    GQuery
}