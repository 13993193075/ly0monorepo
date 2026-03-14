<script setup>
import newNumber from "./newNumber.vue"
import loggedin from "./loggedin.vue"
import bind from "./bind.vue"

const props = defineProps({
    myProps: {
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
    <newNumber v-if="myProps.branch === 'newNumber'" :myProps="myProps"></newNumber>
    <loggedin v-else-if="myProps.branch === 'loggedin'" :myProps="myProps"></loggedin>
    <bind v-if="myProps.branch === 'bind'" :myProps="myProps"></bind>
</template>

<style scoped lang="scss">

</style>