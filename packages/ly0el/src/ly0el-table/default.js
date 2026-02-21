// 默认值

export default {
    myProps : {
        popup: {
            switch: false,
            visible: false,
            title: '',
            width: "1024px",
            top: "15vh"
        },
        titleLine: { // 标题线
            text: '',
            style: {
                Line: {
                    "margin-bottom": "50px"
                },
                text: {
                    "font-size": "large",
                    color:"#828282"
                }
            }
        },
        table: {
            loading: {
                visible: false,
                text: "加载中...",
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            },
            colShow: { // 列元素类型
                image: { // 图标
                    width: "40px",
                    height: "30px",
                },
                download: { // 下载
                    fileName: "new-file", // 下载文件名
                    downloadLabel: "点击这里下载", // 下载标签
                    downloadLabelNoSrc: "没有可供下载的资源", // 下载标签
                },
                ly0d7thumb: { // 商品图标
                    thumb: {
                        width: "80px",
                        height: "60px",
                    }
                }
            },
            selection: { // 行选择器
                yes: false,
                width: "48px" // 行选择器的列宽度
            },
            cellTooltip: [], // 单元格提示信息
            pickCol: { // 选择列
                colsInit: [],
                popup: {
                    visible: false
                }
            },
            excel: {
                fileName: "table-to-excel.xlsx" // 另存excel文件名}
            }
        }
    },
    modelValue: {
        data: [],
        total: 0,
        sort: {
            label: "",
            order: ""
        },
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        currentPage: 1,
    }
}
