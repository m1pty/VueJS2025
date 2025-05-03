<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    default: 1,
    validator: (value) => value > 0
  }
});

// Локальное состояние для каждого кликера
const count = ref(0);

function increment() {
  count.value += props.amount;
}

function reset() {
  count.value = 0;
}
</script>

<template>
  <div class="clicker">
    <h3>Кликер #{{ id }}</h3>
    <div class="counter">Нажатий: {{ count }}</div>
    <div class="buttons">
      <button @click="increment">+1</button>
      <button @click="reset" class="reset">Сбросить</button>
    </div>
  </div>
</template>

<style scoped>
.clicker {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  background-color: #f8fafc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 1rem;
}

.counter {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-weight: bold;
  color: #334155;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:first-child {
  background-color: #3b82f6;
  color: white;
}

button:first-child:hover {
  background-color: #2563eb;
}

.reset {
  background-color: #f1f5f9;
  color: #64748b;
}

.reset:hover {
  background-color: #e2e8f0;
}
</style>