<!-- components/TextTransform.vue -->
<template>
    <div class="text-transform">
      <div class="form-group">
        <label for="inputText" class="form-label">Digite ou cole seu texto:</label>
        <textarea
          id="inputText"
          v-model="text"
          class="form-control mb-3"
          rows="6"
          placeholder="Digite aqui o texto que deseja transformar..."
        ></textarea>
      </div>
  
      <div class="d-grid gap-3">
        <button
          class="btn btn-primary"
          @click="transformText('uppercase')"
          :disabled="!text"
        >
          Converter para Maiúsculas
        </button>
        
        <button
          class="btn btn-info"
          @click="transformText('lowercase')"
          :disabled="!text"
        >
          Converter para Minúsculas
        </button>
        
        <button
          class="btn btn-success"
          @click="transformText('capitalize')"
          :disabled="!text"
        >
          Capitalizar Palavras
        </button>
      </div>
  
      <div v-if="transformedText" class="mt-4">
        <label class="form-label">Resultado:</label>
        <div class="result-box p-3 border rounded">
          {{ transformedText }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'TextTransform',
    setup() {
      const text = ref('')
      const transformedText = ref('')
  
      const transformText = (type) => {
        switch (type) {
          case 'uppercase':
            transformedText.value = text.value.toUpperCase()
            break
          case 'lowercase':
            transformedText.value = text.value.toLowerCase()
            break
          case 'capitalize':
            transformedText.value = text.value
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')
            break
        }
      }
  
      return {
        text,
        transformedText,
        transformText
      }
    }
  }
  </script>
  
  <style scoped>
  .result-box {
    background-color: #303030;
    min-height: 100px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .btn {
    transition: all 0.3s ease;
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
  </style>