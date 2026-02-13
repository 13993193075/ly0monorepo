// 导航（路由跳转）
function navigate(scopeThis, para){
    // scopeThis 当前组件实例
    // para.route_type 路由跳转类型
    // para.route 路由地址

    if(para.route_type === '0'){
        window.location.href = para.route
    }else if(para.route_type === '1'){
        scopeThis.$router.push({path: para.route})
    }else if(para.route_type === '2'){
        scopeThis.$router.push(para.route)
    }
}

export default {
    navigate
}