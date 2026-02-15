import login from './login.js'
import password from './password.js'
import sms from './sms.js'
import email from './email.js'
import wx from './wx.js'

function pgPassword(scopeThis){
    scopeThis.loginPg = "password"
}
function pgSms(scopeThis){
    scopeThis.loginPg = "sms"
}
function pgEmail(scopeThis){
    scopeThis.loginPg = "email"
}
function pgWx(scopeThis){
    scopeThis.loginPg = "wx"
}

export default {
    login,
    password,
    sms,
    email,
    wx,
    pgPassword,
    pgSms,
    pgEmail,
    pgWx
}