import {FileDB} from '@yoooloo42/ihavebacking'
import {GQuery} from '../../main/GQuery.js'
import {upload} from '../../main/config.js'

const arrTblname = [
    "ly0d0group",
    "ly0d0user",
    "ly0d0session",

    "ly0d3d0",
    "ly0d3d1",
    "ly0d3d2",
    "ly0d3d3",
    "ly0d3d4",
    "ly0d3d5",
    "ly0d3d6",
    "ly0d3d7",
    "ly0d3d8",
    "ly0d3d9",
    "ly0d3d10",

    "ly0d4hotel",
    "ly0d4roomplace",
    "ly0d4booktype",
    "ly0d4goods",
    "ly0d4price",
    "ly0d4goods0",
    "ly0d4goods1",
    "ly0d4room",
    "ly0d4business",
    "ly0d4b_goods",
    "ly0d4b_goods0",
    "ly0d4b_goods1",
    "ly0d4bill",
    "ly0d4memo",
    "ly0d4salebook",
    "ly0d4guest",
    "ly0d4attendant",

    "ly0d5restaurant",
    "ly0d5diningplace",
    "ly0d5goodsgroup",
    "ly0d5goods0group",
    "ly0d5table",
    "ly0d5goods",
    "ly0d5goods0",
    "ly0d5goods1",
    "ly0d5business",
    "ly0d5b_table",
    "ly0d5b_goods",
    "ly0d5b_goods0",
    "ly0d5b_goods1",
    "ly0d5memo",

    "ly0d6d0",
    "ly0d6d1",

    "ly0d7shop",
    "ly0d7goodsgroup",
    "ly0d7goods",
    "ly0d7business",
    "ly0d7b_goods",
    "ly0d7memo",
    "ly0d7decode",

    "ly0d8unit",
    "ly0d8goodsgroup",
    "ly0d8goodsfrom",
    "ly0d8goodsto",
    "ly0d8goods",
    "ly0d8purchase",
    "ly0d8goodsin",
    "ly0d8goodsout",
    "ly0d8sale",
    "ly0d8loss",

    "ly0d9unit",
    "ly0d9position",
    "ly0d9sizetype",
    "ly0d9property",
    "ly0d9metername",
    "ly0d9goods",
    "ly0d9goods0",
    "ly0d9business",
    "ly0d9meterrecord",
    "ly0d9b_goods",
    "ly0d9b_goods0",
    "ly0d9memo",
    "ly0d9reader",

    "ly0d10unit",
    "ly0d10group",
    "ly0d10worker",
    "ly0d10bill",
    "ly0d10memo",
    "ly0d10bill0",
    "ly0d10memo0",

    "ly0d11carpark",
    "ly0d11carwithin",
    "ly0d11carwithin_rec",
    "ly0d11carpassin",
    "ly0d11warden",

    "ly0d12place",
    "ly0d12position",
    "ly0d12room",
    "ly0d12seat",
    "ly0d12day",
    "ly0d12appointment",
    "ly0d12student"
]

function clear(data) {
    // data.id_dataunit

    return new Promise(function (resolve, reject) {
        if (!data.id_dataunit) {
            return resolve({
                code: 0, message: "数据单元_id 不存在"
            })
        }

        let arrPromise = []
        arrTblname.forEach(i => {
            arrPromise.push(GQuery({
                tblName: i,
                operator: "deleteMany",
                query: {id_dataunit: data.id_dataunit}
            }))
        })

        Promise.all(arrPromise).then(() => {
            GQuery({
                tblName: "ly0d0dataunit",
                operator: "deleteMany",
                query: {_id: data.id_dataunit}
            }).then(() => {
                FileDB.clear.deleteFolder(upload.imageFolder + '/' + data.id_dataunit).then(() => {
                    resolve({code: 0, message: "已清空数据单元：" + data.id_dataunit})
                })
            })
        })
    })
}

function emptyTest(data) {
    // data.id_dataunit

    return new Promise(function (resolve, reject) {
        let arrPromise = []
        arrTblname.forEach(i => {
            arrPromise.push(new Promise((resolve0, reject0) => {
                GQuery({
                    tblName: i,
                    operator: "findOne",
                    query: {id_dataunit: data.id_dataunit}
                }).then(result => {
                    if (result.data) {
                        reject0()
                    } else {
                        resolve0()
                    }
                })
            }))
        })

        Promise.all(arrPromise)
            .then(() => {
                resolve({code: 0, message: "空的数据单元"})
            })
            .catch(() => {
                resolve({code: 1, message: "非空的数据单元"})
            })
    })
}

export {
    clear,
    emptyTest
}
export default {
    clear,
    emptyTest
}
