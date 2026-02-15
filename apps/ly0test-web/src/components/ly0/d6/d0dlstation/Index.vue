<template>
  <div>
    <el-divider class="title-line" content-position="left">
      <span class="font">下载中心</span>
    </el-divider>
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in data"
        :value="item._id"
        :label="item.name"
        :key="item._id + '-' + index"
      >
        <a class="download" :href="srcPrefix + item.url" :download="item.title">{{ item.title }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script>
import dataRequest from '../../../../utils/data-request.js'
export default {
  data: function () {
    return {
      srcPrefix: dataRequest.srcPrefix,
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
        storproName: 'ly0d6.d0dlstation.findAll',
        data: { id_dataunit: this.dataunit._id },
      })
      .then((result) => {
        this.data = JSON.parse(JSON.stringify(result.data))
      })
  },
}
</script>
