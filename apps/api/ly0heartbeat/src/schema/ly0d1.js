export default {
    "ly0d1d0appid": {
        "_id": {"note": "微信应用凭据", "type": "mongodb.id", "required": "true"},
        "appid": {"note": "应用ID", "type": "string", "required": "true"},
        "secret": {"note": "应用密钥", "type": "string", "required": "true"},
        "note": {"note": "备注", "type": "string"},
        "with_thiswebsite_login": {"note": "用于本站微信登录", "type": "boolean"},
        "with_annual": {"note": "用于系统年费", "type": "boolean"}
    },
    "ly0d1d0mchid": {
        "_id": {"note": "微信商户号", "type": "mongodb.id", "required": "true"},
        "mchid": {"note": "商户号", "type": "string", "required": "true"},
        "v2apikey": {"note": "v2密钥 密文", "type": "string"},
        "v3apikey": {"note": "v3密钥 密文", "type": "string"},
        "serial_no": {"note": "证书序列号 密文", "type": "string"},
        "private_key": {"note": "证书私钥 密文", "type": "string"},
        "note": {"note": "备注", "type": "string"},
        "with_annual": {"note": "用于系统年费", "type": "boolean"}
    },
    "ly0d1d1ukey": {
        "_id": {"note": "飞鹅打印机开发者账号", "type": "mongodb.id", "required": "true"},
        "user": {"note": "用户名称", "type": "string", "required": "true"},
        "ukey": {"note": "用户 U-KEY", "type": "string", "required": "true"},
        "note": {"note": "备注", "type": "string"}
    },
    "ly0d1d1printer": {
        "_id": {"note": "打印机列表", "type": "mongodb.id", "required": "true"},
        "id_ukey": {"note": "", "type": "string"},
        "ukey_note": {"note": "", "type": "string"},
        "sn": {"note": "打印机厂商识别编号", "type": "string", "required": "true"},
        "key": {"note": "打印机厂商识别密钥", "type": "string", "required": "true"},
        "note": {"note": "备注（注册使用）", "type": "string"},
        "carnum": {"note": "流量卡号码", "type": "string"},

        "id_dataunit": {"note": "数据单元._id", "type": "string"},
        "dataunit_name": {"note": "数据单元.名称", "type": "string"},
        "busiunit_tblname": {"note": "业务单位.数据库表名", "type": "string"},
        "id_busiunit": {"note": "业务单位._id", "type": "string"},
        "busiunit_name": {"note": "业务单位.名称", "type": "string"},
        "printername": {"note": "打印机名称", "type": "string"},
        "scene": {"note": "使用场景", "type": "string"},
        "sceneNote": {"note": "使用场景备注", "type": "string"}
    }
}