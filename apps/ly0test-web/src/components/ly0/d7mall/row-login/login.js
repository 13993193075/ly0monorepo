import branch from '../branch.js'
export default {
    popup: {
        switch: true,
        visible: false
    },
    sessionOnly: true, // 仅刷新session，不做应用跳转
    app: 'ly0d7mall',
    ly0d7mall: {
        name: branch.branch[branch.switch].name,
        id_dataunit: branch.branch[branch.switch].id_dataunit,
        usertbl: 'ly0d7guest', // 用户数据表名
    }
}