<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->


    <b-navbar toggleable type="inverse" variant="inverse" fixed="top">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="#">
        <img src="/static/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
        <span>Magic The Gathering</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar class="ml-auto">


          <b-nav-item-dropdown :text="$t('language')" right-alignment>
            <a class ="dropdown-item" @click="setLanguage(key)" v-for="(lang, key) in languages" :key="key">{{$t('language', key)}}</a> 
          </b-nav-item-dropdown>

          <b-nav-item><a href="#" class ="text-warning" onclick="_urq.push(['Feedback_Open'])">Feedback</a></b-nav-item>
          <!-- <b-nav-item>Docs</b-nav-item> -->
          <b-nav-item><a class ="text-danger" href ="http://gatherer.wizards.com/Pages/Default.aspx" target ="_blank">Official Search <i class ="fa fa-location-arrow"></i></a></b-nav-item>

        </b-nav>
      </b-collapse>
    </b-navbar>

    <router-view ref ="container" class ="container"></router-view>
  </div>
</template>

<script>

  import Vue from 'vue'
  import languages from './lang/languages'
  import bus from './bus'

  export default {
    name: 'app',
    data: function(){
      return {  
        'languages': languages
        
      }
    },
    methods: {

      setLanguage: function(key){
        console.log('Setze Sprache auf ' + this.$t('language', key) + ' (' + key + ') bei ...')
        Vue.config.lang = key
        this.$root.$emit('shown::dropdown', this);

        //console.log(this.$refs.container.$refs[0].card)
        bus.$emit('switch', this.$t('foreignName', key))

        /* für später wegen Routen https://github.com/kazupon/vue-i18n/blob/5.x/gitbook/dynamic.md */
        // const route = Object.assign({}, this.$route);
        // route.params.lang = lang;
        // this.$router.push(route);
      }
    }
  }
</script>

<style>

  body{
    overflow-y: scroll;
  }

</style>
