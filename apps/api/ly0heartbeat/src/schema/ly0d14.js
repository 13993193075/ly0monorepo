export default {
    "ly0d14d0": {
        "_id": {"note": "", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},

        "f0": {"note": "基本信息"},
        "f0name": {"note": "姓名", "type": "string", "required": "true"},
        "f0birthdate": {"note": "出生日期", "type": "date"},
        "f0idnumber": {"note": "身份证号码", "type": "string"},
        "f0nation": {"note": "民族", "type": "string"},
        "f0nation_code": {"note": "", "type": "string"},
        "f0nativeplace": {"note": "籍贯", "type": "string"},
        "f0nativeplace_code": {"note": "", "type": "string"},
        "f0education": {"note": "文化程度", "type": "string"},
        "f0education_code": {"note": "", "type": "string"},
        "f0occupation": {"note": "职业", "type": "string"},
        "f0occupation_code": {"note": "", "type": "string"},
        "f0insurance": {"note": "医保", "type": "string"},
        "f0insurance_code": {"note": "", "type": "string"},
        "f0income": {"note": "家庭人均月收入", "type": "string"},
        "f0income_code": {"note": "", "type": "string"},
        "f0address": {"note": "家庭住址", "type": "string"},
        "f0address_code": {"note": "", "type": "string"},
        "f0cellphone": {"note": "手机号", "type": "string"},

        "f1": {"note": "配偶信息"},
        "f1name": {"note": "姓名", "type": "string"},
        "f1birthdate": {"note": "出生日期", "type": "date"},
        "f1education": {"note": "文化程度", "type": "string"},
        "f1education_code": {"note": "", "type": "string"},
        "f1occupation": {"note": "职业", "type": "string"},
        "f1occupation_code": {"note": "", "type": "string"},
        "f1cellphone": {"note": "手机号", "type": "string"},

        "f2": {"note": "孕产信息"},
        "f2height": {"note": "身高(cm)", "type": "float"},
        "f2weight": {"note": "体重(kg)", "type": "float"},
        "f2pregnancies": {"note": "孕次", "type": "integer"},
        "f2births": {"note": "产次", "type": "integer"},
        "f2menstruation_last": {"note": "末次月经", "type": "date"},
        "f2menstruation_first": {"note": "初潮年龄", "type": "integer"},
        "f2menstruation_cycle": {"note": "月经周期", "type": "string"},
        "f2menstruation_cycle_code": {"note": "", "type": "string"},

        "f2abnormal": {"note": "有无异常孕产史", "type": "boolean"},
        "f2abnormal0": {"note": "异常情况", "type": "string"},
        "f2abnormal1": {"note": "流产几次", "type": "integer"},
        "f2abnormal2": {"note": "死胎死产几次", "type": "integer"}
    },

    "ly0d14d1": {
        "_id": {"note": "既往疾病史", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "disease": {"note": "疾病名称", "type": "string"},
        "disease_code": {"note": "", "type": "string"},
        "note": {"note": "说明", "type": "string"}
    },

    "ly0d14d2": {
        "_id": {"note": "饮食篇", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "food": {"note": "食物名称", "type": "string"},
        "food_code": {"note": "", "type": "string"},
        "times": {"note": "食用次数", "type": "string"},
        "times_code": {"note": "", "type": "string"},
        "weight": {"note": "食用量", "type": "string"},
        "weight_code": {"note": "", "type": "string"}
    },

    "ly0d14d3": {
        "_id": {"note": "饮食篇 - 膳食补充剂", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "food": {"note": "食物名称", "type": "string"},
        "food_code": {"note": "", "type": "string"},
        "times": {"note": "食用次数", "type": "string"},
        "times_code": {"note": "", "type": "string"},
        "weight": {"note": "食用量", "type": "string"},
        "weight_code": {"note": "", "type": "string"},
        "nw": {"note": "净含量(net weight)", "type": "float"},
        "nwunit": {"note": "净含量计量单位", "type": "string"},
        "nwunit_code": {"note": "", "type": "string"},
        "brand": {"note": "品牌", "type": "string"}
    },

    "ly0d14d4": {
        "_id": {"note": "运动篇", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},

        "f0": {"note": "1.1. 在过去7天中，您有几天进行了剧烈运动，例如搬(举)重物、跑步、游泳、踢足球、打篮球、打网球、跳绳、跳健身操等。取值范围：0-7", "type": "integer"},
        "f0uncertain": {"note": "不确定", "type": "boolean"},
        "f0f0": {"note": "1.2. 在这几天中，您每天进行这些重体力活动的时间平均为多少分钟。取值范围：0-60*24", "type": "integer"},
        "f0f0uncertain": {"note": "不确定", "type": "boolean"},

        "f1": {"note": "2.1. 在过去7天中，您有几天进行了中等强度的活动，如搬(举)轻物、骑自行车、打太极拳、十八法、关节操、扇子舞、木兰拳、乒乓球、羽毛球、交谊舞等(不包括步行)。取值范围：0-7", "type": "integer"},
        "f1uncertain": {"note": "不确定", "type": "boolean"},
        "f1f0": {"note": "2.2. 在这几天中，您每天进行这些中等强度体力活动的时间为。取值范围：0-60*24", "type": "integer"},
        "f1f0uncertain": {"note": "不确定", "type": "boolean"},

        "f2": {"note": "3.1. 在过去7天中，您有几天是步行，每次步行至少10分钟，这里的步行包括您工作时和在家中的步行，交通行程的步行以及为了锻炼身体进行的步行。取值范围：0-7", "type": "integer"},
        "f2uncertain": {"note": "不确定", "type": "boolean"},
        "f2f0": {"note": "3.2. 在这几天中，您每天步行的时间为。取值范围：0-60*24", "type": "integer"},
        "f2f0uncertain": {"note": "不确定", "type": "boolean"},

        "f3": {"note": "4. 在过去7天中，您每天处于静坐的时间大约为包括您在工作单位和家中，坐在办公桌前，电脑前，坐着或躺着看电视，拜访朋友，看书，乘车等的时间。取值范围：0-60*24", "type": "integer"},
        "f3uncertain": {"note": "不确定", "type": "boolean"},

        "f4": {"note": "5. 您在最近一周每天运动的步数平均为(可从微信运动、支付宝运动、华为健康、运动手环中获取)", "type": "integer"},
        "f4uncertain": {"note": "不确定", "type": "boolean"}
    },

    "ly0d14d5": {
        "_id": {"note": "睡眠篇", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},

        "f0": {"note": "1. 怀孕前1个月，晚上上床睡觉通常是几点。取值范围：0-23", "type": "integer"},
        "f0uncertain": {"note": "不确定", "type": "boolean"},
        "f1": {"note": "2. 怀孕前1个月，从上床到入睡通常需要几分钟", "type": "integer"},
        "f1uncertain": {"note": "不确定", "type": "boolean"},
        "f2": {"note": "3. 怀孕前1个月，通常早上几点起床。取值范围：0-23", "type": "integer"},
        "f2uncertain": {"note": "不确定", "type": "boolean"},
        "f3": {"note": "4. 怀孕前1个月，每夜通常实际睡眠几小时(不等于卧床时间)。取值范围：0-24", "type": "integer"},
        "f3uncertain": {"note": "不确定", "type": "boolean"},

        "f4": {"note": "5. 怀孕前1个月，因下列情况影响睡眠而烦恼，对下列原因请选择1个最适合您的答案"},
        "f4uncertain": {"note": "不确定", "type": "boolean"},
        "f4f0": {"note": "类别", "type": "string"},
        "f4f0code": {"note": "", "type": "string"},
        "f4f1": {"note": "说明", "type": "string"},
        "f4f2": {"note": "频次", "type": "string"},
        "f4f2code": {"note": "", "type": "string"},

        "f5": {"note": "6. 怀孕前1个月，您认为自己的睡眠质量", "type": "string"},
        "f5code": {"note": "", "type": "string"},
        "f5uncertain": {"note": "不确定", "type": "boolean"}
    },

    "ly0d14d6": {
        "_id": {"note": "心理篇", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "psychology": {"note": "心理状态", "type": "string"},
        "psychology_code": {"note": "", "type": "string"},
        "times": {"note": "发生频次", "type": "string"},
        "times_code": {"note": "", "type": "string"}
    },

    "ly0d14d7": {
        "_id": {"note": "社会支持篇", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},

        "f0": {"note": "1. 您有多少关系密切可以得到支持和帮助的朋友", "type": "string"},
        "f0code": {"note": "", "type": "string"},
        "f1": {"note": "2. 近一年来您的居住状态", "type": "string"},
        "f1code": {"note": "", "type": "string"},
        "f2": {"note": "3. 您与邻居", "type": "string"},
        "f2code": {"note": "", "type": "string"},
        "f3": {"note": "4. 您与同事", "type": "string"},
        "f3code": {"note": "", "type": "string"},

        "f4": {"note": "5. 从家庭成员得到的支持和照顾"},
        "f4f0": {"note": "成员类型", "type": "string"},
        "f4f0code": {"note": "", "type": "string"},
        "f4f1": {"note": "得到的支持和照顾", "type": "string"},
        "f4f1code": {"note": "", "type": "string"},

        "f5": {"note": "6. 过去,在您遇到急难情况时,曾经得到的经济支持和解决实际问题的帮助来源有", "type": "string"},
        "f5code": {"note": "", "type": "string"},
        "f6": {"note": "7. 过去,在您遇到急难情况时,曾经得到的安慰和关心来源有", "type": "string"},
        "f6code": {"note": "", "type": "string"},
        "f7": {"note": "8. 您遇到烦恼时的倾诉方式", "type": "string"},
        "f7code": {"note": "", "type": "string"},
        "f8": {"note": "9. 您遇到烦恼时的求助方式", "type": "string"},
        "f8code": {"note": "", "type": "string"},
        "f9": {"note": "10. 对于团体(如党团组织、宗教组织、工会等)组织活动，您参加的情况", "type": "string"},
        "f9code": {"note": "", "type": "string"}
    },

    "ly0d14d8": {
        "_id": {"note": "药物使用", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "medication": {"note": "药物类别", "type": "string"},
        "medication_code": {"note": "", "type": "string"},
        "times": {"note": "使用频次", "type": "string"},
        "times_code": {"note": "", "type": "string"}
    },

    "ly0d14d9": {
        "_id": {"note": "环境暴露", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "environment": {"note": "环境暴露类别", "type": "string"},
        "environment_code": {"note": "", "type": "string"},
        "times": {"note": "暴露频次", "type": "string"},
        "times_code": {"note": "", "type": "string"},
        "smoke": {"note": "吸烟频次", "type": "string"},
        "smoke_code": {"note": "", "type": "string"}
    },

    "ly0d14d10": {
        "_id": {"note": "相关实验室检查", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},

        "f0": {"note": "1. 备孕是否做过平片或CT等放射性检查", "type": "boolean"},
        "f0note": {"note": "具体说明", "type": "string"},

        "f1": {"note": "2. 孕妇本人及家属备孕期间是否接触放射性核素", "type": "boolean"},
        "f1note": {"note": "具体说明", "type": "string"},

        "f2": {"note": "3. 是否于妊娠11-13周(+6)在我院进行NT检查", "type": "boolean"},
        "f2nt": {"note": "NT值", "type": "string"},
        "f2note": {"note": "有无合并其他异常", "type": "string"},

        "f3": {"note": "4. 是否做过唐氏筛查", "type": "boolean"},
        "f3item": {"note": "筛查项目", "type": "string"},
        "f3item_code": {"note": "", "type": "string"},
        "f3result": {"note": "筛查结果", "type": "string"},
        "f3result_code": {"note": "", "type": "string"},

        "f4": {"note": "5. 是否做过系统超声或四维超声", "type": "boolean"},

        "f5": {"note": "6. 是否做过胎儿染色体相关检查", "type": "boolean"},
        "f5item": {"note": "检查项目", "type": "string"},
        "f5item_code": {"note": "", "type": "string"},
        "f5note": {"note": "有无异常(检查时间)", "type": "string"},

        "f6": {"note": "7. 是否查过孕妇或丈夫的染色体", "type": "boolean"},
        "f6note": {"note": "有无异常(家族病史)", "type": "string"},

        "f7": {"note": "8. 胎儿出生后是否做髋关节检查", "type": "boolean"},
        "f7note": {"note": "有无异常", "type": "string"},

        "f8": {"note": "9. 胎儿出生后是否做超声、核磁检查", "type": "boolean"},
        "f8note": {"note": "有无异常(心脏可疑)", "type": "string"}
    },

    "ly0d14d11": {
        "_id": {"note": "影像资料", "type": "mongodb.id", "required": "true"},
        "time_create": {"note": "创建时间", "type": "date", "required": "true"},
        "time_update": {"note": "更新时间", "type": "date", "required": "true"},
        "id_dataunit": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d0dataunit", "ref_fldName": "_id", "required": "true"},
        "dataunit_name": {"note": "", "type": "string", "required": "true"},
        "id_ly0d14d0": {"note": "", "type": "mongodb.id", "ref_tblName": "ly0d14d0", "ref_fldName": "_id", "required": "true"},
        "name": {"note": "影像资料名称", "type": "string"},
        "image": {"note": "", "type": "array"}
    }
}