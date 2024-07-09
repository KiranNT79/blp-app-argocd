<template id="app">

  <div class="layout">
    <DashboardView />
  </div>
  
</template>

<script>
import { defineComponent } from "vue";
import DashboardView from './views/DashboardView.vue';
const loadModule = () => import('@dlcm/cc-ui-utils-style');

export default defineComponent({
  name: "App",
  components: {
    DashboardView
  },
  mounted() {
    loadModule().then(module => {
      console.log("Module loaded:", module);
    }).catch(error => {
      console.error("Error loading module:", error);
    });
  }
})
</script>

<style lang="scss" scoped>

@import 'modern-normalize/modern-normalize.css';

// see https://azouaoui-med.github.io/css-pro-layout/docs/
$header-height: var(--header-height);
$footer-height: var(--footer-height);
$sidebar-width: var(--sidebar-width);
@import 'css-pro-layout/dist/scss/css-pro-layout.scss';

@import './assets/theme/dlcm-frontend.scss';



.layout {
  min-height: unset;
  background-color: var(--neutral-025);
}

@media screen and (max-width: 901px) {
  .fix-small-res {
    flex-direction: column !important;
  }
}
</style>
