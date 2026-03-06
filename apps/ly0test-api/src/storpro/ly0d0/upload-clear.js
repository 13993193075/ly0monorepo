async function clear({dependencies}) {
    await dependencies.ly0nodejs.FileDB.clear.clearFolder(
        dependencies.config.upload.uploadFolder
    )
    return {code: 0, message: "已清空上传文件夹"}
}

export default {
    clear
}
