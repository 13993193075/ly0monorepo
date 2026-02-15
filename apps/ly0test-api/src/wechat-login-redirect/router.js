import express from "express"
import index from "./index.js"
const router = express.Router()
router
    // 生成微信二维码图片，监听用户操作，不进行安全审计
    .get("", (request, response) => {
        index.WechatLoginRedirect(request, response)
    })

export default router