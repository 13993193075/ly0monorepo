export default {
    "ly0d11carpark": {
        "_id": {"note": "停车场信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "停车场名称", "type": "string", "required": "true"},
        "capacity": {"note": "剩余车位数", "type": "integer", "required": "true"},
        "wx_appid": {"note": "微信支付 - APPID", "type": "string"},
        "wx_mchid": {"note": "微信商户号", "type": "string"},
        "id_pricing": {"note": "临时车默认计费项目", "type": "mongodb.id", "ref_tblName": "ly0d11pricing", "ref_fldName": "_id"},
        "pricing_name": {"note": "项目名称", "type": "string", "required": "true"},
        "id_self": {"note": "长期车默认自助缴费项目", "type": "mongodb.id", "ref_tblName": "ly0d11self", "ref_fldName": "_id"},
        "self_name": {"note": "项目名称", "type": "string", "required": "true"}
    },
    
    "ly0d11warden": {
        "_id": {"note": "管理员信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        "cellphone": {"note": "手机号", "type": "string", "required": "true"},
        "name": {"note": "姓名", "type": "string", "required": "true"}
    },
    
    "ly0d11pricing": {
        "_id": {"note": "临时车计费项目", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        
        "name": {"note": "项目名称", "type": "string", "required": "true"},
        "type": {"note": "计价类型", "type": "string", "required": "true"},
        "type_text": {"note": "", "type": "string", "required": "true"},
        
        "fee1hour": {"note": "小时单价", "type": "integer"},
        "fee1minimum": {"note": "最低收费", "type": "integer"},
        "fee1maximum": {"note": "最高收费", "type": "integer"},
        "fee1free": {"note": "免费时长（分钟）", "type": "integer"},
        
        "fee2first": {"note": "第一小时单价", "type": "integer"},
        "fee2hour": {"note": "小时单价", "type": "integer"},
        "fee2term": {"note": "计价时长", "type": "integer"},
        "fee2again": {"note": "重新计价时长", "type": "integer"},
        "fee2free_minutes": {"note": "免费时长（分钟）", "type": "integer"},
        "fee2free_slot_start_hours": {"note": "免费时段-起始时间-时", "type": "integer"},
        "fee2free_slot_start_minutes": {"note": "免费时段-起始时间-分", "type": "integer"},
        "fee2free_slot_end_hours": {"note": "免费时段-结束时间-时", "type": "integer"},
        "fee2free_slot_end_minutes": {"note": "免费时段-结束时间-分", "type": "integer"}
    },
    
    "ly0d11self": {
        "_id": {"note": "长期车自助缴费项目", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        "name": {"note": "项目名称", "type": "string", "required": "true"},
        "term": {"note": "期限单位: Month", "type": "string", "required": "true"},
        "term_text": {"note": "", "type": "string", "required": "true"},
        "price": {"note": "单价", "type": "integer", "required": "true"},
        "self": {"note": "期限", "type": "integer", "required": "true"}
    },

    "ly0d11carwithin": {
        "_id": {"note": "长期车", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        "parking": {"note": "车位", "type": "string"},
        "carplate": {"note": "车牌", "type": "string", "required": "true"},
        "expiryfrom": {"note": "有效期起始日期", "type": "date", "required": "true"},
        "expiryto": {"note": "有效期截止日期", "type": "date", "required": "true"},
        "id_pricing": {"note": "临时车计费项目", "type": "mongodb.id", "ref_tblName": "ly0d11pricing", "ref_fldName": "_id"},
        "pricing_name": {"note": "项目名称", "type": "string"},
        "id_self": {"note": "长期车自助缴费项目", "type": "mongodb.id", "ref_tblName": "ly0d11self", "ref_fldName": "_id"},
        "self_name": {"note": "项目名称", "type": "string"},
        "cellphone": {"note": "车主手机号", "type": "string"},
        "note": {"note": "备注", "type": "string"}
    },

    "ly0d11carwithin_rec": {
        "_id": {"note": "长期车缴费记录", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        "parking": {"note": "车位", "type": "string"},
        "carplate": {"note": "车牌", "type": "string", "required": "true"},
        "expiryfrom": {"note": "有效期起始日期", "type": "date", "required": "true"},
        "expiryto": {"note": "有效期截止日期", "type": "date", "required": "true"},
        "fee": {"note": "本期核收金额", "type": "integer", "required": "true"},
        "time": {"note": "核收时间", "type": "date", "required": "true"},
        "note": {"note": "备注", "type": "string"}
    },

    "ly0d11carpassin": {
        "_id": {"note": "进车记录", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_carpark": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d11carpark", "ref_fldName": "_id", "required": "true"},
        "carpark_name": {"note": "停车场名称", "type": "string", "required": "true"},
        "carplate": {"note": "车牌", "type": "string", "required": "true"},
        "carwithin": {"note": "长期车", "type": "boolean", "required": "true"},
        "expiryfrom": {"note": "长期车：有效期起", "type": "date"},
        "expiryto": {"note": "有效期止", "type": "date"},
        "timein": {"note": "进入时间", "type": "date", "required": "true"},
        "timeout": {"note": "离开时间", "type": "date"},
        "picturein": {"note": "进入截图", "type": "string"},
        "pictureout": {"note": "离开截图", "type": "string"},
        "id_pricing": {"note": "计费项目", "type": "mongodb.id", "ref_tblName": "ly0d11pricing", "ref_fldName": "_id"},
        "pricing_name": {"note": "项目名称", "type": "string"},
        "price": {"note": "计费", "type": "integer"},
        "fee": {"note": "核收", "type": "integer"},
        "note": {"note": "备注", "type": "string"}
   }
}