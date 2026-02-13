<template>
  <el-dialog
    v-model="scopeThis.doc.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    :title="scopeThis.doc.popup.title"
  >
    <el-collapse v-model="elCollapseOpen">
      <el-collapse-item title="房间信息" name="0">
        <div class="roominfo-box">
          <span v-if="scopeThis.pageData.data.arrPlace.length > 1" class="field-label">场所：</span>
          <span v-if="scopeThis.pageData.data.arrPlace.length > 1" class="field-val"
            >{{ scopeThis.doc.fieldsValue.place_name }}&nbsp;&nbsp;</span
          >

          <span v-if="scopeThis.pageData.data.arrPosition.length > 0" class="field-label"
            >房间位置：</span
          >
          <span v-if="scopeThis.pageData.data.arrPosition.length > 0" class="field-val"
            >{{ scopeThis.doc.fieldsValue.position_text }}&nbsp;&nbsp;</span
          >

          <span class="field-label">房间名称：</span>
          <span class="field-val">{{ scopeThis.doc.fieldsValue.name }}&nbsp;&nbsp;</span>

          <span class="field-label">行数：</span>
          <span class="field-val">{{ scopeThis.doc.fieldsValue.rows }}&nbsp;&nbsp;</span>

          <span class="field-label">列数：</span>
          <span class="field-val">{{ scopeThis.doc.fieldsValue.cols }}</span>
        </div>
      </el-collapse-item>

      <el-collapse-item title="座位布局" name="1">
        <div class="seat-layout-box">
          <div class="buttongroup-box">
            <el-button-group>
              <el-button class="button" size="mini" round @click="hdlSeatBatch" icon="el-icon-edit"
                >修改座位信息：新增</el-button
              >
              <el-button class="button" size="mini" round @click="hdlSeatDelete">删除</el-button>
            </el-button-group>
          </div>
          <div class="row" v-for="(row, indexRow) in arrRows" :key="indexRow">
            <div class="col" v-for="(col, indexCol) in arrCols" :key="indexCol">
              <div
                class="seat"
                v-for="(item, indexSeat) in scopeThis.doc.fieldsValue.arrSeat"
                :key="indexSeat"
                v-if="item.row === row + 1 && item.col === col + 1"
              >
                {{ item.row + ',' + item.col }}
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 子组件 -->
    <compSeatBatch
      :scopeThis="scopeThis0"
      :formProps="seatBatch.formProps"
      :dataBox="seatBatch.dataBox"
    ></compSeatBatch>
    <compSeatDelete
      :scopeThis="scopeThis0"
      :formProps="seatDelete.formProps"
      :dataBox="seatDelete.dataBox"
    ></compSeatDelete>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use './doc.scss';
</style>

<script>
import compForm from '../../../common/form/index.vue'
import dataRequest from '../../../../utils/data-request.js'
export default {
  props: ['scopeThis'],
  components: {
    compSeatBatch: compForm,
    compSeatDelete: compForm,
  },
  data() {
    return {
      scopeThis0: this,
      elCollapseOpen: ['0'],
      seatLayoutReload: 0,
      seatBatch: {
        formProps: {
          popup: {
            title: '座位 - 批量新增',
            visible: false,
          },
          cols: [
            {
              items: [
                {
                  inputType: 'input',
                  label: '起始行号',
                  fieldName: 'row_from',
                },
                {
                  inputType: 'input',
                  label: '截止行号',
                  fieldName: 'row_to',
                },
                {
                  inputType: 'input',
                  label: '起始列号',
                  fieldName: 'col_from',
                },
                {
                  inputType: 'input',
                  label: '截止列号',
                  fieldName: 'col_to',
                },
              ],
            },
          ],
        },
        dataBox: {
          fieldsValue: {
            id_room: this.scopeThis.doc.fieldsValue._id,
            row_from: 0,
            row_to: 0,
            col_from: 0,
            col_to: 0,
          },
          hdlSubmit(scopeThis) {
            dataRequest
              .storpro({
                scopeThis,
                storproName: 'ly0d12.seat.batch',
                data: scopeThis.seatBatch.dataBox.fieldsValue,
              })
              .then((result) => {
                scopeThis.$message(result.message)
                scopeThis.seatBatch.formProps.popup.visible = false
                scopeThis.scopeThis.doc.hdlReload(
                  scopeThis.scopeThis,
                  scopeThis.scopeThis.doc.fieldsValue._id,
                )
              })
          },
        },
      },
      seatDelete: {
        formProps: {
          popup: {
            title: '座位 - 批量删除',
            visible: false,
          },
          cols: [
            {
              items: [
                {
                  inputType: 'input',
                  label: '起始行号',
                  fieldName: 'row_from',
                },
                {
                  inputType: 'input',
                  label: '截止行号',
                  fieldName: 'row_to',
                },
                {
                  inputType: 'input',
                  label: '起始列号',
                  fieldName: 'col_from',
                },
                {
                  inputType: 'input',
                  label: '截止列号',
                  fieldName: 'col_to',
                },
              ],
            },
          ],
        },
        dataBox: {
          fieldsValue: {
            id_room: this.scopeThis.doc.fieldsValue._id,
            row_from: 0,
            row_to: 0,
            col_from: 0,
            col_to: 0,
          },
          hdlSubmit(scopeThis) {
            dataRequest
              .storpro({
                scopeThis,
                storproName: 'ly0d12.seat.deleteMany',
                data: scopeThis.seatDelete.dataBox.fieldsValue,
              })
              .then((result) => {
                scopeThis.$message(result.message)
                scopeThis.seatDelete.formProps.popup.visible = false
                scopeThis.scopeThis.doc.hdlReload(
                  scopeThis.scopeThis,
                  scopeThis.scopeThis.doc.fieldsValue._id,
                )
              })
          },
        },
      },
    }
  },
  computed: {
    arrRows() {
      let a = []
      for (let i = 0; i < this.scopeThis.doc.fieldsValue.rows; i++) {
        a.push(i)
      }
      return a
    },
    arrCols() {
      let a = []
      for (let i = 0; i < this.scopeThis.doc.fieldsValue.cols; i++) {
        a.push(i)
      }
      return a
    },
  },
  methods: {
    hdlSeatBatch() {
      this.seatBatch.formProps.popup.visible = true
    },
    hdlSeatDelete() {
      this.seatDelete.formProps.popup.visible = true
    },
  },
}
</script>
