<script setup>
import Clicker from './components/Clicker.vue'
import { ref } from 'vue';

// Создаём массив из 100 кликеров со случайным amount от 1 до 5
const clickers = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  amount: Math.floor(Math.random() * 5) + 1
}));

// Объединённый обработчик для алерта и логирования
function handleClickerEvent(event) {
  // Показываем alert
  alert(`Clicker ${event.clickerId} clicked!`);
  
  // Логируем событие (опционально)
  eventsLog.value.unshift({
    ...event,
    time: new Date().toLocaleTimeString()
  });
  
  if (eventsLog.value.length > 20) {
    eventsLog.value.pop();
  }
}

const eventsLog = ref([]);
</script>

<template>
  <div id="app">
    <h1>100 Кликеров с алертами</h1>
    <p>При клике на любой кликер появится alert с его номером</p>
    
    <div class="event-log" v-if="eventsLog.length > 0">
      <h3>Последние события (для отладки):</h3>
      <div v-for="(event, index) in eventsLog" :key="index" class="event-item">
        [{{ event.time }}] Кликер #{{ event.clickerId }}: {{ event.currentCount }} (+{{ event.increment }})
      </div>
    </div>
    
    <div class="clickers-grid">
      <Clicker 
        v-for="clicker in clickers" 
        :key="clicker.id"
        :id="clicker.id"
        :amount="clicker.amount"
        @button-clicked="handleClickerEvent"
      />
    </div>
  </div>
</template>

<style>
#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

p {
  text-align: center;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.event-log {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h3 {
  margin-top: 0;
  color: #334155;
  font-size: 1rem;
}

.event-item {
  padding: 0.3rem 0;
  border-bottom: 1px solid #e2e8f0;
  font-family: monospace;
  font-size: 0.8rem;
  color: black;
}

.event-item:last-child {
  border-bottom: none;
}

.clickers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .clickers-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>