import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from '../i18n';
import App from "./RemoteApp.vue";
import router from "@/router";

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App, {});
        },
    },
    handleInstance(app) {
        app.use(router);
        app.use(ElementPlus);
        app.use(i18n);
    },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
