<template>
    <div style="margin: 10px;">
        <el-row>
            <el-col :span="16">
                <el-date-picker v-model="scopeThis.reqData.timeFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd"
                                style="width:200px"></el-date-picker>
                <span>&nbsp;至&nbsp;</span>
                <el-date-picker v-model="scopeThis.reqData.timeTo" type="date" placeholder="截止日期" format="yyyy-MM-dd"
                                style="width:200px"></el-date-picker>
            </el-col>
            <el-col :span="8" style="text-align:right">
                <el-button-group>
                    <el-button size="small" class="button" round @click="reload" icon="Refresh">刷新</el-button>
                    <el-button size="small" class="button" round @click="print('printContent')" icon="Printer">
                        打印
                    </el-button>
                    <el-button size="small" class="button" round
                               @click="scopeThis.handles.excel({scopeThis})"
                               icon="Download">下载Excel
                    </el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <div class="line" style="margin-bottom:40px;"></div>

        <div style="width:960px;" id="printContent" v-loading="scopeThis.loading" :element-loading-text="scopeThis.loadingText">
            <div style="text-align:center; font-size:large; margin-bottom:20px;">{{scopeThis.reportData.title}}</div>
            <table style="text-align:center; width:960px; border:solid black 1px; border-collapse:collapse;"><tbody>
                <!-- A4 纸的宽度 -->
                <tr :style="scopeThis.styleTbl.row">
                    <td :style="scopeThis.styleTbl.col1">收费项目</td>
                    <td :style="scopeThis.styleTbl.col2">期间应收</td>
                    <td :style="scopeThis.styleTbl.col3">实际核收</td>
                    <td :style="scopeThis.styleTbl.col4"></td>
                </tr>

                <template v-for="(itemHotel, indexHotel) in scopeThis.reportData.hotel">
                    <tr :style="scopeThis.styleTbl.row">
                        <td :style="scopeThis.styleTbl.col1">
                            <span>[{{itemHotel.name}}]&nbsp;</span>
                            <span style="font-weight:bolder;">合计</span>
                        </td>
                        <td :style="scopeThis.styleTbl.col2">{{Math.floor(itemHotel.count_amount)/100}}</td>
                        <td :style="scopeThis.styleTbl.col3">{{Math.floor(itemHotel.count_deal)/100}}</td>
                        <td :style="scopeThis.styleTbl.col4"></td>
                    </tr>
                    <template v-for="(itemGoods, indexGoods) in scopeThis.reportData.goods.filter(iGoods=>{return iGoods.id_hotel === itemHotel._id})">
                        <tr :style="scopeThis.styleTbl.row">
                            <td :style="scopeThis.styleTbl.col1">{{itemGoods.name}}</td>
                            <td :style="scopeThis.styleTbl.col2">{{Math.floor(itemGoods.count_amount)/100}}</td>
                            <td :style="scopeThis.styleTbl.col3"></td>
                            <td :style="scopeThis.styleTbl.col4"></td>
                        </tr>
                    </template>
                </template>
            </tbody></table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .button {
        border-color: #009688;
        color: #009688;
    }

    .line {
        height: 1px;
        background-color: #bdbdbd;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>

<script setup>
    import printJS from 'print-js'
    import handles from './handles.js'
    import { reactive, onMounted } from 'vue'

    const scopeThis = reactive({
        reqData: {
            timeFrom: null,
            timeTo: null
        },
        reportData: {
            title: '',
            hotel: [],
            goods: []
        },
        loading: false,
        loadingText: '',
        styleTbl: {
            row: "height: 40px;",
            col1: "width: 35%; border: solid black 1px;",
            col2: "width: 10%; border: solid black 1px;",
            col3: "width: 10%; border: solid black 1px;",
            col4: "border: solid black 1px;"
        },
        handles
    })

    function reload () {
        handles.getReportData({scopeThis})
    }

    function print (elId) {
        printJS({
            printable: elId,
            type: 'html',
            scanStyles: false,
            style: 'table { border-collapse: collapse }'
        })
    }

    onMounted(() => {
        reload ()
    })
</script>
