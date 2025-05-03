<script setup>
import Clicker from './components/Clicker.vue'

// Создаем массив от 1 до 100 для идентификаторов кликеров
const clickers = Array.from({ length: 100 }, (_, index) => index + 1);
</script>

<template>
  <div id="app">
    
    <div class="clickers-container">
      <Clicker 
        v-for="clickerId in clickers" 
        :key="clickerId" 
        :id="clickerId" 
      />
    </div>
  </div>
</template>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.clickers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .clickers-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>