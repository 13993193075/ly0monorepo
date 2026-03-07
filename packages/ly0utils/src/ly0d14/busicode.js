// 家庭人均月收入
const d0f0income = [
    {"code": "0", "text": "小于等于2000元"},
    {"code": "1", "text": "2001-5000元"},
    {"code": "2", "text": "5001-10000元"},
    {"code": "3", "text": "大于10000元"}
]
// 医保
const d0f0insurance = [
    {"code": "0", "text": "城镇职工基本医疗保险"},
    {"code": "1", "text": "城镇居民基本医疗保险"},
    {"code": "2", "text": "新型农村合作医疗保险"},
    {"code": "3", "text": "无"}
]
// 职业
const d0f0occupation = [
    {"code": "0", "text": "公务员/事业单位"},
    {"code": "1", "text": "公司职员"},
    {"code": "2", "text": "服务业人员"},
    {"code": "3", "text": "教师"},
    {"code": "4", "text": "医务人员"},
    {"code": "5", "text": "工人"},
    {"code": "6", "text": "农民"},
    {"code": "7", "text": "个体商户"},
    {"code": "8", "text": "自由职业"},
    {"code": "9", "text": "无业"},
    {"code": "10", "text": "其他"}
]
// 月经周期
const d0f2menstruation_cycle = [
    {"code": "0", "text": "小于等于20天"},
    {"code": "1", "text": "21-25天"},
    {"code": "2", "text": "26-31天"},
    {"code": "3", "text": "32-39天"},
    {"code": "4", "text": "40-49天"},
    {"code": "5", "text": "不规律"}
]
// 疾病名称
const d1disease = [
    {"code": "0", "text": "糖尿病"},
    {"code": "1", "text": "高血压"},
    {"code": "2", "text": "贫血"},
    {"code": "3", "text": "消化道溃疡"},
    {"code": "4", "text": "子宫肌瘤"},
    {"code": "5", "text": "卵巢囊肿"},
    {"code": "6", "text": "其他"}
]
// 食物
const d2food = [
    {"type": "node", "node0": "", "node": "", "code": "c0", "text": "1. 主食"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c0", "text": "米饭"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c1", "text": "稀饭或泡饭"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c2", "text": "面条"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c3", "text": "馄饨或饺子"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c4", "text": "馒头"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c5", "text": "肉包"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c6", "text": "菜包"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c7", "text": "油饼类"},
    {"type": "leaf", "node0": "", "node": "c0", "code": "c0c8", "text": "面包或蛋糕"},

    {"type": "node", "node0": "", "node": "", "code": "c1", "text": "2. 菜类"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c0", "text": "蛋类"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c1", "text": "大荤类如鸡鸭鱼"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c2", "text": "小荤类如豌豆肉"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c3", "text": "蛋类如番茄炒蛋"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c4", "text": "水产类如鱼、虾"},
    {"type": "leaf", "node0": "", "node": "c1", "code": "c1c5", "text": "素菜类如青菜"},

    {"type": "node", "node0": "", "node": "", "code": "c2", "text": "3. 水果类"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c0", "text": "浆果如番茄、葡萄"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c1", "text": "瓜果类如西瓜、哈密瓜"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c2", "text": "橘果类如柑橘、橙子"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c3", "text": "仁果类如苹果、梨"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c4", "text": "核果类如桃、李"},
    {"type": "leaf", "node0": "", "node": "c2", "code": "c2c5", "text": "热带类如菠萝、香蕉"},

    {"type": "node", "node0": "", "node": "", "code": "c3", "text": "4. 坚果、果干类"},
    {"type": "leaf", "node0": "", "node": "c3", "code": "c3c0", "text": "坚果类"},
    {"type": "leaf", "node0": "", "node": "c3", "code": "c3c1", "text": "果干类"},
    {"type": "leaf", "node0": "", "node": "c3", "code": "c3c2", "text": "混合坚果果干"},

    {"type": "node", "node0": "", "node": "", "code": "c4", "text": "5. 酒水饮料类"},
    {"type": "node", "node0": "", "node": "c4", "code": "c4c0", "text": "5.1. 饮料类"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c0", "text": "碳酸饮料类"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c1", "text": "茶饮料"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c2", "text": "果汁/果味饮料"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c3", "text": "功能性饮料"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c4", "text": "蛋白饮料如椰汁，花生牛奶"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c5", "text": "纯净水"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c6", "text": "苏打/气泡水"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c7", "text": "矿泉水"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c8", "text": "鲜奶类"},
    {"type": "leaf", "node0": "c4c0", "node": "c4", "code": "c4c0c9", "text": "咖啡"},

    {"type": "node", "node0": "", "node": "c4", "code": "c4c1", "text": "5.2. 茶水类"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c0", "text": "红茶"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c1", "text": "绿茶"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c2", "text": "黄茶"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c3", "text": "乌龙茶"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c4", "text": "黑茶"},
    {"type": "leaf", "node0": "c4c1", "node": "c4", "code": "c4c1c5", "text": "白茶"},

    {"type": "node", "node0": "", "node": "c4", "code": "c4c2", "text": "5.3. 酒水类"},
    {"type": "leaf", "node0": "c4c2", "node": "c4", "code": "c4c2c0", "text": "啤酒类"},
    {"type": "leaf", "node0": "c4c2", "node": "c4", "code": "c4c2c1", "text": "预调酒如RIO"},
    {"type": "leaf", "node0": "c4c2", "node": "c4", "code": "c4c2c2", "text": "白酒/黄酒"},
    {"type": "leaf", "node0": "c4c2", "node": "c4", "code": "c4c2c3", "text": "葡萄酒"}
]
// 食用次数
const d2times = [
    {"code": "0", "text": "不食用"},
    {"code": "1", "text": "小于1次/月"},
    {"code": "2", "text": "1-3次/月"},
    {"code": "3", "text": "1-2次/周"},
    {"code": "4", "text": "3-4次/周"},
    {"code": "5", "text": "5-6次/周"},
    {"code": "6", "text": "1次/天"},
    {"code": "7", "text": "2次/天"},
    {"code": "8", "text": "大于等于3次/天"}
]
// 食用量
const d2weight = [
    {"code": "0", "text": "小于等于50g/次"},
    {"code": "1", "text": "51-100g/次"},
    {"code": "2", "text": "101-200g/次"},
    {"code": "3", "text": "201-300g/次"},
    {"code": "4", "text": "301-400g/次"},
    {"code": "5", "text": "大于400g/次"}
]
// 膳食补充剂
const d3food = [
    {"code": "0", "text": "叶酸"},
    {"code": "1", "text": "钙剂"},
    {"code": "2", "text": "维生素C"},
    {"code": "3", "text": "维生素D"},
    {"code": "4", "text": "维生素E"},
    {"code": "5", "text": "复合维生素"},
    {"code": "6", "text": "铁剂"},
    {"code": "7", "text": "不饱和脂肪酸"},
    {"code": "8", "text": "益生菌"},
    {"code": "9", "text": "蛋白粉"},
    {"code": "10", "text": "其他"}
]
// 膳食补充剂 - 食用次数
const d3times = [
    {"code": "0", "text": "不食用"},
    {"code": "1", "text": "小于1次/月"},
    {"code": "2", "text": "1-3次/月"},
    {"code": "3", "text": "1-2次/周"},
    {"code": "4", "text": "3-4次/周"},
    {"code": "5", "text": "5-6次/周"},
    {"code": "6", "text": "1次/天"},
    {"code": "7", "text": "2次/天"},
    {"code": "8", "text": "大于等于3次/天"}
]
// 膳食补充剂 - 食用量
const d3weight = [
    {"code": "0", "text": "小于1粒(袋,勺)/次"},
    {"code": "1", "text": "1粒(袋,勺)/次"},
    {"code": "2", "text": "2粒(袋,勺)/次"},
    {"code": "3", "text": "3粒(袋,勺)/次"},
    {"code": "4", "text": "大于3粒(袋,勺)/次"}
]
// 膳食补充剂 - 净含量 - 计量单位
const d3nwunit = [
    {"code": "0", "text": "mg/粒"},
    {"code": "1", "text": "g/袋"},
    {"code": "2", "text": "g/勺"}
]
// 睡眠障碍类别
const d5f4f0 = [
    {"code": "0", "text": "入睡困难(30分钟内不能入睡)"},
    {"code": "1", "text": "夜间易醒或早醒"},
    {"code": "2", "text": "夜间去厕所"},
    {"code": "3", "text": "呼吸不畅"},
    {"code": "4", "text": "咳嗽或鼾声高"},
    {"code": "5", "text": "感觉冷"},
    {"code": "6", "text": "感觉热"},
    {"code": "7", "text": "做恶梦"},
    {"code": "8", "text": "疼痛不适"},
    {"code": "9", "text": "使用药物助眠"},
    {"code": "10", "text": "感到困倦"},
    {"code": "11", "text": "精力不足"},
    {"code": "12", "text": "其他"}
]
// 睡眠障碍发生频次
const d5f4f2 = [
    {"code": "0", "text": "小于1次/周"},
    {"code": "1", "text": "1-2次/周"},
    {"code": "2", "text": "大于等于3次/周"}
]
// 睡眠质量
const d5f5 = [
    {"code": "0", "text": "很好"},
    {"code": "1", "text": "较好"},
    {"code": "2", "text": "较差"},
    {"code": "3", "text": "很差"}
]
// 心理状态
const d6psychology = [
    {"code": "0", "text": "我感到精神沮丧、郁闷"},
    {"code": "1", "text": "我感到早晨心情最好"},
    {"code": "2", "text": "我要哭或想哭"},
    {"code": "3", "text": "我夜间睡眠不好"},
    {"code": "4", "text": "我吃饭像平时一样多"},
    {"code": "5", "text": "我的性功能正常"},
    {"code": "6", "text": "我感到体重减轻"},
    {"code": "7", "text": "我为便秘烦恼"},
    {"code": "8", "text": "我的心跳比平时快"},
    {"code": "9", "text": "我无故感到疲劳"},
    {"code": "10", "text": "我的头脑像往常一样清楚"},
    {"code": "11", "text": "我做事情像平时一样不感到困难"},
    {"code": "12", "text": "我坐卧不安，难以保持平静"},
    {"code": "13", "text": "我对未来感到希望"},
    {"code": "14", "text": "我比平时更容易激怒"},
    {"code": "15", "text": "我觉得决定什么事很容易"},
    {"code": "16", "text": "我感到自己是有用的和不可缺少的人"},
    {"code": "17", "text": "我的生活很有意义"},
    {"code": "18", "text": "假若我死了别人会过得更好"},
    {"code": "19", "text": "我依旧喜爱自己平时喜爱的东西"}
]
// 心理状态发生频次
const d6times = [
    {"code": "0", "text": "没有或很少时间(过去一周内,出现这类情况的日子不超过一天)"},
    {"code": "1", "text": "小部分时间(过去一周内,有1-2天有过这类情况)"},
    {"code": "2", "text": "相当多时间(过去一周内,有3-4天有过这类情况)"},
    {"code": "3", "text": "绝大部分或全部时间(过去一周内,有5-7天有过这类情况)"}
]
// 您有多少关系密切可以得到支持和帮助的朋友
const d7f0 = [
    {"code": "0", "text": "一个也没有"},
    {"code": "1", "text": "1-2个"},
    {"code": "2", "text": "3-5个"},
    {"code": "3", "text": "6个或6个以上"}
]
// 近一年来您的居住状态
const d7f1 = [
    {"code": "0", "text": "远离家人,且独居一室"},
    {"code": "1", "text": "住处经常变动,多数时间和陌生人住在一起"},
    {"code": "2", "text": "和同学、同事或朋友住在一起"},
    {"code": "3", "text": "和家人住在一起"}
]
// 您与邻居
const d7f2 = [
    {"code": "0", "text": "相互之间从不关心,只是点头之交"},
    {"code": "1", "text": "遇到困难可能稍微关心"},
    {"code": "2", "text": "有些邻居很关心您"},
    {"code": "3", "text": "大多数邻居都很关心您"}
]
// 您与同事
const d7f3 = [
    {"code": "0", "text": "相互之间从不关心,只是点头之交"},
    {"code": "1", "text": "遇到困难可能稍微关心"},
    {"code": "2", "text": "有些同事很关心您"},
    {"code": "3", "text": "大多数同事都很关心您"}
]
// 家庭成员类型
const d7f4f0 = [
    {"code": "0", "text": "夫妻(恋人)"},
    {"code": "1", "text": "父母"},
    {"code": "2", "text": "兄弟姐妹"},
    {"code": "3", "text": "儿女"},
    {"code": "4", "text": "其他成员(如嫂子)"}
]
// 从家庭成员得到的支持和照顾
const d7f4f1 = [
    {"code": "0", "text": "无"},
    {"code": "1", "text": "极少"},
    {"code": "2", "text": "一般"},
    {"code": "3", "text": "全力支持"}
]
// 过去,在您遇到急难情况时,曾经得到的经济支持和解决实际问题的帮助来源有
const d7f5 = [
    {"code": "0", "text": "配偶"},
    {"code": "1", "text": "其他家人"},
    {"code": "2", "text": "亲戚"},
    {"code": "3", "text": "朋友"},
    {"code": "4", "text": "同事"},
    {"code": "5", "text": "工作单位"},
    {"code": "6", "text": "党团工会等官方或半官方组织"},
    {"code": "7", "text": "宗教、社会团体等非官方组织"},
    {"code": "8", "text": "其它"},
    {"code": "9", "text": "无任何来源"}
]
// 过去,在您遇到急难情况时,曾经得到的安慰和关心来源有
const d7f6 = [
    {"code": "0", "text": "配偶"},
    {"code": "1", "text": "其他家人"},
    {"code": "2", "text": "亲戚"},
    {"code": "3", "text": "朋友"},
    {"code": "4", "text": "同事"},
    {"code": "5", "text": "工作单位"},
    {"code": "6", "text": "党团工会等官方或半官方组织"},
    {"code": "7", "text": "宗教、社会团体等非官方组织"},
    {"code": "8", "text": "其它"},
    {"code": "9", "text": "无任何来源"}
]
// 您遇到烦恼时的倾诉方式
const d7f7 = [
    {"code": "0", "text": "从不向任何人倾诉"},
    {"code": "1", "text": "只向关系极为密切的1-2个人倾诉"},
    {"code": "2", "text": "如果朋友主动询问您会说出来"},
    {"code": "3", "text": "主动倾诉自己的烦恼，以获得支持和理解"}
]
// 您遇到烦恼时的求助方式
const d7f8 = [
    {"code": "0", "text": "只靠自己，不接受别人帮助"},
    {"code": "1", "text": "很少请求别人帮助"},
    {"code": "2", "text": "有时请求别人帮助"},
    {"code": "3", "text": "有困难时经常向家人、亲友、组织求援"}
]
// 对于团体(如党团组织、宗教组织、工会等)组织活动,您参加的情况
const d7f9 = [
    {"code": "0", "text": "从不参加"},
    {"code": "1", "text": "偶尔参加"},
    {"code": "2", "text": "经常参加"},
    {"code": "3", "text": "主动参加并积极活动"}
]
// 药物类别
const d8medication = [
    {"code": "0", "text": "助眠"},
    {"code": "1", "text": "止吐"},
    {"code": "2", "text": "止痛"},
    {"code": "3", "text": "激素"},
    {"code": "4", "text": "营养"},
    {"code": "5", "text": "外用"},
    {"code": "6", "text": "避孕"},
    {"code": "7", "text": "其他"}
]
// 使用频次
const d8times = [
    {"code": "0", "text": "偶尔"},
    {"code": "1", "text": "每日"},
    {"code": "2", "text": "无"}
]
// 暴露环境
const d9environment = [
    {"code": "smoke", "text": "吸烟"},
    {"code": "0", "text": "被动吸烟"},
    {"code": "1", "text": "装修环境"},
    {"code": "2", "text": "重金属(铅、镉、汞、铬、铜、镍、锌)"},
    {"code": "3", "text": "农药"},
    {"code": "4", "text": "化学污染物(如化工厂环境)"},
    {"code": "5", "text": "射线(如CT)"}
]
// 暴露频次
const d9times = [
    {"code": "0", "text": "偶尔"},
    {"code": "1", "text": "每日"},
    {"code": "2", "text": "无"}
]
// 吸烟频次
const d9smoke = [
    {"code": "0", "text": "大于等于1根/天"},
    {"code": "1", "text": "大于等于1根/2-3天"},
    {"code": "2", "text": "大于等于1根/周"},
    {"code": "3", "text": "大于等于1根/月"}
]
// 唐氏筛查项目
const d10f3item = [
    {"code": "0", "text": "中期唐筛15-20周(+6)"}
]
// 唐氏筛查结果
const d10f3result = [
    {"code": "0", "text": "高风险"},
    {"code": "1", "text": "低风险"}
]
// 是否做过胎儿染色体相关检查
const d10f5item = [
    {"code": "0", "text": "无创DNA"},
    {"code": "1", "text": "羊水穿刺"}
]

export default {
    d0f0income,
    d0f0insurance,
    d0f0occupation,
    d0f2menstruation_cycle,
    d1disease,
    d2food,
    d2times,
    d2weight,
    d3food,
    d3times,
    d3weight,
    d3nwunit,
    d5f4f0,
    d5f4f2,
    d5f5,
    d6psychology,
    d6times,
    d7f0,
    d7f1,
    d7f2,
    d7f3,
    d7f4f0,
    d7f4f1,
    d7f5,
    d7f6,
    d7f7,
    d7f8,
    d7f9,
    d8medication,
    d8times,
    d9environment,
    d9times,
    d9smoke,
    d10f3item,
    d10f3result,
    d10f5item
}