<template>

  <section>
    <PasswordGenerator />
  </section>
    
</template>

<script  setup>
import { ref } from 'vue'
import PasswordGenerator from '../components/PasswordGenerator.vue'

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
