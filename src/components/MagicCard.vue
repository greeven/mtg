<template>
  <div class="magic-card m-b text-center">
    <div class ="">
      <img class ="" :src="card.imageUrl ? card.imageUrl : defaultUrl" alt="Image of the Card.">

      <b-tooltip v-if="card.multiple" content="Mehrere Suchergebnisse gefunden!">
        <i class ="fa fa-exclamation-triangle fa-3x text-danger"></i>
        <!-- <b-btn variant="outline-success">Live chat</b-btn> -->
      </b-tooltip>

      <!-- <div class="card-block">
        <h4 class="card-title">{{card.name}}</h4>
        <p class="card-text">{{card.text}}</p>
        <a href="#" class="btn btn-primary btn-block btn-xs">{{card.setName}}</a>
      </div> -->
    </div>
  </div>
</template>

<script>

  export default {
    name: 'magic-card',
    props: ['card'],
    data() {
      return { 
        defaultUrl: 'static/default-back.jpg'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-b{
    margin-bottom: 15px;
  }

  i.fa-exclamation-triangle{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 15px;
  }
</style>
