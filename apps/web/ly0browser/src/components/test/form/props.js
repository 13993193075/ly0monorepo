import { ElMessage, ElMessageBox } from 'element-plus'
import menu from "../menu/props.js";
export default {
    popup: {
        switch: false,
        visible: true,
        title: "form - 测试",
        width: "2048px",
        top: "10vh"
    },
    menu,
    cols: [ // 表单区域可以分为多个列
        {
            items: [ // 每一列可以包含多个输入项目
                {
                    inputType: "text",
                    label: "姓名",
                    fieldName: "name",
                    labelStyle: "color: red;",
                    hdlLabelClick({ scopeThis }){
                        ElMessage("我点击了字段[姓名]的标签")
                    },
                    inputWidth: "100px"
                },
                {
                    inputType: "text0",
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    inputType: "expression",
                    label: "我是谁",
                    hdlExpression({ formData }){
                        return "我是 " + formData.name
                    }
                },
                {
                    inputType: "expression0",
                    label: "我是谁",
                    hdlExpression({ formData }){
                        return "我是 " + formData.name
                    }
                },
                {
                    inputType: "line"
                },
                {
                    inputType: "input",
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    inputType: "line"
                },
                {
                    inputType: "image",
                    label: "照片",
                    fieldName: "photo",
                    imageWidth: "120px",
                    imageHeight: "160px"
                },
                {
                    inputType: "richtext",
                    label: "备忘",
                    fieldName: "memo",
                },
                {
                    inputType: "richtextShow",
                    label: "备忘",
                    fieldName: "memo"
                },
                {
                    inputType: "download",
                    label: "下载照片",
                    fieldName: "photo",
                    downloadLabel: "点击这里下载",
                    downloadFileName: "new-file"
                },
                {
                    inputType: "select",
                    label: "性别",
                    fieldName: "sex",
                    item_fieldLabel: "text",
                    item_fieldValue: "code",
                    items: [
                        {text: "未登记的性别", code: "0"},
                        {text: "男", code: "1"},
                        {text: "女", code: "2"},
                        {text: "其他", code: "9"}
                    ],
                    hdlChange({scopeThis, value}){
                        ElMessage("性别代码：" + value)
                    }
                },
                {
                    inputType: "date-picker",
                    label: "出生日期",
                    fieldName: "birth",
                    hdlChange({scopeThis, value}){
                        ElMessage("修改出生日期：" + value)
                    },
                    type: "date"
                },
                {
                    inputType: "switch",
                    label: "婚姻状况",
                    fieldName: "marital_status",
                    activeText: "已婚",
                    inactiveText: "未婚",
                    activeValue: "1",
                    inactiveValue: "0",
                    hdlChange({scopeThis, formData}){
                        ElMessage("婚姻状况代码：" + formData["marital_status"])
                    }
                },
                {
                    inputType: "radio-group",
                    label: "婚姻状况",
                    fieldName: "marital_status0",
                    disabled: false,
                    hdlChange({scopeThis, formData}){
                        ElMessage("婚姻状况代码：" + formData["marital_status0"])
                    },
                    item_fieldLabel: "text",
                    item_fieldValue: "code",
                    items: [
                        {
                            text: "未婚",
                            code: "0"
                        },
                        {
                            text: "已婚",
                            code: "1"
                        },
                        {
                            text: "离异",
                            code: "2"
                        },
                        {
                            text: "丧偶",
                            code: "3"
                        },
                        {
                            text: "其他/未说明",
                            code: "9"
                        }
                    ]
                },
                {
                    inputType: "button-group",
                    box: [
                        {
                            box: [
                                {
                                    tip: {
                                        content: "性别：男",
                                        placement: "bottom"
                                    },
                                    text: "男",
                                    hdlClick({scopeThis, formData}){
                                        formData.sex = "1"
                                        ElMessage("性别已重置：1")
                                    }
                                },
                                {
                                    tip: {
                                        content: "性别：女",
                                        placement: "bottom"
                                    },
                                    text: "女",
                                    hdlClick({scopeThis, formData}){
                                        formData.sex = "2"
                                        ElMessage("性别已重置：2")
                                    }
                                },
                            ]
                        },
                        {
                            box: [
                                {
                                    tip: {
                                        content: "婚姻状况：未婚",
                                        placement: "bottom"
                                    },
                                    text: "未婚",
                                    hdlClick({scopeThis, formData}){
                                        formData.marital_status0 = "0"
                                        ElMessage("婚姻状况已重置：0")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：已婚",
                                        placement: "bottom"
                                    },
                                    text: "已婚",
                                    hdlClick({scopeThis, formData}){
                                        formData.marital_status0 = "1"
                                        ElMessage("婚姻状况已重置：1")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：离异",
                                        placement: "bottom"
                                    },
                                    text: "离异",
                                    hdlClick({scopeThis, formData}){
                                        formData.marital_status0 = "2"
                                        ElMessage("婚姻状况已重置：2")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：丧偶",
                                        placement: "bottom"
                                    },
                                    text: "丧偶",
                                    hdlClick({scopeThis, formData}){
                                        formData.marital_status0 = "3"
                                        ElMessage("婚姻状况已重置：3")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：其他/未说明",
                                        placement: "bottom"
                                    },
                                    text: "其他/未说明",
                                    hdlClick({scopeThis, formData}){
                                        formData.marital_status0 = "9"
                                        ElMessage("婚姻状况已重置：9")
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    inputType: "input",
                    label: "QQ号",
                    fieldName: "qq"
                },
                {
                    inputType: "input",
                    label: "QQ密码",
                    fieldName: "qq_password",
                    showPassword: true
                },
            ]
        },
        {
            items: [
                {
                    inputType: "ly0gbt2260",
                    label: "籍贯",
                    fieldName: "native"
                },
                {
                    inputType: "collapse", // 输入项目类型：折叠面板
                    activeNames: ["my"], // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
                    accordion: true, // 是否手风琴模式
                    hdlVisible(scopeThis){ // 是否显示
                        return true
                    },
                    items: [
                        {
                            title: "我的",
                            name: "my",
                            hdlVisible(){ // 是否显示
                                return true
                            },
                            items: [
                                {
                                    inputType: 'ly0d7thumb',
                                    label: '商品名称',
                                    thumb: {fieldName: "goods_thumb"},
                                    name: {fieldName: "goods_name"},
                                    number: {fieldName: "goods_number"},
                                },
                                {
                                    inputType: "ly0d7group",
                                    label: "商品分类",
                                    fieldName: "goods_group"
                                },
                                {
                                    inputType: "ly0d7size",
                                    label: "商品规格",
                                    fieldName: "goods_size"
                                },
                                {
                                    inputType: "ly0d7price",
                                    label: "单价",
                                    fieldName: "goods_price"
                                },
                                {
                                    inputType: "ly0d7postal",
                                    label: '邮寄地址',
                                    fieldName: 'postal'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            items: [
                {
                    inputType: "upload",
                    label: "上传文件",
                    fieldName: "files",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-drag",
                    label: "拖拽上传",
                    fieldName: "files",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-picture",
                    label: "图片列表",
                    fieldName: "pictures",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-picture-card",
                    label: "图片墙",
                    fieldName: "pictures",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-avatar",
                    label: "头像",
                    fieldName: "avatar",
                    avatar: {
                        width: '240px',
                        height: '180px'
                    }
                },
                {
                    inputType: "upload-carplate",
                    label: "车牌识别",
                    fieldName: "carplate",
                }
            ]
        }
    ]
}
