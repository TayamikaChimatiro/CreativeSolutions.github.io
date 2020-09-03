<template>
  <div id="app">
    <component :is="Layout">
      <router-view/>
    </component> 
  </div>
</template>

<script>
import HomePage from "./components/HomePage";

export default {
    name: 'App',
    components: {
      HomePage
    },
    data() {
      return {
        Layout:`div`,
      };
    }
}
</script>

<style lang="scss">

</style>
