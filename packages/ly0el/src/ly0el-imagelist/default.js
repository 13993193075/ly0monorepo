// 默认值

export default {
    myProps: {
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
                line: {
                    "margin-bottom": "50px"
                },
                text: {
                    "font-size": "large",
                    color:"#828282"
                }
            }
        },
        topButtonGroups: {
            items: [],
            style: {
                display: 'flex',
                'justify-content': 'space-between',
                'margin-bottom': '10px',
            },
            button: {
                style: {
                    'background-color': '#009f95',
                    color: '#ffffff'
                },
                size: '' // 按钮尺寸 large/medium/small
            }
        },
        imageFieldName: 'image',
        imageList: { // 表属性
            loading: {
                visible: false,
                text: "加载中...",
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            },
            image: {
                width: "160px",
                height: "120px"
            }
        },
        pagination: {
            async hdlCurrentPageChange({currentPage, scopeThis}){},
            async hdlPageSizeChange({pageSize, scopeThis}){},
            style: {
                'text-align': 'left',
                'margin-top': '10px'
            }
        },
        dropdownMenu: [],
        subscriptLabel: [],
    },

    modelValue: { // 数据请求
        data: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
    }
}
