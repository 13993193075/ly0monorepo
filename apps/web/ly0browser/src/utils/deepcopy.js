// 判断一个字符串是否符合JSON数组格式
function isJsonArray(str) {
    if (typeof str !== 'string') return false; // 确保输入是字符串
    try {
        let parsed = JSON.parse(str);
        // "null"是一个合法的JSON字符串
        return (typeof parsed !== 'object' && parsed !== null) || Array.isArray(parsed);
    } catch (e) {
        return false;
    }
}

// 判断对象类型
function objectType (obj) {
    let type = ({}).toString.call(obj)
    return type.slice(8, type.length - 1).toLowerCase()
}

// 深拷贝
function deepcopy (obj) {
    if (objectType(obj) === 'object') {
        let objNew = {}
        for (let i in obj) {
            objNew [i] = deepcopy(obj [i])
        }
        return objNew
    } else if (objectType(obj) === 'array') {
        let objNew = []
        for (let i in obj) {
            objNew [i] = deepcopy(obj [i])
        }
        return objNew
    } else {
        return obj
    }
}

// 深拷贝 with 函数改造
// 仅用于叶节点的函数改造
function deepcopyWithFun (obj, fun) {
    if (objectType(obj) === 'object') {
        let objNew = {}
        for (let i in obj) {
            objNew [i] = deepcopyWithFun(obj [i], fun)
        }
        return objNew
    } else if (objectType(obj) === 'array') {
        let objNew = []
        for (let i in obj) {
            objNew [i] = deepcopyWithFun(obj [i], fun)
        }
        return objNew
    } else {
        let objNew = fun(obj)
        return objNew
    }
}

// 扁平化：获取所有叶节点，并压入数组
function flat (obj, arrFlat) {
    if (objectType(obj) === 'object') {
        let item = {}
        for (let i in obj) {
            if (objectType(obj [i]) === 'object' || objectType(obj [i]) === 'array') {
                arrFlat = flat(obj [i], arrFlat)
            } else {
                item[i] = obj[i]
            }
        }
        if (JSON.stringify(item) !== '{}') {
            arrFlat.push(item)
        }
    } else if (objectType(obj) === 'array') {
        for (let i in obj) {
            arrFlat = flat(obj [i], arrFlat)
        }
    } else {
        arrFlat.push(obj)
    }
    return arrFlat
}

export default {
    isJsonArray,
    objectType,
    deepcopy,
    deepcopyWithFun,
    flat
}
