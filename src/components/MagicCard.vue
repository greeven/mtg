<template>
  <transition name="list">
    <article class="magic-card m-b text-center caption">

      <!-- <img class ="" :src="card.imageUrl ? card.imageUrl : defaultUrl" alt="Image of the Card."> -->
      <img class="caption__media" :src="card.image" alt="Image of the Card.">


      <div class="caption__overlay">
        <!-- <h1 class="caption__overlay__title">Caption title</h1> -->
        <p class="caption__overlay__content">
          <strong>{{card.number}}</strong>
          <br>
          {{card.rarity}}
        </p>
        <p class="caption__overlay__content d-flex align-items-end" style="padding: 0px 20px;">
          <em>
            {{card.flavor}}
          </em>
        </p>
      </div>
    </article>
  </transition>
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
    computed: {

    },
    methods: {
      switch: function(language){
        // console.log(this.card.name, this.log(this.card))

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
    },
    destroyed(){
      // console.log(this.card.name + ' ist gestorben.')

      bus.$off('switch')
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

  /*
  | Quelle für die Overlays
  | http://maketea.co.uk/2013/12/16/smooth-text-overlays-with-css-transforms.html
  */
  .caption {
    position: relative;
    overflow: hidden;

    transform: translateZ(0);
  }
  .caption__media {
    display: block;
    min-width: 100%;
    max-width: 100%;
    height: auto;
  }
  .caption__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    color: white;
    transform: translateY(100%);
    transition: transform .35s ease-out;
  }
  .caption:hover .caption__overlay {
    transform: translateY(0);
  }

  .caption__overlay__title {
    margin: 0;
    padding: 0 0 12px;
    transform: translateY( calc(-100% - 10px) ); /* +10px overlay padding */
    transition: transform .35s ease-out;
  }
  .caption:hover .caption__overlay__title {
    transform: translateY(0);
  }

  .caption::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0px 15px;
    border-radius: 6px;
    background: transparent;
    transition: background .35s ease-out;
  }
  .caption:hover::before {
    background: rgba(0, 0, 0, .5);
  }


  /*
  | Transitions via vue.js
  */
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
