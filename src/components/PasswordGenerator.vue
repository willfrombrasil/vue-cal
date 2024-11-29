<!-- components/PasswordGenerator.vue -->
<template>
    <div class="password-generator">
      <!-- Senha Gerada -->
      <div class="password-display mb-4">
        <div class="card">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-lg"
                :value="generatedPassword"
                readonly
                ref="passwordInput"
              >
              <button 
                class="btn btn-outline-secondary"
                type="button"
                @click="togglePasswordVisibility"
                :title="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <button 
                class="btn btn-primary"
                type="button"
                @click="copyToClipboard"
                title="Copiar para área de transferência"
              >
                <i class="bi bi-clipboard"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Opções de Geração -->
      <div class="row g-4">
        <!-- Configurações Básicas -->
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Configurações</h5>
            </div>
            <div class="card-body">
              <!-- Comprimento da Senha -->
              <div class="mb-4">
                <label class="form-label d-flex justify-content-between">
                  Comprimento da senha: <span>{{ options.length }}</span>
                </label>
                <input
                  type="range"
                  class="form-range"
                  v-model.number="options.length"
                  min="8"
                  max="64"
                  step="1"
                >
              </div>
  
              <!-- Opções de Caracteres -->
              <div class="character-options">
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    id="uppercase"
                    v-model="options.uppercase"
                    class="form-check-input"
                  >
                  <label for="uppercase" class="form-check-label">
                    Letras maiúsculas (A-Z)
                  </label>
                </div>
  
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    id="lowercase"
                    v-model="options.lowercase"
                    class="form-check-input"
                  >
                  <label for="lowercase" class="form-check-label">
                    Letras minúsculas (a-z)
                  </label>
                </div>
  
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    id="numbers"
                    v-model="options.numbers"
                    class="form-check-input"
                  >
                  <label for="numbers" class="form-check-label">
                    Números (0-9)
                  </label>
                </div>
  
                <div class="form-check mb-2">
                  <input
                    type="checkbox"
                    id="symbols"
                    v-model="options.symbols"
                    class="form-check-input"
                  >
                  <label for="symbols" class="form-check-label">
                    Símbolos (!@#$%^&*)
                  </label>
                </div>
  
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="excludeSimilar"
                    v-model="options.excludeSimilar"
                    class="form-check-input"
                  >
                  <label for="excludeSimilar" class="form-check-label">
                    Excluir caracteres similares (l, 1, I, O, 0)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Força da Senha -->
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Força da Senha</h5>
            </div>
            <div class="card-body">
              <!-- Barra de Força -->
              <div class="mb-3">
                <div class="progress" style="height: 20px;">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="{ width: `${passwordStrength.score}%` }"
                    :class="passwordStrength.colorClass"
                  >
                    {{ passwordStrength.label }}
                  </div>
                </div>
              </div>
  
              <!-- Detalhes da Força -->
              <div class="strength-details">
                <ul class="list-unstyled mb-0">
                  <li v-for="(check, index) in strengthChecks" :key="index" class="mb-2">
                    <i :class="check.passed ? 'bi bi-check-circle-fill text-success' : 'bi bi-x-circle-fill text-danger'"></i>
                    {{ check.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Botão Gerar -->
      <div class="d-grid mt-4">
        <button 
          class="btn btn-lg btn-primary"
          @click="generatePassword"
          :disabled="!isAnyOptionSelected"
        >
          Gerar Nova Senha
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed, onMounted } from 'vue'
  
  export default {
    name: 'PasswordGenerator',
    setup() {
      const options = reactive({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeSimilar: false
      })
  
      const generatedPassword = ref('')
      const showPassword = ref(false)
      const passwordInput = ref(null)
  
      // Conjuntos de caracteres
      const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*',
        similar: 'Il1O0'
      }
  
      // Verifica se pelo menos uma opção está selecionada
      const isAnyOptionSelected = computed(() => {
        return options.uppercase || options.lowercase || 
               options.numbers || options.symbols
      })
  
      // Gera a senha
      const generatePassword = () => {
        let chars = ''
        let password = ''
        
        // Constrói o conjunto de caracteres
        if (options.uppercase) chars += charSets.uppercase
        if (options.lowercase) chars += charSets.lowercase
        if (options.numbers) chars += charSets.numbers
        if (options.symbols) chars += charSets.symbols
        
        // Remove caracteres similares se a opção estiver marcada
        if (options.excludeSimilar) {
          chars = chars.split('')
            .filter(char => !charSets.similar.includes(char))
            .join('')
        }
        
        // Gera a senha
        for (let i = 0; i < options.length; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
  
        generatedPassword.value = password
        calculatePasswordStrength()
      }
  
      // Calcula a força da senha
      const passwordStrength = reactive({
        score: 0,
        label: '',
        colorClass: ''
      })
  
      const strengthChecks = ref([
        { label: 'Mínimo de 8 caracteres', passed: false },
        { label: 'Contém letras maiúsculas', passed: false },
        { label: 'Contém letras minúsculas', passed: false },
        { label: 'Contém números', passed: false },
        { label: 'Contém símbolos', passed: false }
      ])
  
      const calculatePasswordStrength = () => {
        const password = generatedPassword.value
        let score = 0
  
        // Atualiza os checks
        strengthChecks.value[0].passed = password.length >= 8
        strengthChecks.value[1].passed = /[A-Z]/.test(password)
        strengthChecks.value[2].passed = /[a-z]/.test(password)
        strengthChecks.value[3].passed = /[0-9]/.test(password)
        strengthChecks.value[4].passed = /[!@#$%^&*]/.test(password)
  
        // Calcula o score
        if (password.length >= 8) score += 20
        if (/[A-Z]/.test(password)) score += 20
        if (/[a-z]/.test(password)) score += 20
        if (/[0-9]/.test(password)) score += 20
        if (/[!@#$%^&*]/.test(password)) score += 20
  
        // Atualiza o status
        passwordStrength.score = score
        if (score <= 20) {
          passwordStrength.label = 'Muito Fraca'
          passwordStrength.colorClass = 'bg-danger'
        } else if (score <= 40) {
          passwordStrength.label = 'Fraca'
          passwordStrength.colorClass = 'bg-warning'
        } else if (score <= 60) {
          passwordStrength.label = 'Média'
          passwordStrength.colorClass = 'bg-info'
        } else if (score <= 80) {
          passwordStrength.label = 'Forte'
          passwordStrength.colorClass = 'bg-primary'
        } else {
          passwordStrength.label = 'Muito Forte'
          passwordStrength.colorClass = 'bg-success'
        }
      }
  
      // Copia a senha
      const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(generatedPassword.value)
          // Adicionar feedback visual se desejar
        } catch (err) {
          console.error('Erro ao copiar senha:', err)
        }
      }
  
      // Toggle visibilidade da senha
      const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value
        if (passwordInput.value) {
          passwordInput.value.type = showPassword.value ? 'text' : 'password'
        }
      }
  
      // Gera senha inicial
      onMounted(() => {
        generatePassword()
      })
  
      return {
        options,
        generatedPassword,
        showPassword,
        passwordInput,
        isAnyOptionSelected,
        passwordStrength,
        strengthChecks,
        generatePassword,
        copyToClipboard,
        togglePasswordVisibility
      }
    }
  }
  </script>
  
  <style scoped>
  .password-generator {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .form-range::-webkit-slider-thumb {
    background: #375a7f;
  }
  
  .form-range::-moz-range-thumb {
    background: #375a7f;
  }
  
  .form-check-input:checked {
    background-color: #375a7f;
    border-color: #375a7f;
  }
  
  .password-display input {
    background-color: #525252;
    color: #fff;
    border-color: #444;
    font-family: monospace;
  }
  
  .strength-details li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .card {
    background-color: #a3a3a3;
    border-color: #444;
  }
  
  .card-header {
    background-color: #375a7f;
    color: #fff;
  }
  
  .progress {
    background-color: #444;
  }
  
  .btn-outline-secondary {
    color: #fff;
    border-color: #444;
  }
  
  .btn-outline-secondary:hover {
    background-color: #444;
    border-color: #444;
  }
  </style>