<template>
  <div class="body">
    <el-divider class="title-line" content-position="left">
      <span class="font">内部通知 - 预览</span>
    </el-divider>

    <el-collapse class="container" v-model="elCollapseOpen">
      <el-collapse-item
        class="item"
        v-for="(item, index) in data"
        :key="index"
        :title="item.title"
        :name="index"
      >
        <div class="content" v-html="item.content"></div>
        <div class="line"></div>
        <div class="appendix-box">
          <a class="appendix" :href="srcPrefix + item.appendix" :download="item.title">附件下载</a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
export default {
  data: function () {
    return {
      srcPrefix: dataRequest.srcPrefix,
      elCollapseOpen: [],
      //elCollapseOpen: [0, 1, 2], //打开前 3 条
      data: [],
    }
  },
  computed: {
    dataunit() {
      return dataRequest.ly0sessionLoad().dataunit
    },
  },
  mounted() {
    dataRequest
      .storpro({
        scopeThis: this,
        storproName: 'ly0d6.d1intnoti.findAll',
        data: { id_dataunit: this.dataunit._id },
      })
      .then((result) => {
        this.data = JSON.parse(JSON.stringify(result.data))
      })
  },
}
</script>
