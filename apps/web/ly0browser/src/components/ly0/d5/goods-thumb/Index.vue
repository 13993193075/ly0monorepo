<template>
  <div style="padding-left: 10px; padding-right: 10px">
    <h3 class="title">菜品 - 缩略图表</h3>
    <el-collapse v-model="collapseOpen">
      <el-collapse-item
        v-for="(restaurant, index) in scopeThis.pageData.arrRestaurant"
        :title="restaurant.name"
        :name="restaurant._id"
        :key="index"
      >
        <compGoodsgroup
          :scopeThis="scopeThis"
          :restaurant="restaurant"
          :arrGoodsgroup="
            scopeThis.pageData.arrGoodsgroup.filter((i) => {
              return i.id_restaurant === restaurant._id
            })
          "
          :arrGoods="
            scopeThis.pageData.arrGoods.filter((i) => {
              return i.id_restaurant === restaurant._id && i.id_goodsgroup
            })
          "
        ></compGoodsgroup>
      </el-collapse-item>
    </el-collapse>
    <compFormInsertOne
      :scopeThis="scopeThis"
      :formProps="insertOne.formProps"
      :dataBox="insertOne.dataBox"
    ></compFormInsertOne>
    <compFormUpdateOne
      :scopeThis="scopeThis"
      :formProps="updateOne.formProps"
      :dataBox="updateOne.dataBox"
    ></compFormUpdateOne>
  </div>
</template>

<style lang="scss" scoped>
@use 'index.scss';
</style>

<script>
// 数据请求
import dataRequest from '../../../../utils/data-request.js'
// 子组件
import compGoodsgroup from './Goodsgroup.vue'
import compGoods from './Goods.vue'
import compForm from '../../../common/form/index.vue'
// 新增
import insertOne from './insert-one.js'
// 修改
import updateOne from './update-one.js'

export default {
  components: {
    compGoodsgroup,
    compGoods,
    compFormInsertOne: compForm,
    compFormUpdateOne: compForm,
  },
  data: function () {
    return {
      scopeThis: this,
      ly0session: dataRequest.ly0sessionLoad(),
      collapseOpen: [],
      pageData: {
        arrRestaurant: [],
        arrGoodsgroup: [],
        arrGoods: [],
      },
      focus: {},
      insertOne,
      updateOne,
      deleteOne: {
        submit(scopeThis) {
          scopeThis
            .$confirm('删除?', '警告', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
            .then(() => {
              dataRequest
                .storpro({
                  scopeThis,
                  storproName: 'ly0d5.goods.deleteOne',
                  data: { _id: scopeThis.focus._id },
                })
                .then((result) => {
                  scopeThis.$message(result.message)
                  scopeThis.reload(scopeThis)
                })
            })
            .catch(() => {
              scopeThis.$message({ type: 'info', message: '取消删除' })
            })
        },
      },
    }
  },
  mounted() {
    this.reload(this)
  },
  methods: {
    reload(scopeThis) {
      return new Promise((resolve, reject) => {
        dataRequest
          .storpro({
            scopeThis,
            storproName: 'ly0d5.goods.getPageData',
            data: {
              id_dataunit: this.ly0session.dataunit._id,
              id_restaurant: this.ly0session.user.id_restaurant
                ? this.ly0session.user.id_restaurant
                : null,
            },
          })
          .then((result) => {
            scopeThis.pageData = result.data
            // 全部展开
            scopeThis.collapseOpen = []
            scopeThis.pageData.arrRestaurant.forEach((i) => {
              scopeThis.collapseOpen.push(i._id)
            })
            resolve()
          })
      })
    },
  },
}
</script>
