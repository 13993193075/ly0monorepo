<template>
    <div style="padding: 10px;">
        <el-divider class="title-line" content-position="left">
            <span class="text">注册信息</span>
        </el-divider>
        <el-button-group class="top-button-group">
            <el-tooltip placement="bottom-start" effect="dark" content="清除所有记录，重置旅店信息">
                <el-button class="button" @click="scopeThis.handles.get({scopeThis})">初始化</el-button>
            </el-tooltip>
            <el-button class="button" @click="scopeThis.handles.findAll({scopeThis})">刷新</el-button>
        </el-button-group>

        <table class="root-table">
            <tbody>
            <tr class="item" v-for="(item, index) in scopeThis.data" :key="index">
                <td class="left">
                    <table class="table">
                        <tbody>
                        <tr>
                            <td class="label">旅店名称</td>
                            <td class="value">{{ item.hotel_name }}</td>
                        </tr>
                        <tr>
                            <td class="label">接口请求地址</td>
                            <td class="value">{{ item.url }}</td>
                        </tr>
                        <tr>
                            <td class="label">账号</td>
                            <td class="value">{{ item.accountname }}</td>
                        </tr>
                        <tr>
                            <td class="label">账号密码</td>
                            <td class="value">{{ item.password }}</td>
                        </tr>
                        <tr>
                            <td class="label">令牌</td>
                            <td class="value">{{ item.tokenid }}</td>
                        </tr>
                        <tr>
                            <td class="label">令牌有效期</td>
                            <td class="value">{{ item.expire }}</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td class="right">
                    <el-button-group>
                        <el-button size="small" class="button" @click="scopeThis.handles.updateOnePopup({scopeThis, item})">修改</el-button>
                        <el-button size="small" class="button" @click="scopeThis.handles.req({scopeThis, _id: item._id})">获取最新令牌</el-button>
                    </el-button-group>
                </td>
            </tr>
            </tbody>
        </table>

        <ly0el-form
            v-model="scopeThis.updateOne.formData"
            :myProps="scopeThis.updateOne.formProps"
            :scopeThis="scopeThis"
        ></ly0el-form>
    </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
// 修改表单
import updateOne from './update-one.js'
// js句柄
import handles from './handles.js'
import { reactive, onMounted } from 'vue'

const scopeThis = reactive({
    data: [],
    updateOne,
    handles,
})

onMounted(async () => {
    await handles.findAll({scopeThis})
})
</script>
