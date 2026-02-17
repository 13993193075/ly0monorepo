<template>
    <table class="input-box">
        <tbody>
        <tr class="field-row">
            <td class="label-col">
                <el-dropdown @command="hdlLabelChange">
                    <span class="el-dropdown-link">
                        <span>{{ label }}</span>
                        <el-icon><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="number">工号</el-dropdown-item>
                            <el-dropdown-item command="cellphone">手机号</el-dropdown-item>
                            <el-dropdown-item command="email">电子邮箱</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </td>
            <td class="input-col">
                <el-input
                    class="input"
                    v-model="scopeThis.passwordData.number"
                    placeholder="请输入"
                ></el-input>
            </td>
        </tr>
        
        <tr class="field-row">
            <td class="label-col">
                <label class="label">密码</label>
            </td>
            <td class="input-col">
                <el-input
                    class="input"
                    v-model="scopeThis.passwordData.password"
                    placeholder="请输入"
                    show-password
                ></el-input>
            </td>
        </tr>
        </tbody>
    </table>
    
    <div class="submit-row">
        <el-button
            @click="scopeThis.handlers.password.submit({scopeThis})"
            style="background-color: #009f95; color: white; margin-right: 10px"
        >登录</el-button>
        <el-button @click="scopeThis.handlers.password.reset({scopeThis})" style="margin-left: 10px">重置</el-button>
    </div>
    
    <el-divider content-position="center" class="divider-line">
        <a href=" https://beian.miit.gov.cn" target="_blank">陇ICP备16001668号-2</a>
        <span>&nbsp;|&nbsp;如果密码丢失，您可以使用其它方式登录：</span>
    </el-divider>
    
    <div class="more-row">
        <span
            title="短信登录"
            style="font-size: 30px; color: #fc7e05; cursor: pointer"
            @click="scopeThis.showPg='Sms'"
        >
            <el-icon :size="30" :color="'#fc7e05'">
                <Iphone />
            </el-icon>
        </span>
        
        <span
            title="Email登录"
            style="font-size: 30px; color: #fc7e05; margin-left: 20px; cursor: pointer"
            @click="scopeThis.showPg='Email'"
        >
            <el-icon :size="30" :color="'#fc7e05'">
                <Message />
            </el-icon>
        </span>
        
        <span
            title="微信登录"
            style="font-size: 30px; color: green; margin-left: 20px; cursor: pointer"
            @click="scopeThis.showPg='Wx'"
        >
            <el-icon :size="30" :color="'green'">
                <ChatDotRound />
            </el-icon>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@use 'password';
</style>

<script setup>
import {ref} from "vue";

const props = defineProps(['scopeThis'])
const label = ref('工号')

function hdlLabelChange(type){
    props.script.handlers.password.labelChange({
        scopeThis: props.scopeThis,
        type
    })
}

</script>
