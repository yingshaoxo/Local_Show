import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)

const HOST = "http://127.0.0.1:5000/"
const API_BASE = HOST + 'api/'
const API_FUNCTION_GET_INFO = API_BASE + 'info/'
const API_FUNCTION_GET_FILES = API_BASE + 'files/'
const API_FUNCTION_UPDATE_FILES = API_BASE + 'update/'

const store = new Vuex.Store({
    state: {
        files: undefined,
        info: undefined,
        host: HOST,
    },
    mutations: {
        setFiles(state, files) {
            state.files = files
        },
        setInfo(state, info) {
            state.info = info
        },
    },
    actions: {
        async getInfo() {
            return fetch(API_FUNCTION_GET_INFO)
                .then((result) => result.json())
                .then((info) => {
                    this.commit('setInfo', info)
                });
        },
        async getFiles() {
            return fetch(API_FUNCTION_GET_FILES)
                .then((result) => result.json())
                .then((files) => {
                    this.commit('setFiles', files)
                });
        },
        async updateFiles() {
            await fetch(API_FUNCTION_UPDATE_FILES)
            return store.dispatch('getFiles')
        },
        async update_and_filter_files() {
            await fetch(API_FUNCTION_UPDATE_FILES)
            await store.dispatch('getFiles')

            var files = store.state.files
            var new_dict = new Map()
            Object.keys(files).forEach(function(key) {
                var value = files[key]
                var new_value = []
                var ok = false

                Object.keys(value).forEach(function(sub_key) {
                    var sub_value = value[sub_key]
                    var extension = (/[.]/.exec(sub_value)) ? /[^.]+$/.exec(sub_value)[0] : undefined
                    if ((extension != undefined) && (['mp4', 'avi', 'mkv', 'rmvb'].includes(extension.toLowerCase()))) {
                        ok = true
                        new_value.push(sub_value)
                    }
                })

                if (ok) {
                    new_dict.set(key, new_value)
                }
            });

            let obj = Array.from(new_dict).reduce((obj, [key, value]) => (
                Object.assign(obj, { [key]: value })
            ), {});

            this.commit('setFiles', obj)
        }
    },
})

new Vue({
    store,
    render: h => h(App),
    mounted: () => {
        store.dispatch('getInfo')
        store.dispatch('getFiles')
    }
}).$mount('#app')