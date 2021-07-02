import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import BaseComponent from './components/BaseComponent';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions);
app.component('base-component', BaseComponent);
app.use(store).mount('#app')
