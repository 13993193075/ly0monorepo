<template>
  <div>
    <el-dialog
      v-if="imageListProps.popup"
      v-model="imageListProps.popup.visible"
      :custom-class="'code-template-dialog'"
      :close-on-press-escape="true"
      append-to-body
      :title="imageListProps.popup.title ? imageListProps.popup.title : ''"
      :width="imageListProps.popup.width ? imageListProps.popup.width : ly0default.popup.width"
      :top="imageListProps.popup.top ? imageListProps.popup.top : ly0default.popup.top"
      :destroy-on-close="true"
    >
      <compImageList
        :scopeThis="scopeThis"
        :imageListProps="imageListProps"
        :dataBox="dataBox"
      ></compImageList>
    </el-dialog>
    <compImageList
      v-else
      :scopeThis="scopeThis"
      :imageListProps="imageListProps"
      :dataBox="dataBox"
    ></compImageList>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import compImageList from './ImageList.vue'
import ly0default from './default.js'

export default {
  props: ['scopeThis', 'imageListProps', 'dataBox'],
  components: { compImageList },
  data() {
    return {
      ly0default,
    }
  },
}
</script>
