<template>
    <table class="input-box"><tbody>
        <tr class="field-row">
            <td class="label-col">
                <label class="label">Email</label>
            </td>
            <td class="input-col">
                <el-input class="input" v-model="scopeThis.emailData.email" placeholder="请输入"></el-input>
            </td>
        </tr>

        <tr class="field-row">
            <td class="label-col">
                <label class="label">验证码</label>
            </td>
            <td class="input-col">
                <el-input class="input" v-model="scopeThis.emailData.vercode" placeholder="请输入" show-password></el-input>
                <el-button round @click="scopeThis.handlers.email.getVercode({scopeThis})"
                    style="margin-left:10px; height:25px; background-color:#ff640a; color:white;"
                >获取验证码</el-button>
            </td>
        </tr>
    </tbody></table>

    <div class="submit-row">
        <el-button @click="scopeThis.handlers.email.submit({scopeThis})" style="background-color:#009f95; color:white; margin-right:10px;">登录</el-button>
        <el-button @click="scopeThis.handlers.email.reset({scopeThis})" style="margin-left:10px;">重置</el-button>
    </div>

    <el-divider content-position="center" class="divider-line">
        <a href="https://beian.miit.gov.cn" target="_blank">陇ICP备16001668号-2</a>
        <span>&nbsp;|&nbsp;其它方式登录：</span>
    </el-divider>

    <div class="more-row">
        <span
            title="密码登录"
            style="font-size:30px; color:#fc7e05; cursor: pointer;"
            @click="scopeThis.showPg='Password'"
        >
            <el-icon :size="30" :color="'#fc7e05'">
                <Grid />
            </el-icon>
        </span>

        <span
            title="短信登录"
            style="font-size:30px; color:#fc7e05; margin-left:20px; cursor: pointer;"
            @click="scopeThis.showPg='Sms'"
        >
            <el-icon :size="30" :color="'#fc7e05'">
                <Iphone />
            </el-icon>
        </span>

        <span
            title="微信登录"
            style="font-size:30px; color:green; margin-left:20px; cursor: pointer;"
            @click="scopeThis.showPg='Wx'"
        >
            <el-icon :size="30" :color="'green'">
                <ChatDotRound />
            </el-icon>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    @use "email";
</style>

<script setup>
const props = defineProps(["scopeThis"])
</script>
