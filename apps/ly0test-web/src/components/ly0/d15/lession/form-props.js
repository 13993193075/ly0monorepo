function items(branch) {
  let result = [
    {
      inputType: 'select',
      label: '课程',
      fieldName: 'id_class',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrClass
      },
    },
    {
      inputType: 'input',
      label: '课件名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '课件时长',
      fieldName: 'duration',
      inputWidth: '100px',
    },
    {
      inputType: 'collapse',
      items: [],
    },
  ]
  if (branch === 'insertOne') {
    result[result.length - 1].items.push({
      title: '上传视频文件',
      items: [
        {
          inputType: 'upload',
          label: '上传视频文件',
          fieldName: 'video',
        },
        {
          inputType: 'upload-avatar',
          label: '上传封面图片',
          fieldName: 'poster',
          avatar: {
            width: '400px',
            height: '300px',
          },
        },
      ],
    })
  } else if ((branch = 'updateOne')) {
    result[result.length - 1].items.push(
      {
        title: '原视频文件',
        items: [
          {
            inputType: 'video',
            label: '视频',
            fieldName: 'video',
            poster: 'poster',
            videoDelete: 'videoDelete',
            videoWidth: '400px',
            videoHeight: '300px',
          },
          {
            inputType: 'image',
            label: '封面',
            fieldName: 'poster',
            imageDelete: 'posterDelete',
            imageWidth: '400px',
            imageHeight: '300px',
          },
        ],
      },
      {
        title: '上传视频文件',
        items: [
          {
            inputType: 'upload',
            label: '上传视频文件',
            fieldName: 'videoNew',
          },
          {
            inputType: 'upload-avatar',
            label: '上传封面图片',
            fieldName: 'posterNew',
            avatar: {
              width: '400px',
              height: '300px',
            },
          },
        ],
      },
    )
  }
  return result
}

function getFormProps(scopeThis) {
  return {
    find: {
      popup: {
        visible: false,
        title: '查询',
      },
      cols: [
        {
          inputType: 'select',
          label: '课程',
          fieldName: 'id_class',
          item_fieldLabel: 'name',
          item_fieldValue: '_id',
          hdlGetItems(scopeThis) {
            return scopeThis.pageData.data.arrClass
          },
        },
        {
          inputType: 'input',
          label: '课件名称',
          fieldName: 'name',
        },
      ],
    },
    insertOne: {
      popup: {
        visible: false,
        title: '新增',
      },
      cols: [{ items: items('insertOne') }],
    },
    doc: {
      popup: {
        visible: false,
        title: '详细',
      },
      cols: [
        {
          items: [
            {
              inputType: 'text',
              label: '课程',
              fieldName: 'class_name',
            },
            {
              inputType: 'text',
              label: '课件名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '课件时长（秒）',
              fieldName: 'duration',
              inputWidth: '100px',
            },
            {
              inputType: 'video',
              label: '视频',
              fieldName: 'video',
              poster: 'poster',
              videoWidth: '400px',
              videoHeight: '300px',
            },
            {
              inputType: 'image',
              label: '封面',
              fieldName: 'poster',
              imageWidth: '400px',
              imageHeight: '300px',
            },
          ],
        },
      ],
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [{ items: items('updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
