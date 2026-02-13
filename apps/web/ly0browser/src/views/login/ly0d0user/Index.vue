<template>
    <div>
        <div class="title">ly0 - 企业应用集成平台@登录</div>
        <compLogin></compLogin>
    </div>
</template>

<script>
    import compLogin from "../../../components/ly0/d0login/index.vue"
    export default {
        components: {
            compLogin
        }
    }
</script>

<style scoped lang="scss">
    .title {
        height: 40px;
        line-height: 40px;
        background-color: #008488;
        color: white;
        text-align: center;
        font-size: medium;
        font-weight: normal;
    }
</style>