// 样式函数

import label from "./style-label.js";
import input from "./style-input.js";

// 折叠面板
const collapse = {
    style: {
        'margin-bottom': '10px'
    },
    table: {
        'text-align': 'center',
        width: '100%'
    }
}

// 字段盒子
const field_box = {
    left: {
        padding: "10px"
    },
    right: {
        padding: "10px"
    }
}

// 行际分割线
const line = {
    height: '1px',
    'background-color': '#bdbdbd'
}

// 没有field-label, field-value独占一行（field-box）
function no_field_label(item){
    let result = 1
    if(!item.label){
        result = 2
    }
    return result
}

// 表单区域可以分为多个列
const root_box = {
    display: 'flex',
    'justify-content': 'space-around'
}

// 提交区域
const submit_box = {
    style: {
        'text-align': 'left'
    },
    button: {
        style: {
            'margin-top': '10px'
        },
        facade: {
            type: 'danger',
            plain: true
        }
    }
}

export {
    collapse,
    field_box,
    line,
    no_field_label,
    root_box,
    submit_box,

    label,
    input
}
export default {
    collapse,
    field_box,
    line,
    no_field_label,
    root_box,
    submit_box,

    label,
    input
}