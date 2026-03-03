export default {
    "ly0d4hotel": {
        "_id": {"note": "旅店信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "旅店名称", "type": "string", "required": "true"},
        "busiunit_no": {"note": "旅店编号", "type": "string"},

        "checkout_hours": {"note": "结算时间：时", "type": "integer", "required": "true"},
        "checkout_minutes": {"note": "结算时间：分", "type": "integer", "required": "true"},
        "checkout0_hours": {"note": "半日计价：时", "type": "integer"},
        "checkout0_minutes": {"note": "半日计价：分", "type": "integer"},

        "wx_appid": {"note": "微信支付 - APPID", "type": "string"},
        "wx_mchid": {"note": "微信商户号", "type": "string"},

        "doorlock_sys": {"note": "门锁系统", "type": "string"}
    },

    "ly0d4goods": {
        "_id": {"note": "房型", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "name": {"note": "房型名称", "type": "string", "required": "true"},
        "thumb": {"note": "照片", "type": "array"}
    },

    "ly0d4price": {
        "_id": {"note": "房型标价", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4goods", "ref_fldName": "_id", "required": "true"},
        "goods_name": {"note": "房型名称", "type": "string", "required": "true"},
        "name": {"note": "标价名称", "type": "string"},
        "method_code": {"note": "计价方法", "type": "string"},
        "method_text": {"note": "", "type": "string"},
        "price": {"note": "单价", "type": "integer", "required": "true"}
    },

    "ly0d4goods0": {
        "_id": {"note": "配售商品", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "name": {"note": "商品名称", "type": "string"},
        "price": {"note": "单价", "type": "integer", "required": "true"}
    },

    "ly0d4goods1": {
        "_id": {"note": "损赔物品", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "name": {"note": "物品名称", "type": "string"},
        "price": {"note": "单价", "type": "integer", "required": "true"}
    },

    "ly0d4roomplace": {
        "_id": {"note": "客房分区", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "text": {"note": "释义", "type": "string"}
    },

    "ly0d4room": {
        "_id": {"note": "客房信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},

        "roomno": {"note": "房号", "type": "string", "required": "true"},

        "id_roomplace": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4roomplace", "ref_fldName": "_id"},
        "roomplace_text": {"note": "客房分区", "type": "string"},

        "id_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4goods", "ref_fldName": "_id"},
        "goods_name": {"note": "房型", "type": "string"},

        "status_code": {"note": "客房状态", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string", "required": "true"},

        "id_business": {"note": "当前订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id"},
        "id_b_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4b_goods", "ref_fldName": "_id"},
        "checkin": {"note": "入住时间", "type": "date"},
        "checkout": {"note": "离开时间", "type": "date"},

        "doorlock": {"note": "门锁密码（加密后存储）", "type": "string"},
    },

    "ly0d4booktype": {
        "_id": {"note": "预订类型", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "text": {"note": "释义", "type": "string"}
    },

    "ly0d4business": {
        "_id": {"note": "订单信息", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
    
        "cellphone": {"note": "订单手机号", "type": "string"},
        "status_code": {"note": "订单状态", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string", "required": "true"},
        "checkin": {"note": "入住时间", "type": "date", "required": "true"},
        "checkout": {"note": "离开时间", "type": "date", "required": "true"},
        "peoples": {"note": "入住人数", "type": "string"},
        "rooms": {"note": "所需客房数", "type": "string"},

        "id_booktype": {"note": "预订类型", "type": "mongodb.id", "ref_tblName": "ly0d4booktype", "ref_fldName": "_id"},
        "booktype_text": {"note": "", "type": "string"},
        "booktime": {"note": "预订时间", "type": "date"},
        "booknote": {"note": "预订说明", "type": "string"},
        "client_cellphone": {"note": "客户手机号", "type": "string"},
        "client_name": {"note": "客户名称", "type": "string"},

        "amount": {"note": "计费合计", "type": "integer"},
        "amount_b_goods": {"note": "房租", "type": "integer"},
        "amount_b_goods0": {"note": "配售", "type": "integer"},
        "amount_b_goods1": {"note": "损赔", "type": "integer"},
        "amount_bill": {"note": "挂账", "type": "integer"},

        "deal": {"note": "核收", "type": "integer"},
        "dealnote": {"note": "核收备注", "type": "string"}
    },

    "ly0d4salebook": {
        "_id": {"note": "销售预订", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "id_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4goods", "ref_fldName": "_id", "required": "true"},
        "goods_name": {"note": "房型名称", "type": "string", "required": "true"},
        "count": {"note": "数量", "type": "integer", "required": "true"}
    },

    "ly0d4b_goods": {
        "_id": {"note": "订单 - 入住房号", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "id_roomplace": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4roomplace", "ref_fldName": "_id"},
        "roomplace_text": {"note": "客房分区", "type": "string"},
        "id_room": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4room", "ref_fldName": "_id", "required": "true"},
        "roomno": {"note": "房号", "type": "string", "required": "true"},

        "id_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4goods"},
        "goods_name": {"note": "房型", "type": "string"},
        "method_code": {"note": "计价方法", "type": "string", "required": "true"},
        "method_text": {"note": "", "type": "string", "required": "true"},
        "price_name": {"note": "计价名称", "type": "string"},
        "price": {"note": "单价", "type": "integer", "required": "true"},
        "id_price": {"note": "更多标价", "type": "mongodb.id", "ref_tblName": "ly0d4price", "ref_fldName": "_id"},

        "checkin": {"note": "入住时间", "type": "date", "required": "true"},
        "checkout": {"note": "离开时间", "type": "date", "required": "true"},
        "status_code": {"note": "用房状态（引用订单状态）", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string", "required": "true"},
        "room_status_code": {"note": "客房状态缓存", "type": "string"},
        "room_status_text": {"note": "", "type": "string"}
    },

    "ly0d4b_goods0": {
        "_id": {"note": "订单 - 配售商品", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "id_goods": {"note": "配售商品", "type": "mongodb.id", "ref_tblName": "ly0d4goods0", "ref_fldName": "_id"},
        "name": {"note": "商品名称", "type": "string", "required": "true"},
        "price": {"note": "单价", "type": "integer", "required": "true"},
        "count": {"note": "数量", "type": "float", "required": "true"},
        "note": {"note": "备注", "type": "string"}
    },

    "ly0d4b_goods1": {
        "_id": {"note": "订单 - 损赔物品", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "id_goods": {"note": "损赔物品", "type": "mongodb.id", "ref_tblName": "ly0d4goods0", "ref_fldName": "_id"},
        "name": {"note": "物品名称", "type": "string", "required": "true"},
        "price": {"note": "单价", "type": "integer", "required": "true"},
        "count": {"note": "数量", "type": "float", "required": "true"},
        "note": {"note": "备注", "type": "string"}
    },

    "ly0d4bill": {
        "_id": {"note": "挂账记录", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "amount": {"note": "金额", "type": "integer", "required": "true"},
        "note": {"note": "备注", "type": "string"},
        "time": {"note": "记录时间", "type": "date", "required": "true"},
        "recorder_cellphone": {"note": "记录员手机号", "type": "string", "required": "true"},
        "recorder_name": {"note": "记录员姓名", "type": "string", "required": "true"}
    },

    "ly0d4memo": {
        "_id": {"note": "订单备忘", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "memo": {"note": "备忘", "type": "string", "required": "true"},
        "time": {"note": "记录时间", "type": "date", "required": "true"},
        "recorder_cellphone": {"note": "记录员手机号", "type": "string", "required": "true"},
        "recorder_name": {"note": "记录员姓名", "type": "string", "required": "true"}
    },

    "ly0d4guest": {
        "_id": {"note": "旅客信息", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "id_business": {"note": "订单号", "type": "mongodb.id", "ref_tblName": "ly0d4business", "ref_fldName": "_id", "required": "true"},

        "name": {"note": "姓名", "type": "string", "required": "true"},
        "sex_code": {"note": "性别", "type": "string", "required": "true"},
        "sex_text": {"note": "", "type": "string", "required": "true"},
        "docno": {"note": "证件号码", "type": "string"},
        "cellphone": {"note": "手机号", "type": "string"},

        "id_b_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4b_goods", "ref_fldName": "_id"},
        "id_room": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4room", "ref_fldName": "_id"},
        "roomno": {"note": "房号", "type": "string"},
        "checkin": {"note": "入住时间", "type": "date"},
        "checkout": {"note": "离开时间", "type": "date"}
    },

    "ly0d4attendant": {
        "_id": {"note": "楼层服务员", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_hotel": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d4hotel", "ref_fldName": "_id", "required": "true"},
        "hotel_name": {"note": "旅店名称", "type": "string", "required": "true"},
        "cellphone": {"note": "手机号", "type": "string", "required": "true"},
        "name": {"note": "姓名", "type": "string", "required": "true"}
    },
}