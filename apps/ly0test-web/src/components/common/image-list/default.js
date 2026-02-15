// 默认值

export default {
    popup: {
        width: "1024px",
        top: "15vh"
    },
    titleLine: { // 标题线
        styleLine: "margin-bottom:50px;",
        styleText: "font-size:large; color:#828282;"
    },
    topButtonGroups: { // 置顶快捷按钮组
        style: "display:flex; justify-content:space-between; margin-bottom:10px;",
        buttonStyle: "background-color:#009f95; color:#ffffff;", // 按钮style
        buttonSize: "", // 按钮尺寸 large/medium/small
    },
    imageList: { // 表属性
        image: {
            width: "160px",
            height: "120px"
        },
        stylePagination: "text-align:left; margin-top:10px;", // 分页行style
    },
    dataRequest: { // 数据请求
        pageSize: 20,
        currentPage: 1,
        loading: false, // 是否显示加载进度
    }
}
