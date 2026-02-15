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
              scopeThis.collapseOpen_left = ['property', 'bGoods', 'meterrecord']
              scopeThis.collapseOpen_right = ['amount', 'bGoods0', 'memo']
              scopeThis.$message('已刷新')
            })
          },
        },
        {
          title: '刷新并打开默认面板',
          handle(scopeThis, index) {
            scopeThis.init().then(() => {
              scopeThis.forceRefresh.all++ // 强制重载子组件
              scopeThis.collapseOpen_left = ['property', 'bGoods']
              scopeThis.collapseOpen_right = ['amount', 'bGoods0']
              scopeThis.$message('已刷新')
            })
          },
        },
      ],
    },
  ]

  menu = menu.concat([
    {
      title: '订单状态',
      menu: [
        {
          title: '制单',
          handle(scopeThis, index) {
            if (!!scopeThis.business.objProperty.id_business) {
              scopeThis.$message('已制单')
              return
            }

            scopeThis
              .$confirm('制单后，将锁定所有账目，不能修改', '警告', {
                confirmButtonText: '继续',
                cancelButtonText: '放弃',
                type: 'warning',
              })
              .then(() => {
                dataRequest
                  .storpro({
                    scopeThis,
                    storproName: 'ly0d9business.business_new',
                    data: { id_property: scopeThis.business.objProperty._id },
                  })
                  .then((result) => {
                    scopeThis.$message(result.message)
                    scopeThis.init().then(() => {
                      scopeThis.forceRefresh.all++ // 强制重载子组件
                    })
                  })
              })
              .catch(() => {
                scopeThis.$message({ type: 'info', message: '放弃' })
              })
          },
        },
        {
          title: '取消制单',
          handle(scopeThis, index) {
            if (!scopeThis.business.objProperty.id_business) {
              scopeThis.$message('未制单')
              return
            }

            scopeThis
              .$confirm('取消制单，将解锁所有账目，可以修改', '警告', {
                confirmButtonText: '继续',
                cancelButtonText: '放弃',
                type: 'warning',
              })
              .then(() => {
                dataRequest
                  .storpro({
                    scopeThis,
                    storproName: 'ly0d9business.business_cancel',
                    data: { _id: scopeThis.business.objProperty._id },
                  })
                  .then((result) => {
                    scopeThis.$message(result.message)
                    scopeThis.init().then(() => {
                      scopeThis.forceRefresh.all++ // 强制重载子组件
                    })
                  })
              })
              .catch(() => {
                scopeThis.$message({ type: 'info', message: '放弃' })
              })
          },
        },
      ],
    },
  ])

  menu = menu.concat([
    {
      title: '收银',
      menu: [
        {
          title: '打开支付记录',
          handle(scopeThis, index) {
            if (!scopeThis.business.objProperty.id_business) {
              scopeThis.$message('未制单，不能收银')
              return
            }

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
    {
      title: '打印',
      menu: [
        {
          title: '收费单(29.7cm*21cm)(A4)',
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
        scopeThis.myProps.id_property = null
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
