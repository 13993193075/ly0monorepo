<template>
  <div>
    <el-collapse v-model="collapseOpen">
      <el-collapse-item title="未分类" name="0">
        <compGoods
          :scopeThis="scopeThis"
          :restaurant="restaurant"
          :goodsgroup="null"
          :arrGoods="
            scopeThis.pageData.arrGoods.filter((i) => {
              return i.id_restaurant === restaurant._id && !i.id_goodsgroup
            })
          "
        ></compGoods>
      </el-collapse-item>
      <el-collapse-item
        v-for="(goodsgroup, index) in arrGoodsgroup"
        :title="goodsgroup.text"
        :name="goodsgroup._id"
        :key="index"
      >
        <compGoods
          :scopeThis="scopeThis"
          :restaurant="restaurant"
          :goodsgroup="goodsgroup"
          :arrGoods="
            arrGoods.filter((i) => {
              return i.id_goodsgroup === goodsgroup._id
            })
          "
          :key="'goodsgroup.compGoods.' + goodsgroup._id + '-' + index"
        ></compGoods>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import compGoods from './Goods.vue'
export default {
  name: 'compGoodsgroup',
  props: ['scopeThis', 'restaurant', 'arrGoodsgroup', 'arrGoods'],
  components: { compGoods },
  data() {
    return {
      collapseOpen: [],
    }
  },
  mounted() {
    // 全部展开
    this.collapseOpen = ['0']
    this.arrGoodsgroup.forEach((i) => {
      this.collapseOpen.push(i._id)
    })
  },
}
</script>
