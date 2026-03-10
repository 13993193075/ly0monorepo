import path from 'path'
import {dirRoot} from './dirroot.js'
import express from 'express'
// 解决浏览器刷新报错的问题
import history from 'connect-history-api-fallback'
import {DB_Bridge} from '@yoooloo42/ly0nodejs'
import {mongodb, gsfy, upload, CORS} from './config.js'
import routerUploadReq from '../upload-req/router.js'
import routerStorpro from '../storpro/router.js'
import routerWechatLoginRedirect from '../wechat-login-redirect/router.js'

const app = express()

async function run() {
    // 连接MongoDB数据库
    let connectionUrl = 'mongodb://'
    if(mongodb.security && mongodb.security === true){
        // 安全模式
        connectionUrl = connectionUrl +
            process.env.MONGODB_USERNAME + ':' +
            process.env.MONGODB_PASSWORD + '@' +
            mongodb.ip + ':' +
            mongodb.port + '/' +
            process.env.MONGODB_DBNAME + '?authSource=' +
            process.env.MONGODB_AUTHSOURCE
    }else{
        // 本地调试模式
        connectionUrl = connectionUrl +
            mongodb.ip + ':' +
            mongodb.port + '/' +
            process.env.MONGODB_DBNAME
    }
    const MongoDB_clientInstance = await DB_Bridge.MongoDB.connectMongoDB({
        connectionUrl
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

    // 跨源（跨域）资源共享 CORS(Cross-Origin Resource Sharing)
    app.use(function (req, res, next) {
        res.header(CORS.CORS);
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    app.use(express.urlencoded({extended: true}))
    // 设置请求体大小上限：50mb，参数个数上限：10000
    // app.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit: 10000}))

    app.use(express.json())
    // 设置请求体大小上限：50mb，参数个数上限：10000
    // app.use(express.json({limit: '50mb', parameterLimit: 10000}))

    app.set('view engine', 'ejs') // ejs 模板引擎
    app.set('views', '../') // 模板文件夹

    // 业务 API 路由
    // 文件上传请求
    app.use('/ly0/upload-req', routerUploadReq)
    // 存储过程
    app.use('/ly0/storpro', routerStorpro)
    // 微信登录重定向
    app.use('/ly0/wechat-login-redirect', routerWechatLoginRedirect)

    // 如果请求不是 API，且在静态文件夹找不到文件，就强制返回 index.html
    // 所有的 API 路由必须放在 History 插件之前
    // 解决浏览器刷新报错的问题
    app.use(history({
        verbose: false, // 生产环境建议 false，调试可改 true 查看跳转日志
        index: '/', // 默认跳转到根路径
        rewrites: [
            // 保护以 /ly0 开头的 API 不被重写
            { from: /^\/ly0\/.*$/, to: (context) => context.parsedUrl.pathname }
        ]
    }));

    // 静态资源
    app.use('/ly0/static', express.static(path.join(dirRoot, 'src/static')))
    // 文件上传与存储
    app.use(upload.uploadUrl, express.static(upload.uploadFolder))
    app.use(upload.imageUrl, express.static(upload.imageFolder))
    //甘肃省妇幼保健院大文件专用
    app.use(gsfy.uploadUrl, express.static(gsfy.uploadFolder))
    app.use(gsfy.imageUrl, express.static(gsfy.imageFolder))

    // 响应根路由 '/' 的请求
    app.use('/', express.static(path.join(dirRoot, 'src/static/dist')))
    /* 重定向方式
    app.use('/', (request, response) => {
        response.redirect('/ly0/frontend/dist/index.html')
    })
    */

    return({
        app,
    })
}

export default {
    run
}
