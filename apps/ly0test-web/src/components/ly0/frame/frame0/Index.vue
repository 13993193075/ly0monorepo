<template>
    <div :style="style.title">{{ frameProps.title }}</div>
    <compHeader></compHeader>
    <div :style="style.mainBox">
        <div :style="style.menuBox">
            <ly0el-menu :myProps="scopeThis.menuProps" :scopeThis="scopeThis"></ly0el-menu>
        </div>
        <div :style="style.main">
            <component :is="scopeThis.compMain"></component>
        </div>
    </div>
    <div :style="style.footer">-- 到底了 --</div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive, watch, onMounted, markRaw } from 'vue'
import compHeader from '../header/Index.vue'
import compMainEmpty from './MainEmpty.vue'

const props = defineProps(["frameProps"]);

const scopeThis = reactive({
    indexCompMain: '',
    compMain: markRaw(compMainEmpty),
    menuProps: {
        mode: 'horizontal', // 上边水平菜单
        menu: [],
    },
})

onMounted(()=>{
    scopeThis.menuProps.menu.splice(0, scopeThis.menuProps.menu.length, ...handles.menu(props.frameProps.menu))
})

watch(()=>scopeThis.indexCompMain, function (newVal, oldVal) {
    if (newVal) {
        scopeThis.compMain = handles.componentsFactory(
            newVal,
            compMainEmpty,
            props.frameProps.menu,
            '',
        ).comp
    } else {
        scopeThis.compMain = compMainEmpty
    }
})

const style = reactive({
    title: {
        height: '40px',
        'line-height': '40px',
        'background-color': '#008488',
        color: 'white',
        'text-align': 'center',
    },
    mainBox: {
        display: 'flex',
        'flex-direction': 'column'
    },
    menuBox: {
        'border-color': '#00ac9c',
        'background-color': '#23262E',
        width: '100%'
    },
    main: {
        'text-align': 'center',
        border: 'solid',
        'border-width': '1px',
        'border-color': '#00ac9c'
    },
    footer: {
        'text-align': 'center',
        color: '#999999'
    }
})

const handles = {
    // 菜单预置
    menu(menuFrame) {
        let menu = []
        // 遍历菜单节点
        menuFrame.forEach(i => {
            // 节点预置
            let i0 = {
                title: i.title,
                handle({scopeThis, index}) {
                    scopeThis.indexCompMain = index
                },
            }
            if (i.index) {
                i0.index = i.index
            }
            // 存在子节点，递归调用
            if (i.menu && i.menu.length > 0) {
                i0.menu = handles.menu(i.menu)
            }
            menu.push(i0)
        })
        return menu
    },
    // 组件工厂
    componentsFactory(
        index, // 目标索引
        componentPreset, // 组件预置
        menuFrame, // 当前菜单
        indexFather, // 父节点索引
    ) {
        let result = {
            // 组件继承
            comp: componentPreset,
            result: false,
        }
        // 遍历菜单节点
        for (let i = 0; i < menuFrame.length; i++) {
            // 内部索引继承
            let index0 = indexFather ? indexFather + '-' + i : '' + i
            // 节点存在自定义索引
            if (!!menuFrame[i].index && menuFrame[i].index === index) {
                if (menuFrame[i].component) {
                    result.comp = markRaw(menuFrame[i].component)
                }
                result.result = true
                break
            }
            // 节点不存在自定义索引
            if (index === index0) {
                if (menuFrame[i].component) {
                    result.comp = markRaw(menuFrame[i].component)
                }
                result.result = true
                break
            }
            // 存在子节点，递归调用
            if (!!menuFrame[i].menu && menuFrame[i].menu.length > 0) {
                // 递归调用的结果可能是一个已经被 markRaw 处理过的组件，
                // 但为了保险起见，我们对递归结果的 comp 再次进行 markRaw，
                // 确保它不会被响应式系统追踪
                let recursiveResult = handles.componentsFactory(
                    index,
                    result.comp,
                    menuFrame[i].menu,
                    index0,
                )
                if (recursiveResult.result) {
                    // 对递归结果中的组件定义使用 markRaw
                    result.comp = markRaw(recursiveResult.comp)
                } else {
                    result.comp = recursiveResult.comp
                }
                result.result = recursiveResult.result

                if (result.result) {
                    break
                }
            }
        }
        return result
    },
}
</script>
