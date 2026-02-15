// 默认值

export default {
    table: { // 表属性
        downloadInRow: { // 行内下载
            fileName: "new-file", // 下载文件名
            downloadLabel: "点击这里下载", // 下载标签
            downloadLabelNoSrc: "没有可供下载的资源", // 下载标签
        },
        excelFileName: "table-to-excel.xlsx" // 另存excel文件名
    },
    dataRequest: { // 数据请求
        pageSize: 10,
        currentPage: 1,
        sort: {
            label: "",
            order: ""
        },
        loading: false, // 是否显示加载进度
        loadingText: "加载中..."
    }
}