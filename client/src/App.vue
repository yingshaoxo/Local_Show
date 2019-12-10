<template>
  <div id="app">
    <MyList/>
  </div>
</template>

<script>
import MyList from "./components/MyList.vue";

export default {
  name: "app",
  components: {
    MyList
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
