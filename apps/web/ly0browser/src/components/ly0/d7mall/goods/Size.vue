<template>
    <div>
        <el-card class="card">
            <div class="title">-- 商品规格 --</div>
            <table class="table">
                <template v-for="(itemSize, indexSize) in scopeThis.dataBox.goods.size">
                    <tr class="tr" v-if="indexSize < Math.ceil(scopeThis.dataBox.goods.size.length / 2)">
                        <td class="td-name">{{scopeThis.dataBox.goods.size[indexSize].name}}</td>
                        <td class="td-size">{{scopeThis.dataBox.goods.size[indexSize].size}}</td>
                        <template v-if="indexSize + Math.ceil(scopeThis.dataBox.goods.size.length / 2) <= scopeThis.dataBox.goods.size.length - 1">
                            <td class="td-name">{{scopeThis.dataBox.goods.size[Math.min(scopeThis.dataBox.goods.size.length - 1, indexSize + Math.ceil(scopeThis.dataBox.goods.size.length / 2))].name}}</td>
                            <td class="td-size">{{scopeThis.dataBox.goods.size[Math.min(scopeThis.dataBox.goods.size.length - 1, indexSize + Math.ceil(scopeThis.dataBox.goods.size.length / 2))].size}}</td>
                        </template>
                    </tr>
                </template>
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
                .td-name {
                    text-align: right;
                    background-color: #cccccc;
                    padding-left: 10px;
                    padding-right: 10px;
                    height: 32px;
                    line-height: 32px;
                    width: 20%;
                }
                .td-size {
                    padding-left: 10px;
                    padding-right: 10px;
                    width: 30%;
                }
            }
        }
    }
</style>