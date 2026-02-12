export default {
    "ly0d12place": {
        "_id": {"note": "场所信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "场所名称", "type": "string", "required": "true"},
        "maxdays": {"note": "预约最多天数", "type": "integer"},
        "closed": {"note": "临时关闭", "type": "boolean"}
    },
    
    "ly0d12position": {
        "_id": {"note": "房间位置", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_place": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12place", "ref_fldName": "_id", "required": "true"},
        "place_name": {"note": "场所名称", "type": "string", "required": "true"},
        "text": {"note": "释义", "type": "string"}
    },
    
    "ly0d12room": {
        "_id": {"note": "房间信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_place": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12place", "ref_fldName": "_id", "required": "true"},
        "place_name": {"note": "场所名称", "type": "string", "required": "true"},
        "id_position": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12position", "ref_fldName": "_id"},
        "position_text": {"note": "房间位置", "type": "string"},
        "name": {"note": "房间名称", "type": "string", "required": "true"},
        "rows": {"note": "行数", "type": "integer", "required": "true"},
        "cols": {"note": "列数", "type": "integer", "required": "true"}
    },
    
    "ly0d12seat": {
        "_id": {"note": "座位信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_place": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12place", "ref_fldName": "_id", "required": "true"},
        "place_name": {"note": "场所名称", "type": "string", "required": "true"},
        "id_position": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12position", "ref_fldName": "_id"},
        "position_text": {"note": "房间位置", "type": "string"},
        "id_room": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12room", "ref_fldName": "_id", "required": "true"},
        "room_name": {"note": "房间名称", "type": "string", "required": "true"},
        "row": {"note": "行号", "type": "integer", "required": "true"},
        "col": {"note": "列号", "type": "integer", "required": "true"}
    },
    
    "ly0d12day": {
        "_id": {"note": "开放时段", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_place": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12place", "ref_fldName": "_id", "required": "true"},
        "place_name": {"note": "场所名称", "type": "string", "required": "true"},
        "day": {"note": "0 - 6 星期几", "type": "integer", "required": "true"},
        "openfrom_hh": {"note": "0 - 23 时", "type": "integer", "required": "true"},
        "openfrom_mm": {"note": "0 - 59 分", "type": "integer", "required": "true"},
        "opento_hh": {"note": "0 - 23 时", "type": "integer", "required": "true"},
        "opento_mm": {"note": "0 - 59 分", "type": "integer", "required": "true"}
    },
    
    "ly0d12appointment": {
        "_id": {"note": "座位 - 预约使用", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_place": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12place", "ref_fldName": "_id", "required": "true"},
        "place_name": {"note": "场所名称", "type": "string", "required": "true"},
        "id_position": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0code", "ref_fldName": "_id"},
        "position_text": {"note": "房间位置", "type": "string"},
        "id_room": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12room", "ref_fldName": "_id", "required": "true"},
        "room_name": {"note": "房间名称", "type": "string", "required": "true"},
        "id_seat": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d12seat", "ref_fldName": "_id", "required": "true"},
        "seat_row": {"note": "行号", "type": "integer", "required": "true"},
        "seat_col": {"note": "列号", "type": "integer", "required": "true"},
        "user_cellphone": {"note": "使用人手机号", "type": "string", "required": "true"},
        "user_name": {"note": "姓名", "type": "string"},
        "date": {"note": "使用日期", "type": "date", "required": "true"},
        "id_day": {"note": "使用时段", "type": "mongodb.id", "ref_tblName": "ly0d12day", "ref_fldName": "_id", "required": "true"},
        "day": {"note": "0 - 6 星期几", "type": "integer", "required": "true"},
        "day_openfrom_hh": {"note": "开放时间：时", "type": "integer", "required": "true"},
        "day_openfrom_mm": {"note": "分", "type": "integer", "required": "true"},
        "day_opento_hh": {"note": "关闭时间：时", "type": "integer", "required": "true"},
        "day_opento_mm": {"note": "分", "type": "integer", "required": "true"}
    },

    "ly0d12student": {
        "_id": {"note": "学生信息", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "cellphone": {"note": "手机号", "type": "string", "required": "true"},
        "name": {"note": "姓名", "type": "string", "required": "true"}
    }
}