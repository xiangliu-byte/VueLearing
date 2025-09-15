import { createApp } from 'vue';
import messages from "@intlify/unplugin-vue-i18n/messages";
import App from './App.vue';
import router from './router';
import i18nPlugin from "./plugins/i18n";
import { createI18n } from "vue-i18n";
import './style.css';
import 'virtual:uno.css';

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: "ja", // 本地化的 Vue 应用程序的语言
  fallbackLocale: "zh-CN", // 找不到翻译 API 中指定的密钥资源时要回退到的语言
  messages,
});

app.use(router);
app.use(i18nPlugin);
app.mount('#app');
app.use(i18n);

//createApp(App).mount('#app')
