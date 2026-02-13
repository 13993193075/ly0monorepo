// with-table标准句柄
import handles from '../../../common/table/with-table/handles.js'
// 数据请求
import dataRequest from '../../../../utils/data-request.js'

function getTableProps(scopeThis) {
  return {
    titleLine: {
      text: '场所名称及参数设置',
    },
    topButtonGroups: {
      box: [
        {
          box: [
            {
              text: '全部',
              hdlClick: handles.reloadAll,
            },
            {
              text: '刷新',
              hdlClick: handles.reload,
            },
            {
              text: '查询',
              hdlClick: handles.findPopup,
            },
          ],
        },
      ],
    },
    table: {
      cols: [
        {
          label: '场所名称',
          show: 'text',
          fieldName: 'name',
        },
        {
          label: '预约最多天数',
          show: 'text',
          fieldName: 'maxdays',
        },
        {
          label: '临时关闭',
          show: 'switch',
          fieldName: 'closed',
          activeValue: true,
          inactiveValue: false,
          activeText: '是',
          inactiveText: '否',
          activeColor: '#ff640a',
          hdlChange(scopeThis, row, inherit) {
            dataRequest
              .storpro({
                scopeThis,
                storproName: 'ly0d12.place.setClosed',
                data: {
                  _id: row._id,
                  closed: inherit.valNew,
                },
              })
              .then((result) => {
                scopeThis.$message(result.message)
              })
          },
        },
        {
          label: '操作',
          show: 'button-group',
          buttonGroup: [
            {
              text: '详细',
              hdlClick: handles.docPopup,
            },
            {
              text: '修改',
              hdlClick: handles.updateOnePopup,
            },
          ],
        },
      ],
    },
  }
}

export default {
  getTableProps,
}
