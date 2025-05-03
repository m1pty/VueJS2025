<template>
  <div class="container">
    <h1>📝 Мой список дел</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Добавить новую задачу" />
      <button type="submit">Добавить</button>
    </form>
    <ul>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        @toggle="toggleTodo(index)"
        @remove="removeTodo(index)"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import TodoItem from './components/TodoItem.vue';

const newTodo = ref('');
const todos = ref([]);

// Загрузка задач из localStorage при монтировании компонента
onMounted(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});

// Слежение за изменениями в списке задач и сохранение в localStorage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  },
  { deep: true }
);

// Добавление новой задачи
function addTodo() {
  const trimmedTodo = newTodo.value.trim();
  if (trimmedTodo) {
    todos.value.push({ text: trimmedTodo, done: false });
    newTodo.value = '';
  }
}

// Переключение состояния выполнения задачи
function toggleTodo(index) {
  todos.value[index].done = !todos.value[index].done;
}

// Удаление задачи
function removeTodo(index) {
  todos.value.splice(index, 1);
}
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
