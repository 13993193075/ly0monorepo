import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url'

// 获取当前文件的目录路径 (相当于 CommonJS 的 __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🎯 功能：去掉字符串中最后一个出现的"."及其后的所有字符，并同时返回被截取的部分。
 * @param {string} str - 原始字符串。
 * @returns {{prefix: string, suffix: string | null}} - 返回一个对象，包含：
 * - prefix: "." 之前的部分。
 * - suffix: "." 之后的部分（不包含 "."）。
 * - 如果没有找到 "."，prefix 为原字符串，suffix 为 null。
 */
function splitStringAtLastDot(str) {
    // 1. 找到最后一个 "." 的索引
    const lastDotIndex = str.lastIndexOf('.');

    // 2. 检查是否找到了 "."
    if (lastDotIndex === -1) {
        // 没找到 "."：返回原字符串作为 prefix，suffix 为 null
        return {
            prefix: str,
            suffix: null,
        };
    }

    // 3. 找到了 "."：分别截取 prefix 和 suffix

    // 从开始 (0) 截取到 "." 之前的部分
    const prefix = str.slice(0, lastDotIndex);

    // 从 "." 之后 (lastDotIndex + 1) 截取到字符串末尾
    const suffix = str.slice(lastDotIndex + 1);

    return {
        prefix: prefix,
        suffix: suffix,
    };
}

// 执行存储过程
function exec(storproBody) {
    // storproBody.storproName
    // storproBody.data

    return new Promise((resolve, reject) => {
        if (!storproBody || !storproBody.storproName) {
            return resolve({code: 1, message: "存储过程请求参数错误"})
        }

        console.log("[系统跟踪]执行存储过程名称：", storproBody.storproName)
        let pathStorpro = splitStringAtLastDot(storproBody.storproName)

        // 获取存储过程
        const filePath = path.join(__dirname, './' + pathStorpro.prefix.replaceAll('.', '/') + '.js')
        const fileUrl = pathToFileURL(filePath).href;
        import(fileUrl).then(module=>{
            // 执行存储过程
            module.default[pathStorpro.suffix](storproBody.data).then(result=>{
                resolve(result)
            })
        })
    })
}

export {
    exec
}
export default {
    exec
}