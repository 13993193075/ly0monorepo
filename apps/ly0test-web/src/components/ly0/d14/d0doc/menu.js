export default {
    mode: 'horizontal',
    menu: [
        {
            title: '刷新',
            handle({scopeThis, index}) {
                scopeThis.handles.init({scopeThis})
            }
        },
        {
            title: '浏览影像资料',
            handle({scopeThis, index}) {
                scopeThis.root.branch = 2
            }
        },
        {
            title: '返回个人信息名录',
            handle({scopeThis, index}) {
                scopeThis.root.branch = 0
                scopeThis.root.id_d0 = null
            }
        }
    ]
}
