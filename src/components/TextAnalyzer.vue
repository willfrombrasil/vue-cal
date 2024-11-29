<!-- components/TextAnalyzer.vue -->
<template>
    <div class="text-analyzer">
      <div class="form-group">
        <label for="analyzeText" class="form-label">Digite ou cole seu texto para análise:</label>
        <textarea
          id="analyzeText"
          v-model="text"
          class="form-control mb-3"
          rows="6"
          placeholder="Digite ou cole aqui o texto que deseja analisar..."
          @input="analyzeText"
        ></textarea>
      </div>
  
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Caracteres</h5>
              <p class="card-text display-4">{{ stats.characters }}</p>
            </div>
          </div>
        </div>
  
        <div class="col-md-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Palavras</h5>
              <p class="card-text display-4">{{ stats.words }}</p>
            </div>
          </div>
        </div>
  
        <div class="col-md-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Parágrafos</h5>
              <p class="card-text display-4">{{ stats.paragraphs }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'TextAnalyzer',
    setup() {
      const text = ref('')
      
      const stats = computed(() => {
        const trimmedText = text.value.trim()
        
        return {
          characters: trimmedText.length,
          words: trimmedText ? trimmedText.split(/\s+/).length : 0,
          paragraphs: trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim()).length : 0
        }
      })
  
      return {
        text,
        stats
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    background-color: #303030;
    border-color: #444;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .form-control {
    background-color: #303030;
    color: #fff;
    border-color: #444;
  }
  
  .form-control:focus {
    background-color: #383838;
    color: #fff;
    border-color: #375a7f;
    box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }
  
  .display-4 {
    font-size: 2.5rem;
    font-weight: 300;
  }
  </style>