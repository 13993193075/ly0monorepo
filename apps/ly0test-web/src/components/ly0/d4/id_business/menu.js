import {ElMessage} from 'element-plus'
export default {
    mode: 'horizontal',
    defaultActive: "", // 默认打开的菜单索引
    menu: [
        {
            title: '面板操作',
            menu: [
                {
                    title: '初始化',
                    handle({scopeThis, index}) {
                        scopeThis.emit("reload")
                        ElMessage('初始化已完成')
                    },
                },
                {
                    title: '刷新',
                    async handle({scopeThis, index}) {
                        await scopeThis.handles.init({scopeThis})
                        ElMessage('数据已刷新')
                    },
                },
                {
                    title: '打开所有面板',
                    handle({scopeThis, index}) {
                        scopeThis.handles.panel.openAll({scopeThis})
                    },
                },
                {
                    title: '关闭所有面板',
                    handle({scopeThis, index}) {
                        scopeThis.handles.panel.closeAll({scopeThis})
                    },
                },
                {
                    title: '关闭订单',
                    handle({scopeThis, index}) {
                        scopeThis.emit("update:modelValue", null)
                    },
                },
            ],
        },
        {
            title: '订单状态',
            menu: [
                {
                    title: '预订',
                    handle({scopeThis, index}) {
                        scopeThis.handles.businessStatus.book({scopeThis})
                    },
                },
                {
                    title: '入住',
                    handle({scopeThis, index}) {
                        scopeThis.handles.businessStatus.arrive({scopeThis})
                    },
                },
                {
                    title: '离开',
                    handle({scopeThis, index}) {
                        scopeThis.handles.businessStatus.leave({scopeThis})
                    },
                },
            ],
        },
        {
            title: '修改',
            menu: [
                {
                    title: '订单基本信息',
                    handle({scopeThis, index}) {
                        scopeThis.formData = JSON.parse(JSON.stringify(scopeThis.business.objBusiness))
                        scopeThis.formProps = Object.assign({}, scopeThis.set_baseInfo_formProps)
                        scopeThis.formProps.popup.visible = true
                    },
                },
                {
                    title: '房型预订',
                    handle({scopeThis, index}) {
                        scopeThis.set_salebook.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '用房记录',
                    handle({scopeThis, index}) {
                        scopeThis.set_b_goods.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '配售商品',
                    handle({scopeThis, index}) {
                        scopeThis.set_b_goods0.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '损赔物品',
                    handle({scopeThis, index}) {
                        scopeThis.set_b_goods1.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '挂账记录',
                    handle({scopeThis, index}) {
                        scopeThis.set_bill.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '旅客信息',
                    handle({scopeThis, index}) {
                        scopeThis.set_guest.id_business = scopeThis.id_business
                    }
                },
                {
                    title: '备忘记录',
                    handle({scopeThis, index}) {
                        scopeThis.set_memo.id_business = scopeThis.id_business
                    }
                },
            ],
        },
        {
            title: '收银',
            menu: [
                {
                    title: '审定核收金额',
                    handle({scopeThis, index}) {
                        scopeThis.formData = JSON.parse(JSON.stringify(scopeThis.business.objBusiness))
                        scopeThis.formData.deal0 = Math.floor(scopeThis.formData.deal) / 100
                        scopeThis.formProps = Object.assign({}, scopeThis.set_deal_formProps)
                        scopeThis.formProps.popup.visible = true
                    },
                },
                {
                    title: '打开支付记录 | 收银',
                    handle({scopeThis, index}) {
                        scopeThis.ly0d2busiside_props.id_business = scopeThis.id_business
                        scopeThis.ly0d2busiside_props.deal = scopeThis.business.objBusiness.deal
                        scopeThis.ly0d2busiside_props.popup.visible = true
                    },
                },
            ],
        },
        {
            title: '打印',
            menu: [
                {
                    title: '抵店登记单(22cm*9.5cm)',
                    handle({scopeThis, index}) {
                        scopeThis.print.print1.popup.visible = true
                    },
                },
                {
                    title: '离店结算单(22cm*9.5cm)',
                    handle({scopeThis, index}) {
                        scopeThis.print.print0.popup.visible = true
                    },
                },
                {
                    title: '订单详细(29.7cm*21cm)(A4)',
                    handle({scopeThis, index}) {
                        scopeThis.print.print.popup.visible = true
                    },
                },
            ],
        },
    ]
}
