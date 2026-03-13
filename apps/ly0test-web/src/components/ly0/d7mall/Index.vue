<template>
    <compRowLogin v-if="scopeThis.ly0session && scopeThis.ly0session.mall" :scopeThis="scopeThis"></compRowLogin>
    <compGoodses v-if="scopeThis.ly0session && scopeThis.ly0session.mall" :scopeThis="scopeThis"></compGoodses>
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
    ly0request,
    ElMessage,
    ElMessageBox,
    jump
})

onMounted(() => {
    let ly0session = ly0request.ly0.ly0sessionLoad()
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        ly0session.session.usertbl !== 'ly0d7guest'
    ) {
        ly0session = {
            session: {
                usertbl: 'ly0d7guest',
            },
        }
    }
    const branch0 = JSON.parse(JSON.stringify(branch))
    const route_branch = scopeThis.routerInstance.params.branch
    if (route_branch in branch0.branch) {
        branch0.switch = route_branch
    }
    ly0request.ly0.ly0sessionSave(
        Object.assign(ly0session, {
            mall: {
                branch: branch0,
            },
        }),
    )
    scopeThis.ly0session = ly0request.ly0.ly0sessionLoad()
})
</script>
