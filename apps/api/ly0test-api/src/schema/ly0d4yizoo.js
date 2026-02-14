export default {
    "note": "门锁系统.htlock",
    "ly0d4yizoo_hotel": {
        "_id": {"note": "", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "旅店 _id", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "url": {"note": "接口请求地址", "type": "string"},
        "accountname": {"note": "账号", "type": "string"},
        "password": {"note": "账号密码", "type": "string"},
        "tokenid": {"note": "令牌", "type": "string"},
        "expire": {"note": "令牌有效期", "type": "date"}
    },
    "ly0d4yizoo_room": {
        "_id": {"note": "客房信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "room_name": {"note": "房号", "type": "string", "required": "true"},
        "building_code": {"note": "楼栋编码", "type": "integer"},
        "floor_code": {"note": "楼层编码", "type": "integer"},
        "room_code": {"note": "房间编码", "type": "integer"},
        "lock_code": {"note": "门锁编码", "type": "string", "required": "true"},
        "lock_mac": {"note": "门锁 MAC", "type": "string", "required": "true"},
        "aeskey": {"note": "门锁 AES128 密钥", "type": "string"}
    }
}