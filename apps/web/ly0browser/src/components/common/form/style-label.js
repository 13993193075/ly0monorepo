function box(item){
    let result = "text-align: right; padding-right: 10px;"

    // 纵向居中
    if(
        item.inputType === "input" ||
        item.inputType === "select" ||
        item.inputType === "date-picker" ||
        item.inputType === "switch" ||
        item.inputType === "radio-group" ||
        item.inputType === "button-group"
    ){
        result = result + " margin: auto 0;"
    }

    if(item.labelBox && item.labelBox.style){
        if(!!item.labelBox.new){
            // 外部样式覆盖
            result = item.labelBox.style
        }else{
            // 外部样式叠加
            result = result + " " + item.labelBox.style
        }
    }
    return result
}

function label(item){
    let result = ""

    if(item.labelStyle){
        result = result + item.labelStyle
    }

    return result
}

export default {
    box,
    label
}