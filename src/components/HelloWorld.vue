<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="loadData">Load Data</button>
    <h2>Welcome {{ info.idTokenParsed.preferred_username }}</h2>
    <h2>Fruits1 : {{ fruitsArray }}</h2>
    <button @click="bye">Quitter</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    info: Object
  },
  data() {
    return {
      fruitsArray: []
    }
  },
  methods: {
    loadData: function () {
      let vm = this
      // Authorization: 'Bearer ' + vm.info.token
      console.log("Getting data")
      axios.get("http://localhost:3000/fruit", {
        headers: {
          Authorization: 'Bearer ' + vm.info.token
        }
      }).then(function (res) {
        vm.fruitsArray = res.data
        console.log("load:" + res.data)
      }).catch(function (err) {
        alert(err)
      })
    },
    bye: function () {
      let vm = this
      vm.info.logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
