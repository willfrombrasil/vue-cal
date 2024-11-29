<template>

  <section>
    <TextAnalyzer />
  </section>
    
</template>

<script  setup>
import { ref } from 'vue'
import TextAnalyzer from '../components/TextAnalyzer.vue'

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
