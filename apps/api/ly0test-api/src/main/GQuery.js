import {DB_Bridge} from 'packages/ly0libs'
import Schema from '../schema/index.js'
import {unclassified as blindBoxesUnclass} from 'packages/ly0utils'

async function GQuery(para){
    // 自动获取表模型
    if(!para.schema){
        para.schema = blindBoxesUnclass.deepClone.getNodeValue(Schema, para.tblName)
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