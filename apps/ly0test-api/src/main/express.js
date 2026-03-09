import path from 'path'
import {dirRoot} from './dirroot.js'
import express from 'express'
import {DB_Bridge} from '@yoooloo42/ly0nodejs'
import {mongodb, gsfy, upload} from './config.js'
import routerUploadReq from '../upload-req/router.js'
import routerStorpro from '../storpro/router.js'
import routerWechatLoginRedirect from '../wechat-login-redirect/router.js'
// 解决生产环境下使用浏览器自带的页面刷新功能就会报错的问题
// [PATCH] 引入 history 插件
import history from 'connect-history-api-fallback'

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

    // 解决跨域问题
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

        // 解决生产环境下使用浏览器自带的页面刷新功能就会报错的问题
        // [PATCH] 修复 CSP 拦截问题
        // 这里放宽了策略，允许加载来自 self 和 cloudflare 的脚本。
        // 如果你的 404 错误依然存在，浏览器可能会降级执行 default-src 'none' 策略。
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; " +
            // 允许：本地脚本、内联脚本、Eval(Vue3开发或部分插件需要)
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
            // 允许：Cloudflare统计
            "https://static.cloudflareinsights.com; " +
            // 允许：本地接口
            "connect-src 'self' " +
            // 允许：我的api地址
            "https://api.stellarium.ink; " +
            // 允许：本地样式、内联样式（Vue 动态绑定样式必填）
            "style-src 'self' 'unsafe-inline'; " +
            // 允许：本地图片、base64图片
            "img-src 'self' data:;" +
            // 屏蔽：所有插件/框架嵌入（防止被恶意嵌套）
            "frame-ancestors 'none';"
        );

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

    // 所有的 API 路由必须放在 History 插件之前
    // 静态资源
    app.use('/ly0/static', express.static(path.join(dirRoot, 'src/static')))
    // 文件上传与存储
    app.use(upload.uploadUrl, express.static(upload.uploadFolder))
    app.use(upload.imageUrl, express.static(upload.imageFolder))
    //甘肃省妇幼保健院大文件专用
    app.use(gsfy.uploadUrl, express.static(gsfy.uploadFolder))
    app.use(gsfy.imageUrl, express.static(gsfy.imageFolder))

    // 业务 API 路由
    // 文件上传请求
    app.use('/ly0/upload-req', routerUploadReq)
    // 存储过程
    app.use('/ly0/storpro', routerStorpro)
    // 微信登录重定向
    app.use('/ly0/wechat-login-redirect', routerWechatLoginRedirect)

    // [PATCH] 核心补丁：处理前端路由刷新 404
    // 它的作用是：如果请求不是 API，且在静态文件夹找不到文件，就强制返回 index.html
    app.use(history({
        verbose: false, // 生产环境建议 false，调试可改 true 查看跳转日志
        index: '/', // 默认跳转到根路径
        rewrites: [
            { from: /^\/ly0\/.*$/, to: (context) => context.parsedUrl.pathname } // 保护以 /ly0 开头的 API 不被重写
        ]
    }));

    // 响应根路由 '/' 的请求
    // 静态资源方式
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
