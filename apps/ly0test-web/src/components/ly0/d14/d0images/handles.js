import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
async function init({scopeThis}) {
    const result = await ly0request.ly0.storpro({
        storproName: 'ly0d14.d11.find',
        data: { id_ly0d14d0: scopeThis.root.id_d0 },
    })
    scopeThis.data = result.data
    scopeThis.imagesShow = []
    scopeThis.data.forEach(i => {
        scopeThis.imagesShow.push(i.image[0])
    })
    ElMessage('影像资料已刷新')
}

async function newImage({scopeThis, formData}) {
    await ly0request.ly0.storpro({
        storproName: 'ly0d14.d11.insertOne',
        data: {
            id_ly0d14d0: scopeThis.root.id_d0,
            name: formData.name || '未命名',
            image: formData.image,
        },
    })
    scopeThis.newImage.formProps.popup.visible = false
    ElMessage('新增一条影像资料成功')
    await init({scopeThis})
}

function updateNamePopup({scopeThis, item}){
    scopeThis.updateName.formData = JSON.parse(JSON.stringify(item))
    scopeThis.updateName.formProps.popup.visible = true
}
async function updateName({scopeThis, formData}) {
    await ly0request.ly0.storpro({
        storproName: 'ly0d14.d11.updateOne',
        data: {
            _id: formData._id,
            name: formData.name || '未命名',
        },
    })
    scopeThis.updateName.formProps.popup.visible = false
    ElMessage('已修改影像资料名称')
    await init({scopeThis})
}

async function deleteImage({scopeThis, item}) {
    try {
        await ElMessageBox.confirm('删除?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
        await ly0request.ly0.storpro({
            storproName: 'ly0d14.d11.deleteOne',
            data: { _id: item._id },
        })
        ElMessage('删除一条影像资料成功')
        await init({scopeThis})
    }catch(err) {
        ElMessage({ type: 'info', message: '取消删除' })
    }
}

export default {
    init,
    newImage,
    updateNamePopup,
    updateName,
    deleteImage,
}
