import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Page from '@/components/Page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page
    }
    // {
    //   path: '/hello',
    //   name: 'Hello',
    //   component: Hello
    // }
  ]
})
