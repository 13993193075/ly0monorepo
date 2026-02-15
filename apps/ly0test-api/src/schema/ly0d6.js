export default {
    "ly0d6d0": {
        "_id": {"note": "下载中心", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},

        "title": {"note": "标题", "type": "string", "required": "true"},
        "url": {"note": "资源定位", "type": "string"},
        "type_code": {"note": "资源类型", "type": "string", "required": "true"},
        "type_text": {"note": "", "type": "string", "required": "true"},
        "status_code": {"note": "资源状态", "type": "string"},
        "status_text": {"note": "", "type": "string"},

        "id_upload": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0user", "ref_fldName": "_id"},
        "upload_cellphone": {"note": "上传人手机号", "type": "string"},
        "upload_name": {"note": "上传人姓名", "type": "string"},
        "upload_explain": {"note": "上传人意见", "type": "string"},
        "upload_time": {"note": "上传时间", "type": "date"},

        "id_approval": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0user", "ref_fldName": "_id"},
        "approval_cellphone": {"note": "审核人手机号", "type": "string"},
        "approval_name": {"note": "审核人姓名", "type": "string"},
        "approval_explain": {"note": "审核人意见", "type": "string"},
        "approval_time": {"note": "审核时间", "type": "date"}
    },

    "ly0d6d1": {
        "_id": {"note": "内部通知", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},

        "title": {"note": "标题", "type": "string", "required": "true"},
        "content": {"note": "内容(富文本)", "type": "string"},
        "appendix": {"note": "附件", "type": "string"},
        "status_code": {"note": "状态", "type": "string", "required": "true"},
        "status_text": {"note": "", "type": "string", "required": "true"},

        "id_draft": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0user", "ref_fldName": "_id"},
        "draft_cellphone": {"note": "拟稿人手机号", "type": "string"},
        "draft_name": {"note": "拟稿人姓名", "type": "string"},
        "draft_explain": {"note": "拟稿人意见", "type": "string"},
        "draft_time": {"note": "提交时间", "type": "date"},

        "id_approval": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0user", "ref_fldName": "_id"},
        "approval_cellphone": {"note": "审核人手机号", "type": "string"},
        "approval_name": {"note": "审核人姓名", "type": "string"},
        "approval_explain": {"note": "审核人意见", "type": "string"},
        "approval_time": {"note": "审核时间", "type": "date"}
    }
}