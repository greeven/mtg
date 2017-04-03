<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->


    <b-navbar toggleable type="inverse" variant="inverse">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="#">
        <img src="/static/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
        <span>Magic The Gathering</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar class="ml-auto">

          <b-nav-item><a href="#" class ="text-warning" onclick="_urq.push(['Feedback_Open'])">Feedback</a></b-nav-item>
          <!-- <b-nav-item>Docs</b-nav-item> -->
          <b-nav-item><a class ="text-danger" href ="http://gatherer.wizards.com/Pages/Default.aspx" target ="_blank">Official Search <i class ="fa fa-location-arrow"></i></a></b-nav-item>

        </b-nav>
      </b-collapse>
    </b-navbar>

    <router-view class ="container"></router-view>
  </div>
</template>

<script>

  // import { navbar, dropdown } from 'vue-strap'

  export default {
    name: 'app'
  }
</script>

<style>

  body{
    overflow-y: scroll;
  }

</style>
