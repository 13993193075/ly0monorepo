<template>
    <div>
        <div class="title">{{branch.name}}@登录</div>
        <compLogin :myProps="login"></compLogin>
    </div>
</template>

<script>
    import compLogin from "../../d0login/index.vue"
    import branch from "./branch.js"
    export default {
        components: {
            compLogin
        },
        data() {
            return {
                branch: branch.bh,
                login: {
                    id_dataunit: branch.bh.id_dataunit,
                    usertbl: "ly0d15student",
                    route_type: "1",
                    route: "/wangke/bh/gallery/" + branch.bh.id_dataunit
                }
            }
        },
        mounted() {
            let route_branch = this.$route.params.branch
            if(! route_branch in branch){
                route_branch = "bh" // 默认博汇网课
            }
            this.branch = branch[route_branch]
            this.login.id_dataunit = this.branch.id_dataunit
            this.login.route = "/wangke/" + route_branch + "/gallery/" + this.branch.id_dataunit
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
