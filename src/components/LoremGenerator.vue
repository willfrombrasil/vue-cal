<!-- components/LoremGenerator.vue -->
<template>
    <div class="lorem-generator">
      <!-- Opções de Geração -->
      <div class="row g-3 mb-4">
        <div class="col-md-6 col-lg-3">
          <div class="form-group">
            <label for="type" class="form-label">Tipo de Texto:</label>
            <select id="type" v-model="options.type" class="form-select">
              <option value="paragraphs">Parágrafos</option>
              <option value="sentences">Sentenças</option>
              <option value="words">Palavras</option>
            </select>
          </div>
        </div>
  
        <div class="col-md-6 col-lg-3">
          <div class="form-group">
            <label for="amount" class="form-label">Quantidade:</label>
            <input
              type="number"
              id="amount"
              v-model.number="options.amount"
              class="form-control"
              min="1"
              max="100"
            >
          </div>
        </div>
  
        <div class="col-md-6 col-lg-3">
          <div class="form-group">
            <label for="format" class="form-label">Formato:</label>
            <select id="format" v-model="options.format" class="form-select">
              <option value="plain">Texto Simples</option>
              <option value="html">HTML</option>
            </select>
          </div>
        </div>
  
        <div class="col-md-6 col-lg-3">
          <div class="form-group">
            <label class="form-label">Opções:</label>
            <div class="form-check">
              <input
                type="checkbox"
                id="startWithLorem"
                v-model="options.startWithLorem"
                class="form-check-input"
              >
              <label for="startWithLorem" class="form-check-label">
                Começar com "Lorem ipsum"
              </label>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Botões de Ação -->
      <div class="d-grid gap-2 d-md-flex mb-4">
        <button
          class="btn btn-primary"
          @click="generateText"
        >
          Gerar Texto
        </button>
        <button
          class="btn btn-outline-secondary"
          @click="copyToClipboard"
          :disabled="!generatedText"
        >
          Copiar
        </button>
      </div>
  
      <!-- Resultado -->
      <div v-if="generatedText" class="result-section">
        <label class="form-label">Texto Gerado:</label>
        <div 
          class="result-box p-3 border rounded"
          :class="{ 'html-format': options.format === 'html' }"
        >
          <template v-if="options.format === 'html'" v-html="generatedText"></template>
          <template v-else>{{ generatedText }}</template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue'
  
  export default {
    name: 'LoremGenerator',
    setup() {
      const options = reactive({
        type: 'paragraphs',
        amount: 3,
        format: 'plain',
        startWithLorem: true
      })
  
      const generatedText = ref('')
  
      // Banco de palavras Lorem Ipsum
      const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur',
        'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa',
        'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
      ]
  
      const getRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)]
      }
  
      const generateSentence = () => {
        const length = Math.floor(Math.random() * 10) + 5 // 5-15 palavras por sentença
        let sentence = []
        
        for (let i = 0; i < length; i++) {
          sentence.push(getRandomWord())
        }
        
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1)
        return sentence.join(' ') + '.'
      }
  
      const generateParagraph = () => {
        const length = Math.floor(Math.random() * 3) + 3 // 3-6 sentenças por parágrafo
        let sentences = []
        
        for (let i = 0; i < length; i++) {
          sentences.push(generateSentence())
        }
        
        return sentences.join(' ')
      }
  
      const generateText = () => {
        let result = []
  
        switch (options.type) {
          case 'words':
            let wordList = []
            for (let i = 0; i < options.amount; i++) {
              wordList.push(getRandomWord())
            }
            result = [wordList.join(' ')]
            break
  
          case 'sentences':
            for (let i = 0; i < options.amount; i++) {
              result.push(generateSentence())
            }
            break
  
          case 'paragraphs':
            for (let i = 0; i < options.amount; i++) {
              result.push(generateParagraph())
            }
            break
        }
  
        // Aplicar "Lorem ipsum" no início se selecionado
        if (options.startWithLorem && result.length > 0) {
          result[0] = 'Lorem ipsum dolor sit amet, ' + 
            result[0].charAt(0).toLowerCase() + result[0].slice(1)
        }
  
        // Formatar o resultado
        if (options.format === 'html') {
          if (options.type === 'paragraphs') {
            generatedText.value = result.map(p => `<p>${p}</p>`).join('\n')
          } else {
            generatedText.value = result.join(options.type === 'sentences' ? ' ' : '\n')
          }
        } else {
          generatedText.value = result.join(options.type === 'paragraphs' ? '\n\n' : ' ')
        }
      }
  
      const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(generatedText.value)
          // Adicionar feedback de sucesso se desejar
        } catch (err) {
          console.error('Erro ao copiar texto:', err)
        }
      }
  
      return {
        options,
        generatedText,
        generateText,
        copyToClipboard
      }
    }
  }
  </script>
  
  <style scoped>
  .result-box {
    background-color: #303030;
    min-height: 100px;
    max-height: 500px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .html-format {
    white-space: normal;
  }
  
  .form-control,
  .form-select {
    background-color: #303030;
    color: #fff;
    border-color: #444;
  }
  
  .form-control:focus,
  .form-select:focus {
    background-color: #383838;
    color: #fff;
    border-color: #375a7f;
    box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }
  
  .btn {
    transition: all 0.3s ease;
  }
  
  .form-check-input:checked {
    background-color: #375a7f;
    border-color: #375a7f;
  }
  
  .result-box p {
    margin-bottom: 1rem;
  }
  
  .result-box p:last-child {
    margin-bottom: 0;
  }
  </style>