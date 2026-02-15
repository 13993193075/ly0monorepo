const inputWidth = "200px" // 输入框默认宽度

function box(fieldItem){
    let result = "text-align: left;"
    if(fieldItem.inputBox && fieldItem.inputBox.style){
        if(!!fieldItem.inputBox.new){
            // 外部样式覆盖
            result = fieldItem.inputBox.style
        }else{
            // 外部样式叠加
            result = result + " " + fieldItem.inputBox.style
        }
    }
    return result
}

// inputType: "text"
function text(fieldItem){
    let result = "white-space: pre-line; " + // 保留换行符
        "border-left: #ababab solid 1px; " +
        "border-top: #ababab solid 1px; " +
        "padding-left: 10px;"
    if(fieldItem.inputWidth){
        result = result + "  width: "+ fieldItem.inputWidth + ';'
    }else{
        result = result + "  width: "+ inputWidth + ';'
    }

    // 如果覆盖了box的外部样式，则取消text组件样式
    if(fieldItem.inputBox && fieldItem.inputBox.style && fieldItem.inputBox.new){
        result = ""
    }
    return result
}

// inputType: "text0"
function text0(fieldItem){
    let result = "white-space: pre-line; " + // 保留换行符
        "color: blue;"
    if(fieldItem.inputWidth){
        result = result + "  width: "+ fieldItem.inputWidth + ';'
    }else{
        result = result + "  width: "+ inputWidth + ';'
    }

    // 如果覆盖了box的外部样式，则取消text0组件样式
    if(fieldItem.inputBox && fieldItem.inputBox.style && fieldItem.inputBox.new){
        result = ""
    }
    return result
}

// inputType: "input", "select", "date-picker"
function input(fieldItem){
    let result = 'width: ' + inputWidth + ';'
    if(fieldItem.inputWidth){
        result = 'width: ' + fieldItem.inputWidth + ';'
    }
    result = result + " height: 40px;"
    return result
}

// inputType: "input-number"
function input_number(fieldItem){
    let result = {
        facade: {
            size: ""
        }
    }
    if(fieldItem.size){
        result.facade.size = fieldItem.size
    }
    return result
}

// inputType: "switch"
function el_switch(fieldItem){
    let result = {
        facade: {
            active_color: "#ee7405"
        }
    }
    if(fieldItem.activeColor){
        result.facade.active_color = fieldItem.activeColor
    }
    return result
}

// inputType: "button-group"
function button_group(fieldItem, groupItem, buttonItem){
    let result = {
        group: {
            style: "margin-right: 10px;"
        },
        button: {
            style: "",
            icon: "",
            facade: {
                type: "",
                size: "",
                plain: false,
                round: false,
                circle: false
            }
        }
    }
    if(buttonItem && buttonItem.style){
        result.button.style = buttonItem.style
    }if(buttonItem && buttonItem.icon){
        result.button.icon = buttonItem.icon
    }
    if(buttonItem && buttonItem.type){
        result.button.facade.type = buttonItem.type
    }
    if(buttonItem && buttonItem.size){
        result.button.facade.size = buttonItem.size
    }
    if(buttonItem && buttonItem.plain){
        result.button.facade.plain = buttonItem.plain
    }
    if(buttonItem && buttonItem.round){
        result.button.facade.round = buttonItem.round
    }
    if(buttonItem && buttonItem.circle){
        result.button.facade.circle = buttonItem.circle
    }
    return result
}

// inputType: "image"
function image(fieldItem){
    let result = {
        imageStyle: "width: 400px; height: 300px;"
    }
    if(!!fieldItem.imageWidth && !!fieldItem.imageHeight){
        result.imageStyle = "width: " + fieldItem.imageWidth + "; height: " + fieldItem.imageHeight
    }else if(!!fieldItem.imageWidth){
        result.imageStyle = "width: " + fieldItem.imageWidth + "; height: " + fieldItem.imageWidth
    }else if(!!fieldItem.imageHeight){
        result.imageStyle = "width: " + fieldItem.imageHeight + "; height: " + fieldItem.imageHeight
    }
    if(!!fieldItem.style){
        result.imageStyle = fieldItem.style
    }
    return result
}

// inputType: "images"
function images(fieldItem){
    let result = {
        imageStyle: "width: 40px; height: 30px;",
        imageBox: "display: inline-block; margin: 10px;"
    }
    if(!!fieldItem && !!fieldItem.imageWidth && !!fieldItem.imageHeight){
        result.imageStyle = "width: " + fieldItem.imageWidth + "; height: " + fieldItem.imageHeight
    }else if(!!fieldItem && !!fieldItem.imageWidth){
        result.imageStyle = "width: " + fieldItem.imageWidth + "; height: " + fieldItem.imageWidth
    }else if(!!fieldItem && !!fieldItem.imageHeight){
        result.imageStyle = "width: " + fieldItem.imageHeight + "; height: " + fieldItem.imageHeight
    }
    if(!!fieldItem && !!fieldItem.style){
        result.imageStyle = fieldItem.style
    }
    return result
}

// inputType: "rich_text"
function rich_text(fieldItem){
    // 富文本容器宽度
    let result = "width: 500px;"
    if(fieldItem.containerWidth){
        result = 'width: ' + fieldItem.containerWidth + ';'
    }
    return result
}

// inputType: "video"
function video(fieldItem){
    let result = {
        width: "400px",
        height: "300px"
    }
    if(fieldItem.videoWidth){
        result.width = fieldItem.videoWidth
    }
    if(fieldItem.videoHeight){
        result.height = fieldItem.videoHeight
    }
    return result
}

// inputType: "download"
function download(){
    return {
        style: "text-decoration: underline; color: #0000ff;",
        none: "color: #6a6a6a;" // 没有链接
    }
}

export default {
    box,
    text,
    text0,
    input,
    input_number,
    el_switch,
    button_group,
    image,
    images,
    rich_text,
    video,
    download
}
