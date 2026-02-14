<template>
    <el-dialog
        v-if="scopeThis.props_box.popup.switch"
        v-model="scopeThis.props_box.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="scopeThis.props_box.popup.title"
        :width="scopeThis.props_box.popup.width"
        :top="scopeThis.props_box.popup.top"
        :destroy-on-close="true"
    >
        <compMain :myProps="scopeThis.props_box"></compMain>
    </el-dialog>
    <compMain v-else :myProps="scopeThis.props_box"></compMain>
</template>

<style lang="scss" scoped></style>

<script setup>
import { reactive } from 'vue'
import compMain from './main.vue'
import {utils as ly0utils} from '@yoooloo42/ly0utils'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({})
    }
})

const scopeThis = reactive({
    props_box: ly0utils.deepClone.deepDefaults(props.myProps, {
        popup: {
            switch: false,
            visible: false,
            title: '',
            width: '1200px',
            top: '15vh'
        },
        id_business: null, // 订单id
        businesstype_code: '', // 订单类别
        deal: 0, // 订单金额（应收应付）
        wx_appid: '',
        wx_mchid: '',
        readOnly: false,
    })
})
</script>
