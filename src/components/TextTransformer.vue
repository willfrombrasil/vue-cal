<template>
    <div>
      <h3>Transformar Texto</h3>
      <textarea
        v-model="text"
        class="form-control mb-3"
        rows="6"
        placeholder="Digite seu texto aqui..."
      ></textarea>
      <div class="btn-group" role="group" aria-label="Text Transformations">
        <button
          @click="transformToUppercase"
          class="btn btn-primary"
          :class="{'btn-active': transformation === 'uppercase'}"
        >
          Maiúsculas
        </button>
        <button
          @click="transformToLowercase"
          class="btn btn-secondary"
          :class="{'btn-active': transformation === 'lowercase'}"
        >
          Minúsculas
        </button>
        <button
          @click="capitalizeFirstLetter"
          class="btn btn-info"
          :class="{'btn-active': transformation === 'capitalize'}"
        >
          Capitalizar Primeira Letra
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        text: '',
        transformation: ''
      };
    },
    methods: {
      transformToUppercase() {
        this.transformation = 'uppercase';
        this.text = this.text.toUpperCase();
      },
      transformToLowercase() {
        this.transformation = 'lowercase';
        this.text = this.text.toLowerCase();
      },
      capitalizeFirstLetter() {
        this.transformation = 'capitalize';
        this.text = this.text
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
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
  
  .btn-group button {
    width: 32%;
  }
  
  .btn-active {
    background-color: #28a745;
  }
  </style>
  