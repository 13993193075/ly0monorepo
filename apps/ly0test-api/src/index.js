import http from 'http'
import https from 'https'
import {listen} from './main/config.js'
import main from './main/express.js'
const httpsSsl = {
    key: listen.https_ssl.key_path,
    cert: listen.https_ssl.cert_path
}

console.log('正在启动 ly0 - 企业应用集成服务 ...')
console.log('编译版本：0')
console.log('监听端口：' + listen.port)
main.run().then(result => {
    // https 应用服务器
    if(listen.type === "https") {
        https.createServer(httpsSsl, result.app).listen(listen.port)
        return
    }
    // http 应用服务器，可用于本地调试
    if(listen.type === "http") {
        http.createServer(result.app).listen(listen.port)
        return
    }
    // 本地调试
    if(listen.type === "localhost") {
        result.app.listen(listen.port)
    }
})