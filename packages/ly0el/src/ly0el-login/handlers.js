import { useRouter } from 'vue-router'
const routerInstance = useRouter() // 路由实例

async function submit({scopeThis}){

    // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
    emit("update:modelValue", scopeThis.modelValue)

}

// 登录提交
export default {
    submit
}