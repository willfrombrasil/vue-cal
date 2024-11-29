<template>
    <div>
      <h3>Contagem de Texto</h3>
      <textarea
        v-model="text"
        class="form-control mb-3"
        rows="6"
        placeholder="Digite ou cole seu texto aqui..."
      ></textarea>
      <div class="mt-3">
        <p><strong>Caracteres:</strong> {{ characterCount }}</p>
        <p><strong>Palavras:</strong> {{ wordCount }}</p>
        <p><strong>Parágrafos:</strong> {{ paragraphCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        text: ''
      };
    },
    computed: {
      characterCount() {
        return this.text.length;
      },
      wordCount() {
        return this.text.trim() === '' ? 0 : this.text.trim().split(/\s+/).length;
      },
      paragraphCount() {
        return this.text.split(/\n+/).filter(p => p.trim()).length;
      }
    }
  };
  </script>
  
  <style scoped>
  textarea {
    background-color: #333;
    color: #fff;
    border-color: #444;
  }
  </style>
  