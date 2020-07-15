import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBalanceScale,
    faBookMedical,
    faBullseye,
    faDisease,
    faFire,
    faHeartbeat,
    faLongArrowAltDown,
    faPills,
    faSmile,
    faStickyNote,
    faUserInjured,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import {initStore} from './store'
import VueScrollTo from 'vue-scrollto'
import Home from "./components/Home";
import About from "./components/About";
import RefData from "./components/ref-data/RefData";
import VueAnalytics from 'vue-analytics';

library.add(faUserInjured)
library.add(faFire)
library.add(faHeartbeat)
library.add(faUtensils)
library.add(faBullseye)
library.add(faPills)
library.add(faDisease)
library.add(faBookMedical)
library.add(faStickyNote)
library.add(faLongArrowAltDown)
library.add(faBalanceScale)
library.add(faSmile)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueScrollTo)

const store = initStore()

const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/home', component: Home},
        {path: '/about', component: About},
        {path: '/refs', component: RefData},
    ]
})

Vue.use(VueAnalytics, {
    id: 'UA-172735207-1',
    router
});

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')
