<template>
  <div class="root">
    <div class="main">
      <div class="mall-name-box" @click="handles.jump.toHome(scopeThis)">
        <span class="mall-name"
          >★&nbsp;{{
            ly0session && ly0session.mall && ly0session.mall.name
              ? ly0session.mall.name
              : '未命名的商城'
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
            <el-dropdown-item command="login">{{
              !hdlMyInfo().none ? '重新登录' : '登录'
            }}</el-dropdown-item>
            <el-dropdown-item command="logout" v-if="!hdlMyInfo().none">退出</el-dropdown-item>
            <el-dropdown-item command="new">注册新用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>&nbsp;|&nbsp;</span>
        <span @click="handles.jump.toCart(scopeThis)">
          <i class="el-icon-shopping-cart-2"></i>
          <span>&nbsp;我的购物车</span>
        </span>
        <span>&nbsp;|&nbsp;</span>
        <span @click="handles.jump.toRecord(scopeThis)">
          <i class="el-icon-document-copy"></i>
          <span>&nbsp;我的订单记录</span>
        </span>
      </div>
      <div></div>
    </div>

    <compLoginInfo
      v-if="!!loginInfo.popup.visible"
      :id_login="ly0session.session.id_login"
      :myProps="loginInfo"
    ></compLoginInfo>
    <compLogin v-if="!!login.popup.visible" :myProps="login"></compLogin>
  </div>
</template>

<script>
import dataRequest from '../../../../utils/data-request.js'
import compLoginInfo from '../../frame/header/id_login/Index.vue'
import loginInfo from '../../frame/header/login-info.js'
import compLogin from '../../d0login/Index.vue'
import handles from '../handles/index.js'

export default {
  components: {
    compLoginInfo,
    compLogin,
  },
  data() {
    return {
      scopeThis: this,
      ly0session: null,
      handles,
      loginInfo,
      login: {
        usertbl: 'ly0d7guest',
        popup: {
          visible: false,
          title: 'ly0 - 企业应用集成平台@第三方登录',
        },
        sessionOnly: true,
        result: false,
      },
    }
  },
  computed: {
    popupLogin() {
      return this.login.popup.visible
    },
  },
  watch: {
    popupLogin(valNew, valOld) {
      if (!valNew && !!this.login.result) {
        // 重置session
        dataRequest.ly0sessionSave(
          Object.assign(dataRequest.ly0sessionLoad(), {
            mall: this.ly0session.mall,
          }),
        )
        this.ly0session = dataRequest.ly0sessionLoad()
        location.reload()
      }
    },
  },
  methods: {
    hdlLoginMenu(label) {
      switch (label) {
        case 'login-info':
          this.loginInfo.popup.visible = true
          break
        case 'login':
          this.login.popup.visible = true
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
        this.ly0session.session.usertbl !== 'ly0d7guest' ||
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
          dataRequest.ly0sessionClear()
          this.ly0session = {
            session: {
              usertbl: 'ly0d7guest',
            },
            mall: this.ly0session.mall ? this.ly0session.mall : null,
          }
          dataRequest.ly0sessionSave(this.ly0session)
          location.reload()
        })
    },
  },
  mounted() {
    this.ly0session = dataRequest.ly0sessionLoad()
  },
}
</script>

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
    .mall-name-box {
      .mall-name {
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
