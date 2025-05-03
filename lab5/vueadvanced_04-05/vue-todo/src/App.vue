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
        @toggle="toggleTodo(todo.id)"
        @remove="confirmRemove(todo.id)"
      />
    </ul>

    <Popup v-model="showPopup" @confirm="deleteConfirmed">
      <h2>Вы точно хотите удалить задачу?</h2>
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import TodoItem from './components/TodoItem.vue';
import Popup from './components/Popup.vue';

const newTodo = ref('');
const todos = ref([]);
const showPopup = ref(false);
const todoToDelete = ref(null);

// Загрузка задач
onMounted(async () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  } else {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
      todos.value = response.data.map(todo => ({
        id: todo.id,
        text: todo.title,
        done: todo.completed
      }));
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  }
});

// Сохраняем изменения в localStorage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  },
  { deep: true }
);

// Добавление задачи
async function addTodo() {
  const trimmedTodo = newTodo.value.trim();
  if (trimmedTodo) {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: trimmedTodo,
        completed: false
      });
      const newTask = {
        id: response.data.id,
        text: trimmedTodo,
        done: false
      };
      todos.value.push(newTask);
      newTodo.value = '';
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  }
}

// Переключение статуса
async function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todo.done
      });
      todo.done = !todo.done;
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  }
}

// Удаление задачи — подтверждение
function confirmRemove(id) {
  todoToDelete.value = id;
  showPopup.value = true;
}

// Удаление задачи — подтверждено
async function deleteConfirmed() {
  const id = todoToDelete.value;
  if (id !== null) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      todos.value = todos.value.filter(t => t.id !== id);
      todoToDelete.value = null;
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  }
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
