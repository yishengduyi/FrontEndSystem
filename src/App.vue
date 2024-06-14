<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    window.addEventListener('unload', this.saveState());
  },
  methods: {
    saveState(){
      this.$store.state.user.user.name = sessionStorage.getItem('stateName');
    }
  }
}
</script>

