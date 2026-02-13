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
            title: '新增',
            handle({scopeThis, index}) {
                scopeThis.newImage.formProps.popup.visible = true
            }
        },
        {
            title: '返回个人详细信息',
            handle({scopeThis, index}) {
                scopeThis.root.branch = 1
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
