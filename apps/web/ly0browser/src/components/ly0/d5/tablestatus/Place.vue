<template>
  <div>
    <el-collapse v-model="collapseOpen" v-if="arrPlace.length > 0">
      <el-collapse-item
        v-for="(place, index) in arrPlace"
        :title="place.text"
        :name="index"
        :key="index"
      >
        <arrTable
          :scopeThis="scopeThis"
          :arrTable="
            arrTable.filter((i) => {
              return i.id_diningplace === place._id
            })
          "
        ></arrTable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import arrTable from './Table.vue'
export default {
  name: 'compPlace',
  props: ['scopeThis', 'arrTable', 'arrPlace'],
  components: { arrTable },
  data: function () {
    return {
      collapseOpen: [],
      openAll: false,
    }
  },
  mounted() {
    // 全部展开
    this.collapseOpen = []
    for (let i = 0; i < this.arrPlace.length; i++) {
      this.collapseOpen.push(i)
    }
  },
}
</script>
