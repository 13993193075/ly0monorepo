import testData from "./test-data.js"
const dataBox = {
    data: [],
    total: 0,
    request: {
        query: {
            pageSize: 10,
            currentPage: 1,
            sort: { // 不存在或值为false，不进行远程排序
                label: "",
                order: ""
            }
        },
        loading: false, // 是否显示加载进度
        handle(scopeThis){
            return new Promise((resolve, reject)=>{ // 异步执行数据请求，返回一个Promise对象
                scopeThis.testTable.dataBox.data = testData.data
                scopeThis.testTable.dataBox.total = testData.total
                resolve()
            })
        }
    },
    srcPrefix: "http://localhost:443", // 图片资源前缀
    cellTooltip: [], // 指向单元格时的提示信息
    scopeThis: {
        label: "table" // 内部引用标识
    }
}

const tableProps = {
    /*
    popup: {
        visible: true,
        title: "table - 测试",
        width: "2048px",
        // top: "15vh"
    },
    */
    titleLine: { // 标题线
        text: "数据表 - 测试", // 参考值
        // styleLine: "margin-bottom:50px;",
        // styleText: "font-size:large; color:#828282;"
    },
    topButtonGroups: {
        // style: "display:flex; justify-content:space-between; margin-bottom:10px;",
        // buttonStyle: "background-color:#009f95; color:#ffffff;",
        // buttonSize: "",
        box: [ // 置顶快捷按钮组，可以有多个按钮组
            { // 第1个按钮组
                // buttonStyle: "background-color:#009f95; color:#ffffff;",
                // buttonSize: "",
                box: [
                    {
                        text: "全部",
                        // style: "background-color:#009f95; color:#ffffff;",
                        // size: "", // 按钮尺寸 large/medium/small
                        // round: false, // 圆角
                        // icon: "", // 图标
                        tip: {
                            content: "查询条件重置后刷新，显示第1页",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.$message("查询条件重置后刷新，显示第1页")
                        },
                    },
                    {
                        text: "刷新",
                        tip: {
                            content: "按照当前查询条件刷新，显示当前页号",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.$message("按照当前查询条件刷新，显示当前页号")
                        },
                    },
                    {
                        text: "查询",
                        tip: {
                            content: "输入查询条件",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.$message("输入查询条件")
                        },
                    },
                    {
                        text: "新增",
                        tip: {
                            content: "增加一条新记录",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.$message("增加一条新记录")
                        },
                    }
                ]
            },
            { // 第2个按钮组
                box: [
                    {
                        // text: "打印",
                        icon: "Printer",
                        size: "small",
                        tip: {
                            content: "打印表格内容",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.scopeThis["table"].hdlPrint()
                        }
                    },
                    {
                        // text: "另存",
                        icon: "Download",
                        size: "small",
                        tip: {
                            content: "另存为excel表格文件",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.scopeThis["table"].hdlSaveToExcel()
                        }
                    },
                    {
                        // text: "选择列",
                        icon: "Paperclip",
                        size: "small",
                        tip: {
                            content: "弹出选择列窗口",
                            placement: "bottom"
                        },
                        hdlClick(scopeThis){
                            scopeThis.scopeThis["table"].hdlColPick()
                        }
                    }
                ]
            }
        ]
    },
    table: { // 表属性
        selection: {
            yes: true, // 是否可以选择记录行
            // width: "50px" // 操作列（第一列）宽度
        },
        // stylePagination: "margin-top:10px;", // 分页行style
        hdlCellMouseEnter(scopeThis, inherit){ // 当单元格hover进入时会触发该事件
            // inherit.row
            // inherit.column
            // inherit.cell
            // inherit.event

            scopeThis.testTable.dataBox.cellTooltip = []
            if(inherit.column.label === "姓名"){
                scopeThis.testTable.dataBox.cellTooltip = JSON.parse(inherit.row.status)
            }
        },
        hdlRowClick(scopeThis, inherit){ // 当某一行被点击时会触发该事件
            // inherit.row
            // inherit.column
            // inherit.event
        },
        hdlSelectionChange(scopeThis, inherit){ // 当选择项发生变化时会触发该事件
            // inherit.selection
        },
        cols: [
            {
                label: "姓名", // 列标签
                show: "text", // 默认值 控件类型：只读显示字段的值
                fieldName: "name", // 字段名
                sortable: true, // 对应列是否可以排序，如果设置为'custom'，则代表用户希望远程排序，需要监听Table的sort-change事件
                hdlSortMethod(row2, row1){ // 对数据进行排序的时候使用的方法，仅当sortable设置为true的时候有效，需返回一个数字，和Array.sort表现一致
                    if(row2.name > row1.name){
                        return 1 // 升序
                    } else {
                        return -1 // 降序
                    }
                },
                width: "", // 列宽度
                hdlVisible(scopeThis, row){return true}, // 是否显示
                hdlClick(scopeThis, row){ // 单击指定列中的某一单元格
                    scopeThis.$message("My Name Is ..." + row.name)
                },
                hdlMouseover(scopeThis, row){ // 悬停指定列中的某一单元格
                    scopeThis.$message("Who Am I? ..." + row.name)
                }
            },
            {
                label: "性别", // 列标签
                show: "expression", // 控件类型：表达式
                hdlExpression(scopeThis, row){ // 返回表达式的值
                    return row.sex === "1" ? "男" : "女"
                }
            },
            {
                label: "爱好", // 列标签
                show: "expression", // 控件类型：表达式
                hdlExpression(scopeThis, row){ // 返回表达式的值
                    // 多行显示处理
                    let str = "", arr = JSON.parse(row.hobby)
                    arr.forEach((item, index)=>{
                        str = str + (index > 0 ? "\n" : "") +item
                    })
                    return str
                }
            },
            {
                label: "是否党员", // 列标签
                show: "switch", // 控件类型：开关
                fieldName: "party", // 字段名
                activeValue: "1", // 打开时的值
                inactiveValue: "0", // 关闭时的值
                activeText: "是", // 打开时的文字描述
                inactiveText: "否", // 关闭时的文字描述
                activeColor: "#ff640a", // 打开时的背景色
                inactiveColor: "", // 关闭时的背景色
                hdlChange(scopeThis, row, inherit){ // switch 状态发生改变时的回调函数
                    // inherit.valNew

                    scopeThis.$message(
                        "row.party: " + row.party + ", " +
                        "valNew: " + inherit.valNew
                    )
                }
            },
            {
                label: "发表意见", // 列标签
                show: "button-group", // 控件类型：按钮组
                buttonGroup: [
                    {
                        text: "同意", // 按钮文字
                        hdlVisible(scopeThis, row){return true}, // 是否显示
                        hdlClick(scopeThis, row){ // 点击事件
                            scopeThis.$message("同意")
                        }
                    },
                    {
                        text: "不同意", // 按钮文字
                        hdlClick(scopeThis, row){ // 点击事件
                            scopeThis.$message("不同意")
                        }
                    },
                    {
                        style: "background-color:#ff640a; color:#ffffff;", // 按钮自定义style
                        round: true, // 圆角
                        hdlText(scopeThis, row){ // 返回按钮文字
                            return "弃权"
                        },
                        hdlClick(scopeThis, row){ // 点击事件
                            scopeThis.$message("弃权")
                        }
                    }
                ]
            },
            {
                label: "照片", // 列标签
                show: "image", // 控件类型：图片
                fieldName: "photo", // 字段名 图片url
                imageWidth: "80px", // 图片宽度
                imageHeight: "60px", // 图片高度
            },
            {
                label: "下载", // 列标签
                show: "download", // 控件类型：下载
                hdlGetSrc(scopeThis, row){ // 获取链接地址的方法 如果不存在或返回false，则无链接
                    return row.photo
                },
                hdlGetDownloadLabel(scopeThis, row){ // 获取链接标题的方法（下载文件名）
                    return "下载" + row.name + "的照片"
                },
                hdlGetDownloadFileName(scopeThis, row){ // 指定下载文件名
                    return row.name
                }
            }
        ]
    }
}

export default {
    dataBox,
    tableProps
}
