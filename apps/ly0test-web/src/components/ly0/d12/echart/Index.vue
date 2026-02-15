<template>
  <div style="padding: 10px;">
    <h2 class="title">热力图</h2>
    <el-button-group class="top-button-group">
      <el-button class="button" @click="scopeThis.handles.reset(scopeThis)">重置</el-button>
      <el-button class="button" @click="scopeThis.handles.reload(scopeThis)">刷新</el-button>
      <el-button class="button" @click="scopeThis.find.popup.visible = true">查询</el-button>
    </el-button-group>
    <div class="line"></div>
    <div id="echartsShow" class="echarts-show-box"></div>
    <comp-find :scopeThis="scopeThis"></comp-find>
  </div>
</template>

<style scoped lang="scss">
@use 'index';
</style>

<script>
import compFind from './Find.vue'
import handles from './handles.js'
import hdlFind from './hdl-find.js'

export default {
  components: { compFind },
  data() {
    return {
      scopeThis: this,
      data: {
        appointment: [],
        place: [],
        position: [],
        room: [],
      },
      find: {
        popup: {
          title: '热力图 - 查询',
          visible: false,
          width: '800px',
        },
        pageData: {
          id_place: null,
          arrPlace: [],
          id_position: null,
          arrPosition: [],
          arrPosition0: [],
          arrRoom: [],
          arrRoom0: [],
          arrRoomTransfer: [], // 待选
          arrRoom0Transfer: [], // 已选
          arrDate: [
            {
              dateFrom: null,
              dateTo: null,
            },
          ],
        },
      },
      handles,
      hdlFind,
    }
  },
  mounted() {
    this.handles.reset(this)
  },
}
</script>
