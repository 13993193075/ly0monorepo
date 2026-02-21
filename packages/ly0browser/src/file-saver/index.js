import * as XLSX from 'xlsx';

// import FileSaver from 'file-saver'
// 导入 file-saver 库的全部导出作为一个对象
import * as FileSaverNamespace from 'file-saver'
// 如果 Rollup 无法自动识别默认导出，您需要手动获取
// file-saver 库通常是将其功能挂载到模块的 default 属性上，或者直接是模块本身
const FileSaver = FileSaverNamespace.default || FileSaverNamespace

/**
 * JSON 数组导出为 Excel 文件
 * @param {Array<Object>} json - 要导出的数据数组 (el-table 的 :data 绑定的数据)
 * @param {Array<string>} header - 表格的表头（中文名）
 * @param {Array<string>} keys - 对应表头的数据字段名（英文键名）
 * @param {string} filename - 导出的文件名
 */
function jsonToExcel({
    json,
    header,
    keys,
    filename = 'excel-file',
}) {
    // 1. 转换数据格式
    const data = json.map(item => keys.map(key => item[key]));

    // 2. 将表头和数据组合
    const aoa = [header, ...data];

    // 3. 创建工作簿和工作表
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 4. 生成 Excel 文件
    const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
    });

    // 5. 保存文件
    try {
        FileSaver.saveAs(
            new Blob([wbout], { type: 'application/octet-stream' }),
            `${filename}.xlsx`
        );
    } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
    }
}

// <el-table> 导出为 Excel 文件
function elTableToExcel({elIdTable, fileName}) {
    const xlsxParam = { raw: true }
    // 从表生成工作簿对象
    const wb = XLSX.utils.table_to_book(document.querySelector('#' + elIdTable), xlsxParam)
    /* 获取二进制字符串作为输出 */
    const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
    })
    try {
        FileSaver.saveAs(
            // Blob对象表示一个不可变、原始数据的类文件对象
            // Blob表示的不一定是JavaScript原生格式的数据
            // File接口基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件
            // 返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成
            new Blob([wbout], { type: 'application/octet-stream' }),
            // 设置导出文件名称
            // "sheetjs.xlsx",
            fileName,
        )
    } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
}

export {
    jsonToExcel,
    elTableToExcel,
}
export default {
    jsonToExcel,
    elTableToExcel,
}