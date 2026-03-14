async function go({scopeThis}) {
    // 应用入口：ly0，选择用户组
    if(scopeThis.loginData.app === 'ly0'){
        scopeThis.showPg = "ly0"
        return 'go'
    }

    return 'continue'
}
export default {
    go
}