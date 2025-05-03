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
    <div class="info">+{{ amount }} за клик</div>
    
    <div class="custom-button" @click="increment">
      <slot>
        <button class="default-button">Клик (+{{ amount }})</button>
      </slot>
    </div>
    
    <button @click="reset" class="reset">Сбросить</button>
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

.custom-button {
  cursor: pointer;
  margin: 0.5rem 0;
}

.default-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: #3b82f6;
  color: whtie;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.default-button:hover {
  background-color: #2563eb;
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

/* Остальные стили остаются такими же, как в предыдущем примере */
</style>