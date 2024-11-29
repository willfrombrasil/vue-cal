<!-- components/TextAffix.vue -->
<template>
    <div class="text-affix">
      <!-- Input Area -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="form-group">
            <label for="prefix" class="form-label">Prefixo:</label>
            <input
              type="text"
              id="prefix"
              v-model="prefix"
              class="form-control"
              placeholder="Digite o prefixo..."
            >
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="suffix" class="form-label">Sufixo:</label>
            <input
              type="text"
              id="suffix"
              v-model="suffix"
              class="form-control"
              placeholder="Digite o sufixo..."
            >
          </div>
        </div>
      </div>
  
      <!-- Text Input -->
      <div class="form-group mb-4">
        <label for="mainText" class="form-label">Digite ou cole seu texto (uma linha por item):</label>
        <textarea
          id="mainText"
          v-model="text"
          class="form-control"
          rows="6"
          placeholder="Digite aqui o texto...&#10;Cada linha será tratada como um item separado..."
        ></textarea>
      </div>
  
      <!-- Options -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="form-check mb-2">
            <input
              type="checkbox"
              id="trimSpaces"
              v-model="options.trim"
              class="form-check-input"
            >
            <label for="trimSpaces" class="form-check-label">
              Remover espaços extras
            </label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="removeEmpty"
              v-model="options.removeEmpty"
              class="form-check-input"
            >
            <label for="removeEmpty" class="form-check-label">
              Remover linhas vazias
            </label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-check mb-2">
            <input
              type="checkbox"
              id="addSpace"
              v-model="options.addSpace"
              class="form-check-input"
            >
            <label for="addSpace" class="form-check-label">
              Adicionar espaço entre prefixo/sufixo
            </label>
          </div>
        </div>
      </div>
  
      <!-- Process Button -->
      <button
        class="btn btn-primary mb-4"
        @click="processText"
        :disabled="!text"
      >
        Processar Texto
      </button>
  
      <!-- Result -->
      <div v-if="result" class="result-section">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="form-label mb-0">Resultado:</label>
          <button
            class="btn btn-sm btn-outline-info"
            @click="copyToClipboard"
            title="Copiar para área de transferência"
          >
            Copiar
          </button>
        </div>
        <div class="result-box p-3 border rounded">
          {{ result }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue'
  
  export default {
    name: 'TextAfix',
    setup() {
      const prefix = ref('')
      const suffix = ref('')
      const text = ref('')
      const result = ref('')
      const options = reactive({
        trim: true,
        removeEmpty: true,
        addSpace: false
      })
  
      const processText = () => {
        let lines = text.value.split('\n')
  
        // Aplicar opções
        if (options.removeEmpty) {
          lines = lines.filter(line => line.trim() !== '')
        }
        if (options.trim) {
          lines = lines.map(line => line.trim())
        }
  
        // Processar cada linha
        const processedLines = lines.map(line => {
          const space = options.addSpace ? ' ' : ''
          let processedLine = line
  
          if (prefix.value) {
            processedLine = prefix.value + space + processedLine
          }
          if (suffix.value) {
            processedLine = processedLine + space + suffix.value
          }
  
          return processedLine
        })
  
        result.value = processedLines.join('\n')
      }
  
      const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(result.value)
          // Você pode adicionar uma notificação de sucesso aqui se desejar
        } catch (err) {
          console.error('Erro ao copiar texto:', err)
        }
      }
  
      return {
        prefix,
        suffix,
        text,
        result,
        options,
        processText,
        copyToClipboard
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
  
  .btn {
    transition: all 0.3s ease;
  }
  
  .form-check-input:checked {
    background-color: #375a7f;
    border-color: #375a7f;
  }
  
  .form-check-input:focus {
    border-color: #375a7f;
    box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }
  </style>