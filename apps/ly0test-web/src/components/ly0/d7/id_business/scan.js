import {request as ly0request} from '@yoooloo42/ly0browser'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {ElMessage} from 'element-plus'

function anotherShow({state}) {
    let elTable = state.winScanAnother.document.getElementById('elIdTable'),
        elSum = state.winScanAnother.document.getElementById('elIdSum'),
        sum = 0
    elTable.innerHTML = '<tr><td>商品编号</td><td>名称</td><td>单价</td><td>数量</td></tr>'
    state.arrGoods.forEach((i) => {
        let elTr = state.winScanAnother.document.createElement('tr')
        elTr.innerHTML =
            '<td>' +
            i.number +
            '</td>' +
            '<td>' +
            i.name +
            '</td>' +
            '<td>' +
            Math.floor(i.price) / 100 +
            (i.price_name ? '[' + i.price_name + ']' : '') +
            '</td>' +
            ('<td>' + i.count) +
            '</td>'
        elTable.appendChild(elTr)
        sum = sum + i.price * i.count
    })
    elSum.innerHTML = Math.floor(sum) / 100
}

function append({state}) {
    state.arrGoods.unshift({
        id_goods: state.scan.id_goods,
        number: state.scan.number,
        name: state.scan.name,
        price_name: state.scan.price_name,
        price: Math.floor(state.scan.price0 * 100),
        count: state.scan.count,
    })
    ElMessage('已增加')
    anotherShow({state})
}

function beforeClose({state, scopeThis, emit}) {
    emit('closed', 'cancel')
    state.winScanAnother.close()
    state.winScanAnother = null
    scopeThis.scan.popup.visible = false
}

function deleteOne({state, index}) {
    state.arrGoods.splice(index, 1)
    anotherShow({state})
}

function open({state}) {
    state.scan = JSON.parse(JSON.stringify(state.scanInit))
    state.arrGoods = []
}

function priceNameChange({state, value}) {
    state.scan.price = state.scan.arrPrice.find((i) => {
        return i.name === value
    }).price
    state.scan.price0 = Math.floor(state.scan.price) / 100
}

async function scan({state, scopeThis}) {
    // 商品解码
    let objDecode = ly0utils.decode.decode(state.decode_selected, state.scan.scan).data
    state.scan.number = objDecode.number
    state.scan.count = objDecode.count

    // 获取商品信息
    const result = await ly0request.ly0.storpro({
        storproName: 'ly0d7.b_goods.findNumber',
        data: {
            id_business: scopeThis.id_business,
            number: state.scan.number,
        },
    })
    ElMessage(result.message)

    if (result.code === 0) {
        state.scan.id_goods = result.objGoods._id
        state.scan.number = result.objGoods.number
        state.scan.name = result.objGoods.name
        state.scan.arrPrice = result.objGoods.price ? result.objGoods.price : []
        let objPrice = state.scan.arrPrice.length > 0 ? state.scan.arrPrice[0] : null
        state.scan.price_name = objPrice ? objPrice.name : ''
        state.scan.price = objPrice ? objPrice.price : 0
        state.scan.price0 = Math.floor(state.scan.price) / 100
    }
    return{code: result.code}
}

async function scan0({state, scopeThis}) {
    const result = await scan({state, scopeThis})
    if (result.code === 0) {
        append({state})
    }
}

async function submit({state, scopeThis}) {
    const result = await ly0request.ly0.storpro({
        storproName: 'ly0d7.b_goods.insertMany',
        data: {
            id_business: scopeThis.id_business,
            arrGoods: state.arrGoods,
        },
    })
    ElMessage(result.message)
    scopeThis.scan.popup.visible = false
    await scopeThis.handles.init({scopeThis})
    scopeThis.panel.open.baseInfo = ['0']
    scopeThis.panel.open.bGoods = ['0']
}

export default {
    anotherShow,
    append,
    beforeClose,
    deleteOne,
    open,
    priceNameChange,
    scan,
    scan0,
    submit
}