// 时段：增加
function dateAppend(scopeThis) {
  scopeThis.find.pageData.arrDate.push({
    dateFrom: null,
    dateTo: null,
  })
}

// 时段：重置
function dateReset(scopeThis) {
  scopeThis.find.pageData.arrDate = [
    {
      dateFrom: null,
      dateTo: null,
    },
  ]
}

// 级联：场所
function placeChanged(scopeThis) {
  scopeThis.find.pageData.id_position = null

  if (!scopeThis.find.pageData.id_place) {
    scopeThis.find.pageData.arrPosition0 = []
    return
  }

  // 位置
  scopeThis.find.pageData.arrPosition0 = scopeThis.find.pageData.arrPosition.filter((i) => {
    return i.id_place === scopeThis.find.pageData.id_place
  })

  // 房间
  scopeThis.find.pageData.arrRoomTransfer = []
  scopeThis.find.pageData.arrRoom0Transfer = []
  let a = scopeThis.find.pageData.arrRoom.filter((i) => {
    return i.id_place === scopeThis.find.pageData.id_place
  })
  a.forEach((i) => {
    scopeThis.find.pageData.arrRoomTransfer.push({
      key: i._id,
      label: i.name,
    })
  })
}

// 级联：位置
function positionChanged(scopeThis) {
  //房间
  scopeThis.find.pageData.arrRoomTransfer = []
  scopeThis.find.pageData.arrRoom0Transfer = []
  let a = scopeThis.find.pageData.arrRoom.filter((i) => {
    return (
      i.id_place === scopeThis.find.pageData.id_place &&
      (!scopeThis.find.pageData.id_position
        ? true
        : i.id_position === scopeThis.find.pageData.id_position)
    )
  })
  a.forEach((i) => {
    scopeThis.find.pageData.arrRoomTransfer.push({
      key: i._id,
      label: i.name,
    })
  })
}

// 提交
function submit(scopeThis) {
  get1(scopeThis)
  scopeThis.handles.showEcharts(scopeThis)
  scopeThis.find.popup.visible = false
}

// to transfer
function get0(scopeThis) {
  scopeThis.find.pageData.arrRoomTransfer = []
  scopeThis.find.pageData.arrRoom0Transfer = []
  scopeThis.find.pageData.arrRoom.forEach((i) => {
    scopeThis.find.pageData.arrRoomTransfer.push({
      key: i._id,
      label: i.name,
    })
  })
}

// from transfer
function get1(scopeThis) {
  scopeThis.find.pageData.arrRoom0 = []
  scopeThis.find.pageData.arrRoom.forEach((i) => {
    let objRoom = scopeThis.find.pageData.arrRoom0Transfer.find((j) => {
      return i._id === j
    })
    if (objRoom) {
      scopeThis.find.pageData.arrRoom0.push(i)
    }
  })

  // 全部未选中 等效于 全选
  if (scopeThis.find.pageData.arrRoom0.length === 0) {
    scopeThis.find.pageData.arrRoom0 = JSON.parse(JSON.stringify(scopeThis.find.pageData.arrRoom))
  }
}

export default (function () {
  return {
    dateAppend,
    dateReset,
    placeChanged,
    positionChanged,
    submit,
    get0,
    get1,
  }
})()
