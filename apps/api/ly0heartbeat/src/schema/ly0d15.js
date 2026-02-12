export default {
    "ly0d15class": {
        "_id": {"note": "课程", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "", "type": "string", "required": "true"}
    },
    "ly0d15lession": {
        "_id": {"note": "课件", "type": "mongodb.id", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_class": {"note": "课程_id", "type": "mongodb.id", "ref_tblName": "ly0d15class", "ref_fldName": "_id", "required": "true"},
        "class_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "名称", "type": "string", "required": "true"},
        "video": {"note": "视频", "type": "string"},
        "poster": {"note": "封面", "type": "string"},
        "duration": {"note": "视频时长（秒）", "type": "integer"}
    },
    "ly0d15student": {
        "_id": {"note": "学员", "type": "mongodb.id", "required": "true"},
        "id_login": {"note": "账号id", "type": "mongodb.id", "ref_tblName": "ly0d0login", "ref_fldName": "_id"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "", "type": "string", "required": "true"}
    },
    "ly0d15learning": {
        "_id": {"note": "学习日志", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_student": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d15student", "ref_fldName": "_id", "required": "true"},
        "student_name": {"note": "", "type": "string", "required": "true"},
        "id_class": {"note": "课程_id", "type": "mongodb.id", "ref_tblName": "ly0d15class", "ref_fldName": "_id", "required": "true"},
        "class_name": {"note": "", "type": "string", "required": "true"},
        "id_lession": {"note": "课件_id", "type": "mongodb.id", "ref_tblName": "ly0d15lession", "ref_fldName": "_id", "required": "true"},
        "lession_name": {"note": "", "type": "string", "required": "true"},
        "start": {"note": "开始学习时间", "type": "date", "required": "true"},
        "learning": {"note": "学习进度（秒）", "type": "integer"},
        "duration": {"note": "视频时长（秒）", "type": "integer"},
        "end": {"note": "课时完成", "type": "boolean"}
    }
}