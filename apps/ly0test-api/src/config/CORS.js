const CORS = {
    // --- 1. 跨域资源共享 (CORS) 单元 ---
    // 允许的访问来源：'*' 表示允许任何域名访问
    // 在本地 .exe 运行或前后端分离部署时，这是确保接口不被浏览器拦截的核心配置
    'Access-Control-Allow-Origin': '*',
    // 允许的请求头：声明前端（如 Axios）可以携带哪些自定义 Header
    // 包含 Content-Type（发 JSON 必填）和 Authorization（发登录 Token 必填）
    'Access-Control-Allow-Headers': 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With',
    // 允许的 HTTP 方法：声明后端支持的操作类型
    // 特别是 OPTIONS，它是浏览器在发送正式请求前的“预检”动作，必须放行
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',

    // --- 2. 内容安全策略 (CSP) 单元 ---
    // 解决“浏览器刷新报错”的核心，它告诉浏览器：哪些外部资源是安全的、允许加载的
    "Content-Security-Policy":
        // 默认规则：只允许加载来自程序自身（'self'）的资源
        "default-src 'none'; " +
        // 脚本安全：允许程序自身脚本、内联脚本（unsafe-inline）以及 Vue 动态编译（unsafe-eval）
        // 特别放行了 Cloudflare 统计脚本，防止刷新时因拦截该脚本导致的控制台报错
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:443 http://127.0.0.1:443 https://static.cloudflareinsights.com; " +
        // 请求连接：允许程序向自身 API 以及你指定的远程 API 服务器发送数据请求
        // 解决刷新后 API 请求被浏览器视为“非法外连”的问题
        "connect-src 'self' https://api.stellarium.ink; " +
        // 样式安全：允许程序自身 CSS 和 Vue 动态绑定的行内样式（:style）
        // 如果不加 'unsafe-inline'，Vue 许多动态视觉效果会失效
        "style-src 'self' 'unsafe-inline'; " +
        // 资源安全：允许加载程序内的图片，并支持 Base64 格式的图片数据（data:）
        "img-src 'self' data:; " +
        // 嵌入防护：禁止任何网页通过 iframe 嵌套你的这个页面，有效防止“点击劫持”攻击
        "frame-ancestors 'none'; "
}
export {
    CORS,
}
export default {
    CORS
}