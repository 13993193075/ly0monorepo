<template>
    <compRowLogin v-if="scopeThis.branch" :scopeThis="scopeThis"></compRowLogin>
    <!--compGoodses v-if="scopeThis.branch" :scopeThis="scopeThis"></compGoodses-->
</template>

<style scoped></style>

<script setup>
import compRowLogin from './row-login/Index.vue'
import compGoodses from './goodses/Index.vue'
import {reactive, onMounted} from "vue"
import { useRouter } from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import {request as ly0request} from '@yoooloo42/ly0browser'
import branch from './branch.js'
import jump from './jump.js'

const scopeThis = reactive({
    ly0session: null,
    routerInstance: useRouter(),
    branch: null,
    ly0request,
    ElMessage,
    ElMessageBox,
    jump
})

onMounted(() => {
    const route_branch = scopeThis.routerInstance.params.branch
    if (route_branch in branch) {
        scopeThis.branch = branch[route_branch]
    }else{
        scopeThis.branch = null
    }
})
</script>
