export default {
    "ly0d7shop": {
        "_id": {"note": "商店信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "商店名称", "type": "string", "required": "true"},
        "smallticket": {"note": "小票机型号", "type": "string"},
        "wx_appid": {"note": "微信支付 - APPID", "type": "string"},
        "wx_mchid": {"note": "微信商户号", "type": "string"},
        "mall": {"note": "商城代收", "type": "boolean"}
    },
    "ly0d7decode": {
        "_id": {"note": "商品解码", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_shop": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7shop", "ref_fldName": "_id", "required": "true"},
        "shop_name": {"note": "商店名称", "type": "string", "required": "true"},
        "name": {"note": "解码名称", "type": "string"},
        "decode": {"note": "关键字", "type": "string"}
    },
    "ly0d7group": {
        "_id": {"note": "商品分类", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "名称", "type": "string"}
    },
    "ly0d7goods": {
        "_id": {"note": "商品", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_shop": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7shop", "ref_fldName": "_id", "required": "true"},
        "shop_name": {"note": "商店名称", "type": "string", "required": "true"},
        "number": {"note": "商品编号", "type": "string", "required": "true"},
        "name": {"note": "商品名称", "type": "string", "required": "true"},
        "group": {"note": "商品分类", "type": "array"},
            /* 数据结构示例
                [
                    "服装",
                    "女装"
                ]
            */
        "size": {"note": "商品规格", "type": "array"},
            /* 数据结构示例
            [
                {name: "尺码", size: "L 175/92A(50)推荐151~164斤"},
                {name: "颜色", size: "浅灰（净色）"},
                {name: "材质", size: "纯棉"},
                {name: "材质", size: "速干", new: true}
            ]
            */
        "price": {"note": "商品标价", "type": "array"},
            /* 数据结构示例
            [
                {name: "零售价", price: 1000},
                {name: "批发价", price: 900},
                {name: "会员价", price: 800, member: true},
                {name: "折上折", price: 640, hot: true, note: "0.8*0.8"}
            ]
            */
        "brand": {"note": "品牌", "type": "string"},
        "import": {"note": "是否进口", "type": "boolean"},
        "domestic": {"note": "国内产地", "type": "string"},
        "domestic_code": {"note": "", "type": "string"},
        "foreign": {"note": "国外产地", "type": "string"},
        "foreign_code": {"note": "", "type": "string"},
        "thumb": {"note": "缩略图", "type": "string"},
        "illustration": {"note": "商品图示", "type": "array"}
    },
    "ly0d7business": {
        "_id": {"note": "交易记录", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        
        // 1个订单内可能有多个商店的商品
        "id_shop": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7shop", "ref_fldName": "_id"},
        "shop_name": {"note": "商店名称", "type": "string"},

        "status_code": {"note": "订单状态", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string"},
        "client_cellphone": {"note": "客户手机号", "type": "string"},
        "client_name": {"note": "客户名称", "type": "string"},
        "time": {"note": "交易时间", "type": "date", "required": "true"},
        "count": {"note": "商品计数", "type": "integer"},
        "amount": {"note": "计费", "type": "integer"},
        "deal": {"note": "核收", "type": "integer"},
        "dealnote": {"note": "核收备注", "type": "string"},
        "id_guest": {"note": "商城用户id", "type": "mongodb.id", "ref_tblName": "ly0d7guest", "ref_fldName": "_id"},
        "postal_gbt2260code": {"note": "国内行政区划", "type": "string"},
        "postal_gbt2260text": {"note": "", "type": "string"},
        "postal_address": {"note": "详细地址", "type": "string"},
        "postal_tel": {"note": "联系电话", "type": "string"},
        "postal_name": {"note": "联系人", "type": "string"}
    },
    "ly0d7b_goods": {
        "_id": {"note": "交易明细", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_shop": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7shop", "ref_fldName": "_id", "required": "true"},
        "shop_name": {"note": "商店名称", "type": "string", "required": "true"},
        "id_business": {"note": "交易单号", "type": "mongodb.id", "ref_tblName": "ly0d7business", "ref_fldName": "_id", "required": "true"},
        "id_goods": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7goods", "ref_fldName": "_id"},
        "number": {"note": "商品编号", "type": "string", "required": "true"},
        "name": {"note": "商品名称", "type": "string", "required": "true"},
        "price_name": {"note": "标价名称", "type": "string"},
        "price": {"note": "单价", "type": "integer", "required": "true"},
        "count": {"note": "数量", "type": "float", "required": "true"},
        "thumb": {"note": "缩略图", "type": "string"},
        "id_guest": {"note": "商城用户id", "type": "mongodb.id", "ref_tblName": "ly0d7guest", "ref_fldName": "_id"},
        "postal_status_code": {"note": "邮寄状态", "type": "string"},
        "postal_status_text": {"note": "", "type": "string"},
        "postal_time": {"note": "邮寄开始时间", "type": "date"},
        "postal_sorted_time": {"note": "分拣完成时间", "type": "date"},
        "postal_received_time": {"note": "收货时间", "type": "date"},
        "postal_gbt2260code": {"note": "国内行政区划", "type": "string"},
        "postal_gbt2260text": {"note": "", "type": "string"},
        "postal_address": {"note": "详细地址", "type": "string"},
        "postal_tel": {"note": "联系电话", "type": "string"},
        "postal_name": {"note": "联系人", "type": "string"}
    },
    "ly0d7memo": {
        "_id": {"note": "交易备忘", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_shop": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d7shop", "ref_fldName": "_id", "required": "true"},
        "shop_name": {"note": "商店名称", "type": "string", "required": "true"},
        "id_business": {"note": "交易单号", "type": "mongodb.id", "ref_tblName": "ly0d7business", "ref_fldName": "_id", "required": "true"},
        "memo": {"note": "备忘", "type": "string", "required": "true"},
        "time": {"note": "记录时间", "type": "date", "required": "true"},
        "recorder_cellphone": {"note": "记录员手机号", "type": "string", "required": "true"},
        "recorder_name": {"note": "记录员姓名", "type": "string", "required": "true"}
    },
    "ly0d7guest": {
        "_id": {"note": "用户信息", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "账号id", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "用户名称", "type": "string"},
        "gbt2260code": {"note": "国内行政区划", "type": "string"},
        "gbt2260text": {"note": "", "type": "string"},
        "address": {"note": "详细地址", "type": "string"},
        "tel": {"note": "联系电话", "type": "string"},
        "postal": {"note": "邮寄地址", "type": "array"},
            /* 数据结构示例
                [
                    {
                        gbt2260code: "620102", // 国内行政区划
                        gbt2260text: "甘肃省-兰州市-城关区",
                        address: "鸿运润园D区2号楼1单元", // 详细地址
                        tel: "13993193075", // 联系电话
                        name: "林洋" // 联系人
                    }
                ]
             */
    },
}