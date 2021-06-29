import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import BaseComponent from './components/BaseComponent';

const app = createApp(App);
app.component('base-component', BaseComponent);
app.use(store).mount('#app')
