<template>
  <div>
    <!-- 置顶菜单 -->
    <ly0Menu v-if="!!formProps.menu" :scopeThis="scopeThis" :myProps="menuProps"></ly0Menu>
    <div :style="style.root_box()">
      <!-- 表单区域可以分为多个列 -->
      <div v-for="(item, index) in formProps.cols" :key="index">
        <table>
          <tbody>
            <template v-for="(item0, index0) in item.items" :key="index0">
              <tr v-if="item0.hdlVisible ? item0.hdlVisible(scopeThis, dataBox.fieldsValue) : true">
                <td :style="style.field_box().left" v-if="!!item0.label">
                  <compLabelBox
                    :scopeThis="scopeThis"
                    :formProps="formProps"
                    :dataBox="dataBox"
                    :item="item0"
                  ></compLabelBox>
                </td>
                <td :style="style.field_box().right" :colspan="style.no_field_label(item0)">
                  <el-collapse
                    v-if="item0.inputType === 'collapse'"
                    :accordion="
                      !!(
                        'accordion' in item0 &&
                        (item0.accordion === true || item0.accordion === 'true')
                      )
                    "
                    v-model="item0.activeNames"
                    :style="style.collapse().style"
                  >
                    <template v-for="(item1, index1) in item0.items" :key="index1">
                      <el-collapse-item
                        v-if="
                          item1.hdlVisible ? item1.hdlVisible(scopeThis, dataBox.fieldsValue) : true
                        "
                        :title="item1.title"
                        :name="item1.name ? item1.name : index1"
                      >
                        <table :style="style.collapse().table">
                          <template v-for="(item2, index2) in item1.items" :key="index2">
                            <tr
                              v-if="
                                item2.hdlVisible
                                  ? item2.hdlVisible(scopeThis, dataBox.fieldsValue)
                                  : true
                              "
                            >
                              <td :style="style.field_box().left" v-if="!!item2.label">
                                <compLabelBox
                                  :scopeThis="scopeThis"
                                  :formProps="formProps"
                                  :dataBox="dataBox"
                                  :item="item2"
                                ></compLabelBox>
                              </td>
                              <td
                                :style="style.field_box().right"
                                :colspan="style.no_field_label(item2)"
                              >
                                <compInputBox
                                  :scopeThis="scopeThis"
                                  :formProps="formProps"
                                  :dataBox="dataBox"
                                  :item="item2"
                                ></compInputBox>
                              </td>
                            </tr>
                          </template>
                        </table>
                      </el-collapse-item>
                    </template>
                  </el-collapse>
                  <compInputBox
                    v-else
                    :scopeThis="scopeThis"
                    :formProps="formProps"
                    :dataBox="dataBox"
                    :item="item0"
                  ></compInputBox>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 提交 -->
    <template v-if="dataBox.hdlSubmit">
      <div :style="style.line()"></div>
      <div :style="style.submit_box().style">
        <el-button
          :type="style.submit_box().button.facade.type"
          :plain="style.submit_box().button.facade.plain"
          :style="style.submit_box().button.style"
          @click="hdlSubmit"
          >提交</el-button
        >
      </div>
    </template>
  </div>
</template>

<script>
import compLabelBox from './LabelBox.vue'
import compInputBox from './InputBox.vue'
import deepcopy from '../../../utils/deepcopy.js'
import style from './style.js'

export default {
  props: ['scopeThis', 'formProps', 'dataBox'],
  components: {
    compLabelBox,
    compInputBox,
  },
  data() {
    return {
      menuProps: {
        mode: 'horizontal',
        menu: this.formProps.menu,
      },
      style,
    }
  },
  methods: {
    hdlSubmit() {
      if (this.dataBox.hdlSubmit) {
        let result = this.dataBox.hdlSubmit(this.scopeThis, this.dataBox.fieldsValue)
        if (deepcopy.objectType(result) === 'promise') {
          result.then(() => {})
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
