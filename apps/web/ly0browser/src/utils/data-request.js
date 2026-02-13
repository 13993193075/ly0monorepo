import axios from 'axios'

// const domain = "https://www.stuffs.top"
const domain = 'http://127.0.0.1:443'
// const srcPrefix = "https://www.stuffs.top"
const srcPrefix = 'http://127.0.0.1:443'
const upload = '/ly0/upload-req/image'
const upload_carplate = '/ly0/upload-req/carplate'

// 数据请求
function dataRequset(para) {
  // para.scopeThis 当前的组件实例
  // para.url 路由
  // para.data 请求数据

  return new Promise((resolve, reject) => {
    let t0 = new Date()
    axios({
      url: domain + para.url,
      method: 'post',
      dataType: 'json',
      data: para.data ? para.data : null,
      success: (data, status, xhr) => {},
    })
      .then((response) => {
        let data = response.data
        let t1 = new Date()
        console.log('后端请求用时：' + (t1 - t0) + '毫秒')

        // session 异常
        if (data.sessionStatusCode && data.sessionStatusCode !== 0) {
          console.log('session异常', data.sessionStatusMessage)
          para.scopeThis.$message(data.sessionStatusMessage)

          // 重定位
          let ly0session = ly0sessionLoad()
          ly0sessionSave({
            session: {
              usertbl:
                ly0session && ly0session.session && ly0session.session.usertbl
                  ? ly0session.session.usertbl
                  : 'ly0d0user',
            },
          })
          ly0sessionLose(para.scopeThis)
          return resolve({ code: 1, message: 'session 异常' })
        }

        resolve(data)
      })
      .catch((error) => {
        console.log('错误：')
        console.log(error)

        reject(error)
      })
  })
}

// 存储过程
function storpro(para) {
  // para.scopeThis
  // para.noSession
  // para.storproName
  // para.data

  return new Promise((resolve, reject) => {
    dataRequset({
      scopeThis: para.scopeThis,
      url: '/ly0/storpro/exec',
      data: {
        noSession:
          !!para.noSession && (para.noSession === true || para.noSession === 'true')
            ? para.noSession
            : false,
        ly0session: ly0sessionLoad(),
        storproBody: {
          storproName: para.storproName,
          data: para.data ? para.data : null,
        },
      },
    }).then((result) => {
      resolve(result)
    })
  })
}

// session缓存
function ly0sessionSave(ly0session) {
  localStorage.setItem('ly0session', JSON.stringify(ly0session))
}
// session获取
function ly0sessionLoad() {
  return JSON.parse(localStorage.getItem('ly0session'))
}
// session清除
function ly0sessionClear() {
  localStorage.clear()
}
// session丢失
function ly0sessionLose(scopeThis) {
  let ly0session = ly0sessionLoad(),
    lose = false,
    route = ''
  if (
    !ly0session ||
    !ly0session.session ||
    !ly0session.session.usertbl ||
    !ly0session.session.id_user
  ) {
    lose = true
    switch (ly0session.session.usertbl) {
      case 'ly0d0user':
        route = '/'
        break
      case 'ly0d7guest':
        route = '/mall/*'
        break
    }
  }
  if (lose) {
    scopeThis.$router.replace({ path: route })
  }
  return lose
}
// session丢失
function ly0sessionLoseWithUsertbl(scopeThis, usertbl) {
  let ly0session = ly0sessionLoad(),
    lose = false,
    route = ''
  if (
    !ly0session ||
    !ly0session.session ||
    !ly0session.session.usertbl ||
    !ly0session.session.id_user ||
    ly0session.session.usertbl !== usertbl
  ) {
    lose = true
    switch (usertbl) {
      case 'ly0d0user':
        route = '/'
        break
      case 'ly0d7guest':
        route = '/mall/*'
        break
    }
  }
  if (lose) {
    scopeThis.$router.replace({ path: route })
  }
  return lose
}

export default {
  domain,
  srcPrefix,
  upload,
  upload_carplate,
  dataRequset,
  storpro,
  ly0sessionSave,
  ly0sessionLoad,
  ly0sessionClear,
  ly0sessionLose,
  ly0sessionLoseWithUsertbl,
}
