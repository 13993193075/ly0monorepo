<template>
    <div>
        <!-- 商品图示 -->
        <el-card class="card">
            <div class="title">-- 图片展示 --</div>
            <el-image
                    v-for="(item, index) in scopeThis.dataBox.goods.illustration"
                    class="image"
                    :src="scopeThis.srcPrefix + item"
                    :preview-src-list="scopeThis.handles.goods.illustration(scopeThis)"
            ></el-image>
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
        text-align: left;
        .title {
            text-align: center;
            margin-bottom: 20px;
            font-size: small;
            color: #009E94;
            font-weight: bolder;
        }
        .image {
            width: 100px; height: 100px; margin: 10px;
        }
    }
</style>