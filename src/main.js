import Vue from 'vue'
import Vuex from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBullseye,
    faDisease,
    faFire,
    faHeartbeat,
    faPills,
    faUserInjured,
    faUtensils
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import {initStore} from './store'

library.add(faUserInjured)
library.add(faFire)
library.add(faHeartbeat)
library.add(faUtensils)
library.add(faBullseye)
library.add(faPills)
library.add(faDisease)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)


Vue.config.productionTip = false

Vue.use(Vuex)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const store = initStore();

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
