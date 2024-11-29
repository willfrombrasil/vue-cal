<template>

  <section>
    <TextTransform />
  </section>
    
</template>

<script  setup>
import { ref } from 'vue'
import TextTransform from '../components/TextTransform.vue'

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
