<template>
    <div>
        <el-collapse
            v-model="states.collapseOpen"
            v-if="arrPlace.length > 0"
            style="padding-left: 10px; padding-right: 10px"
        >
            <el-collapse-item
                v-for="(place, index) in arrPlace"
                :title="place.text"
                :name="index"
                :key="index"
            >
                <compBGoods
                    :scopeThis="scopeThis"
                    :arrBGoods="arrBGoods.filter(i => {
                        return i.id_room.id_roomplace === place._id
                    })"
                ></compBGoods>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import compBGoods from './BGoods.vue'
import { onMounted, reactive } from 'vue'
const props = defineProps(['scopeThis', 'arrBGoods', 'arrPlace'])
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
