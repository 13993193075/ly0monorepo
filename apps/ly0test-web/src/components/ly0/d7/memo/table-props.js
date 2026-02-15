// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'

function getTableProps (scopeThis) {
    // 置顶按钮组
    let topButtonGroups = [
        {
            text: '全部',
            hdlClick: handles.reloadAll
        },
        {
            text: '刷新',
            hdlClick: handles.reload
        },
        {
            text: '查询',
            hdlClick: handles.findPopup
        }
    ]
    // 订单状态：交易中，允许新增
    if(scopeThis.scopeThis.business.objBusiness.status_code === "1"){
        topButtonGroups = topButtonGroups.concat([
            {
                text: '新增',
                hdlClick: handles.insertOnePopup
            }
        ])
    }

    // 行内按钮组
    let rowButtonGroup = [
        {
            text: '详细',
            hdlClick: handles.docPopup,
        }
    ]
    // 订单状态：交易中，允许修改或删除
    if(scopeThis.scopeThis.business.objBusiness.status_code === "1"){
        rowButtonGroup = rowButtonGroup.concat([
            {
                text: '修改',
                hdlClick: handles.updateOnePopup,
            },
            {
                text: '删除',
                hdlClick: handles.deleteOneSubmit,
                style: 'background-color:#ff640a; color:#ffffff;'
            }
        ])
    }

    return {
        topButtonGroups: {
            buttonSize: "small",
            box: [
                {
                    box: topButtonGroups
                }
            ]
        },
        table: {
            cols: [
                {
                    label: '备忘',
                    show: 'text',
                    fieldName: 'memo'
                },
                {
                    label: '操作',
                    show: 'button-group',
                    buttonGroup: rowButtonGroup
                }
            ]
        }
    }
}

export default {
    getTableProps
}
