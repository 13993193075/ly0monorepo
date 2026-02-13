import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

function tableToExcel(elIdTable, fileName) {
  var xlsxParam = { raw: true }
  // 从表生成工作簿对象
  var wb = XLSX.utils.table_to_book(document.querySelector('#' + elIdTable), xlsxParam)
  /* 获取二进制字符串作为输出 */
  var wbout = XLSX.write(wb, {
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

export default {
  tableToExcel,
}
