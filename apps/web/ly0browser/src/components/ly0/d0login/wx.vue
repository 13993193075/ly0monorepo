<template><div>
    <div>
        <div id="elIdLoginWxCode" class="wxcode-box"></div>
    </div>

    <el-divider content-position="center" class="divider-line">
        <a href=" https://beian.miit.gov.cn" target="_blank">陇ICP备16001668号-2</a>&nbsp;|&nbsp;其它方式登录：
    </el-divider>

    <div class="more-row">
        <span
                title="密码登录"
                style="font-size:30px; color:#fc7e05; cursor: pointer;"
                @click="scopeThis.handles.pgPassword(scopeThis)"
        >
                <el-icon :size="30" :color="'#fc7e05'">
                        <Grid />
                </el-icon>
        </span>

        <span
                title="短信登录"
                style="font-size:30px; color:#fc7e05; margin-left:20px; cursor: pointer;"
                @click="scopeThis.handles.pgSms(scopeThis)"
        >
                <el-icon :size="30" :color="'#fc7e05'">
                        <Iphone />
                </el-icon>
        </span>

        <span
                title="Email登录"
                style="font-size:30px; color:#fc7e05; margin-left:20px; cursor: pointer;"
                @click="scopeThis.handles.pgEmail(scopeThis)"
        >
            <el-icon :size="30" :color="'#fc7e05'">
                    <Message />
            </el-icon>
        </span>
    </div>
</div></template>

<style lang="scss" scoped>
    @use "./wx.scss";
</style>

<script>
    export default {
        props: ["scopeThis"]
    }
</script>
