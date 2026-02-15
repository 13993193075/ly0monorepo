import label from "./style-label.js"
import input from "./style-input.js"

// 表单区域可以分为多个列
function root_box(){
    return "display: flex; justify-content: space-around;"
}

// 没有field-label, field-value独占一行
function no_field_label(fieldItem){
    let result = 1
    if(!fieldItem.label){
        result = 2
    }
    return result
}

// 折叠面板
function collapse(){
    return {
        style: "margin-bottom: 10px;",
        table: "text-align: center; width: 100%;"
    }
}

// 字段盒子
function field_box(){
    return {
        left: "padding: 10px;",
        right: "padding: 10px;"
    }
}

// 行际分割线
function line(){
    return "height: 1px; background-color: #bdbdbd;"
}

// 提交区域
function submit_box(){
    return {
        style: "text-align: left;",
        button: {
            style: "margin-top: 10px;",
            facade: {
                type: "danger",
                plain: true
            }
        }
    }
}

// 弹出窗口
function popup(formProps){
    let result = {
        width: "1000px",
        top: "15vh"
    }

    if(formProps.popup && formProps.popup.width){
        result.width = formProps.popup.width
    }
    if(formProps.popup && formProps.popup.top){
        result.top = formProps.popup.top
    }
    return result
}

export default {
    root_box,
    no_field_label,
    collapse,
    field_box,
    line,
    submit_box,
    popup,

    label,
    input
}
