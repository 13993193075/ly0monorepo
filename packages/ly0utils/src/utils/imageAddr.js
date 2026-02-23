// 图片地址处理：一、字符串类型的地址转为数组；二、遍历数组中的地址，并附加域名
import {typeOfValue} from "./deepClone.js";

function item({addr, domain}){
    const typeOfAddr = typeOfValue(addr)
    if(typeOfAddr !== 'string' && typeOfAddr !== 'array'){
        return []
    }

    const arr = []
    if(typeOfAddr === 'string'){
        arr.push(addr)
    }else{
        arr.push(...addr)
    }

    return arr.map(i=>{
        return domain + i
    })
}

// 图片地址处理：用于从数据库中提取出来的数据集的多字段的批量处理
function dataSet({data, domain, fieldNames}){
    // 遍历数据集
    return data.map(iData=>{
        // 遍历字段数组
        fieldNames.forEach(fieldName=>{
            // 逐个附加域名
            iData[fieldName] = item({addr: iData[fieldName], domain})
        })
        return iData
    })
}

export default {
    item,
    dataSet
}