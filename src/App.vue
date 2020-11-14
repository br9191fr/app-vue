<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <HelloWorld msg="OK App" v-bind:info=kc/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  props: {
    kc: Object
  },
  components: {
    HelloWorld
  },
  methods: {
    showKc: function () {
      var vm = this
      console.log("ShowKc. Token:" + vm.kc.token)
    }
  },
  created() {
    this.showKc()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
