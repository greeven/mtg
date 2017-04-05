<template>
  <div class="page">
    <div class ="row justify-content-center" style="margin-top: 5em;">


      <div class ="col-6">
        <p class ="text-center">
          {{$t("text.heading")}}
        </p>
        <strong>{{$t('examples')}}</strong>
        <ul class ="">
          <li v-for="dd in defaultDecks">
            <a href ="#" class ="" @click="addDeck(dd)">{{dd.name}} <small>({{dd.cards.length}})</small></a>
          </li>
        </ul>
        <div class ="d-flex justify-content-center">
          <textarea class="form-control" v-model="cardList" :placeholder="$t('text.textarea')"></textarea>
        </div>

        <div class ="d-flex justify-content-center">
          <button class ="m-t btn btn-primary" :class="{'disabled': listButton.disabled, 'btn-primary': !listButton.disabled, 'btn-secondary': listButton.disabled}" @click="fetch" :disabled="listButton.disabled">
            {{ $t('text.button')}}
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class ="row justify-content-center" style="margin-top: 1em;" v-if="listingInProgress">
        <div class ="col-6">
          <b-progress v-model="listingProcess" :precision="1"  animated></b-progress>
        </div>
      </div>
    </transition>

    <div class ="row m-t-xl"><div class ="col-12"><hr></div></div>

    <div class ="row">
        <magic-card ref="card" v-for="(card, i) in cards" :card="card" :key="i" class ="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"></magic-card>
    </div>

    <div class ="row  justify-content-md-center" v-if="cards.length == 0">
      <div class ="col-4">
        <b-alert class ="d-flex justify-content-center" variant="warning" show>
          {{$t('card.nocards')}}
        </b-alert>
      </div>
    </div>

    <div class ="row justify-content-center m-t-xl" v-if="notFound.length > 0">
        <dt class="col-sm-3">{{$t('card.notfound')}}</dt>
        <dd class="col-sm-9">
          <ul class ="list-inline">
            <li class ="list-inline-item" v-for="nocard in notFound">
              <a class ="btn btn-sm btn-secondary" title ="Go to official search site" :href ="nocard.url" target ="_blank">
                {{nocard.name}}
              </a>
            </li>
          </ul>
        </dd>
    </div>
  </div>
</template>

<script>

  import Mtg from 'mtgsdk'
  import autosize from 'autosize'
  import MagicCard from '@/components/MagicCard'

  const defaultDecks = [];

  defaultDecks.push({
    name: 'Some Cards',
    cards: ['Avatar des Zorns','Titanias Priesterin','Engel der Gnade','Vollendete Kampfmaschine','Fliegender Ersthelfer','Ätherstrom-Reservoir','Appetit auf Unnatürliches']
  })

  defaultDecks.push({
    name: 'Wurmdeck',
    cards: ['halbschatten-Wurm', 'Wurzelbrechender Wurm', 'Argothischer Wurm', 'Wurzelmauer', 'Quirionelfen', 'Llanowarelfen', 'Blutaugenzyklop', 'Ghitufeuer', 'Avatar des Zorns', 'Alter Silberrücken', 'hammer von Bogardan', 'Pyrotechnik', 'Schüren des Feuers', 'Feuerball', 'Titanias Priesterin', 'Quirionelfen', 'Kaerveks Fackel', 'Rollender Donner', 'Todesschlingenwurm', 'Shivan Wurm']
  })

  // defaultDecks.push({
  //   name: 'Anderes Deck',
  //   cards: ['Eins', 'Heilbalsam', 'Wurm', 'Insel', 'Ebene', 'Wüste']
  // })

  // defaultDecks.push({
  //   name: 'Kleines Deck',
  //   cards: ['Titanias Priesterin', 'find ick nich', 'och nich', 'och mennooo']
  // })

  export default {
    name: 'page',
    components: {MagicCard},
    mounted: function(){
      console.log('Page.vue mounted.')
      autosize(document.querySelector('textarea'))
    },
    data () {
      return {
        listText: 'List Cards',
        listingInProgress: false,
        cardsProcessed: 0,
        cardsWanted: 0,
        listButton: {
          disabled: true,
          disabledClass: 'disable',
          variant: 'secondary',
          variantOptions: ['primary', 'secondary']
        },
        cardList: '',
        defaultDecks: defaultDecks,
        cards: [],
        notFound: []
      }
    },
    watch: {
      cardList: function(newValue){
        this.listButton.disabled = newValue == '' ? true : false
      }
    },
    computed: {
      listingProcess: function(){
        return Math.round( this.cardsProcessed / this.cardsWanted * 100)
      }
    },
    methods: {

      toggleListButton: function(){
        this.listButton.disabled = !this.listButton.disabled
        this.listButton.disabledClass = this.listButton.disabledClass === '' ? 'disabled' : ''
        this.listButton.variant = this.listButton.disabled ? this.listButton.variantOptions[0] : this.listButton.variantOptions[1]
      },

      addDeck: function(deck){
        this.cardList = deck.cards.join("\n")

        this.$nextTick(function(){autosize.update(document.querySelector('textarea'))})
      },

      fetch: function (event) {
        this.cardsProcessed = 0

        let Wanted = this.cardList.split('\n')
        this.cardsWanted = Wanted.length
        
        this.listingInProgress = true
        this.listButton.disabled = true

        this.cards = []
        this.notFound = []

        Wanted.forEach((obj, i) => {

          Mtg.card.where({language: 'german', name: obj})
          .then( card => {
            if(card.length == 0)
            {
              this.notFound.push({name: obj, url: 'http://gatherer.wizards.com/Pages/Search/Default.aspx?name=+[' + obj.split(' ').join(']+[') + ']'})
            }
            else if(card.length == 1)
            {
              card[0].image = card[0].imageUrl;
              this.cards.push(card[0])
            }
            else
            {
              // console.log('Für "' + obj + '" wurden ' + card.length + ' Ergebnisse gefunden.')
              let imageFound = false

              card.some( (obj, j) => {
                if(obj.imageUrl){
                  imageFound = true;
                  obj.multiple = true;
                  obj.image = obj.imageUrl;
                  this.cards.push(obj);

                  /* auskommentiert zeigt es auch die anderen */
                  return true; 
                }
              })

              /* 
              * if multiple cards found and none of them has an image 
              * take the first card with default image  
              */
              if(!imageFound){ 
                card[0].multiple = true
                card[0].image = 'static/default-back.jpg'
                this.cards.push(card[0])
              }
            }

            this.cardsProcessed++

            // console.log('Proccessed: ' + this.cardsProcessed, 'Wanted: ' + this.cardsWanted)

            if(this.cardsProcessed == this.cardsWanted){
              this.listingInProgress = false
              this.listButton.disabled = false
            }
          })
        })
      },    

      log: function (card) {
        console.log(JSON.parse(JSON.stringify(card)));
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-t{
    margin-top: 15px;
  }

  .m-t-xl{
    margin-top: 30px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
