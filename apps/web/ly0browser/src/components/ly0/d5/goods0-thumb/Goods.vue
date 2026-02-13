<template>
  <div>
    <template v-if="arrGoods.length > 0">
      <div class="item-container" v-for="(item, index) in arrGoods" :key="index">
        <el-dropdown trigger="click" @command="hdlDropdown">
          <img class="item-icon" :src="item.thumb ? srcPrefix + item.thumb : ''" />
          <div class="item-text">
            <span>{{ item.name }}</span>
            <br /><span>{{ Math.floor(item.price) / 100 }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" :command="{ handle: 'updateOne', focus: item }"
              >修改</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-delete" :command="{ handle: 'deleteOne', focus: item }"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <div
      class="add-container"
      @click="scopeThis.insertOne.hdlPopup(scopeThis, restaurant, goodsgroup)"
    >
      <div class="add-icon">+</div>
      <div class="add-text">新增</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './goods.scss';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
export default {
  props: ['scopeThis', 'restaurant', 'goodsgroup', 'arrGoods'],
  data: function () {
    return {
      srcPrefix: dataRequest.srcPrefix,
    }
  },
  methods: {
    hdlDropdown(command) {
      if (command.handle === 'updateOne') {
        this.scopeThis.focus = command.focus
        this.scopeThis.updateOne.hdlPopup(this.scopeThis)
        return
      }

      if (command.handle === 'deleteOne') {
        this.scopeThis.focus = command.focus
        this.scopeThis.deleteOne.submit(this.scopeThis)
        return
      }
    },
  },
}
</script>
