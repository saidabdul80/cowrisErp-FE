import "./assets/main.css";

import { createApp } from "vue";
//import { createPinia } from "pinia";
import * as pinia from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useConstantsStore } from './stores/constants';
import './assets/tailwind.css';

import App from "./App.vue";
import router from "./router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import ExportData from "highcharts/modules/export-data";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

window.pinia = pinia
const app = createApp(App);
ExportData(Highcharts);

app.use(HighchartsVue);

const { createPinia } = window.pinia
app.use(PrimeVue, { 
  theme: {
    preset: Aura,
    options: {
        prefix: 'prime',
        darkModeSelector: 'none',
        cssLayer: false
    }
}
});
app.component('VueDatePicker', VueDatePicker);
app.use(createPinia());
app.use(router);
const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)
app.mount("#main");
const constantsStore = useConstantsStore();
app.config.globalProperties.$constants = constantsStore.values;
window.baseUrl = 'https://erp.cowris.com/api'
//window.baseUrl = 'https://optimum-fun-bobcat.ngrok-free.app/api'
