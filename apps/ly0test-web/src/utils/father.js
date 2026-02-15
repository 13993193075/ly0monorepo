// 找到顶级节点
function findTop (p) {
    let arrAll = p.arrAll,
        evalFather = p.evalFather

    return arrAll.filter(function (i) {
        return !eval('i.' + evalFather)
    })
}

// 递归：找到上级节点
function findHigherLevel (p) {
    let arrAll = p.arrAll,
        valCode = p.valCode,
        evalCode = p.evalCode,
        evalFather = p.evalFather

    if (!valCode) {
        return []
    }

    // 找到本节点：valItem
    let valItem = {},
        a = arrAll.filter((i) => {
            return eval('i.' + evalCode) === valCode
        })
    if (a && a.length > 0) {
        valItem = a [0]
    } else {
        return []
    }

    if (!!eval('valItem.' + evalFather)) {
        let arrItems = []
        return arrAll.filter((i) => {
            let a = eval('i.' + evalCode) && eval('valItem.' + evalFather)
                && (eval('i.' + evalCode).toString() === eval('valItem.' + evalFather).toString())
            if (a) {
                arrItems = findHigherLevel({
                    arrAll,
                    evalFather,
                    evalCode,
                    valCode: eval('i.' + evalCode)
                }).concat(arrItems)
            }
            return a
        }).concat(arrItems).reverse()
    } else {
        return []
    }
}

// 递归：找到下级节点
function findLowerLevel (p) {
    let arrAll = p.arrAll,
        valCode = p.valCode,
        evalCode = p.evalCode,
        evalFather = p.evalFather

    if (!valCode) {
        return []
    }

    let valItem = {},
        a = arrAll.filter((i) => {
            return eval('i.' + evalCode) === valCode
        })
    if (a && a.length > 0) {
        valItem = a [0]
    } else {
        return []
    }

    if (!!eval('valItem.' + evalCode)) {
        let arrItems = []
        return arrAll.filter((i) => {
            let a = eval('i.' + evalCode) && eval('i.' + evalFather)
                && (eval('i.' + evalFather).toString() === eval('valItem.' + evalCode).toString())
            if (a) {
                arrItems = arrItems.concat(findLowerLevel({
                    arrAll,
                    evalFather,
                    evalCode,
                    valCode: eval('i.' + evalCode)
                }))
            }
            return a
        }).concat(arrItems)
    } else {
        return []
    }
}

// 找到上级节点(HigherLevel) + 本节点(Self) + 子节点(LowerLevel)
function findHSL (p) {
    let arrAll = p.arrAll,
        valCode = p.valCode,
        evalCode = p.evalCode,
        evalFather = p.evalFather


    if (!valCode) {
        return []
    }

    let valItem = {},
        a = arrAll.filter((i) => {
            return eval('i.' + evalCode) === valCode
        })
    if (a && a.length > 0) {
        valItem = a [0]
    } else {
        return []
    }

    return findHigherLevel({
        arrAll,
        evalFather,
        evalCode,
        valCode
    }).concat(
        (!!valItem) ? [valItem] : [],
        arrAll.filter((i) => {
            return eval('i.' + evalCode) && eval('i.' + evalFather)
                && (eval(eval('i.' + evalFather) === valCode))
        })
    )
}

export default {
    findTop,
    findHigherLevel,
    findLowerLevel,
    findHSL
}
