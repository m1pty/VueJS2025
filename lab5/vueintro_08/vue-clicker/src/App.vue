<script setup>
import Clicker from './components/Clicker.vue'
import { ref } from 'vue';

const clickers = [
  { id: 1, amount: 1 },
  { id: 2, amount: 2 },
  { id: 3, amount: 3 },
  { id: 4, amount: 5 }
];

const eventsLog = ref([]);
const totalClicks = ref(0);

function handleButtonClicked(event) {
  eventsLog.value.unshift({
    ...event,
    time: new Date().toLocaleTimeString()
  });
  
  totalClicks.value += 1;
  
  // Ограничиваем лог 10 последними событиями
  if (eventsLog.value.length > 10) {
    eventsLog.value.pop();
  }
}

function clearLog() {
  eventsLog.value = [];
}
</script>

<template>
  <div id="app">
    <h1>Система кликеров с событиями</h1>
    
    <div class="stats-panel">
      <div>Общее количество кликов: <strong>{{ totalClicks }}</strong></div>
      <button @click="clearLog" class="clear-btn">Очистить лог</button>
    </div>
    
    <div class="event-log">
      <h3>Последние события:</h3>
      <div v-if="eventsLog.length === 0" class="empty-log">Нет событий</div>
      <div v-else>
        <div v-for="(event, index) in eventsLog" :key="index" class="event-item">
          [{{ event.time }}] Кликер #{{ event.clickerId }}: 
          {{ event.currentCount }} (+{{ event.increment }})
        </div>
      </div>
    </div>
    
    <div class="clickers-container">
      <Clicker 
        v-for="clicker in clickers" 
        :key="clicker.id"
        :id="clicker.id"
        :amount="clicker.amount"
        @button-clicked="handleButtonClicked"
      >
        <!-- Кастомная кнопка для одного из кликеров -->
        <template v-if="clicker.id === 4">
          <button class="premium-button">
            💎 Премиум клик (+{{ clicker.amount }})
          </button>
        </template>
      </Clicker>
    </div>
  </div>
</template>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.stats-panel {
  background-color: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background-color: #fca5a5;
  color: #b91c1c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #f87171;
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
}

.empty-log {
  color: #64748b;
  font-style: italic;
}

.event-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  font-family: monospace;
  color: black;
}

.event-item:last-child {
  border-bottom: none;
}

.clickers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.premium-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.premium-button:hover {
  transform: scale(1.05);
}
</style>