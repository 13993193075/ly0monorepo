<template>
    <div v-if="arrRoom.length > 0">
        <div class="roomno-box" v-for="(room, index) in arrRoom" :key="index">
            <el-dropdown trigger="click" @command="hdlDropdown">
                <div :class="hdlGetRoomnoClass(room)">
                    <span>{{ room.roomno }}</span>
                    <br />
                    <span>{{ room.goods_name }}</span>
                </div>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-if="room.status_code === '1'"
                            icon="Check"
                            :command="{ hdl: 'hdl_arrRoomChecked_add', room }"
                        >
                            <span>选房</span>
                        </el-dropdown-item>

                        <el-dropdown-item
                            v-if="room.status_code === '1'"
                            icon="Close"
                            :command="{ hdl: 'hdl_arrRoomChecked_del', room }"
                        >
                            <span>取消选房</span>
                        </el-dropdown-item>

                        <el-dropdown-item
                            v-if="room.status_code === '1'"
                            icon="ToiletPaper"
                            :command="{ hdl: 'hdl_arrRoomChecked_del_all', room }"
                        >
                            <span>取消所有选房</span>
                        </el-dropdown-item>

                        <div v-if="room.status_code === '1'" style="border-bottom: solid 1px grey">
                            <span style="font-size: 12px; color: blue">&nbsp;&nbsp;已选房数：</span>
                            <span style="color: red">{{ scopeThis.arrRoomChecked.length }}</span>
                        </div>

                        <el-dropdown-item
                            v-if="room.status_code === '1'"
                            icon="DocumentAdd"
                            :command="{ hdl: 'hdl_newBusiness', room }"
                        >
                            <span>入住登记 - 发生新订单</span>
                        </el-dropdown-item>

                        <el-dropdown-item
                            v-if="(room.status_code === '2' || room.status_code === '3' || room.status_code === '4') && room.id_business"
                            icon="Document"
                            :command="{ hdl: 'hdl_idBusiness', room }"
                        >
                            <span>查看订单信息</span>
                        </el-dropdown-item>

                        <el-dropdown-item
                            icon="Setting"
                            :command="{ hdl: 'hdl_setStatus', room }">
                            <span>修改房态</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script setup>
const props = defineProps(['scopeThis', 'arrRoom'])

// 点击房号 - 下拉菜单
function hdlDropdown(command) {
    props.scopeThis.focus = JSON.parse(JSON.stringify(command.room))
    // 选房
    if (command.hdl === 'hdl_arrRoomChecked_add') {
        props.scopeThis.arrRoomChecked = props.scopeThis.arrRoomChecked.filter(i => {
            return i.id_hotel === props.scopeThis.focus.id_hotel
        })
        props.scopeThis.arrRoomChecked.push(props.scopeThis.focus)
    // 取消选房
    } else if (command.hdl === 'hdl_arrRoomChecked_del') {
        props.scopeThis.arrRoomChecked = props.scopeThis.arrRoomChecked.filter(i => {
            return i._id !== props.scopeThis.focus._id
        })
    // 取消所有选房
    } else if (command.hdl === 'hdl_arrRoomChecked_del_all') {
        props.scopeThis.arrRoomChecked = []
    // 发生新订单
    } else if (command.hdl === 'hdl_newBusiness') {
        // 避免重复
        props.scopeThis.arrRoomChecked = props.scopeThis.arrRoomChecked.filter(i => {
            return i._id !== props.scopeThis.focus._id
        })
        props.scopeThis.arrRoomChecked.push(props.scopeThis.focus)

        // 重置formData
        props.scopeThis.formData = JSON.parse(JSON.stringify(props.scopeThis.newBusiness.formData))
        props.scopeThis.formData.id_hotel = props.scopeThis.focus.id_hotel
        props.scopeThis.formData.checkin = new Date()

        // 重置formProps
        props.scopeThis.formProps = Object.assign({}, props.scopeThis.newBusiness.formProps)
        props.scopeThis.formProps.popup.title =
            '入住登记 - 发生新订单，已选房数：' + props.scopeThis.arrRoomChecked.length
        props.scopeThis.formProps.popup.visible = true
    // 查看订单信息
    } else if (command.hdl === 'hdl_idBusiness') {
        props.scopeThis.id_business = props.scopeThis.focus.id_business
    // 修改房态
    } else if (command.hdl === 'hdl_setStatus') {
        // 重置formData
        props.scopeThis.formData = JSON.parse(JSON.stringify(props.scopeThis.setStatus.formData))
        props.scopeThis.formData.id_room = props.scopeThis.focus._id

        // 重置formProps
        props.scopeThis.formProps = Object.assign({}, props.scopeThis.setStatus.formProps)
        props.scopeThis.formProps.popup.title =
            '修改房态 - 房号：' + props.scopeThis.focus.roomno
        props.scopeThis.formProps.popup.visible = true
    }
}

function hdlGetRoomnoClass(room) {
    let roomnoClass = 'roomno'

    //房态
    roomnoClass = roomnoClass + ' ' + 'status' + room.status_code

    //焦点及其订单所有房号
    if (
        (props.scopeThis.focus && room._id === props.scopeThis.focus._id) ||
        (room.id_business &&
            props.scopeThis.focus &&
            room.id_business === props.scopeThis.focus.id_business)
    ) {
        roomnoClass = roomnoClass + ' ' + 'roomno-border-focus'
    } else {
        roomnoClass = roomnoClass + ' ' + 'roomno-border'
    }

    //选房
    if (
        props.scopeThis.arrRoomChecked.findIndex((i) => {
            return i._id === room._id
        }) !== -1
    ) {
        roomnoClass = roomnoClass + ' ' + 'roomno-newBRoom'
    }

    return roomnoClass
}
</script>
