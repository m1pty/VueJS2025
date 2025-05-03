<script setup>
import Clicker from './components/Clicker.vue'

const clickers = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  amount: Math.floor(Math.random() * 5) + 1 // Случайное число от 1 до 5
}));
</script>

<template>
  <div id="app">
    <header>
      <h1>Кликеры с разным количеством очков</h1>
      <p>Каждый кликер добавляет разное количество очков за клик</p>
    </header>
    
    <div class="clickers-container">
      <Clicker 
        v-for="clicker in clickers" 
        :key="clicker.id" 
        :id="clicker.id"
        :amount="clicker.amount" 
      />
    </div>
  </div>
</template>

<style>
</style>