<template>
    <div style="font-size: large">
        <span>账号id - </span>
        <span style="color: #770000">{{ scopeThis.id_login }}</span>
        <el-button
            size="small"
            type="danger"
            plain
            round
            :disabled="!scopeThis.destroy || scopeThis.readonly"
            style="margin-left: 20px;"
            @click="scopeThis.handles.destroy(scopeThis, {
                id_login: scopeThis.id_login,
                type: 'destroy'
            })"
        >注销</el-button
      >
    </div>
    <div style="margin-bottom: 20px">
        <span style="font-size: x-small; color: #6a6a6a">{{
            '[短信限额剩余次数：' + (scopeThis.loginData.objLogin && scopeThis.loginData.objLogin.count
                ? scopeThis.loginData.objLogin.count
                : 0) + ']'
        }}</span>
    </div>
    <table style="width: 100%">
        <tbody>
            <tr v-for="(item, index) in scopeThis.loginData.arrNumber" :key="index">
                <td>
                    <div v-if="index === 0" style="text-align: right; padding-right: 20px;">
                        <span>工号</span>
                    </div>
                </td>
                <td>
                    <div style="color: blue;">
                    <span>{{ item.number }}</span>
                </div>
                </td>
                <td>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.setPassword(scopeThis, item.number, 'number')"
                        :disabled="scopeThis.readonly"
                    >设置登录密码</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.destroy(scopeThis, { number: item.number, type: 'number' })"
                        :disabled="index === 0 || !scopeThis.destroy || scopeThis.readonly"
                    >注销</el-button>
                </td>
            </tr>
            <tr v-for="(item, index) in scopeThis.loginData.arrCellphone" :key="index">
                <td>
                    <div v-if="index === 0" style="text-align: right; padding-right: 20px;">
                        <span>手机号</span>
                    </div>
                </td>
                <td>
                    <div style="color: blue;">
                        <span>{{ item.cellphone }}</span>
                    </div>
                </td>
                <td>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.setPassword(scopeThis, item.cellphone, 'cellphone')"
                        :disabled="scopeThis.readonly"
                    >设置登录密码</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.destroy(scopeThis, {
                            cellphone: item.cellphone,
                            type: 'cellphone',
                        })"
                        :disabled="scopeThis.readonly"
                    >注销</el-button>
                </td>
            </tr>
            <tr v-for="(item, index) in scopeThis.loginData.arrEmail" :key="index">
                <td>
                    <div v-if="index === 0" style="text-align: right; padding-right: 20px;">
                        <span>Email</span>
                    </div>
                </td>
                <td>
                    <div style="color: blue;">
                        <span>{{ item.email }}</span>
                    </div>
                </td>
                <td>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.setPassword(scopeThis, item.email, 'email')"
                        :disabled="scopeThis.readonly"
                    >设置登录密码</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="scopeThis.handles.destroy(scopeThis, { email: item.email, type: 'email' })"
                        :disabled="scopeThis.readonly"
                    >注销</el-button>
                </td>
            </tr>
            <tr v-for="(item, index) in scopeThis.loginData.arrWx" :key="index">
                <td>
                    <div v-if="index === 0" style="text-align: right; padding-right: 20px;">
                        <span>微信</span>
                    </div>
                </td>
                <td>
                    <div style="margin-top: 10px">
                        <div style="text-align: center">
                            <el-image
                                style="width: 120px; height: 120px"
                                :src="item.headimgurl[0]"
                                :preview-src-list="item.headimgurl"
                            ></el-image>
                        </div>
                        <div style="text-align: center">{{ item.nickname }}</div>
                    </div>
                </td>
                <td>
                    <div>
                        <el-button
                            type="text"
                            size="small"
                            @click="
                                scopeThis.handles.destroy(scopeThis, {
                                    wx_appid: item.appid,
                                    wx_openid: item.openid,
                                    wx_nickname: item.nickname,
                                    type: 'wx'
                                })"
                            :disabled="scopeThis.readonly"
                        >注销</el-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>

<script setup>
const props = defineProps({
    scopeThis: {
        type: Object,
        default: () => ({})
    }
})
</script>
