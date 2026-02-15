import printJS from 'print-js';

// 普通表格打印
function printDom(id){
    printJS({
        printable: id, // DOM id
        type: 'html',
        scanStyles: false,
    })
}

// ELEMENT-UI 表格打印
function printDom0(id){
    const html = document.querySelector('#' + id).innerHTML;
    // 新建一个 DOM
    const div = document.createElement('div');
    const printDOMID = 'printDOMElement';
    div.id = printDOMID;
    div.innerHTML = html;

    // 提取第一个表格的内容 即表头
    const ths = div.querySelectorAll('.el-table__header-wrapper th');
    const ThsTextArry = [];
    for (let i = 0, len = ths.length; i < len; i++){
        if(ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText)
    }

    // 删除多余的表头
    div.querySelector('.hidden-columns').remove();
    // 第一个表格的内容提取出来后已经没用了 删掉
    div.querySelector('.el-table__header-wrapper').remove();

    // 将第一个表格的内容插入到第二个表格
    let newHTML = '<tr>';
    for (let i = 0, len = ThsTextArry.length; i < len; i++){
        newHTML += '<td style="text-align: center; font-weight: bold">' + ThsTextArry[i] + '</td>'
    }

    newHTML += '</tr>';
    div.querySelector('.el-table__body-wrapper table').insertAdjacentHTML('afterbegin', newHTML);
    // 将新的 DIV 添加到页面 打印后再删掉
    document.querySelector('body').appendChild(div);

    printJS({
        printable: printDOMID,
        type: 'html',
        scanStyles: false,
        style: 'table { border-collapse: collapse }' // 表格样式
    });

    div.remove()
}

export default(function (){ return {
    printDom, printDom0
} })();
