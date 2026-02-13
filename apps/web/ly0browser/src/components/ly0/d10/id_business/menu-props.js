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
              scopeThis.collapseOpen_left = ['info']
              scopeThis.collapseOpen_right = ['memo']
              scopeThis.$message('已刷新')
            })
          },
        },
        {
          title: '刷新并打开默认面板',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.collapseOpen_left = ['info']
              scopeThis.collapseOpen_right = ['memo']
              scopeThis.$message('已刷新')
            })
          },
        },
      ],
    },
  ]
  // 非流程 - 工单维护
  if (!scopeThis.myProps.flow) {
    menu = menu.concat([
      {
        title: '工单状态',
        menu: [
          {
            title: '下单',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('工单状态：下单?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d10business.status0',
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
            title: '完工',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('工单状态：完工?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d10business.status1',
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
            title: '取消',
            handle(scopeThis, index) {
              scopeThis
                .$confirm('工单状态：取消?', '警告', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                .then(() => {
                  dataRequest
                    .storpro({
                      scopeThis,
                      storproName: 'ly0d10business.status2',
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
    // 工单状态：下单
    if (scopeThis.business.objBusiness.status_code === '0') {
      menu = menu.concat([
        {
          title: '工单状态',
          menu: [
            {
              title: '完工',
              handle(scopeThis, index) {
                scopeThis
                  .$confirm('工单状态：完工?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                  })
                  .then(() => {
                    dataRequest
                      .storpro({
                        scopeThis,
                        storproName: 'ly0d10business.status1',
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
      // 工单状态：完工
    } else if (scopeThis.business.objBusiness.status_code === '1') {
      menu = menu.concat([
        {
          title: '工单状态',
          menu: [
            {
              title: '取消',
              handle(scopeThis, index) {
                scopeThis
                  .$confirm('工单状态：取消?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '放弃操作',
                    type: 'warning',
                  })
                  .then(() => {
                    dataRequest
                      .storpro({
                        scopeThis,
                        storproName: 'ly0d10business.status2',
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
                    scopeThis.$message({ type: 'info', message: '放弃操作' })
                  })
              },
            },
          ],
        },
      ])
    }
  }

  // 工单状态：下单，允许修改
  if (scopeThis.business.objBusiness.status_code === '0') {
    menu = menu.concat([
      {
        title: '修改',
        menu: [
          {
            title: '工单基本信息',
            handle(scopeThis, index) {
              // 获取 update 页面字段值
              scopeThis.update.dataBox.fieldsValue = scopeThis.update.getFieldsValue(scopeThis)
              // 弹出 update 窗口
              scopeThis.update.formProps.popup.visible = true
            },
          },
          {
            title: '核收',
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

  // 工单状态：下单或完工，允许收银
  if (
    scopeThis.business.objBusiness.status_code === '0' ||
    scopeThis.business.objBusiness.status_code === '1'
  ) {
    menu = menu.concat([
      {
        title: '收银',
        menu: [
          {
            title: '打开支付记录',
            handle(scopeThis, index) {
              scopeThis.payment.id_business = scopeThis.business.objBusiness._id
              scopeThis.payment.deal = scopeThis.business.objBusiness.deal
              scopeThis.payment.wx_appid = scopeThis.business.objUnit.wx_appid
              scopeThis.payment.wx_mchid = scopeThis.business.objUnit.wx_mchid
              scopeThis.payment.popup.visible = true
              scopeThis.payment.readOnly = false
              scopeThis.forceRefresh.payment++
            },
          },
        ],
      },
    ])
  }

  menu = menu.concat([
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
