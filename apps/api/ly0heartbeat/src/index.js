import {listen} from './main/config.js'
import main from './main/express.js'

console.log('正在启动 ly0 - 企业应用集成服务 ...')
console.log('编译版本：0')
console.log('监听端口：' + listen.port)
main.run().then(result => {
    // https 应用服务器
    // result.https.createServer(result.httpsSsl, result.app).listen(listen.port)

    // http 应用服务器，可用于本地调试
    // result.http.createServer(result.app).listen(listen.port)

    // 本地调试
    result.app.listen(listen.port)
})