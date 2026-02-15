<script setup>
    import compTable from '../d0table/Index.vue'
    import compDoc from '../d0doc/Index.vue'
    import compImages from '../d0images/Index.vue'
    import { reactive } from 'vue'

    const scopeThis = reactive({
        id_d0: null,
        branch: 0
    })
</script>

<template>
    <comp-table v-if="!scopeThis.id_d0 && scopeThis.branch === 0" :root="scopeThis"></comp-table>
    <comp-doc v-else-if="scopeThis.id_d0 && scopeThis.branch === 1" :root="scopeThis"></comp-doc>
    <comp-images v-else-if="scopeThis.id_d0 && scopeThis.branch === 2" :root="scopeThis"></comp-images>
</template>

<style scoped lang="scss">

</style>
