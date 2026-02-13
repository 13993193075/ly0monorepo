<template>
  <div>
    <div v-if="arrBTable.length > 0">
      <div class="tableno-box" v-for="(table, index) in arrBTable" :key="index">
        <div
          v-if="table.id_business.status_code === '0'"
          :class="hdlGetTablenoClass(table)"
          @click="hdlTablenoClick(table)"
        >
          <span>{{ table.tableno }}</span>
          <br />
          <span>{{ dateFormat(table.id_business.time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>

<script>
import dateFormat from '../../../../utils/date-format.js'

export default {
  props: ['scopeThis', 'arrBTable'],
  methods: {
    dateFormat: dateFormat.dateFormat,
    hdlGetTablenoClass(table) {
      let tablenoClass = 'tableno'
      if (
        this.scopeThis.focus &&
        this.scopeThis.focus.id_business &&
        (table._id === this.scopeThis.focus._id ||
          table.id_business._id === this.scopeThis.focus.id_business._id)
      ) {
        tablenoClass = tablenoClass + ' ' + 'tableno-border-focus'
      } else {
        tablenoClass = tablenoClass + ' ' + 'tableno-border'
      }
      return tablenoClass
    },
    hdlTablenoClick(bTable) {
      this.scopeThis.focus = JSON.parse(JSON.stringify(bTable))
      this.scopeThis.idBusiness.id_business = this.scopeThis.focus.id_business
    },
  },
}
</script>
