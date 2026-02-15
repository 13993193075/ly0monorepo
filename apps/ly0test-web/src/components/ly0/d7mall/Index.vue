<template>
  <div>
    <compRowLogin v-if="!!ly0session && !!ly0session.mall"></compRowLogin>
    <compGoodses v-if="!!ly0session && !!ly0session.mall"></compGoodses>
  </div>
</template>

<style scoped></style>

<script>
import compRowLogin from './row-login/Index.vue'
import compGoodses from './goodses/Index.vue'
import dataRequest from '../../../utils/data-request.js'
import branch from './login/branch.js'

export default {
  components: {
    compRowLogin,
    compGoodses,
  },
  data() {
    return {
      ly0session: null,
    }
  },
  mounted() {
    let route_branch = this.$route.params.branch
    if ((!route_branch) in branch) {
      route_branch = 'bh' // 默认博汇商城
    }

    // 重置session
    let ly0session = dataRequest.ly0sessionLoad()
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
    dataRequest.ly0sessionSave(
      Object.assign(ly0session, {
        mall: {
          branch: route_branch,
          id_dataunit: branch[route_branch].id_dataunit,
          name: branch[route_branch].name,
        },
      }),
    )
    this.ly0session = dataRequest.ly0sessionLoad()
  },
}
</script>
