export default {
    "ly0d13d0class": {
        "_id": {"note": "教材分类", "type": "mongodb.id", "required": "true"},
        "name": {"note": "名称", "type": "string", "required": "true"},
        "number": {"note": "序号", "type": "string"}
    },
    "ly0d13d0url": {
        "_id": {"note": "教材资源清单", "type": "mongodb.id", "required": "true"},
        "id_class": {"note": "教材分类", "type": "mongodb.id", "ref_tblName": "ly0d13class", "ref_fldName": "_id", "required": "true"},
        "class_name": {"note": "", "type": "string", "required": "true"},
        "name": {"note": "教材名称", "type": "string", "required": "true"},
        "number": {"note": "序号", "type": "string"},
        "url": {"note": "资源定位", "type": "array"}
    },
    "ly0d13d1help": {
        "_id": {"note": "用户支持", "type": "mongodb.id", "required": "true"},
        "note": {"note": "备注", "type": "string"},
        "appendix": {"note": "附件", "type": "array"}
    }
}