<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div class="clicker">
    <button @click="increment">Click me!</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style scoped>
.clicker {
  text-align: center;
  margin-top: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #3aa876;
}
</style>