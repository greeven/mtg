import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Page from '@/components/Page'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(Router)
Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
