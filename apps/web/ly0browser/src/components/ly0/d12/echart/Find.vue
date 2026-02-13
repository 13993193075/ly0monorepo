<template>
  <el-dialog
    v-model="scopeThis.find.popup.visible"
    :custom-class="'code-template-dialog'"
    :close-on-press-escape="true"
    append-to-body
    :title="scopeThis.find.popup.title"
    :width="scopeThis.find.popup.width"
  >
    <el-collapse v-model="collapseOpen">
      <el-collapse-item class="from-to-box" title="选择时段" name="date">
        <el-row class="item" v-for="(item, index) in scopeThis.find.pageData.arrDate" :key="index">
          <el-date-picker
            class="field-input"
            v-model="item.dateFrom"
            type="date"
            placeholder="选择时间"
            format="yyyy-M-d"
          ></el-date-picker>
          &nbsp;&nbsp;至&nbsp;&nbsp;
          <el-date-picker
            class="field-input"
            v-model="item.dateTo"
            type="date"
            placeholder="选择时间"
            format="yyyy-M-d"
          ></el-date-picker>
        </el-row>
        <el-row>
          <el-button-group class="button-group">
            <el-button class="button" size="mini" @click="scopeThis.hdlFind.dateAppend(scopeThis)"
              >增加</el-button
            >
            <el-button class="button" size="mini" @click="scopeThis.hdlFind.dateReset(scopeThis)"
              >重置</el-button
            >
          </el-button-group>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="场所 - 房间" name="room">
        <el-row class="position-row">
          <el-col class="field-label-col" :span="3">
            <label class="field-label">场所</label>
          </el-col>
          <el-col class="field-input-col" :span="9">
            <el-select
              class="field-input"
              v-model="scopeThis.find.pageData.id_place"
              filterable
              @change="scopeThis.hdlFind.placeChanged(scopeThis)"
            >
              <el-option
                v-for="(item, index) in scopeThis.find.pageData.arrPlace"
                :value="item._id"
                :label="item.name"
                :key="item._id + '-' + index"
              ></el-option>
            </el-select>
          </el-col>
          <el-col class="field-label-col" :span="3">
            <label class="field-label">位置</label>
          </el-col>
          <el-col class="field-input-col" :span="9">
            <el-select
              class="field-input"
              v-model="scopeThis.find.pageData.id_position"
              filterable
              @change="scopeThis.hdlFind.positionChanged(scopeThis)"
            >
              <el-option
                v-for="(item, index) in scopeThis.find.pageData.arrPosition0"
                :value="item._id"
                :label="item.text"
                :key="item._id + '-' + index"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <div class="line"></div>
        <el-row class="room-row">
          <el-transfer
            class="transfer"
            :titles="['待选', '已选']"
            v-model="scopeThis.scopeThis.find.pageData.arrRoom0Transfer"
            :data="scopeThis.scopeThis.find.pageData.arrRoomTransfer"
          ></el-transfer>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-row class="submit-row">
      <el-button type="success" round @click="scopeThis.hdlFind.submit(scopeThis)">提交</el-button>
    </el-row>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use './find.scss';
</style>

<script>
export default {
  props: ['scopeThis'],
  data() {
    return {
      collapseOpen: ['date', 'room'],
    }
  },
  computed: {
    popup() {
      return this.scopeThis.popupFind
    },
  },
  watch: {
    popup(valNew, valOld) {
      if (valNew) {
        this.scopeThis.hdlFind.get0(this.scopeThis)
      }
    },
  },
}
</script>
