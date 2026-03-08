import path from 'path'
import {dirRoot} from '../main/dirroot.js'
import { pathToFileURL } from 'url'
import dependencies from "./dependencies.js"
import idx from './index.js'

// 拆分存储过程名称
function sliceWithDot(str){
    let str0 = str, // 字符串缓存
        str1 = '', // 文件夹名称
        str2 = '', // 文件名
        str3 = '' // 函数名

    // 最后的一个dot位置
    let lastDotIndex = str0.lastIndexOf('.')
    // 存储过程名非法
    if (lastDotIndex === -1) {
        return {str1: '', str2: '', str3: ''}
    }
    // 截取函数名
    str3 = str0.slice(lastDotIndex + 1)
    // 字符串后缀“抖落”
    str0 = str0.slice(0, lastDotIndex)
    // 最后的一个dot位置
    lastDotIndex = str0.lastIndexOf('.')
    // 存储过程名非法
    if (lastDotIndex === -1) {
        return {str1: '', str2: '', str3: ''}
    }
    // 截取文件名
    str2 = str0.slice(lastDotIndex + 1)
    // 截取文件夹名称
    str1 = str0.slice(0, lastDotIndex)
    // 返回结果
    return {str1, str2, str3}
}

// 执行存储过程
async function exec(storproBody) {
    // storproBody.storproName
    // storproBody.data

    if (!storproBody || !storproBody.storproName) {
        return {code: 1, message: "存储过程请求参数错误"}
    }

    console.log("[系统跟踪]执行存储过程名称：", storproBody.storproName)
    const sliceResult = sliceWithDot(storproBody.storproName)
    if(
        idx[sliceResult.str1] &&
        idx[sliceResult.str1][sliceResult.str2] &&
        idx[sliceResult.str1][sliceResult.str2][sliceResult.str3]
    ){ // 存储过程已注册
        return await idx[sliceResult.str1][sliceResult.str2][sliceResult.str3]({data: storproBody.data, dependencies, storproRun: exec})
    }else{ // 存储过程未注册
        // 获取存储过程
        const filePath = path.join(dirRoot, 'src/storpro/' + sliceResult.str1 + '/' + sliceResult.str2 + '.js')
        const fileUrl = pathToFileURL(filePath).href
        const module = await import(fileUrl)

        // 执行存储过程
        return await module.default[sliceResult.str3]({data: storproBody.data, dependencies, storproRun: exec})
    }
}

export {
    exec
}
export default {
    exec
}