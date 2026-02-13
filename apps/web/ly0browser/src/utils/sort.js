//快速排序
function sortQuick (arr) {
    if (arr.length < 1) {
        return arr
    }

    let centerIndex = Math.floor(arr.length / 2), //获取中间索引
        centerValue = arr [centerIndex], //获取中间元素
        left = [],
        right = []

    for (let i = 0; i < arr.length; i++) {
        if (i !== centerIndex) {
            if (arr [i] < centerValue) {
                left.push(arr [i])
            } else {
                right.push(arr [i])
            }
        }
    }

    return sortQuick(left).concat([centerValue], sortQuick(right)) //递归调用
}

//快速排序：对象属性
function sortQuickAttr (arr, attr) {
    if (arr.length < 1) {
        return arr
    }

    let centerIndex = Math.floor(arr.length / 2), //获取中间索引
        centerValue = arr [centerIndex], //获取中间元素
        left = [],
        right = []

    for (let i = 0; i < arr.length; i++) {
        if (i !== centerIndex) {
            if (eval('arr [ i ].' + attr) < eval('centerValue.' + attr)) {
                left.push(arr [i])
            } else {
                right.push(arr [i])
            }
        }
    }

    return sortQuickAttr(left, attr).concat([centerValue], sortQuickAttr(right, attr)) //递归调用
}

//冒泡排序
function sortBubble (arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr [j] > arr [j + 1]) { //相邻元素两两对比
                let temp = arr [j + 1] //元素交换
                arr [j + 1] = arr [j]
                arr [j] = temp
            }
        }
    }
    return arr
}

//冒泡排序：对象属性
function sortBubbleAttr (arr, attr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (eval('arr [ j ].' + attr) > eval('arr [ j + 1 ].' + attr)) { //相邻元素两两对比
                let temp = arr [j + 1] //元素交换
                arr [j + 1] = arr [j]
                arr [j] = temp
            }
        }
    }
    return arr
}

//插入排序
function sortInsert (arr) {
    let len = arr.length,
        preIndex,
        current

    for (let i = 1; i < len; i++) {
        preIndex = i - 1
        current = arr [i]
        while (preIndex >= 0 && arr [preIndex] > current) {
            arr [preIndex + 1] = arr [preIndex]
            preIndex--
        }
        arr [preIndex + 1] = current
    }
    return arr
}

//插入排序：对象属性
function sortInsertAttr (arr, attr) {
    let len = arr.length,
        preIndex,
        current

    for (let i = 1; i < len; i++) {
        preIndex = i - 1
        current = arr [i]
        while (preIndex >= 0 && eval('arr [ preIndex ].' + attr) > eval('current.' + attr)) {
            arr [preIndex + 1] = arr [preIndex]
            preIndex--
        }
        arr [preIndex + 1] = current
    }
    return arr
}

//数组去重
function unique (arr) {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let cur = arr [i]
        if (obj [cur] === cur) {
            arr [i] = arr [arr.length - 1]
            arr.length--
            i-- //防止数组塌陷
            continue
        }
        obj [cur] = cur
    }
    obj = null
    return arr
}

// 数组去重：链式调用
Array.prototype.unique0 = function unique () {
    // this 指向当前数组

    let obj = {}
    for (let i = 0; i < this.length; i++) {
        let cur = this [i]
        if (obj [cur] == cur) {
            this [i] = this [this.length - 1]
            this.length--
            i-- // 防止数组塌陷
            continue
        }

        obj [cur] = cur
    }

    obj = null
    return this
    // 链式调用
    // arr.unique0 () ;
    // arr.unique0 ().sort () ;
}

//数组去重：对象属性
function uniqueAttr (arr, attr) {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let cur = eval('arr [ i ].' + attr)
        if (obj [cur] === cur) {
            arr [i] = arr [arr.length - 1]
            arr.length--
            i-- //防止数组塌陷
            continue
        }
        obj [cur] = cur
    }
    obj = null
    return arr
}

//多重排序
function sortMultiple (arr, sortObj) {
    arr.sort(function (a, b) {
        let sortArr = Object.entries(sortObj)

        for (let i in sortArr) {
            if (eval('a.' + sortArr [i] [0]) === eval('b.' + sortArr [i] [0])) {
            } else {
                if (sortArr [i] [1] === 1) {
                    if (eval('a.' + sortArr [i] [0]) > eval('b.' + sortArr [i] [0])) {
                        return 1
                    } else {
                        return -1
                    }
                } else if (sortArr [i] [1] === -1) {
                    if (eval('b.' + sortArr [i] [0]) > eval('a.' + sortArr [i] [0])) {
                        return 1
                    } else {
                        return -1
                    }
                } else {
                }
            }
        }
    })

    return arr
}

//多重排序：toString
function sortMultipleToString (arr, sortObj) {
    arr.sort(function (a, b) {
        let sortArr = Object.entries(sortObj)

        for (let i in sortArr) {
            if (eval('a.' + sortArr [i] [0]).toString() === eval('b.' + sortArr [i] [0]).toString()) {
            } else {
                if (sortArr [i] [1] == 1) {
                    if (eval('a.' + sortArr [i] [0]).toString() > eval('b.' + sortArr [i] [0]).toString()) {
                        return 1
                    } else {
                        return -1
                    }
                } else if (sortArr [i] [1] == -1) {
                    if (eval('b.' + sortArr [i] [0]).toString() > eval('a.' + sortArr [i] [0]).toString()) {
                        return 1
                    } else {
                        return -1
                    }
                } else {
                }
            }
        }
    })

    return arr
}

export default {
    sortQuick, //快速排序
    sortQuickAttr, //快速排序：对象属性=
    sortBubble, //冒泡排序
    sortBubbleAttr, //冒泡排序：对象属性
    sortInsert, //插入排序
    sortInsertAttr, //插入排序：对象属性
    unique, //数组去重
    uniqueAttr, //数组去重：对象属性
    sortMultiple, //多重排序
    sortMultipleToString //多重排序：toString
}
