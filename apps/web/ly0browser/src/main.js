import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'

// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// **导入中文语言包**
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入quill富文本样式
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// 引入ly0el组件
import ly0el from '@yoooloo42/ly0el'

const app = createApp(App)

// 注册路由
app.use(router)

// **配置 ElementPlus 并指定 locale 为中文**
app.use(ElementPlus, {
    locale: zhCn, // 👈 关键：设置语言为中文
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册ly0el组件
app.use(ly0el)

app.mount('#app')