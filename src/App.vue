<template>
  <v-app>
    <navComp/>
    <v-main>
    <mainComp/>
    </v-main>
  </v-app>
</template>

<script>
import navComp from './components/navComp.vue';
import mainComp from './components/mainComp.vue';
export default {
    name: 'App',
    components: {
      navComp,
      mainComp,
    },
    data: () => ({}),
    
};
</script>
<style>
</style>