<template>
  <div class="root">
    <div class="main">
      <div class="gallery-name-box">
        <span class="gallery-name"
          >★&nbsp;{{
            ly0session && ly0session.gallery && ly0session.gallery.name
              ? ly0session.gallery.name
              : '未命名的网课站点'
          }}&nbsp;★</span
        >
      </div>
      <div class="login-box">
        <el-dropdown @command="hdlLoginMenu">
          <!-- 微信登录 -->
          <span
            class="el-dropdown-link"
            v-if="ly0session && ly0session.session && ly0session.session.type === 'wx'"
          >
            <el-image
              :src="ly0session.session.wx_headimgurl"
              style="width: 20px; height: 20px; border-radius: 50%"
            ></el-image>
            <span>&nbsp;{{ ly0session.session.wx_nickname }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 其它方式或匿名登录 -->
          <span class="el-dropdown-link" v-else>
            <i class="el-icon-user-solid"></i>&nbsp;{{ hdlMyInfo().info
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login-info" v-if="!hdlMyInfo().none"
              >我的账号</el-dropdown-item
            >
            <el-dropdown-item command="logout" v-if="!hdlMyInfo().none">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div></div>
    </div>

    <compLoginInfo
      v-if="!!loginInfo.popup.visible"
      :id_login="ly0session.session.id_login"
      :myProps="loginInfo"
    ></compLoginInfo>
  </div>
</template>

<script>
import dataRequest from '../../../../utils/data-request.js'
import compLoginInfo from '../../frame/header/id_login/Index.vue'
import loginInfo from '../../frame/header/login-info.js'
import navigate from '../../../../utils/navigate.js'
import branch from '../login/branch.js'

export default {
  components: {
    compLoginInfo,
  },
  data() {
    return {
      ly0session: {
        gallery: {
          branch: '',
          name: '',
          id_dataunit: null,
        },
      },
      loginInfo,
    }
  },
  methods: {
    hdlLoginMenu(label) {
      switch (label) {
        case 'login-info':
          this.loginInfo.popup.visible = true
          break
        case 'logout':
          this.hdlLogout()
          break
      }
    },
    hdlMyInfo() {
      let myInfo = {
        info: '匿名/未登录',
        none: false,
      }
      if (
        !this.ly0session ||
        !this.ly0session.session ||
        !this.ly0session.session.usertbl ||
        this.ly0session.session.usertbl !== 'ly0d15student' ||
        !this.ly0session.session.type ||
        !this.ly0session.session[this.ly0session.session.type]
      ) {
        myInfo.none = true
      } else {
        myInfo.info = this.ly0session.session[this.ly0session.session.type]
      }
      return myInfo
    },
    hdlLogout() {
      dataRequest
        .storpro({
          noSession: true,
          scopeThis: this,
          storproName: 'ly0d0login.session.logout',
          data: { ly0session: this.ly0session },
        })
        .then(() => {
          // 返回登录页面
          navigate.navigate(this, {
            route_type: '1',
            route: '/wangke/' + this.ly0session.gallery.branch,
          })
        })
    },
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
    let route_params = this.$route.params
    this.ly0session = Object.assign(this.ly0session, {
      gallery: {
        branch: route_params.branch,
        name: branch[route_params.branch].name,
        id_dataunit: branch[route_params.branch].id_dataunit,
      },
    })
    dataRequest.ly0sessionSave(this.ly0session)
  },
}
</script>
,
<style scoped lang="scss">
// 顶部信息栏
.root {
  .main {
    display: flex;
    justify-content: space-between;
    background-color: #cecece;
    color: #6a6a6a;
    font-size: x-small;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    .gallery-name-box {
      .gallery-name {
        padding-left: 10px;
        font-size: 15px;
        font-weight: bolder;
        color: #009f95;
      }
    }
    .login-box {
    }
  }
}
</style>
