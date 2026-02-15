import {GBT} from '@yoooloo42/ly0utils'

// 获取初始代码
function init(data){
    // data: null

    return new Promise(function (resolve, reject) {
        resolve({code: 0, message: '',
            arrCode2: GBT.gbt2260code2
        })
    })
}

export default {
    init
}
