// 获取运行时文件根目录

import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前脚本文件（dirroot.js）所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 关键点：判断开发环境还是生产环境（打包）
 */
const isPackaged = Boolean(
    process.pkg || // 兼容 Node.js 的 pkg 打包
    (process.isBun && !process.execPath.toLowerCase().includes('bun.exe')) || // 兼容 Bun 打包
    process.execPath.endsWith('ly0.exe') // 兜底：直接检查是否为目标应用程序名
);

// 运行时文件根目录
const dirRoot = isPackaged
    ? process.cwd() // 生产环境，运行时根目录就是打包后的 .exe 文件所在的文件夹
    : path.resolve(__dirname, '../..'); // 开发环境（本地 node 运行），运行时根目录就是项目根目录

export {
    dirRoot,
}
export default {
    dirRoot,
}