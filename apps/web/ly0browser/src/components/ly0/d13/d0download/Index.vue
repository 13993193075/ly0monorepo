<template>
    <el-divider class="title-line" content-position="left">
        <span class="title-line-text">教材下载中心</span>
    </el-divider>

    <el-collapse class="container" v-model="scopeThis.elCollapseOpen">
        <el-collapse-item
            class="itemClass"
            v-for="(itemClass, indexClass) in scopeThis.pgData.arrClass"
            :title="itemClass.name"
            :name="indexClass"
            :key="indexClass"
        >
            <el-row
                class="itemUrl"
                v-for="(itemUrl, indexUrl) in scopeThis.pgData.arrUrl.filter((i0) => {
                    return i0.id_class === itemClass._id
                })"
                :key="indexUrl"
            >
                <a v-if="itemUrl.url" :href="itemUrl.url" :download="itemUrl.index">{{
                    itemUrl.name
                }}</a>
                <span v-else>{{ itemUrl.name }}</span>
            </el-row>
      </el-collapse-item>
    </el-collapse>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import {request as ly0request} from '@yoooloo42/joker'
import { reactive, onMounted } from 'vue'

const scopeThis = reactive({
    elCollapseOpen: [],
    pgData: {
        arrClass: [],
        arrUrl: [],
    },
})

onMounted(() => {
    ly0request.ly0.storpro({
        noSession: true,
        storproName: 'ly0d13.d0url.findAll',
        data: null,
    }).then(result => {
        scopeThis.pgData.arrClass = result.data.arrClass
        scopeThis.pgData.arrUrl = result.data.arrUrl
    })
})
</script>
