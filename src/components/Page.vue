<template>
  <div class="page">
    <h1>Magic The Gathering</h1>
    
    <div>
      <h2>Copy your card Titles</h2>

      <textarea v-model="textareaValue"></textarea>
      <button v-on:click="fetch">Add</button>
    </div>

    <div>

      <h2>Your Cards</h2>
      <ul>
        <li v-for="item in items">
          <img :src="item.imageUrl">
          <b>
            {{ item.name }}
          </b>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

  import Mtg from 'mtgsdk'

  export default {
    name: 'page',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        textareaValue: '',
        items: []
      }
    },
    methods: {
      fetch: function (event) {
        this.items = []
        this.textareaValue.split('\n').forEach((obj, i) => {
          Mtg.card.all({language: 'german', name: obj})
          .on('data', card => {
            this.items.push(card)
            if (this.items.length > 5) Mtg.end()
            console.log(card)
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    /*display: inline-block;*/
    margin: 5px 10px;
  }

  a {
    color: #42b983;
  }
</style>
