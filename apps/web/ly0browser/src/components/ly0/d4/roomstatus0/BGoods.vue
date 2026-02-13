<template>
    <div>
        <div v-if="arrBGoods.length > 0">
            <div class="roomno-box" v-for="(bGoods, index) in arrBGoods" :key="index">
                <div
                    v-if="bGoods.id_business.status_code === '0'"
                    :class="hdlGetRoomnoClass(bGoods)"
                    @click="hdlRoomnoClick(bGoods)"
                >
                    <span>{{ bGoods.roomno }}</span>
                    <br />
                    <span>{{ states.dateFormat(bGoods.checkin) }}</span>
                    <br />
                    <span>{{ bGoods.checkout ? states.dateFormat(bGoods.checkout) : '-' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script setup>
import {blindboxes} from '@yoooloo42/blindboxes'
import { reactive } from 'vue'

const props = defineProps(['scopeThis', 'arrBGoods'])

const states = reactive({
    dateFormat: blindboxes.dateFormat.dateFormat
})

function hdlGetRoomnoClass(bGoods) {
    let roomnoClass = 'roomno'
    if (
        props.scopeThis.focus &&
        props.scopeThis.focus.id_business &&
        (bGoods._id === props.scopeThis.focus._id ||
            bGoods.id_business._id === props.scopeThis.focus.id_business._id)
    ) {
        roomnoClass = roomnoClass + ' ' + 'roomno-border-focus'
    } else {
        roomnoClass = roomnoClass + ' ' + 'roomno-border'
    }
    return roomnoClass
}

function hdlRoomnoClick(bGoods) {
    props.scopeThis.focus = JSON.parse(JSON.stringify(bGoods))
    props.scopeThis.id_business = props.scopeThis.focus.id_business._id
}
</script>
