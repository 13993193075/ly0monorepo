// 标题线
function title_line(tableProps){
    let result = {
        lineStyle: "margin-bottom: 50px;",
        textStyle: "font-size: large; color: #828282;"
    }

    if(tableProps.titleLine && tableProps.titleLine.styleLine) {
        result.lineStyle = tableProps.titleLine.styleLine
    }
    if(tableProps.titleLine && tableProps.titleLine.styleText) {
        result.textStyle = tableProps.titleLine.styleText
    }
    return result
}

// 顶部按钮组
function top_buttongroup(tableProps, buttongroupItem, buttonItem){
    let result = {
        rootBoxStyle: {
            style: "display: flex; justify-content: space-between; margin-bottom: 10px;"
        },
        buttonStyle: {
            style: "background-color:#009f95; color:#ffffff;",
            icon: "", // 图标类名
            facade: {
                type: "", // 取值范围：primary / success / warning / danger / info / text
                size: "", // 取值范围：large / medium / small
                plain: false,
                round: false,
                circle: false
            }
        }
    }

    if(tableProps.topButtonGroups && tableProps.topButtonGroups.style){
        result.rootBoxStyle.style = tableProps.topButtonGroups.style
    }
    if(buttonItem && buttonItem.style){
        result.buttonStyle.style = buttonItem.style
    }
    if(buttonItem && buttonItem.icon){
        result.buttonStyle.icon = buttonItem.icon
    }
    if(buttonItem && buttonItem.type){
        result.buttonStyle.facade.type = buttonItem.type
    }
    if(buttonItem && buttonItem.size){
        result.buttonStyle.facade.size = buttonItem.size
    }
    if(buttonItem && "plain" in buttonItem){
        result.buttonStyle.facade.plain = buttonItem.plain
    }
    if(buttonItem && "round" in buttonItem){
        result.buttonStyle.facade.round = buttonItem.round
    }
    if(buttonItem && "circle" in buttonItem){
        result.buttonStyle.facade.circle = buttonItem.circle
    }
    return result
}

// 行内按钮组
function row_buttongroup(rowData, buttonItem){
    let result = {
        buttonStyle: {
            style: "background-color :#009f95; color: #ffffff;",
            icon: "", // 图标类名
            facade: {
                type: "", // 取值范围：primary / success / warning / danger / info / text
                size: "small", // 取值范围：large / small
                plain: false,
                round: false,
                circle: false
            }
        }
    }

    if(buttonItem && buttonItem.hdlStyle){
        result.buttonStyle.style = buttonItem.hdlStyle(rowData)
    }
    if(buttonItem && buttonItem.style){
        result.buttonStyle.style = buttonItem.style
    }
    if(buttonItem && buttonItem.icon){
        result.buttonStyle.icon = buttonItem.icon
    }
    if(buttonItem && buttonItem.hdlType){
        result.buttonStyle.facade.type = buttonItem.hdlType(rowData)
    }
    if(buttonItem && buttonItem.type){
        result.buttonStyle.facade.type = buttonItem.type
    }
    if(buttonItem && buttonItem.size){
        result.buttonStyle.facade.size = buttonItem.size
    }
    if(buttonItem && "plain" in buttonItem){
        result.buttonStyle.facade.plain = buttonItem.plain
    }
    if(buttonItem && "round" in buttonItem){
        result.buttonStyle.facade.round = buttonItem.round
    }
    if(buttonItem && "circle" in buttonItem){
        result.buttonStyle.facade.circle = buttonItem.circle
    }
    return result
}

// 行内图片
function row_image(rowData, imageItem){
    let result = {
        imageStyle: "width: 40px; height: 30px;"
    }

    if(!!imageItem.imageWidth && !!imageItem.imageHeight){
        result.imageStyle = "width: " + imageItem.imageWidth + "; height: " + imageItem.imageHeight
    }else if(!!imageItem.imageWidth){
        result.imageStyle = "width: " + imageItem.imageWidth + "; height: " + imageItem.imageWidth
    }else if(!!imageItem.imageHeight){
        result.imageStyle = "width: " + imageItem.imageHeight + "; height: " + imageItem.imageHeight
    }
    if(!!imageItem.style){
        result.imageStyle = imageItem.style
    }
    return result
}

// 选择列（左手第一列）
function col_selection(tableProps){
    let result = {
        colWidth: "50px;"
    }

    if(tableProps.table.selection.width){
        result.colWidth = tableProps.table.selection.width
    }
    return result
}

// 底部分页行
function pagination(tableProps){
    let result = {
        style: "text-align: left; margin-top: 10px;"
    }

    if(tableProps.table.stylePagination){
         result.style = tableProps.table.stylePagination
    }
    return result
}

// 弹出窗口
function popup(tableProps){
    let result = {
        width: "1000px",
        top: "15vh"
    }

    if(tableProps.popup && tableProps.popup.width){
         result.width = tableProps.popup.width
    }
    if(tableProps.popup && tableProps.popup.top){
        result.top = tableProps.popup.top
    }
    return result
}

export default {
    title_line,
    top_buttongroup,
    row_buttongroup,
    row_image,
    col_selection,
    pagination,
    popup
}
