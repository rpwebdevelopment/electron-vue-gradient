import { createApp } from "vue";
import VueSlider from "vue-slider-component";
import 'vue-slider-component/theme/default.css';
import CodeEditor from "simple-code-editor";

import App from "./components/App.vue";
import './index.css';

createApp(App)
    .component('VueSlider', VueSlider)
    .component('code-editor', CodeEditor)
    .mount('#app');
