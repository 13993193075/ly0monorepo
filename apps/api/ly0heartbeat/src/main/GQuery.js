import {DB_Bridge} from '@yoooloo42/ihavebacking'
import Schema from '../schema/index.js'
import {unclassified as blindBoxesUnclass} from '@yoooloo42/blindboxes'

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