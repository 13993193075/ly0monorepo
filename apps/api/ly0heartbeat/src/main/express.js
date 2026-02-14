import express from 'express'
import http from 'http'
import https from 'https'
import path from 'path';
import { fileURLToPath } from 'url';
import {DB_Bridge} from 'packages/ly0libs'
import {listen, gsfy, upload} from './config.js'
import routerUploadReq from '../upload-req/router.js'
import routerStorpro from '../storpro/router.js'
import routerWechatLoginRedirect from '../wechat-login-redirect/router.js'
// 获取当前文件的目录路径 (相当于 CommonJS 的 __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const httpsSsl = {
    key: listen.https_ssl.key_path,
    cert: listen.https_ssl.cert_path
}

async function run() {
    // 初始化MongoDB数据库连接
    const MongoDB_clientInstance = await DB_Bridge.MongoDB.connectMongoDB({
        connectionUrl: 'mongodb://127.0.0.1:27017/ly0'
    })
    global.ly0mongodb = DB_Bridge.MongoDB.getDB(MongoDB_clientInstance, 'ly0') // 全局变量：存储过程使用

    // 注册监听器：nodejs应用终止时，关闭MongoDB数据库连接
    // 监听正常关闭信号
    process.on('SIGINT', () => DB_Bridge.MongoDB.closeConnection(MongoDB_clientInstance));
    process.on('SIGTERM', () => DB_Bridge.MongoDB.closeConnection(MongoDB_clientInstance));
    // 监听未捕获的错误，并尝试优雅关闭
    process.on('uncaughtException', (err) => {
        console.error('Caught unhandled exception:', err);
        DB_Bridge.MongoDB.closeConnection(MongoDB_clientInstance);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Caught unhandled promise rejection:', reason);
        // 尽管我们通常只记录，但如果错误严重，也可以选择关闭
        DB_Bridge.MongoDB.closeConnection(MongoDB_clientInstance);
    });

    // 解决跨域问题
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });
    /*
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
        if (req.method == 'OPTIONS') {
            undefined
            // res.send ( 200 ) ;
            res.sendStatus(200)
        } else {
            undefined
            next()
        }
    })
     */

    app.use(express.urlencoded({extended: true}))
    // 设置请求体大小上限：50mb，参数个数上限：10000
    // app.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit: 10000}))

    app.use(express.json())
    // 设置请求体大小上限：50mb，参数个数上限：10000
    // app.use(express.json({limit: '50mb', parameterLimit: 10000}))

    app.set('view engine', 'ejs') // ejs 模板引擎
    app.set('views', '../') // 模板文件夹

    // 静态资源
    app.use('/ly0/static', express.static(path.join(__dirname, '../static')))
    // 文件上传与存储
    app.use(upload.uploadUrl, express.static(upload.uploadFolder))
    app.use(upload.imageUrl, express.static(upload.imageFolder))
    //甘肃省妇幼保健院大文件专用
    app.use(gsfy.uploadUrl, express.static(gsfy.uploadFolder))
    app.use(gsfy.imageUrl, express.static(gsfy.imageFolder))

    // 文件上传请求
    app.use('/ly0/upload-req', routerUploadReq)

    // 存储过程
    app.use('/ly0/storpro', routerStorpro)

    // 微信登录重定向
    app.use('/ly0/wechat-login-redirect', routerWechatLoginRedirect)

    // 响应根路由 '/' 的请求
    // 静态资源方式
    app.use('/', express.static(path.join(__dirname, '../static/dist')))
    /* 重定向方式
    app.use('/', (request, response) => {
        response.redirect('/ly0/frontend/dist/index.html')
    })
    */

    return({
        http,
        https,
        httpsSsl,
        app
    })
}

export default {
    run
}
