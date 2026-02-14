import * as XLSX from 'xlsx';

// 导入 file-saver 库的全部导出作为一个对象
import * as FileSaverNamespace from 'file-saver';
// 如果 Rollup 无法自动识别默认导出，您需要手动获取
// file-saver 库通常是将其功能挂载到模块的 default 属性上，或者直接是模块本身
const FileSaver = FileSaverNamespace.default || FileSaverNamespace;

/**
 * 将 JSON 数组数据导出为 Excel 文件
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

export {
    jsonToExcel
}
export default {
    jsonToExcel
}