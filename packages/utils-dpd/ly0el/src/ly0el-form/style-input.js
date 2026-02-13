import {blindboxes} from '@yoooloo42/blindboxes'

function box(item){
    let result = {'text-align': 'left'}
    if(item.inputBox && item.inputBox.style){
        if(!!item.inputBox.new){
            // 外部样式覆盖
            result = item.inputBox.style
        }else{
            // 叠加
            result = Object.assign(result, item.inputBox.style)
        }
    }
    return result
}

// inputType: "text"
function text(item){
    if(item.cover){
        return item.style
    }
    return blindboxes.deepClone.deepMerge({
        'white-space': 'pre-line', // 保留换行符
        'border-left': '#ababab solid 1px',
        'border-top': '#ababab solid 1px',
        'padding-left': '10px'
    }, item.style)
}

// inputType: "text0"
function text0(item){
    if(item.cover){
        return item.style
    }
    return blindboxes.deepClone.deepMerge({
        'white-space': 'pre-line', // 保留换行符
        color: 'blue'
    }, item.style)
}

// inputType: "input", "select", "date-picker"
function input(item){
    return item.style || ''
}

// inputType: "input-number"
function input_number(item){
    return {
        facade: {
            size: item.size ? item.size : ""
        }
    }
}

// inputType: "switch"
function el_switch(item){
    return {
        facade: {
            active_color: item.activeColor ? item.activeColor : "#ee7405"
        }
    }
}

// inputType: "button-group"
function button_group(item, groupItem, buttonItem){
    let result = {
        group: {
            style: {'margin-right': '10px'}
        },
        button: {
            style: {},
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
        result.button.style = Object.assign(result.button.style, buttonItem.style)
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
function image(item, formProps){
    return item.style || ''
}

// inputType: "images"
function images(item){
    return {
        itemBox: {
            display: 'inline-block',
            margin: '10px'
        },
        itemThumb: item.style || ''
    }
}

// inputType: "richtext"
function richtext(item){
    return item.style || ''
}

// inputType: "video"
function video(item){
    return {
        width: item.width || '',
        height: item.height || ''
    }
}

// inputType: "download"
function download(){
    return {
        style: {
            'text-decoration': 'underline',
            color: '#0000ff'
        },
        none: {color: '#6a6a6a'} // 没有链接
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
    richtext,
    video,
    download
}
