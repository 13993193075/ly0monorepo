import { request as ly0request } from '@yoooloo42/ly0browser'
import {utils as ly0utils} from '@yooloo42/ly0utils'
import {ElMessage, ElMessageBox} from 'element-plus'
import {withTable} from '@yoooloo42/ly0el'

// 客房分区树形图 - 弹出窗口
function insertManyPopup({scopeThis}) {
    scopeThis.insertMany.data = insertManyData({scopeThis})
    scopeThis.insertMany.popup.visible = true
}

// 客房分区树形图 - 数据准备
function insertManyData({scopeThis}) {
    const data = [
            {
                code: 'TreeRoot',
                text: '全部',
                father: null,
                node: 'TreeRoot',
                appendix: null,
            },
        ],
        arrRoomplace = JSON.parse(JSON.stringify(scopeThis.pgData.data.arrRoomplace)),
        arrRoom = JSON.parse(JSON.stringify(scopeThis.pgData.data.arrRoom))

    for (let iRoomplace = 0; iRoomplace < arrRoomplace.length; iRoomplace++) {
        data.push({
            code: arrRoomplace[iRoomplace]._id,
            text: arrRoomplace[iRoomplace].text,
            father: 'TreeRoot',
            node: 'RoomPlace',
            appendix: null,
        })
        arrRoomplace.splice(iRoomplace, 1)
        iRoomplace--
    }
    for (let i = 0; i < arrRoom.length; i++) {
        data.push({
            code: arrRoom[i]._id,
            text: arrRoom[i].roomno + ' [' +
                arrRoom[i].goods_name + '][' +
                arrRoom[i].status_text + ']',
            father: arrRoom[i].id_roomplace ? arrRoom[i].id_roomplace : 'TreeRoot',
            node: 'Room',
            appendix: JSON.stringify({
                _id: arrRoom[i]._id,
                roomno: arrRoom[i].roomno,
                id_roomplace: arrRoom[i].id_roomplace ? arrRoom[i].id_roomplace : null,
                roomplace_text: arrRoom[i].roomplace_text ? arrRoom[i].roomplace_text : null,
                id_goods: arrRoom[i].id_goods,
                goods_name: arrRoom[i].goods_name,
            }),
        })
        arrRoom.splice(i, 1)
        i--
    }

    return ly0utils.tree.treeRoot({
        data,
        evalCode: 'code',
        evalText: 'text',
        evalFather: 'father',
        evalNode: 'node',
        evalAppendix: 'appendix',
    })
}

// 提交
async function submit({scopeThis, data}) {
    //data.arrCheckedNodes
    //data.checkin
    //data.checkout

    const arrRoom = []
    data.arrCheckedNodes.forEach((i) => {
        if (i.treeItemNode === 'Room') {
            arrRoom.push(JSON.parse(i.treeItemAppendix))
        }
    })
    const result = await ly0request.ly0.storpro({
        storproName: scopeThis.storpro.insertMany,
        data: {
            id_business: scopeThis.props_myProps.id_business,
            arrRoom,
            checkin: data.checkin,
            checkout: data.checkout,
        },
    })
    try{
        await ElMessageBox.alert(result.message, '提示', {
            confirmButtonText: '确认',
        })
        if (result.code === 0) {
            scopeThis.insertMany.popup.visible = false
            scopeThis.insertMany0.popup.visible = false
            withTable.reload({scopeThis})
        }
    }catch(err){
        ElMessage('取消操作')
    }
}

// 房型树形图 - 弹出窗口
function insertMany0Popup({scopeThis}) {
    scopeThis.insertMany0.data = insertMany0Data({scopeThis})
    scopeThis.insertMany0.popup.visible = true
}

// 房型树形图 - 数据准备
function insertMany0Data({scopeThis}) {
    const data = [
            {
                code: 'TreeRoot',
                text: '全部',
                father: null,
                node: 'TreeRoot',
                appendix: null,
            },
        ],
        arrGoods = JSON.parse(JSON.stringify(scopeThis.pgData.data.arrGoods)),
        arrRoom = JSON.parse(JSON.stringify(scopeThis.pgData.data.arrRoom))

    for (let i = 0; i < arrGoods.length; i++) {
        data.push({
            code: arrGoods[i]._id,
            text: arrGoods[i].name,
            father: 'TreeRoot',
            node: 'Goods',
            appendix: null,
        })
        arrGoods.splice(i, 1)
        i--
    }
    for (let i = 0; i < arrRoom.length; i++) {
        data.push({
            code: arrRoom[i]._id,
            text: arrRoom[i].roomno + ' [' +
                arrRoom[i].status_text + ']' +
                (arrRoom[i].roomplace_text ? '[' + arrRoom[i].roomplace_text + ']' : ''),
            father: arrRoom[i].id_goods ? arrRoom[i].id_goods : 'TreeRoot',
            node: 'Room',

            appendix: JSON.stringify({
                _id: arrRoom[i]._id,
                roomno: arrRoom[i].roomno,
                id_roomplace: arrRoom[i].id_roomplace ? arrRoom[i].id_roomplace : null,
                roomplace_text: arrRoom[i].roomplace_text ? arrRoom[i].roomplace_text : null,
                id_goods: arrRoom[i].id_goods,
                goods_name: arrRoom[i].goods_name,
            }),
        })
        arrRoom.splice(i, 1)
        i--
    }

    return ly0utils.tree.treeRoot({
        data,
        evalCode: 'code',
        evalText: 'text',
        evalFather: 'father',
        evalNode: 'node',
        evalAppendix: 'appendix',
    })
}

export default {
    insertManyPopup,
    insertManyData,
    submit,
    insertMany0Popup,
    insertMany0Data,
}
