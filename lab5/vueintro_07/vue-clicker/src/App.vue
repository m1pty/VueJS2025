<script setup>
import Clicker from './components/Clicker.vue'

const clickers = [
  { id: 1, amount: 1 },
  { id: 2, amount: 2 },
  { id: 3, amount: 3 }
];
</script>

<template>
  <div id="app">
    <h1>Кликеры с кастомизируемыми кнопками</h1>
    
    <div class="clickers-container">
      <Clicker :id="1" :amount="1" />
      
      <Clicker :id="2" :amount="2">
        <button style="background-color: #f59e0b; padding: 0.8rem 1.5rem;">
          Нажми меня! (+2)
        </button>
      </Clicker>
      
      <Clicker :id="3" :amount="3">
        <div style="background-color: #10b981; color: white; padding: 0.8rem; border-radius: 50%;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      </Clicker>
      
      <Clicker :id="4" :amount="4">
        <div class="custom-click-area">
          <span>✨ Нажми ✨</span>
          <small>+4 очка</small>
        </div>
      </Clicker>
    </div>
  </div>
</template>

<style>
.custom-click-area {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.custom-click-area:hover {
  transform: scale(1.05);
}

</style>