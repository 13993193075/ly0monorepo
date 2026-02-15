import handles from "./handles.js"

function getTableDataBox(scopeThis){
    return {
        data: [],
        total: 0,
        request: {
            query: {
                pageSize: 10,
                currentPage: 1,
                sort: null
            },
            loading: false, // 是否显示加载进度
            handle(scopeThis){
                return new Promise((resolve, reject)=>{ // 异步执行数据请求，返回一个Promise对象
                    handles.findSubmit(scopeThis).then(()=>{
                        resolve()
                    })
                })
            }
        },
        srcPrefix: "",
        upload: "",
        scopeThis: {
            label: "table" // 内部引用标识
        },
        cellTooltip: [] // ָ指向单元格时的提示信息
    }
}

export default{
    getTableDataBox
}