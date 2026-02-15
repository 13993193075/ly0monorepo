<template>
    <el-dialog
        v-model="myProps.popup"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        title="微信绑定"
        width="750px"
        @open="myProps.wxShow.show(myProps)"
    >
        <div style="margin-bottom: 35px">
            <span style="color: #009e94">我的账号：</span>
            <span style="color: #66030b">{{ myProps.data.id_login }}</span>
        </div>
        <div style="width: 100%; text-align: center; margin: auto">
            <div id="elIdWxBindCode" style="height: 300px"></div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  props: ['myProps'],
}
</script>
