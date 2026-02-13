// 级联：场所名称
function id_place(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_position = null
  scopeThis.formDataBox[branch].fieldsValue.id_room = null
  scopeThis.formDataBox[branch].fieldsValue.id_seat = null
  scopeThis.formDataBox[branch].fieldsValue.id_day = null
}
function id_place0(scopeThis, branch) {
  scopeThis.pageData.data.arrPosition0 = []
  scopeThis.pageData.data.arrRoom0 = []
  scopeThis.pageData.data.arrSeat0 = []
  scopeThis.pageData.data.arrDay0 = []
  if (!scopeThis.formDataBox[branch].fieldsValue.id_place) {
    return
  }

  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return i.id_place === scopeThis.formDataBox[branch].fieldsValue.id_place
  })
  scopeThis.pageData.data.arrRoom0 = scopeThis.pageData.data.arrRoom.filter((i) => {
    return i.id_place === scopeThis.formDataBox[branch].fieldsValue.id_place
  })
  setDay(scopeThis, branch)
}

// 级联：房间位置
function id_position(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_room = null
  scopeThis.formDataBox[branch].fieldsValue.id_seat = null
}
function id_position0(scopeThis, branch) {
  scopeThis.pageData.data.arrRoom0 = []
  scopeThis.pageData.data.arrSeat0 = []
  if (!scopeThis.formDataBox[branch].fieldsValue.id_position) {
    scopeThis.pageData.data.arrRoom0 = scopeThis.pageData.data.arrRoom.filter((i) => {
      i.id_place === scopeThis.formDataBox[branch].fieldsValue.id_place
    })
    return
  }

  scopeThis.pageData.data.arrRoom0 = scopeThis.pageData.data.arrRoom.filter((i) => {
    return i.id_position === scopeThis.formDataBox[branch].fieldsValue.id_position
  })
}

// 房间名称
function id_room(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_seat = null
}
function id_room0(scopeThis, branch) {
  scopeThis.pageData.data.arrSeat0 = []
  if (!scopeThis.formDataBox[branch].fieldsValue.id_room) {
    return
  }

  scopeThis.pageData.data.arrSeat0 = scopeThis.pageData.data.arrSeat.filter((i) => {
    return i.id_room === scopeThis.formDataBox[branch].fieldsValue.id_room
  })
}

// 设置时段
function setDay(scopeThis, branch) {
  if (
    !scopeThis.formDataBox[branch].fieldsValue.id_place ||
    !scopeThis.formDataBox[branch].fieldsValue.date
  ) {
    scopeThis.pageData.data.arrDay0 = []
    return
  }

  scopeThis.pageData.data.arrDay0 = scopeThis.pageData.data.arrDay.filter((i) => {
    return (
      i.day === new Date(scopeThis.formDataBox[branch].fieldsValue.date).getDay() &&
      i.id_place === scopeThis.formDataBox[branch].fieldsValue.id_place
    )
  })
}

export default {
  id_place,
  id_place0,
  id_position,
  id_position0,
  id_room,
  id_room0,
  setDay,
}
