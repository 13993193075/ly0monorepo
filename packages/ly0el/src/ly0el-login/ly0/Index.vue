<template>
    <div>
        <div>
            <el-icon><Avatar /></el-icon>
            <label class="title">{{ scopeThis.handlers.ly0.title({scopeThis}) }}</label>
        </div>
        
        <el-divider content-position="center" class="divider-line"> 选择应用入口 </el-divider>
        
        <table class="input-box">
            <tbody>
            <tr class="field-row" v-if="scopeThis.loginData.ly0.arrDataunit.length > 0">
                <td class="label-col">
                    <label class="label">数据单元</label>
                </td>
                <td class="input-col">
                    <el-select
                        class="input"
                        v-model="scopeThis.loginData.ly0.id_dataunit"
                        @change="scopeThis.handlers.ly0.id_dataunitChange({scopeThis})"
                        filterable
                    >
                        <el-option value="''" :label="'未选择'" :key="''"></el-option>
                        <template v-if="scopeThis.loginData.ly0.arrDataunit.length > 0">
                            <el-option
                                v-for="(item, index) in scopeThis.loginData.ly0.arrDataunit"
                                :value="item._id"
                                :label="item.name"
                                :key="item._id + '-' + index"
                            ></el-option>
                        </template>
                    </el-select>
                </td>
            </tr>
            
            <tr class="field-row" v-if="scopeThis.loginData.ly0.arrGroup.length > 0">
                <td class="label-col">
                    <label class="label">用户组</label>
                </td>
                <td class="input-col">
                    <el-select
                        class="input"
                        v-model="scopeThis.loginData.ly0.id_group"
                        @change="scopeThis.handlers.ly0.setArrUser0({scopeThis})"
                        filterable
                    >
                        <el-option value="''" :label="'未选择'" :key="''"></el-option>
                        <el-option
                            v-for="(item, index) in scopeThis.loginData.ly0.arrGroup0"
                            :value="item._id"
                            :label="item.name"
                            :key="item._id + '-' + index"
                        ></el-option>
                    </el-select>
                </td>
            </tr>
            </tbody>
        </table>
        
        <div class="submit-row">
            <el-button
                @click="scopeThis.handlers.ly0.submit({scopeThis})"
                style="background-color: #009f95; color: white; margin-right: 10px"
            >确认</el-button>
            <el-button @click="scopeThis.handlers.ly0.cancel({scopeThis})" style="margin-left: 10px"
            >取消</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import {onMounted} from "vue";
const props = defineProps(['scopeThis'])

onMounted(()=>{
    // 获取用户及相关信息
    props.scopeThis.handlers.ly0.withId_login({scopeThis: props.scopeThis})
})
</script>
