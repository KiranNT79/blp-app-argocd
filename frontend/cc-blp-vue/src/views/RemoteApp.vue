<template>
    <div id="app">
      <RouterView></RouterView>
    </div>
  </template>
  
  <script>
  import RouterView from 'vue-router';
  import { $getSelectedLocale } from '@dlcm/cc-ui-utils-store-locale';
  import i18n from '../i18n';

  export default {
    name: 'RemoteApp',
    data() {
        return {
            localeSubscription: null,
        }
    },
    mounted(){
      this.localeSubscription = $getSelectedLocale.subscribe(lang=>{
            i18n.global.locale = lang;
        })
    },
    unmounted(){
        this.localeSubscription.unsubscribe();
    }
  };
  </script>
  