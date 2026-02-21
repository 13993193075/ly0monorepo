// 商品解码
function decode (fun, str) {
    // 商品编码
    if (fun === 'goods-number') {
        return {code: 0, message: "解码成功",
            data: {number: str, count: 1}
        }
    }

    // 3位商品编码+2位数量
    if (fun === 'n3c2') {
        return n3c2(str)
    }

    return {code: 1, message: "没有解码方法",
        data: {number: str, count: 1}
    }
}

// 5位：3位商品编号+2位数量
function n3c2 (str) {
    if (!(/^[0-9]{5}$/.test(str))) {
        return {code: 1, message: "编码不规范",
            data: {number: str, count: 1}
        }
    }

    let number = str.slice(0, 3) // 商品编号
    let count = Number(str.slice(3)) // 数量
    count = !count || count <= 0 ? 1 : count
    return {code: 0, message: "解码成功",
        data: {number, count}
    }
}

export default {
    decode
}
