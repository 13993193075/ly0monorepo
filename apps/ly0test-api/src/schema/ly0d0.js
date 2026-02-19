export default {
    "ly0d0login": {
        "_id": {"note": "登录账号", "type": "mongodb.id", "required": "true"},
        "count": {"note": "短信额度剩余次数", "type": "integer"}
    },
    "ly0d0number": {
        "_id": {"note": "工号", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id", "required": "true"},
        "number": {"note": "工号", "type": "string", "required": "true"},
        "password": {"note": "登录密码", "type": "string"}
    },
    "ly0d0cellphone": {
        "_id": {"note": "手机号绑定", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id", "required": "true"},
        "cellphone": {"note": "手机号", "type": "string"},
        "password": {"note": "登录密码", "type": "string"},
        "vercode": {"note": "验证码", "type": "string"},
        "time": {"note": "验证码创建时间", "type": "date"},
        "minutes": {"note": "有效分钟数", "type": "date"}
    },
    "ly0d0email": {
        "_id": {"note": "email绑定", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id", "required": "true"},
        "email": {"note": "", "type": "string"},
        "password": {"note": "登录密码", "type": "string"},
        "vercode": {"note": "验证码", "type": "string"},
        "time": {"note": "验证码创建时间", "type": "date"},
        "minutes": {"note": "有效分钟数", "type": "date"}
    },
    "ly0d0wx": {
        "_id": {"note": "微信绑定", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id", "required": "true"},
        "appid": {"note": "微信 - appid", "type": "string"},
        "openid": {"note": "微信 - openid", "type": "string"},
        "nickname": {"note": "昵称", "type": "string"},
        "headimgurl": {"note": "头像", "type": "array"}
    },
    "ly0d0dataunit": {
        "_id": {"note": "数据单元", "type": "mongodb.id", "required": "true"},
        "name": {"note": "名称", "type": "string", "required": "true"},
        "systemoff": {"note": "系统关闭: true - 是, false - 否", "type": "boolean"}
    },
    "ly0d0group": {
        "_id": {"note": "用户组", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "名称", "type": "string", "required": "true"},
        "route_type": {"note": "应用路由类型 : 0 - URL , 1 - VUE路由", "type": "string"},
        "route": {"note": "应用路由", "type": "string"},
        "icon": {"note": "图标", "type": "array"},
    },
    "ly0d0user": {
        "_id": {"note": "用户信息", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "账号id", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_group": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0group", "ref_fldName": "_id", "required": "true"},
        "group_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "用户名称", "type": "string"},
        "icon": {"note": "图标", "type": "array"}
    },
    "ly0d0session": {
        "_id": {"note": "登录状态", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id"},
        "type": {"note": "", "type": "string"}, // 取值范围: "number", "cellphone", "email", "wx"
        "number": {"note": "工号", "type": "string"},
        "cellphone": {"note": "", "type": "string"},
        "email": {"note": "", "type": "string"},
        "wx_appid": {"note": "微信", "type": "string"},
        "wx_openid": {"note": "微信", "type": "string"},
        "wx_nickname": {"note": "昵称", "type": "string"},
        "wx_headimgurl": {"note": "头像", "type": "string"},
        "expires": {"note": "登录有效期至", "type": "date"},
        "app": {"note": "应用标签", "type": "string"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id"},
        "id_group": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0group", "ref_fldName": "_id"},
        "usertbl": {"note": "用户表名", "type": "string"},
        "id_user": {"note": "", "type": "mongodb.id"}
    },
    "ly0d0syslog": {
        "_id": {"note": "系统日志", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id"},
        "type": {"note": "", "type": "string"},
        "number": {"note": "工号", "type": "string"},
        "cellphone": {"note": "", "type": "string"},
        "email": {"note": "", "type": "string"},
        "wx_appid": {"note": "微信", "type": "string"},
        "wx_openid": {"note": "微信", "type": "string"},
        "wx_nickname": {"note": "昵称", "type": "string"},
        "wx_headimgurl": {"note": "头像", "type": "string"},
        "time": {"note": "时间", "type": "date", "required": "true"},
        "memo": {"note": "备忘", "type": "string", "required": "true"},
        "app": {"note": "应用标签", "type": "string"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id"},
        "id_group": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0group", "ref_fldName": "_id"},
        "usertbl": {"note": "用户表名", "type": "string"},
        "id_user": {"note": "", "type": "mongodb.id"}
    },
    "ly0d0test": {
        "_id": {"note": "测试中心", "type": "mongodb.id", "required": "true"},
        "navigation": {"note": "0 - 初始化 , 1 - 业务构件 , 2 - 应用", "type": "string"},
        "name": {"note": "应用名称", "type": "string"},
        "route_type": {"note": "应用入口类型：0 - URL , 1 - VUE 路由", "type": "string"},
        "route_type_text": {"type": "string"},
        "route": {"note": "应用入口", "type": "string"}
    },
    "ly0d0annual": {
        "_id": {"note": "年费记录", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "fee": {"note": "年费", "type": "integer", "required": "true"},
        "from": {"note": "起始日期", "type": "date", "required": "true"},
        "to": {"note": "截止日期", "type": "date", "required": "true"},
        "status_code": {"note": "支付状态", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string", "required": "true"}
    }
}