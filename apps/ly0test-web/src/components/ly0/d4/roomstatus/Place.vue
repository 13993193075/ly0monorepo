<template>
    <el-collapse
        v-model="states.collapseOpen"
        v-if="arrPlace.length > 0"
        style="padding-left: 10px; padding-right: 10px"
    >
        <el-collapse-item
            v-for="(place, indexPlace) in arrPlace"
            :title="place.text"
            :name="indexPlace"
            :key="indexPlace"
        >
            <div><!-- 确保el-collapse-item内只有一个根节点 -->
                <compRoom
                    :scopeThis="scopeThis"
                    :arrRoom="arrRoom.filter(i => {return i.id_roomplace === place._id})"
                ></compRoom>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>

<style lang="scss" scoped></style>

<script setup>
import compRoom from './Room.vue'
import { reactive, onMounted } from 'vue'

const props = defineProps(['scopeThis', 'arrRoom', 'arrPlace'])

const states = reactive({
    collapseOpen: [],
})

onMounted(() => {
    states.collapseOpen = []
    if (props.scopeThis.collapseSwitch) {
        // 全部展开
        for (let i = 0; i < props.arrPlace.length; i++) {
            states.collapseOpen.push(i)
        }
    }
})
</script>
