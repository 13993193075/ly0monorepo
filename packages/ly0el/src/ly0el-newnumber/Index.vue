<script setup>
import newNumber from "./newNumber.vue"
import loggedin from "./loggedin.vue"
import bind from "./bind.vue"

const props = defineProps({
    Props: {
        type: Object,
        default: () => ({
            branch: '',
            userTbl: 'ly0d0user',
            userId: null,
            id_login: null,
            popup: {
                switch: true,
                visible: false,
                title: ""
            },
        })
    }
})
</script>

<template>
    <newNumber v-if="Props.branch === 'newNumber'" :Props="Props"></newNumber>
    <loggedin v-else-if="Props.branch === 'loggedin'" :Props="Props"></loggedin>
    <bind v-if="Props.branch === 'bind'" :Props="Props"></bind>
</template>

<style scoped lang="scss">

</style>