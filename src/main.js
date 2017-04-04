// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n'
import languages from './lang/languages'

Vue.use(VueI18n)

Vue.config.lang = 'de'
Vue.config.fallbackLang = 'en'
Object.keys(languages).forEach(function (lang) {
	Vue.locale(lang, languages[lang])
})

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})