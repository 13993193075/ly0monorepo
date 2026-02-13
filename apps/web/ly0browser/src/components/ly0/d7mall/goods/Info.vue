<template>
    <div>
        <el-card class="card">
            <div class="title">-- 基本信息 --</div>
            <table class="table">
                <tr class="tr">
                    <td class="td-label">商品编号</td>
                    <td class="td-value">{{scopeThis.dataBox.goods.number}}</td>
                    <td class="td-label">商品名称</td>
                    <td class="td-value">{{scopeThis.dataBox.goods.name}}</td>
                </tr>
                <tr class="tr">
                    <td class="td-label">品牌</td>
                    <td class="td-value">{{scopeThis.dataBox.goods.brand}}</td>
                    <td class="td-label">是否进口</td>
                    <td class="td-value">{{scopeThis.dataBox.goods.import ? "是" : "否"}}</td>
                </tr>
                <tr class="tr">
                    <template v-if="!scopeThis.dataBox.goods.import">
                        <td class="td-label">产地</td>
                        <td class="td-value">{{scopeThis.dataBox.goods.domestic}}</td>
                    </template>
                    <template v-else>
                        <td class="td-label">产地</td>
                        <td class="td-value">{{scopeThis.dataBox.goods.foreign}}</td>
                    </template>
                </tr>
            </table>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: ["scopeThis"]
    }
</script>

<style scoped lang="scss">
    .card {
        margin: 10px;
        .title {
            margin-bottom: 20px;
            font-size: small;
            color: #009E94;
            font-weight: bolder;
        }
        .table {
            text-align: left; font-size: x-small;
            width: 100%;
            .tr {
                .td-label {
                    text-align: right;
                    background-color: #cccccc;
                    padding-left: 10px;
                    padding-right: 10px;
                    height: 32px;
                    line-height: 32px;
                    width: 20%;
                }
                .td-value {
                    padding-left: 10px;
                    padding-right: 10px;
                    width: 30%;
                }
            }
        }
    }
</style>