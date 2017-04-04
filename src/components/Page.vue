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
          <textarea class="form-control" v-model="cardList" @input="checkListButton" placeholder="A list of cards.."></textarea>
        </div>

        <div class ="d-flex justify-content-center">
          <!-- <b-button class ="m-t" @click="fetch" :variant="'primary'" :disabled="listButton.disabled" disabled="disabled">{{listText}}</b-button> -->
          <button class ="m-t btn btn-primary" :class="listButton.disabledClass" @click="fetch" :disabled="listButton.disabled">{{listText}}</button>
        </div>
      </div>
    </div>

    <div class ="row m-t-xl"><div class ="col-12"><hr></div></div>

    <div class ="row">
      <magic-card ref="card" v-for="(card, i) in cards" :card="card" :key="i" class ="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"></magic-card>
    </div>

    <div class ="row  justify-content-md-center" v-if="cards.length == 0">
      <div class ="col-4" >
        <b-alert class ="d-flex justify-content-center" variant="info" show>
          Keine Karten zum Anzeigen.
        </b-alert>
      </div>
    </div>

    <div class ="row" v-if="notFound.length > 0">
      <h3>Nicht gefunden</h3>
      <ul>
        <li v-for="nocard in notFound">{{nocard}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

  import Mtg from 'mtgsdk'
  import autosize from 'autosize'
  import MagicCard from '@/components/MagicCard'

  const defaultDecks = [];

  defaultDecks.push({
    name: 'Wurmdeck',
    cards: ['Quirionelfen', 'Feuerball', 'Kaerveks Fackel', 'Quirionelfen', 'halbschatten-Wurm', 'Wurzelbrechender Wurm', 'Argothischer Wurm', 'Wurzelmauer', 'Quirionelfen', 'Llanowarelfen', 'Blutaugenzyklop', 'Ghitufeuer', 'Avatar des Zorns', 'Alter Silberrücken', 'hammer von Bogardan', 'Pyrotechnik', 'Schüren des Feuers', 'Feuerball', 'Wurzelmauer', 'Titanias Priesterin', 'Quirionelfen', 'Kaerveks Fackel', 'Rollender Donner', 'Todesschlingenwurm', 'Shivan Wurm', 'Sumpf', 'Sumpf', 'Sumpf']
  })

  defaultDecks.push({
    name: 'Anderes Deck',
    cards: ['Eins', 'Heilbalsam', 'Wurm', 'Insel', 'Ebene', 'Wüste']
  })

  defaultDecks.push({
    name: 'Kleines Deck',
    cards: ['Titanias Priesterin']
  })

  export default {
    name: 'page',
    data () {
      return {
        listText: 'List Cards',
        listButton: {
          disabled: false,
          disabledClass: '',
          variant: 'primary'
        },
        cardList: '',
        defaultDecks: defaultDecks,
        cards: [],
        notFound: []
      }
    },
    components: {MagicCard},
    mounted: function(){
      console.log('Page.vue mounted.')
      autosize(document.querySelector('textarea'))
    },
    methods: {

      checkListButton: function(){
        this.listText= 'List Cards'
      },

      addDeck: function(deck){
        this.cardList = deck.cards.join("\n")
        this.listText = 'List Cards from ' + deck.name

        this.$nextTick(function(){autosize.update(document.querySelector('textarea'))})
      },

      fetch: function (event) {
        // event.target.disabled = true
        this.listButton.disabled = true
        this.listButton.disabledClass = 'disabled'

        // return true

        this.cards = []
        this.notFound = []

        let Splitted = this.cardList.split('\n')

        // console.log('Splitted.length', Splitted.length)

        Splitted.forEach((obj, i) => {

          Mtg.card.where({language: 'german', name: obj})
          .then( card => {
            if(card.length == 0){
              this.notFound.push(obj)
            } 
            else if(card.length > 1){

              console.log('Für "' + obj + '" wurden ' + card.length + ' Ergebnisse gefunden.')
              let imageFound = false

              card.some( (obj, j) => {
                if(obj.imageUrl){
                  // console.log('Image gefunden.');
                  imageFound = true;
                  obj.multiple = true;
                  obj.image = obj.imageUrl;
                  this.cards.unshift(obj);
                  return true; /* auskommentiert zeigt es auch die anderen */
                }
              })

              if(!imageFound){ 
                card[0].multiple = true
                card[0].image = 'static/default-back.jpg'
                this.cards.unshift(card[0])
              }
            }else{
              card[0].image = card[0].imageUrl;
              this.cards.unshift(card[0])
            }
            //this.log(card)

            if( i + 1 == Splitted.length){
              // console.log('Enable Button')
              // event.target.disabled = false
              this.listButton.disabled = false
              this.listButton.disabledClass = ''
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
</style>
