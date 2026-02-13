import dataRequest from '../../../../utils/data-request.js'

function getMenuProps(scopeThis) {
  let menu = [
    {
      title: '刷新',
      menu: [
        {
          title: '刷新',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.$message('已刷新')
            })
          },
        },
        {
          title: '刷新并关闭所有面板',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.collapseOpen_left = ''
              scopeThis.collapseOpen_right = ''
              scopeThis.$message('已刷新')
            })
          },
        },
        {
          title: '刷新并打开所有面板',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.collapseOpen_left = ['info', 'bTable', 'bGoods0', 'memo']
              scopeThis.collapseOpen_right = ['amount', 'bGoods', 'bGoods1']
              scopeThis.$message('已刷新')
            })
          },
        },
        {
          title: '刷新并打开默认面板',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.collapseOpen_left = ['info', 'bTable']
              scopeThis.collapseOpen_right = ['amount']
              scopeThis.$message('已刷新')
            })
          },
        },
      ],
    },
  ]
  // 非流程 - 订单维护
  if (!scopeThis.myProps.flow) {
    menu = menu.concat([
      {
        title: '订单状态',
        menu: [
          {
            title: '预订',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('订单状态：预订?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d5.business.book',
                      data: { _id: scopeThis.business.objBusiness._id },
                    })
                    .then((result) => {
                      scopeThis.$message(result.message)
                      scopeThis.init().then(() => {
                        scopeThis.forceRefresh.all++ // 强制重载子组件
                      })
                    })
                })
                .catch(() => {
                  scopeThis.$message({ type: 'info', message: '取消' })
                })
            },
          },
          {
            title: '用餐',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('订单状态：用餐?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d5.business.arrive',
                      data: { _id: scopeThis.business.objBusiness._id },
                    })
                    .then((result) => {
                      scopeThis.$message(result.message)
                      scopeThis.init().then(() => {
                        scopeThis.forceRefresh.all++ // 强制重载子组件
                      })
                    })
                })
                .catch(() => {
                  scopeThis.$message({ type: 'info', message: '取消' })
                })
            },
          },
          {
            title: '离开',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('订单状态：离开?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d5.business.leave',
                      data: { _id: scopeThis.business.objBusiness._id },
                    })
                    .then((result) => {
                      scopeThis.$message(result.message)
                      scopeThis.init().then(() => {
                        scopeThis.forceRefresh.all++ // 强制重载子组件
                      })
                    })
                })
                .catch(() => {
                  scopeThis.$message({ type: 'info', message: '取消' })
                })
            },
          },
        ],
      },
    ])
  } else {
    // 订单状态：预订
    if (scopeThis.business.objBusiness.status_code === '0') {
      menu = menu.concat([
        {
          title: '订单状态',
          menu: [
            {
              title: '用餐',
              handle(scopeThis, index) {
                scopeThis
                  .$confirm('订单状态：用餐?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                  })
                  .then(() => {
                    dataRequest
                      .storpro({
                        scopeThis,
                        storproName: 'ly0d5.business.arrive',
                        data: { _id: scopeThis.business.objBusiness._id },
                      })
                      .then((result) => {
                        scopeThis.$message(result.message)
                        scopeThis.init().then(() => {
                          scopeThis.forceRefresh.all++ // 强制重载子组件
                        })
                      })
                  })
                  .catch(() => {
                    scopeThis.$message({ type: 'info', message: '取消' })
                  })
              },
            },
          ],
        },
      ])
      // 订单状态：用餐
    } else if (scopeThis.business.objBusiness.status_code === '1') {
      menu = menu.concat([
        {
          title: '订单状态',
          menu: [
            {
              title: '离开',
              handle(scopeThis, index) {
                scopeThis
                  .$confirm('订单状态：离开?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                  })
                  .then(() => {
                    dataRequest
                      .storpro({
                        scopeThis,
                        storproName: 'ly0d5.business.leave',
                        data: { _id: scopeThis.business.objBusiness._id },
                      })
                      .then((result) => {
                        scopeThis.$message(result.message)
                        scopeThis.init().then(() => {
                          scopeThis.forceRefresh.all++ // 强制重载子组件
                        })
                      })
                  })
                  .catch(() => {
                    scopeThis.$message({ type: 'info', message: '取消' })
                  })
              },
            },
          ],
        },
      ])
    }
  }

  // 订单状态：预订或用餐，允许修改
  if (
    scopeThis.business.objBusiness.status_code === '0' ||
    scopeThis.business.objBusiness.status_code === '1'
  ) {
    menu = menu.concat([
      {
        title: '修改',
        menu: [
          {
            title: '订单基本信息',
            handle(scopeThis, index) {
              // 获取 update 页面字段值
              scopeThis.update.dataBox.fieldsValue = scopeThis.update.getFieldsValue(scopeThis)
              // 弹出 update 窗口
              scopeThis.update.formProps.popup.visible = true
            },
          },
          {
            title: '计费信息 - 核收',
            handle(scopeThis, index) {
              // 获取 deal 页面字段值
              scopeThis.deal.dataBox.fieldsValue = scopeThis.deal.getFieldsValue(scopeThis)
              // 弹出 deal 窗口
              scopeThis.deal.formProps.popup.visible = true
            },
          },
        ],
      },
    ])
  }

  menu = menu.concat([
    {
      title: '收银',
      menu: [
        {
          title: '打开支付记录',
          handle(scopeThis, index) {
            scopeThis.payment.id_business = scopeThis.business.objBusiness._id
            scopeThis.payment.deal = scopeThis.business.objBusiness.deal
            scopeThis.payment.wx_appid = scopeThis.business.objRestaurant.wx_appid
            scopeThis.payment.wx_mchid = scopeThis.business.objRestaurant.wx_mchid
            scopeThis.payment.popup.visible = true
            scopeThis.payment.readOnly = false
            scopeThis.forceRefresh.payment++
          },
        },
      ],
    },
    {
      title: '打印',
      menu: [
        {
          title: '订单详细(29.7cm*21cm)(A4)',
          handle(scopeThis, index) {
            scopeThis.print.popup.visible = true
          },
        },
        {
          title: '小票',
          handle(scopeThis, index) {
            scopeThis.smallticket.popup.visible = true
          },
        },
      ],
    },
    {
      title: '返回',
      handle(scopeThis, index) {
        scopeThis.myProps.id_business = null
        if (scopeThis.myProps.refreshAfterGoback) {
          if (scopeThis.myProps.refreshAfterGoback.para) {
            scopeThis.myProps.refreshAfterGoback.hdl(scopeThis.myProps.refreshAfterGoback.para)
          } else {
            scopeThis.myProps.refreshAfterGoback.hdl()
          }
        }
      },
    },
  ])

  return {
    mode: 'horizontal',
    menu,
  }
}

export default {
  getMenuProps,
}
