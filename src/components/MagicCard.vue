<template>
  <div class="magic-card m-b text-center" :title ="card.name + (card.multiple ? ' (' + $t('card.multiple') + ')' : '')">
    <div class ="">
      <!-- <img class ="" :src="card.imageUrl ? card.imageUrl : defaultUrl" alt="Image of the Card."> -->
      <img class ="" :src="card.image" alt="Image of the Card.">

      <!-- <b-tooltip v-if="card.multiple" content="Mehrere Suchergebnisse gefunden!">
        <i class ="fa fa-exclamation-triangle fa-3x text-danger"></i>
      </b-tooltip> -->

      <!-- <div class="card-block">
        <h4 class="card-title">{{card.name}}</h4>
        <p class="card-text">{{card.text}}</p>
        <a href="#" class="btn btn-primary btn-block btn-xs">{{card.setName}}</a>
      </div> -->
    </div>
  </div>
</template>

<script>
  import bus from '@/bus'

  export default {
    name: 'magic-card',
    props: ['card'],
    data() {
      return { 
        defaultUrl: 'static/default-back.jpg'
      }
    },
    mounted(){
      /*
      * Can't rely in mounted method on 'this' when used in v-for.
      */
      // this.log('Mounted ' + this.card.name)
      // setTimeout(() => { this.log('Timeout-Mount: ' + this.card.name) }, 3000);

      bus.$on('switch', this.switch)
    },
    methods: {
      switch: function(language){
        console.log('... ' + this.card.name)

        if(language == 'default'){
          this.card.image = this.card.imageUrl
        }else{
          this.card.foreignNames.forEach( (obj, i) => {
            // console.log('Loope fremde Namen.', i, obj.language, language)

            if(obj.language == language){
              // console.log('Yes!', obj.name, this.card.image, obj.imageUrl)
              this.card.image = obj.imageUrl
            }
          })
        }
      },
      log: function (card) {
        console.log(JSON.parse(JSON.stringify(card)));
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
