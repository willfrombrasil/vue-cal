<!-- App.vue -->
<template>

<header>

  <MenuNav />

</header>

<main class="container p-5">  
    
  <RouterView />

</main>

<footer>

</footer>

</template>

<script>
import { ref } from 'vue'
import TextTransform from './components/TextTransform.vue'
import TextAnalyzer from './components/TextAnalyzer.vue'
import TextAfix from './components/TextAfix.vue'
import LoremGenerator from './components/LoremGenerator.vue'
import PasswordGenerator from './components/PasswordGenerator.vue'
import MenuNav from './components/MenuNav.vue'

export default {
  name: 'App',
  components: {
    TextTransform,
    TextAnalyzer,
    TextAfix,
    LoremGenerator,
    PasswordGenerator,
    MenuNav
  },
  setup() {
    const activeTab = ref('transform')
    return { activeTab }
  }
}
</script>

  
  <style>
  .nav-tabs .nav-link {
    color: #fff;
    transition: all 0.3s ease;
  }
  
  .nav-tabs .nav-link:hover {
    border-color: #375a7f;
  }
  
  .tab-pane {
    transition: opacity 0.3s ease;
  }
  
  .tab-pane.fade {
    opacity: 0;
  }
  
  .tab-pane.fade.show {
    opacity: 1;
  }
  </style>