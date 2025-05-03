<template>
  <div class="container">
    <h1>📝 Мой список дел</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Добавить новую задачу" />
      <button type="submit">Добавить</button>
    </form>

    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="confirmRemove"
      />
    </ul>

    <Popup v-model="showPopup" @confirm="deleteConfirmed">
      <h2>Вы точно хотите удалить задачу?</h2>
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore.js';
import TodoItem from './components/TodoItem.vue';
import Popup from './components/Popup.vue';

const todoStore = useTodoStore();

const newTodo = ref('');

onMounted(async () => {
  await todoStore.loadTodos();
});

function addTodo() {
  todoStore.addTodo(newTodo.value);
  newTodo.value = '';
}

function toggleTodo(id) {
  todoStore.toggleTodo(id);
}

function confirmRemove(id) {
  todoStore.confirmRemove(id);
}

function deleteConfirmed() {
  todoStore.deleteConfirmed();
}

const todos = todoStore.todos;
const showPopup = todoStore.showPopup;
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
input[type="text"] {
  flex: 1;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
